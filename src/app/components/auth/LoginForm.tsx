"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

// Reuse the LoginToggle component from before
type ToggleOption = {
  id: string;
  label: string;
};

type LoginToggleProps = {
  options: ToggleOption[];
  defaultSelected?: string;
  onToggle?: (selectedId: string) => void;
};

function LoginToggle({ options, defaultSelected, onToggle }: LoginToggleProps) {
  const [selected, setSelected] = useState<string>(
    defaultSelected || options[0]?.id || ""
  );

  const handleToggle = (id: string) => {
    setSelected(id);
    if (onToggle) {
      onToggle(id);
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex w-full rounded overflow-hidden">
        {options.map((option) => (
          <button
            key={option.id}
            className={`
              w-full h-10 px-4 text-sm font-medium transition-colors duration-200
              ${
                selected === option.id
                  ? "bg-[#0088B1] text-[#F8F8F8]"
                  : "bg-[#F8F8F8] text-[#161D1F] hover:bg-gray-100"
              }
            `}
            onClick={() => handleToggle(option.id)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function LoginComponent() {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [loginMethod, setLoginMethod] = useState<string>("email");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
  });

  // Update current date and time
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
    // Handle login logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        {/* Date and Time */}
        <div className="text-sm text-gray-600 mb-6 text-right">
          {currentDateTime}
        </div>

        {/* Login Header */}
        <h1 className="text-[#0088B1] text-2xl font-bold text-left mb-6">
          Login
        </h1>

        {/* Toggle Component */}
        <div className="mb-6 w-full">
          <LoginToggle
            options={loginOptions}
            defaultSelected="email"
            onToggle={handleLoginToggle}
          />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Conditional Input Fields */}
          {loginMethod === "email" ? (
            <div className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-l focus:outline-none focus:border-[#0088B1] bg-[#F8F8F8] text-[#B0B6B8]"
                  placeholder="Enter your official email here..."
                />
                <span className="bg-gray-100 text-[#0088B1] p-2 border border-l-0 rounded-r shadow-md">
                  @mediversal.in
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex">
                {/* Fixed +91 Country Code */}
                <div className="flex items-center px-3 py-2  bg-gray-50 text-[#0088B1] font-medium">
                  +91
                </div>

                {/* Mobile Input */}
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-l-0 rounded-r focus:outline-none focus:border-[#0088B1] bg-[#F8F8F8] text-[#B0B6B8]"
                  placeholder="Enter your mobile number"
                />
              </div>
            </div>
          )}
          {/* Password Field */}
          <div className="mb-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:border-[#0088B1] bg-[#F8F8F8] text-[#B0B6B8]"
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

          {/* Forgot Password Link */}
          <div className="flex justify-end mb-6">
            <a href="#" className="text-sm text-black hover:underline">
              Forgot Password?
            </a>
          </div>
          {/* Login Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-[#0088B1] text-white py-2 px-4 rounded hover:bg-[#006d8f] transition-colors"
            >
              Login
            </button>
          </div>
        </form>

        {/* Accreditation */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Accredited by</p>
          <div className="flex justify-center gap-4">
            <Image src="/image/NABH.svg" alt="Logo" width={60} height={60} />{" "}
            <Image src="/image/NABL.svg" alt="Logo" width={60} height={60} />
          </div>
        </div>
      </div>
    </div>
  );
}
