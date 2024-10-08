import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address!" }),

  password: z.string().min(6),

  fullName: z.string().min(3),

  sex: z.string(),
});
