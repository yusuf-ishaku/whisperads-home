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
import { toast } from "sonner";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  data: {
    id: string;
    email: string;
    role: string;
    [key: string]: any;
  };
  exp: number;
  iat: number;
}

function LoginContent() {
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
      searchParams.get("role") ||
      sessionStorage.getItem("tempRole") || 
      localStorage.getItem("role");

    if (roleParam) {
      setRole(roleParam);
      sessionStorage.removeItem("tempRole");
      toast.info(`Logging in as ${roleParam}`);
    } else {
      // 🚨 If no role at all, force them to choose one
      toast.error("Please select a role first");
      router.replace("/choose-role");
    }
  }, [searchParams, router]);

  useEffect(() => {
  console.log("accessToken:", localStorage.getItem("accessToken"));
  console.log("user:", localStorage.getItem("user"));
  console.log("user type:", typeof localStorage.getItem("user"));
}, []);

  async function onSubmit(data: SignUpValues) {
    setIsLoading(true);
    try {
      if (!role) {
        throw new Error("Role is missing");
      }

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

        if (loginResponse.status === 401) {
          if (errorData.message?.toLowerCase().includes("password")) {
            throw new Error("Incorrect password. Please try again.");
          } else if (errorData.message?.toLowerCase().includes("email")) {
            throw new Error(
              "Email not found. Please check your email or register."
            );
          } else {
            throw new Error("Invalid credentials. Please try again.");
          }
        } else if (loginResponse.status === 404) {
          throw new Error(
            "User not found. Please check your email or register."
          );
        } else if (loginResponse.status === 400) {
          throw new Error(
            errorData.message || "Invalid request. Please check your input."
          );
        } else if (loginResponse.status >= 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(
            errorData.message || "Login failed. Please try again."
          );
        }
      }

      const result = await loginResponse.json();
      console.log("Login API Response:", result);

      const accessToken = result.accessToken || result.token;
if (!accessToken) {
  throw new Error("Authentication token missing in response");
}

      if (!result.user?.role) {
        throw new Error("Role information missing in response");
      }
      const decoded = jwtDecode<TokenPayload>(result.accessToken);
      console.log("Decoded token:", decoded);

      const normalizedRole = result.user.role.toLowerCase();
      if (!["agent", "advertiser"].includes(normalizedRole)) {
        throw new Error("Invalid role received");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", result.refreshToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      setRole(normalizedRole);
    

      toast.success(`Welcome back, ${result.user.name || result.user.email}!`);
      console.log("Saved token:", localStorage.getItem("accessToken"));

      const profileCheck = await fetch("/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${result.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const profileData = await profileCheck.json();
      console.log("Profile check result:", profileData);

      if (result.user.profileComplete) {
        router.push(`/dashboard/${result.user.role.toLowerCase()}`);
      } else {
        router.push(`/dashboard/${result.user.role.toLowerCase()}/create-profile`);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";

      toast.error(errorMessage);
      form.setError("root", {
        message: error instanceof Error ? error.message : "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (form.formState.errors.root) {
      toast.error(form.formState.errors.root.message);
    }
  }, [form.formState.errors]);

  return (
    <main className="text-5xl text-black font-bold h-screen">
      {showSuccessModal && (
        <LoginSuccessModal
          role={role || ""}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      <header className="bg-primary p-4 flex items-center ">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-white text-lg font-bold">Back</h1>
      </header>
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
                <Link
                  className="text-primary px-1"
                  href={`/create-account?role=${role?.toLowerCase()}`}
                  onClick={() => toast.info("Redirecting to registration")}
                >
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
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
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
                              onChange={(e) => {
                                field.onChange(e.target.checked);
                                toast.info(
                                  e.target.checked
                                    ? "Remembering login"
                                    : "Not remembering login"
                                );
                              }}
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

                  <Link href="/forgot-password">
                    <p
                      className="text-xs text-[#009444] font-normal cursor-pointer"
                      onClick={() =>
                        toast.info("Redirecting to password reset")
                      }
                    >
                      Forgot Password
                    </p>
                  </Link>
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

                <GoogleSignInButton
                  role={role}
                  isLoading={isLoading}
                  onSuccess={(data) => {
                    const normalizedRole = data.user.role.toLowerCase();

                  localStorage.setItem("accessToken", data.accessToken || data.token);
                    localStorage.setItem("refreshToken", data.refreshToken);
                    localStorage.setItem("role", normalizedRole);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    setRole(normalizedRole);

                    if (data.user.profileComplete) {
                      router.push(`/dashboard/${normalizedRole}`);
                    } else {
                      router.push(
                        `/dashboard/${normalizedRole}/create-profile`
                      );
                    }
                  }}
                  onError={(error) => {
                    console.error("Google sign-in error:", error);
                    toast.error("Google sign-in failed: " + error.message);
                  }}
                />
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
