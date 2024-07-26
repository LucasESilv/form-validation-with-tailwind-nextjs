"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
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
import Link from "next/link";

const customEmailRegex =
  /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;

const signInSchema = z.object({
  email: z.string().refine((value) => customEmailRegex.test(value), {
    message:
      "E-mail, inválido. Insira um endereço de e-mail no formato correto",
  }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres" })
    .max(32, { message: "A senha deve ter no máximo 32 caracteres" })
    .refine(
      (password) => {
        const trimmedPassword = password.trim();
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(
          trimmedPassword
        );
      },
      {
        message:
          "Senha inválida. Verifique se a senha tem pelo menos 8 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais.",
      }
    ),
});

const resetPasswordSchema = z.object({
  email: z.string().refine((value) => customEmailRegex.test(value), {
    message: "E-mail inválido. Insira um endereço de e-mail no formato correto",
  }),
});

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState(""); // Novo estado

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const predefinedCredentials = {
    email: "teste.lucas@gmail.com",
    password: "TesteSenha12345+",
  };

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log(values);

    if (
      values.email === predefinedCredentials.email &&
      values.password === predefinedCredentials.password
    ) {
      setIsUserAuthenticated(true); // Atualiza o estado para indicar que o usuário está autenticado
    } else {
      setIsUserAuthenticated(false); // Mantém o estado como falso se as credenciais não corresponderem
      setTimeout(() => {
        setIsModalOpen(false); // Fecha o modal de recuperação de senha
        setIsConfirmationModalOpen(true); // Abre o modal de confirmação
      }, 1000); // Simula um atraso para demonstração
    }
  }

  const handleResetPasswordSubmit = (
    values: z.infer<typeof resetPasswordSchema>
  ) => {
    // Verifica se o e-mail é válido
    if (predefinedCredentials.email === values.email) {
      setEmailErrorMessage(""); // Limpa a mensagem de erro
      setIsModalOpen(false);
      setIsConfirmationModalOpen(true);
    } else {
      // Define a mensagem de erro se o e-mail não for encontrado
      setEmailErrorMessage(
        "E-mail inválido. Este Endereço de e-mail não está cadastrado no sistema, verifique ou tente novamente."
      );
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      <div className="formWrapper flex flex-col md:flex-row w-full h-full">
        <div className="right w-full md:w-1/2 flex justify-center items-center h-full bg-transparent md:bg-custom-cream order-1 md:order-2">
          <Image
            src="/assets/Trajeton-Logo-Complete-Stacked.png" // Imagem diferente para mobile
            alt="Descrição da imagem"
            width={150}
            height={150}
            layout="responsive"
            className="block md:hidden w-[80%]"
          />
          <Image
            src="/assets/Trajeton-Logo-Complete.png"
            alt="Descrição da imagem"
            width={300}
            height={200}
            layout="responsive"
            className="hidden md:block w-80p h-auto"
          />
        </div>
        <div className="left p-4 w-full md:w-1/2 bg-white flex flex-col justify-center h-full space-y-20 mx-20 order-2 md:order-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0 mb-2">
                    <FormLabel>
                      Email
                      <span className="text-red-500">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border border-gray-300 rounded-xl"
                        placeholder="mail.example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0 mb-4">
                    <FormLabel>
                      Senha
                      <span className="text-red-500">*</span>{" "}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border border-gray-300 rounded-xl"
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <a
                className="text-custom-light-blue cursor-pointer mt-4"
                onClick={() => setIsModalOpen(true)}
              >
                Esqueci minha senha
              </a>
              <Button
                type="submit"
                className="w-full bg-custom-orange border rounded-xl hover:bg-custom-darkorange"
              >
                Entrar
              </Button>
            </form>
          </Form>

          {isUserAuthenticated && (
            <div className="flex justify-center mt-8">
              <p className="text-lg font-semibold text-green-600">
                Acesso liberado
              </p>
            </div>
          )}
        </div>
      </div>

      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed inset-0 w-full h-full sm:w-auto sm:h-auto sm:max-w-md p-6 bg-white rounded-2xl sm:rounded-xl flex items-center justify-center sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:top-1/2 sm:left-1/2 md:h-70 md:max-h-70">
            <div className="w-full">
              <Dialog.Title className="text-lg font-semibold">
                Recuperar Senha
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-700">
                Para recuperar sua senha, digite o e-mail cadastrado.
              </Dialog.Description>
              <div className="mt-4">
                <Form {...resetPasswordForm}>
                  <form
                    onSubmit={resetPasswordForm.handleSubmit(
                      handleResetPasswordSubmit
                    )}
                    className="space-y-4"
                  >
                    <FormField
                      control={resetPasswordForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-0 mb-2">
                          <FormLabel>
                            Email
                            <span className="text-red-500">*</span>{" "}
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border border-gray-300 rounded-xl"
                              placeholder="mail.example@gmail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {emailErrorMessage && (
                      <p className="text-red-500 mt-2">{emailErrorMessage}</p>
                    )}
                    <Button
                      className="w-full bg-custom-orange text-white mt-4 border rounded-xl hover:bg-custom-darkorange"
                      type="submit"
                    >
                      Enviar
                    </Button>
                  </form>
                </Form>
              </div>
              <Dialog.Close asChild>
                <button
                  className="sm:block hidden absolute top-4 right-4 text-gray-800 hover:text-gray-600 focus:outline-none"
                  onClick={() => setIsModalOpen(false)}
                >
                  X
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Modal de Confirmação */}
      <Dialog.Root
        open={isConfirmationModalOpen}
        onOpenChange={setIsConfirmationModalOpen}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed inset-0 w-full h-full sm:w-auto sm:h-auto sm:max-w-md p-6 bg-white rounded-2xl sm:rounded-xl flex items-center justify-center sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 sm:top-1/2 sm:left-1/2 md:h-60 md:max-h-60">
            <div className="w-full">
              <Dialog.Title className="text-lg font-semibold">
                Recuperar Senha
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-700">
                Enviamos um link de recuperação para o seu e-mail cadastrado.
                Por favor verifique a caixa de entrada e a pasta de spam, se
                necessário.
              </Dialog.Description>
              <Link href="/email-reset-password" passHref>
                <Button
                  className="w-full bg-custom-orange text-white mt-4 border rounded-xl hover:bg-custom-darkorange"
                  type="button"
                  onClick={() => setIsConfirmationModalOpen(false)}
                >
                  Entendido
                </Button>
              </Link>

              <Dialog.Close asChild>
                <button
                  className="sm:block hidden absolute top-4 right-4 text-gray-800 hover:text-gray-600 focus:outline-none"
                  onClick={() => setIsModalOpen(false)}
                >
                  X
                </button>
              </Dialog.Close>
              <button
                className="block sm:hidden absolute top-4 left-4 text-gray-800 hover:text-gray-600 focus:outline-none"
                onClick={() => setIsModalOpen(false)}
              >
                &larr; Voltar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Page;
