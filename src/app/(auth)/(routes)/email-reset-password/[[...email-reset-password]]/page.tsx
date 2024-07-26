"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center pt-4">
      <div className="flex flex-col bg-gray w-full items-center max-w-md ">
        <Image
          src="/assets/Trajeton-Logo-Complete.png"
          alt="Descrição da imagem"
          width={150}
          height={150}
          className="block w-[30%]"
        />
      </div>
      <div className="flex flex-col items-start w-full mt-4 border border-gray-300 p-6 max-w-md mx-auto rounded-xl">
        <h3 className="mb-4">Olá,</h3>
        <p className="mb-4">
          Redefina sua senha de acesso clicando no link abaixo.
        </p>
        <Link
          href="/reset-password"
          className="text-blue-600 underline mb-4"
          passHref
        >
          https://trajetonbdchabvuyhbvayrbvyubrvyhv.senha
        </Link>
        <p className="text-red-500">O link expira em 24 horas</p>
      </div>
    </div>
  );
};

export default Page;
