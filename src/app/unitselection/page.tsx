"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MainMediversalLogo from "./assests/svgs/Mediversal.svg";
import MediversalMaatriLogo from "./assests/svgs/Mediversal Maatri.svg";
import MediversalHealthStudio from "./assests/svgs/Mediversal Health Studio.svg";
import Vector1 from "./assests/svgs/Vector 1.svg";
import Vector2 from "./assests/svgs/Vector 2.svg";
import { authService } from "../services/api";
import { useUserAuthStore } from "../store/userAuthSrore";

export default function UnitSelectionScreen() {
  const [dateTime, setDateTime] = useState("");
  const { user } = useUserAuthStore();
  const locationPermission = user?.location_permission || "";

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const date = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      });

      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      setDateTime(`${date} | ${hours}:${minutes}:${seconds}:00`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const logout = async () => {
    try {
      if (user?.user_id) {
        await authService.logout(user.user_id);
      }
      useUserAuthStore.getState().clearAuth();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isLocationPermitted = (location: string) => {
    if (!locationPermission) return false;

    if (locationPermission === "all") return true;

    if (Array.isArray(locationPermission)) {
      return locationPermission.includes(location);
    }

    if (typeof locationPermission === "string") {
      return locationPermission
        .split(",")
        .map((loc) => loc.trim())
        .includes(location);
    }

    return false;
  };

  return (
    <div className="w-screen h-screen bg-[#E8E8E8] flex flex-col items-center">
      <div className="absolute top-4 right-4 text-black font-medium text-sm">
        {dateTime}
      </div>
      <div className="text-center mt-20">
        <h3 className="text-lg sm:text-xl lg:text-2xl mb-2 text-black">
          Welcome to the
        </h3>
        <h1 className="text-2xl sm:text-2xl lg:text-5xl font-bold mb-2 text-[#0088B1]">
          Mediversal Healthcare
        </h1>
        <h3 className="text-lg sm:text-xl lg:text-2xl mb-4 text-black">
          ERP One
        </h3>
        <h5 className="text-md sm:text-xl lg:text-base mb-4 text-black">
          Please select the branch where you are working <br />
          or where you want to work.
        </h5>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8 px-4 z-10 mt-10">
        {isLocationPermitted("mediversal_main") && (
          <div
            className="flex flex-col items-center w-40"
            onClick={() => (window.location.href = "/mediversal_main")}
          >
            <div className="bg-white rounded-full shadow-md p-4 mb-3 flex justify-center items-center h-20 w-20">
              <Image
                src={MainMediversalLogo}
                alt="Mediversal Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h5 className="text-[#0088B1] text-sm text-center font-medium">
              Mediversal
              <br />
              Main
            </h5>
          </div>
        )}

        {isLocationPermitted("mediversal_maatri") && (
          <div className="flex flex-col items-center w-40">
            <div
              className="bg-white rounded-full shadow-md p-4 mb-3 flex justify-center items-center h-20 w-20"
              onClick={() => (window.location.href = "/mediversal_maatri")}
            >
              <Image
                src={MediversalMaatriLogo}
                alt="Mediversal Maatri Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <h5 className="text-[#0088B1] text-sm text-center font-medium">
              Mediversal
              <br />
              Maatri
            </h5>
          </div>
        )}

        {isLocationPermitted("mediversal_health_studio") && (
          <div className="flex flex-col items-center w-40">
            <div
              className="bg-white rounded-full shadow-md p-4 mb-3 flex justify-center items-center h-20 w-20"
              onClick={() => (window.location.href = "/health_studio")}
            >
              <Image
                src={MediversalHealthStudio}
                alt="Mediversal Health Studio"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
            <h5 className="text-[#0088B1] text-sm text-center font-medium">
              Mediversal
              <br />
              Health Studio
            </h5>
          </div>
        )}

        {isLocationPermitted("Mediversal_begusarai") && (
          <div
            className="flex flex-col items-center w-40"
            onClick={() => (window.location.href = "/mediversal_begusarai")}
          >
            <div className="bg-white rounded-full shadow-md p-4 mb-3 flex justify-center items-center h-20 w-20">
              <Image
                src={MainMediversalLogo}
                alt="Mediversal Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h5 className="text-[#0088B1] text-sm text-center font-medium">
              Mediversal
              <br />
              Begusarai
            </h5>
          </div>
        )}

        <button
          onClick={logout}
          className="bg-red-300 hover:bg-red-400 text-white font-semibold py-1.5 px-4 rounded-lg shadow-md transition duration-200"
        >
          Logout
        </button>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "100vh" }}
      >
        <Image
          src={Vector1}
          alt="Vector 1"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "100vh" }}
      >
        <Image
          src={Vector2}
          alt="Vector 2"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
    </div>
  );
}
