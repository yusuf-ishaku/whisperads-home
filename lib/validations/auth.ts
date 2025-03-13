import * as z from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  whatsappNumber: z
    .string()
    .min(10, "Please enter a valid WhatsApp number")
    .max(15, "Please enter a valid WhatsApp number"),
  accountNumber: z
    .string()
    .length(10, "Account number must be exactly 10 digits")
    .regex(/^\d+$/, "Account number must contain only numbers"),
  bank: z.string({
    required_error: "Please select a bank",
  }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
