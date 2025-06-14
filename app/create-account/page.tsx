"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useSearchParams } from "next/navigation";
import AccountSuccessModal from "@/components/AccountSuccessModal";


function CreateAccountContent({ params }: { params: { role: string } }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const [role, setRole] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (!roleParam) {
      router.push("/choose-role");
    } else {
      console.log("params:", roleParam);
      setRole(roleParam);
    }
  }, [searchParams]);

  async function onSubmit(data: SignUpValues) {
    setIsLoading(true);
    try {
      if (!role) {
        throw new Error("Role is missing");
      }

      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Create Account failed");
      }

      const result = await response.json();

      sessionStorage.setItem("user", JSON.stringify(result.user));
      sessionStorage.setItem("token", result.token);

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
      // Handle error display to user
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("Form Errors:", form.formState.errors);
  }, [form.formState.errors]);

  return (
    <>
      {showSuccessModal && <AccountSuccessModal role={role || ""} />}

      <main className="text-5xl text-black font-bold h-screen">
        <div className="w-full h-[55px] text-white text-center p-2 bg-primary"></div>
        <div className="flex flex-col mt-10">
          <div className="flex justify-center p-4">
            <Image src="/logo.png" width={34} height={34} alt="logo" />
          </div>

          <div className="mx-auto">
            <div className="bg-white rounded-xl p-1  w-[325px] h-[513px] ">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-medium">Create Account</h2>
                <p className="text-sm font-normal">Selected Role: {role}</p>
                <p className="text-sm font-normal">
                  Already have an account?
                  <Link className="text-primary px-1" href={`/login?role=${role?.toLowerCase()}`}>
                    Login
                  </Link>
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" mt-5 ">
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
                            className="font-medium text-sm placeholder:text-sm placeholder-gray-400 placeholder:font-light"
                          />
                        </FormControl>
                        <p className="text-xs font-light text-gray-500">
                          We'll send important notifications to this email
                        </p>
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
                              className="font-medium text-sm placeholder:text-sm placeholder-gray-400 placeholder:font-light pr-10"
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
                        <p className="text-xs font-light text-gray-500">
                          Choose a strong password
                        </p>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="py-3">
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-transform duration-150"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Registering..." : "Register"}
                    </Button>
                  </div>

                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-2 text-gray-500 text-sm font-normal">
                      Or
                    </span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  <button
                    type="button"
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
    </>
  );
}

export default function CreateAccount({ params }: { params: { role: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateAccountContent params={params} />
    </Suspense>
  );
}

