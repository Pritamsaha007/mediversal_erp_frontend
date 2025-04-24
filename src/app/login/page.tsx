"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MainImg from "../auth/assests/svgs/Doctors-cuate 1.svg";
import MainMediversalLogo from "../auth/assests/svgs/Mediversal FLogo - Color 1.svg";
import MediversaLMaatriLogo from "../auth/assests/svgs/Mediversal Maatri.svg";
import MediversalHealthStudio1 from "../auth/assests/svgs/Mediversal Health Studio.svg";
import Vector1 from "../auth/assests/svgs/Vector 1.svg";
import Vector2 from "../auth/assests/svgs/Vector 2.svg";
import LoginComponent from "@/app/components/auth/LoginForm";
import ForgetPasswordComponent from "@/app/components/auth/ForgetPasswordForm";
import { useSearchParams } from "next/navigation";
export default function LoginScreen() {
  const searchParams = useSearchParams();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isPasswordExpired, setIsPasswordExpired] = useState(false);
  useEffect(() => {
    const forgot = searchParams.get("forgot");
    const expired = searchParams.get("expired");

    if (forgot === "true") {
      setIsForgotPassword(true);
      setIsPasswordExpired(expired === "true");
    }
  }, [searchParams]);
  return (
    <div className="w-screen h-screen bg-[#E8E8E8] flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center text-center p-4 lg:p-8 relative overflow-hidden">
        <h3 className="text-lg sm:text-xl lg:text-2xl mb-2 text-black z-10">
          Welcome to the
        </h3>
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 text-[#0088B1]">
          Mediversal Healthcare
        </h1>
        <h3 className="text-lg sm:text-xl lg:text-2xl mb-4 text-black z-10">
          ERP One
        </h3>

        <div className="w-full max-w-md lg:max-w-lg z-10 my-4">
          <Image
            src={MainImg}
            alt="Doctor Illustration"
            width={400}
            height={400}
            className="w-full max-w-sm mx-auto"
          />
        </div>

        <h3 className="text-lg lg:text-2xl mb-4 text-black z-10">Our units</h3>
        <div className="flex flex-wrap justify-center items-center gap-4 px-4 z-10 mb-8">
          <div className="w-1/5 max-w-xs">
            <Image
              src={MainMediversalLogo}
              alt="Mediversal Logo"
              width={100}
              height={100}
              className="w-full"
            />
          </div>
          <div className="w-1/5 max-w-xs">
            <Image
              src={MediversaLMaatriLogo}
              alt="Mediversal Maatri Logo"
              width={100}
              height={100}
              className="w-full"
            />
          </div>
          <div className="w-1/5 max-w-xs">
            <Image
              src={MediversalHealthStudio1}
              alt="Mediversal Health Studio"
              width={100}
              height={100}
              className="w-full"
            />
          </div>
          <div className="w-1/5 max-w-xs">
            <Image
              src={MediversalHealthStudio1}
              alt="Mediversal Health Studio"
              width={100}
              height={100}
              className="w-full"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <Image
            src={Vector1}
            alt="Vector 1"
            width={1500}
            height={250}
            className="w-full h-32 sm:h-48 lg:h-64 object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <Image
            src={Vector2}
            alt="Vector 2"
            width={1500}
            height={320}
            className="w-full h-40 sm:h-56 lg:h-80 object-cover"
          />
        </div>
      </div>
      <div className="w-full lg:w-2/5 flex items-center justify-center p-4 lg:p-8 bg-[#FFFFFF] border-l-0 rounded-l-4xl">
        {isForgotPassword ? (
          <ForgetPasswordComponent
            onBackToLogin={() => {
              setIsForgotPassword(false);
              setIsPasswordExpired(false);
            }}
            isPasswordExpired={isPasswordExpired}
          />
        ) : (
          <LoginComponent onForgotPassword={() => setIsForgotPassword(true)} />
        )}{" "}
      </div>
    </div>
  );
}
