// lib/validationSchemas.ts
import { z } from 'zod';

const firstnameSchema = z.string()
  .min(1, { message: "Username is required" })
  .max(20, { message: "Username must be at most 20 characters long"})
  .regex(/^[a-zA-Z0-9_]+$/, { message: "Firstname can only contain letters, numbers, and underscores" });

const lastnameSchema = z.string()
  .min(1, { message: "Username is required" })
  .max(20, { message: "Username must be at most 20 characters long"})
  .regex(/^[a-zA-Z0-9_]+$/, { message: "Firstname can only contain letters, numbers, and underscores" });

const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .max(254, { message: "Email must be at most 254 characters long" })
  .email({ message: "Invalid email address" });

const passwordSchema = z
  .string()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .max(64, { message: "Password must be at most 64 characters long" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[\W_]/, { message: "Password must contain at least one special character" });

const confirmPasswordSchema = z
  .string()
  .min(1, { message: "Confirm password is required" })
  .min(8, { message: "Confirm password must be at least 8 characters" })
  .max(64, { message: "Confirm password must be at most 64 characters long" });

const topUpAmountSchema = z
    .string() // Start with string validation
    .transform((value) => {
        // Attempt to convert the string to a number
        const num = Number(value);
        if (isNaN(num)) {
            throw new Error("Invalid number"); // Throw an error if the conversion fails
        }
        return num; // Return the converted number
    })
    .refine((value) => value >= 10000, { message: "Number must be at least 10,000" }) // Min validation
    .refine((value) => value <= 1000000, { message: "Number must not exceed 1,000,000" }) // Max validation

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  first_name: firstnameSchema,
  email: emailSchema,
  last_name: lastnameSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const topUpSchema = z.object({
    top_up_amount: topUpAmountSchema
})