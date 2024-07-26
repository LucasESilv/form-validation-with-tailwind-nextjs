"use client";
import React, { useState } from "react";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const signUpSchema = z
  .object({
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

const Page = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    console.log(values);
    setIsSuccess(true);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 sm:py-12">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/Trajeton-Logo-Complete-Stacked.png"
            alt="Trajeton Logo"
            width={150}
            height={150}
          />
        </div>
        <div className="bg-gray p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-center mb-4">
            Redefinir senha
          </h2>
          <p className="text-center text-gray-700 mb-6">
            Redefina sua senha com no mínimo 6 caracteres
          </p>
          {isSuccess && (
            <div className="mb-4 p-4 bg-green-100 text-green-800 border border-green-300 rounded-md">
              Senha redefinida com sucesso!
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0 mb-4">
                    <FormLabel>
                      Senha
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border border-gray-300 rounded-xl"
                        placeholder="Digite uma senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="space-y-0 mb-4">
                    <FormLabel>
                      Confirme sua senha
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border border-gray-300 rounded-xl"
                        placeholder="Repita sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-gray-600 text-sm mb-4">
                <p>Crie uma senha segura:</p>
                <ul className="list-disc list-inside">
                  <li>
                    use letras maiúsculas e minúsculas, símbolos e números;
                  </li>
                  <li>
                    não use informações pessoais como datas de aniversário;
                  </li>
                  <li>não use uma senha igual à anterior.</li>
                </ul>
              </div>
              <Button
                type="submit"
                className="w-full bg-custom-orange text-white border rounded-xl hover:bg-custom-darkorange py-2 mt-4"
              >
                Redefinir senha
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
