"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import LoginToggle from "../components/ui/Toggle";
import { useRouter } from "next/navigation";

export default function ForgetPasswordComponent() {
  const [loginMethod, setLoginMethod] = useState<string>("email");
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();

  const loginOptions = [
    { id: "email", label: "Email" },
    { id: "mobile", label: "Mobile" },
  ];

  const handleLoginToggle = (selectedId: string) => {
    setLoginMethod(selectedId);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Forget Password Request for:", {
      type: loginMethod,
      value: inputValue,
    });
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col justify-between">
      {/* Top Back Button */}
      <div className="absolute top-4 left-6 right-6 flex justify-between items-center text-sm text-gray-600 pt-14">
        <button
          type="button"
          className="flex items-center text-[#0088B1] font-medium"
          onClick={() => router.push("/login")}
        >
          <ArrowLeft className="mr-2" size={18} />
          Back to Login
        </button>
      </div>

      {/* Center Card */}
      <div className="flex justify-center items-center flex-1 mt-16">
        <div className="bg-white w-[550px] p-14 rounded">
          <h1 className="text-[#0088B1] text-2xl font-bold text-left mb-10">
            Forgot Password
          </h1>

          <div className="mb-6 w-full">
            <LoginToggle
              options={loginOptions}
              defaultSelected="email"
              onToggle={handleLoginToggle}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="flex">
                {loginMethod === "email" ? (
                  <>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#E5E8E9] rounded-l focus:outline-none focus:border-[#0088B1] bg-[#F8F8F8] text-[#161D1F]"
                      placeholder="Enter your official email"
                    />
                    <span className="bg-gray-100 text-[#0088B1] p-2 border border-[#E5E8E9] border-l-0 rounded-r shadow-md">
                      @mediversal.in
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center px-3 py-2 bg-gray-50 text-[#0088B1] font-medium border border-[#E5E8E9] border-r-0">
                      +91
                    </div>
                    <input
                      type="tel"
                      value={inputValue}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-[#E5E8E9] border-l-0 rounded-r focus:outline-none focus:border-[#0088B1] bg-[#F8F8F8] text-[#161D1F]"
                      placeholder="Enter your mobile number"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#0088B1] text-white py-3 px-4 rounded-lg hover:bg-[#006d8f] transition-colors"
              >
                Send Reset Link / OTP
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Accreditation */}
      <div className="text-center mb-20">
        <p className="text-sm text-[#000000] mb-2">Accredited by</p>
        <div className="flex justify-center gap-4">
          <img src="/image/NABH.svg" alt="NABH" width={50} height={50} />
          <img src="/image/NABL.svg" alt="NABL" width={50} height={50} />
        </div>
      </div>
    </div>
  );
}
