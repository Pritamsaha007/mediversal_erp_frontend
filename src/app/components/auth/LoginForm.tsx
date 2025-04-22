"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import LoginToggle from "../ui/Toggle";

type ToggleOption = {
  id: string;
  label: string;
};

export default function LoginComponent() {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [loginMethod, setLoginMethod] = useState<string>("email");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
  });

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
    const formDataWithCountryCode =
      loginMethod === "mobile"
        ? { ...formData, mobile: `+91 ${formData.mobile}` }
        : formData;
    console.log("Form submitted:", formDataWithCountryCode);
  };

  return (
    <div className="relative min-h-screen bg-white  flex flex-col justify-between">
      {/* Top Date & Time */}
      <div className="absolute top-4 right-6 text-sm text-gray-600">
        {currentDateTime}
      </div>

      {/* Center Login Card */}
      <div className="flex justify-center items-center flex-1 mt-16">
        <div className="bg-white w-[500] p-6 rounded">
          <h1 className="text-[#0088B1] text-2xl font-bold text-left mb-10">
            Login
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

            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#0088B1] text-white py-3 px-4 rounded-lg hover:bg-[#006d8f] transition-colors"
              >
                Login
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
