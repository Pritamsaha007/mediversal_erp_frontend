import React from "react";
import Image from "next/image";
import MainMediversalLogo from "../login/assests/svgs/Mediversal FLogo - Color 1.svg";

const MediversalBegusarai = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-amber-800">
        Welcome To Mediversal Begusarai
      </h1>
      <Image
        src={MainMediversalLogo}
        alt="Mediversal"
        width={400}
        height={300}
        className="rounded-xl shadow-lg"
      />
    </div>
  );
};

export default MediversalBegusarai;
