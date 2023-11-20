"use client";

import { Header } from "@components/Header";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Form/Inputs/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@services/queries/Session";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSessionStore } from "src/stores/session";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
  password: z
    .string({
      required_error: "Senha é obrigatório",
    })
    .min(6, {
      message: "Senha deve ter pelo menos 6 caracteres",
    }),
});

type SignInFormData = z.infer<typeof signInSchema>;

const LOGIN_DEFAULT_USER = {
  email: "admin@email.com",
  password: "123456",
};

export default function Login() {
  const signInUser = useSessionStore((state) => state.signIn);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: LOGIN_DEFAULT_USER.email,
      password: LOGIN_DEFAULT_USER.password,
    },
  });

  const signInMutation = useMutation({
    mutationFn: (payload: SignInFormData) => signIn(payload),
    onSuccess: (data) => {
      signInUser(data.user, data.access_token);
      router.push("/dashboard");
    },
    onError: (err) => {
      if (isAxiosError(err) && err.response?.status === 401) {
        toast.error("Email ou senha inválidos");
      } else {
        toast.error("Ocorreu um problema ao tentar realizar o login");
      }
    },
  });

  function handleSignIn(data: SignInFormData) {
    signInMutation.mutate(data);
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="card bg-neutral-focus shadow-md m-auto w-96 flex flex-col p-2 items-center">
        <div className="prose">
          <h2>LOGIN</h2>
        </div>

        <form onSubmit={handleSubmit(handleSignIn)} className="card-body w-full flex flex-col gap-4">
          <Input
            label="Email"
            {...register("email")}
            id="email"
            placeholder={LOGIN_DEFAULT_USER.email}
            errorMessage={errors.email?.message}
          />
          <Input
            label="Senha"
            {...register("password")}
            id="password"
            type="password"
            placeholder={LOGIN_DEFAULT_USER.password}
            errorMessage={errors.password?.message}
          />

          <Button bg="primary" type="submit" isLoading={signInMutation.isLoading}>
            Entrar
          </Button>
        </form>
        <span className={isSubmitted ? "opacity-100" : "opacity-0"}>
          CREDENCIAIS: <b>{LOGIN_DEFAULT_USER.email}</b> - <b>{LOGIN_DEFAULT_USER.password}</b>
        </span>
      </div>
    </div>
  );
}
