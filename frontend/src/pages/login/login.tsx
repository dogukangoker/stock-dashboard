import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  loginDefaultValues,
  LoginFormSchema,
  loginSchema,
} from "../../schemas/login-schema";
import { useLoginMutation } from "../../services/auth";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const onSubmit = async (data: LoginFormSchema) => {
    try {
      const { username, password } = data;
      const response = await login({
        username,
        password,
      }).unwrap();

      localStorage.setItem("accessToken", response.accessToken);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-page">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Welcome
        </Typography>
        <Typography component="h2" variant="body1" sx={{ mb: 3 }}>
          Please sign in to continue
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="login-page__form"
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            required
            autoFocus
            id="username"
            label="Username"
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username")}
          />
          <TextField
            fullWidth
            margin="normal"
            required
            id="password"
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          {isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {(error as any)?.data?.message || "Login failed"}
            </Alert>
          )}
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 2 }}
            fullWidth
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <Typography className="login-page__register-link">
            Don't have an account? <Link href="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
