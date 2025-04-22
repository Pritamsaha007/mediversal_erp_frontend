"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Image from "next/image";
import LoginToggle from "../ui/Toggle";

export default function LoginComponent() {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [loginMethod, setLoginMethod] = useState<string>("email");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(50);

  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOtpInput && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
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
    const interval = setInterval(updateDateTime, 100);

    return () => clearInterval(interval);
  }, []);

  const loginOptions = [
    { id: "email", label: "Email" },
    { id: "mobile", label: "Mobile" },
  ];

  const handleLoginToggle = (selectedId: string) => {
    setLoginMethod(selectedId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtpInput) {
      const formDataWithCountryCode =
        loginMethod === "mobile"
          ? { ...formData, mobile: `+91 ${formData.mobile}` }
          : formData;
      console.log("Form submitted:", formDataWithCountryCode);
      setShowOtpInput(true);
      setTimer(50); // reset timer when showing OTP input
    } else {
      console.log("OTP entered:", otp.join(""));
      // handle OTP verification here
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];

      // If pasted string
      if (value.length > 1) {
        const values = value.split("").slice(0, 6);
        values.forEach((digit, idx) => {
          if (index + idx < 6) newOtp[index + idx] = digit;
        });
        setOtp(newOtp);

        // Focus next empty input
        const nextIndex = Math.min(index + values.length, 5);
        const nextInput = document.getElementById(`otp-${nextIndex}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      } else {
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next box if not last
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
      {/* Top Date & Time */}
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center text-sm text-gray-600 pt-14">
        {showOtpInput && (
          <button
            type="button"
            className="flex items-center text-[#0088B1] font-medium"
            onClick={() => {
              setShowOtpInput(false);
              setOtp(["", "", "", "", "", ""]);
            }}
          >
            <ArrowLeft className="mr-2" size={18} />
            Back
          </button>
        )}
        <div>{currentDateTime}</div>
      </div>

      {/* Center Login/OTP Card */}
      <div className="flex justify-center items-center flex-1 mt-16">
        <div className="bg-white w-[550px] p-14 rounded">
          <h1 className="text-[#0088B1] text-2xl font-bold text-left mb-10">
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
                {/* Email or Mobile Input */}
                {loginMethod === "email" ? (
                  <div className="mb-4">
                    <div className="flex">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#E5E8E9] rounded-l focus:outline-none focus:border-[#0088B1] bg-[#F8F8F8] text-[#161D1F]"
                        placeholder="Enter your official email"
                      />
                      <span className="bg-gray-100 text-[#0088B1] p-2 border border-[#E5E8E9] border-l-0 rounded-r shadow-md">
                        @mediversal.in
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="flex">
                      <div className="flex items-center px-3 py-2 bg-gray-50 text-[#0088B1] font-medium border border-[#E5E8E9] border-r-0">
                        +91
                      </div>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-[#E5E8E9] border-l-0 rounded-r focus:outline-none focus:border-[#0088B1] bg-[#F8F8F8] text-[#161D1F]"
                        placeholder="Enter your mobile number"
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
                      value={formData.password}
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
                  <a href="#" className="text-sm text-black hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </>
            ) : (
              <>
                {/* OTP Info */}
                <p className="text-[#161D1F] mb-4 text-left font-medium">
                  Otp has been sent to your registered
                  <span className="font-bold"> phone/email</span>. Please enter
                  the OTP below.
                </p>

                {/* OTP Boxes */}
                <div className="flex justify-between  mb-4">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={6}
                      value={value}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)}
                      className="w-12 h-12 border border-[#D1D1D1] rounded text-center text-lg focus:outline-none focus:border-[#0088B1] text-[#B3B3B3]"
                    />
                  ))}
                </div>

                {/* Timer and Resend */}
                <div className="text-center mb-6">
                  <span className="text-[#0088B1] font-medium">{timer}s</span>
                  <button
                    type="button"
                    disabled={timer > 0}
                    onClick={() => {
                      setTimer(50);
                    }}
                    className={`ml-4 text-black ${
                      timer > 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Resend OTP
                  </button>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#0088B1] text-white py-3 px-4 rounded-lg hover:bg-[#006d8f] transition-colors"
              >
                {showOtpInput ? "Verify OTP" : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Accreditation */}
      <div className="text-center mb-20">
        <p className="text-sm text-[#000000] mb-2">Accredited by</p>
        <div className="flex justify-center gap-4">
          <Image src="/image/NABH.svg" alt="NABH" width={50} height={50} />
          <Image src="/image/NABL.svg" alt="NABL" width={50} height={50} />
        </div>
      </div>
    </div>
  );
}
