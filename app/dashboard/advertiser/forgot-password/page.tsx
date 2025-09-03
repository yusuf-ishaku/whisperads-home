"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

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


function ForgotPassword({ params }: { params: { role: string } }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      // whatsappNumber: "",
      // accountNumber: "",
      // bank: "",
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
      <header className="bg-primary p-3 flex items-center h-[116px]">
        <Button
          variant="ghost"
          size="icon"
          className="text-white"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-white text-lg font-medium">Forgot Password</h1>
      </header>
      
      <div className="flex flex-col mt-5">
        <div className="mx-auto">
          <div className="bg-white w-[325px] h-[250px] ">
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
                      <p className="text-sm font-medium text-gray-500">
                        Please enter your email to reset password
                      </p>
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

                <div className="py-3">
                  <Button
                    type="submit"
                    className="w-full disabled:bg-[#009444]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </Button>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm font-normal">
                    Haven't gotten an email yet?
                    <Link className="text-primary px-1" href="/resend">
                      Resend
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div>
        <Image src="/ellipse.png" alt="ellipse" width={230} height={230} />
      </div>
    </main>
  );
}

export default ForgotPassword;
