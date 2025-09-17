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
import { toast } from "sonner";
import GoogleSignInButton from "@/components/GoogleSignInButton";

function CreateAccountContent() {
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
    const roleParam =
      searchParams.get("role") ||
      sessionStorage.getItem("tempRole") ||
      localStorage.getItem("role");

    if (!roleParam) {
      toast.error("Please select a role first");
      router.push("/choose-role");
    } else {
      setRole(roleParam);
      sessionStorage.removeItem("tempRole");
      toast.info(`Logging in as ${roleParam}`);
    }
  }, [searchParams, router]);

  async function onSubmit(data: SignUpValues) {
    setIsLoading(true);
    try {
      if (!role) {
        throw new Error("Role is missing");
      }

      const response = await fetch(
        "https://whisperads-api-production.up.railway.app/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            role,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Create Account failed");
      }

      const result = await response.json();
      console.log("Create Account Response:", result);

      const accessToken = result.accessToken || result.token;
      if (!accessToken) {
        throw new Error("Authentication token missing in response");
      }

const user = {
  id: result.id,
  email: result.email,
  name: result.name || "",
  role: result.role?.toLowerCase(),
  advertiserId: result.advertiserId || result.id, 
  profileComplete: result.profileComplete || false,
};

    localStorage.setItem("user", JSON.stringify(user));
localStorage.setItem("accessToken", accessToken);
if (result.refreshToken) {
  localStorage.setItem("refreshToken", result.refreshToken);
}
localStorage.setItem("role", user.role);

toast.success("Account created successfully!");
router.push(`/dashboard/${user.role}/create-profile`);



      // setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
      const errorMessage =
        error instanceof Error ? error.message : "Create Account failed";
      toast.error(errorMessage);
      form.setError("root", { message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
      {showSuccessModal && <AccountSuccessModal role={role || ""} />}

      <main className="text-5xl text-black font-bold h-screen">
        <header className="bg-primary p-4 flex items-center ">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-white text-lg font-bold cursor-pointer">Back</h1>
        </header>
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
                  <Link
                    className="text-primary px-1"
                    href={`/login?role=${role?.toLowerCase()}`}
                  >
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

                  <GoogleSignInButton
                    role={role}
                    isLoading={isLoading}
                    buttonText="Sign up with Google"
                    onSuccess={(data) => {
                      // For new accounts, redirect to profile creation
                      const normalizedRole = data.user.role.toLowerCase();

                      // 🔥 FIX: Store the tokens properly
                      localStorage.setItem("accessToken", data.accessToken);
                      localStorage.setItem("refreshToken", data.refreshToken);
                      localStorage.setItem("role", normalizedRole);
                      localStorage.setItem("user", JSON.stringify(data.user));

                      router.push(
                        `/dashboard/${normalizedRole}/create-profile`
                      );
                    }}
                    onError={(error) => {
                      console.error("Google sign-up error:", error);
                      toast.error("Google sign-up failed: " + error.message);
                    }}
                  />

                  {/* <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 h-11 rounded-xl px-8 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                  
                      
                       
                        <span className="text-sm font-medium">Continue with Google</span>
                      
                  
                  </button> */}
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function CreateAccount({
  params,
}: {
  params: { role: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateAccountContent />
    </Suspense>
  );
}
