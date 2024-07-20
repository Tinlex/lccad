import { z } from "zod"
import { checkDobValidity } from "../utils/dateHelpers"

export const registerSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().optional(),
    dateOfBirth: z.string().refine((dob) => checkDobValidity(dob, 21), {
      message: "You must be at least 21 years old"
    }),
    pcn: z.string().min(1, { message: "PCN is required" }),
    phoneNumber: z.string().min(1, { message: "Phone number is required" }),
    address: z.string().min(1, { message: "Address is required" })
  })
  .refine(
    (data) =>
      data.confirmPassword === undefined ||
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"]
    }
  )
