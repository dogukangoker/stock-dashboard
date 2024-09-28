import { z } from "zod";

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long."),
    password: z.string().min(3, "Password must be at least 3 characters long."),
    rePassword: z
      .string()
      .min(3, "Re-Password must be at least 3 characters long."),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

type RegisterFormSchema = z.infer<typeof registerSchema>;

const registerDefaultValues: RegisterFormSchema = {
  username: "",
  password: "",
  rePassword: "",
};

export { registerDefaultValues, registerSchema, type RegisterFormSchema };
