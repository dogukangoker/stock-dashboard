import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  registerDefaultValues,
  RegisterFormSchema,
  registerSchema,
} from "../../schemas/register-schema";
import { useRegisterMutation } from "../../services/auth";
import "./register.scss";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const [registerUser, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();

  const onSubmit = async (data: RegisterFormSchema) => {
    try {
      const { username, password } = data;
      const response = await registerUser({ username, password }).unwrap();

      if (response.success && isSuccess) {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="register-page">
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
          Please sign up to continue
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
          className="register-form"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register("username")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            id="rePassword"
            autoComplete="new-password"
            error={!!errors.rePassword}
            helperText={errors.rePassword?.message}
            {...register("rePassword")}
          />
          {isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {(error as any)?.data?.message || "Registration failed"}
            </Alert>
          )}
          {isSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Registration successful. You can now log in.
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "REGISTER"}
          </Button>
          <Typography className="register-page__register-link">
            Already have an account? <Link href="/">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
