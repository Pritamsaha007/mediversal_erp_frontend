"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import LoginToggle from "../ui/Toggle";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgetPasswordComponent() {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loginMethod, setLoginMethod] = useState<string>("email");
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
  });

  const router = useRouter();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Forget Password submit:", formData);

    // Simulate sending OTP
    setShowOtpInput(true);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-between">
      {/* Top Date & Time */}
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center text-sm text-gray-600 pt-14">
        <button
          type="button"
          className="flex items-center text-[#0088B1] font-medium"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2" size={18} />
          Back
        </button>
        <div>{currentDateTime}</div>
      </div>

      {/* Center Card */}
      <div className="flex justify-center items-center flex-1 mt-16">
        <div className="bg-white w-[550px] p-14 rounded">
          <h1 className="text-[#0088B1] text-2xl font-bold text-left mb-10">
            Forget Password
          </h1>

          {/* Toggle */}
          <div className="mb-6 w-full">
            <LoginToggle
              options={loginOptions}
              defaultSelected="email"
              onToggle={handleLoginToggle}
            />
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email or Mobile Input */}
            {loginMethod === "email" ? (
              <div className="mb-6">
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
              <div className="mb-6">
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
            {showOtpInput && (
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
            )}

            {/* Submit Button */}
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#0088B1] text-white py-3 px-4 rounded-lg hover:bg-[#006d8f] transition-colors"
              >
                Verify OTP
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
}
