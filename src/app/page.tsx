"use client";
import React, { Suspense } from "react";
import LoginScreen from "./auth/loginScreen/page";
import { Toaster } from "react-hot-toast";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Toaster />
      <Suspense fallback={<div>Loading...</div>}>
        <LoginScreen />
      </Suspense>
    </>
  );
}
