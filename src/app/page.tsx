"use client";
import React from "react";
import LoginScreen from "./auth/loginScreen/page";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster />
      <LoginScreen />
    </>
  );
}
