"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema, type SignUpValues } from "@/lib/validations/auth";
import Google from "@/components/icons/Google";

function Login({ params }: { params: { role: string } }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      whatsappNumber: "",
      accountNumber: "",
      bank: "",
    },
  });
  async function onSubmit(data: SignUpValues) {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to register the user
      console.log(data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="text-5xl text-black font-bold h-screen">
      <div className="w-full h-[55px] text-white text-center p-2 bg-primary"></div>
      <div className="flex flex-col mt-10">
        <div className="flex justify-center p-4">
          <Image src="/logo.png" width={34} height={34} alt="logo" />
        </div>

        <div className="mx-auto">
          <div className="bg-white rounded-xl p-2  w-[325px] h-[513px] ">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-medium">Login</h2>
              <p className="text-sm font-normal">
                Don&apos;t have an account?
                <Link className="text-primary px-1" href="/create-account">
                  Register
                </Link>
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="px-2 mt-5 "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Adaku@gmail.com"
                          {...field}
                          className="placeholder:text-sm placeholder-gray-400 placeholder:font-light"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-sm">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="*******"
                            {...field}
                            className="placeholder:text-sm placeholder-gray-400 placeholder:font-light pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center">
                  <div className="flex items-center py-3">
                    <input type="checkbox" name="remember me" id="rememberMe" />
                    <label
                      htmlFor="remember"
                      className="ml-1 text-xs text-gray-500 font-normal"
                    >
                      Remember me
                    </label>
                  </div>

                  <div>
                    <p className="text-xs text-[#009444] font-normal">
                      Forgot Password
                    </p>
                  </div>
                </div>

                <div className="py-3">
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>

                <div className="flex items-center my-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="px-2 text-gray-500 text-sm font-normal">
                    Or login with
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <button
                  type="submit"
                  className="w-full text-black flex items-center justify-center text-center space-x-3 h-11 rounded-xl px-8 bg-white border border-gray-300"
                >
                  <Google />
                  <p className="text-sm font-medium">Continue with Google</p>
                </button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
