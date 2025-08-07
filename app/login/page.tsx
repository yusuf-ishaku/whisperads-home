"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import LoginSuccessModal from "@/components/LoginSuccessModal";
import { useAuthCheck } from "@/hooks/useAuth";

function LoginContent() {
  useAuthCheck();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    const roleParam =
      searchParams.get("role") || sessionStorage.getItem("tempRole");

    if (!roleParam) {
      router.push("/choose-role");
    } else {
      setRole(roleParam);
      sessionStorage.removeItem("tempRole");
    }
  }, [searchParams, router]);

  // async function onSubmit(data: SignUpValues) {
  //   setIsLoading(true);
  //   try {
  //     if (!role) {
  //       throw new Error("Role is missing");
  //     }

  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         ...data,
  //         role,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Login failed");
  //     }

  //     const result = await response.json();
  //     console.log("Login API Response:", result);

  //   // Validate the response data
  //   if (!result.user?.role) {
  //     throw new Error("Role information missing in response");
  //   }

  //   // Normalize role with fallback
  //   const normalizedRole = (result.user.role || role || '').toString().toLowerCase();
  //   if (!['agent', 'advertiser'].includes(normalizedRole)) {
  //     throw new Error("Invalid role received");
  //   }

  //   // Store auth data
  //   sessionStorage.setItem("token", result.token);
  //   sessionStorage.setItem("user", JSON.stringify({
  //     ...result.user,
  //     role: normalizedRole // Store normalized role
  //   }));

  //    // Check if profile is complete
  //   const profileComplete = Boolean(result.user.profileComplete);

  //   if (profileComplete) {
  //     router.push(`/dashboard/${normalizedRole}`);
  //   } else {
  //     router.push(`/dashboard/${normalizedRole}/create-profile`);
  //   }
  //   } catch (error) {
  //     console.error(error);
  //     form.setError("root", { message: (error as Error).message });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }


  async function onSubmit(data: SignUpValues) {
  setIsLoading(true);
  try {
    if (!role) {
      throw new Error("Role is missing");
    }

    // 1. Perform login
    const loginResponse = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        role,
      }),
    });

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json();
      throw new Error(errorData.message || "Login failed");
    }

    const result = await loginResponse.json();
    console.log("Login API Response:", result);

    // Validate the response data
    if (!result.user?.role) {
      throw new Error("Role information missing in response");
    }

    // Normalize role
    const normalizedRole = result.user.role.toLowerCase();
    if (!['agent', 'advertiser'].includes(normalizedRole)) {
      throw new Error("Invalid role received");
    }

    // Store auth data
    const storage = data.rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", result.token);
    storage.setItem("user", JSON.stringify(result.user));

    // 2. Check profile status
    const profileCheck = await fetch("/api/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${result.token}`
      }
    });

    const profileData = await profileCheck.json();
    console.log("Profile check result:", profileData);

    // 3. Redirect based on profile status
    if (profileData.hasProfile || result.user.profileComplete) {
      router.push(`/dashboard/${normalizedRole}`);
    } else {
      router.push(`/dashboard/${normalizedRole}/create-profile`);
    }

  } catch (error) {
    console.error(error);
    form.setError("root", { 
      message: error instanceof Error ? error.message : "Login failed" 
    });
  } finally {
    setIsLoading(false);
  }
}



  useEffect(() => {
    console.log("Form Errors:", form.formState.errors);
  }, [form.formState.errors]);

  return (
    <main className="text-5xl text-black font-bold h-screen">
      {showSuccessModal && (
        <LoginSuccessModal
          role={role || ""}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      <div className="w-full h-[55px] text-white text-center p-1 bg-primary"></div>
      <div className="flex flex-col mt-10">
        <div className="flex justify-center p-4">
          <Image src="/logo.png" width={34} height={34} alt="logo" />
        </div>

        <div className="mx-auto p-2">
          <div className="bg-white rounded-xl w-[325px] h-[513px] ">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-medium">Login</h2>
              <p className="text-sm font-normal">Selected Role: {role}</p>

              <p className="text-sm font-normal">
                Don&apos;t have an account?
                <Link className="text-primary px-1" href={`/create-account?role=${role?.toLowerCase()}`}>
                  Register
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
                            className="font-medium text-sm placeholder:text-sm placeholder-gray-400 placeholder:font-light"
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
                  {/* <div className="flex items-center py-3">
                    <input type="checkbox" name="remember me" id="rememberMe" />
                    <label
                      htmlFor="remember"
                      className="ml-1 text-xs text-gray-500 font-normal"
                    >
                      Remember me
                    </label>
                  </div> */}

                  <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center py-3">
                            <input
                              type="checkbox"
                              id="rememberMe"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label
                              htmlFor="rememberMe"
                              className="ml-1 text-xs text-gray-500 font-normal"
                            >
                              Remember me
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

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
  );
}

export default function Login({ params }: { params: { role: string } }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading login page...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
