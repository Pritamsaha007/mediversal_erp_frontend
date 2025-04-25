import React from "react";
import Image from "next/image";
import MediversalHealthStudio1 from "../login/assests/svgs/Mediversal Health Studio.svg";

const HealthStudio = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-amber-800">
        Welcome To Mediversal Health Studio
      </h1>
      <Image
        src={MediversalHealthStudio1}
        alt="Mediversal"
        width={400}
        height={300}
        className="rounded-xl shadow-lg"
      />
    </div>
  );
};

export default HealthStudio;
