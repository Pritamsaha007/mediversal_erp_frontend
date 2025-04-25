"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Image from "next/image";
import LoginToggle from "../ui/Toggle";
import { useAuthStore } from "../../store/loginStore";
import { authService } from "../../services/api";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUserAuthStore } from "@/app/store/userAuthSrore";
type LoginComponentProps = {
  onForgotPassword: () => void;
};
const LoginComponent: React.FC<LoginComponentProps> = ({
  onForgotPassword,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const { setLoginDetails, email, phoneNo, password } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOtpInput && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpInput, timer]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setCurrentDateTime(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoginDetails(email, phoneNo, password, loginMethod);
  }, [email, phoneNo, password, setLoginDetails, loginMethod]);

  const loginOptions = [
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
  ];

  const handleLoginToggle = (selectedId: string) => {
    setLoginMethod(selectedId as "email" | "phone");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setLoginDetails(value, phoneNo, password, loginMethod);
    } else if (name === "phone") {
      setLoginDetails(
        email,
        parseInt(value) || undefined,
        password,
        loginMethod
      );
    } else if (name === "password") {
      setLoginDetails(email, phoneNo, value, loginMethod);
    }
  };

  const getIdentifier = () => {
    return loginMethod === "email"
      ? email + "@mediversal.in"
      : phoneNo?.toString();
  };

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const identifier = getIdentifier();
      console.log(identifier, password, loginMethod);
      if (!identifier) {
        throw new Error(
          `Please enter your ${
            loginMethod === "email" ? "email" : "phone number"
          }`
        );
      }

      if (!password) {
        throw new Error("Please enter your password");
      }

      const response = await authService.login(
        identifier,
        password,
        loginMethod
      );

      if (response.data.success) {
        console.log("Login successful, OTP sent:", response.data);
        toast.success("OTP sent successfully!");
        setShowOtpInput(true);
        setTimer(50);
      } else {
        // Check if account is locked
        if (
          response.data.message ===
          "Account is locked due to too many failed attempts."
        ) {
          toast.error(
            "Your account is locked. Please contact the administrator."
          );
        } else {
          toast.error(
            response.data.message || "Login failed. Please try again."
          );
        }
      }
    } catch (error: unknown) {
      console.error("Error during login:", error);

      let errorMsg = "Login failed. Please try again.";

      if (typeof error === "object" && error !== null) {
        const err = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMsg = err.response?.data?.message || err.message || errorMsg;
      }

      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  const handleVerifyOtp = async () => {
    setIsLoading(true);
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      setIsLoading(false);
      return;
    }
    try {
      const identifier = getIdentifier();
      const response = await authService.verifyOtp(
        identifier,
        otpValue,
        loginMethod
      );
      if (response.data.success) {
        toast.success("OTP verified successfully!");
        const token = response.data.token;
        const userData = response.data.user;

        if (token) {
          useUserAuthStore.getState().setToken(token);
          localStorage.setItem("token", token);
          document.cookie = `token=${token}; path=/; max-age=604800`;
        }

        if (userData) {
          useUserAuthStore.getState().setUser(userData);
          console.log(
            "Auth store state after user update:",
            useUserAuthStore.getState()
          );
        }

        router.push("/unitselection");
      } else {
        if (
          !response.data.success &&
          response.data.message?.includes("password has expired")
        ) {
          toast.error(response.data.message);
          router.push("/login?forgot=true");
          return;
        }
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error("OTP verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtpInput) {
      handleLogin();
    } else {
      handleVerifyOtp();
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;

    setIsLoading(true);

    try {
      const identifier = getIdentifier();

      const response = await authService.login(
        identifier,
        password,
        loginMethod
      );

      if (response.data.success) {
        console.log("OTP resent successfully:", response.data);
        toast.success("OTP sent successfully!");
        setTimer(50);
      }
    } catch (error: unknown) {
      console.error("Error resending OTP:", error);

      let errorMsg = "Failed to resend OTP. Please try again.";

      if (typeof error === "object" && error !== null) {
        const err = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        errorMsg = err.response?.data?.message || err.message || errorMsg;
      }

      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];

      if (value.length > 1) {
        const values = value.split("").slice(0, 6);
        values.forEach((digit, idx) => {
          if (index + idx < 6) newOtp[index + idx] = digit;
        });
        setOtp(newOtp);
        const nextIndex = Math.min(index + values.length, 5);
        const nextInput = document.getElementById(`otp-${nextIndex}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      } else {
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
          const nextInput = document.getElementById(`otp-${index + 1}`);
          if (nextInput) (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index] === "") {
        if (index > 0) {
          newOtp[index - 1] = "";
          setOtp(newOtp);
          const prevInput = document.getElementById(`otp-${index - 1}`);
          if (prevInput) (prevInput as HTMLInputElement).focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-between">
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center text-sm text-gray-600 pt-14">
        {showOtpInput ? (
          <>
            <button
              type="button"
              className="flex items-center text-[#0088B1] font-medium"
              onClick={() => {
                setShowOtpInput(false);
                setOtp(["", "", "", "", "", ""]);
              }}
            >
              <ArrowLeft className="mr-2" size={18} />
            </button>
            <div>{currentDateTime}</div>
          </>
        ) : (
          <div className="ml-auto">{currentDateTime}</div>
        )}
      </div>

      <div className="flex justify-center items-center flex-1 mt-16">
        <div className="bg-white w-[550px] p-14 rounded">
          <h1 className="text-[#0088B1] text-[40px] font-bold text-left mb-10 font-zak">
            {showOtpInput ? "Login" : "Login"}
          </h1>

          {!showOtpInput && (
            <div className="mb-6 w-full">
              <LoginToggle
                options={loginOptions}
                defaultSelected="email"
                onToggle={handleLoginToggle}
              />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!showOtpInput ? (
              <>
                {loginMethod === "email" ? (
                  <div className="mb-4">
                    <div className="flex">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#E5E8E9] rounded-r-0 focus:outline-none focus:border-[#0088B1] bg-[#F8F8F8] text-[#161D1F]"
                        placeholder="Enter your official email"
                      />
                      <span className="bg-[#E8F4F7] text-[#0088B1] p-2 border border-[#E5E8E9] border-l-0 rounded-r shadow-[ -4px_0_6px_0_#E8F4F7 ]">
                        @mediversal.in
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="flex">
                      <div className="flex items-center px-3 py-2 bg-gray-50 text-[#0088B1] font-medium border border-[#E5E8E9] border-r-0 rounded-l">
                        +91
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phoneNo || ""}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#E5E8E9] rounded-r focus:outline-none focus:border-[#0088B1] bg-[#F8F8F8] text-[#161D1F]"
                        placeholder="Enter your mobile number"
                        maxLength={10}
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#E5E8E9] rounded focus:outline-none focus:border-[#0088B1] bg-[#F8F8F8] text-[#161D1F]"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye size={20} color="#B0B6B8" />
                      ) : (
                        <EyeOff size={20} color="#B0B6B8" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mb-6">
                  <button onClick={onForgotPassword} className="text-[#000000]">
                    Forgot Password
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-[#161D1F] mb-4 text-left font-medium">
                  OTP has been sent to your registered{" "}
                  <span className="font-bold">
                    {loginMethod === "email" ? "email" : "phone number"}
                  </span>
                  . Please enter the OTP below.
                </p>

                <div className="flex justify-between mb-4">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={6}
                      value={value}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className="w-12 h-12 border border-[#D1D1D1] rounded text-center text-lg focus:outline-none focus:border-[#0088B1] text-[#161D1F]"
                    />
                  ))}
                </div>

                <div className="text-center mb-6">
                  <span className="text-[#0088B1] font-medium">{timer}s</span>
                  <button
                    type="button"
                    disabled={timer > 0 || isLoading}
                    onClick={handleResendOtp}
                    className={`ml-4 text-black ${
                      timer > 0 || isLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Resend OTP
                  </button>
                </div>
              </>
            )}

            <div className="mb-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#0088B1] text-white py-3 px-4 rounded-lg hover:bg-[#006d8f] transition-colors ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading
                  ? "Loading..."
                  : showOtpInput
                  ? "Verify OTP"
                  : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center mb-20">
        <p className="text-sm text-[#000000] mb-2">Accredited by</p>
        <div className="flex justify-center gap-4">
          <Image src="/image/NABH.svg" alt="NABH" width={50} height={50} />
          <Image src="/image/NABL.svg" alt="NABL" width={50} height={50} />
        </div>
      </div>
    </div>
  );
};
export default LoginComponent;
