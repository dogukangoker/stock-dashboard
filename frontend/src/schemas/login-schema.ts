import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  password: z.string().min(3, "Password must be at least 3 characters long."),
});

type LoginFormSchema = z.infer<typeof loginSchema>;

const loginDefaultValues: LoginFormSchema = {
  username: "",
  password: "",
};

export { loginDefaultValues, loginSchema, type LoginFormSchema };
