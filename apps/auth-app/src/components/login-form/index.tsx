import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Label,
  Separator,
} from "@workspace/ui/components";
import { BrandFacebook, BrandGoogle } from "@workspace/ui/lib/index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useLogin from "../../utils/hooks/useLogin";
import { loginSchema, LoginSchema } from "../../utils/schemas/form.schema";
import ButtonUI from "../ui/button";

const LoginForm = () => {
  const navigate = useNavigate();
  const login = useLogin();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const result = await login.mutateAsync(
        data /* {
        onSuccess: (data) => {
          window.location.href = "/";
        },
      } */,
      );
      window.location.href = import.meta.env.VITE_NEXT_PUBLIC_APP_URL;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="py-6 text-gray-800 dark:text-muted-foreground">
      <CardHeader>
        <Label className="text-lg">Login</Label>
        <Label className="text-xs font-normal">
          Please enter your email and password to access your account
        </Label>
      </CardHeader>
      <CardContent>
        <form
          id="login"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Field className="">
            <FieldLabel>Email</FieldLabel>
            <Input
              id="email"
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
              placeholder="Enter email"
            />
            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.email?.message}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              id="password"
              aria-invalid={!!form.formState.errors.password}
              {...form.register("password")}
              placeholder="Enter password"
            />
            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.password?.message}
            </FieldError>
          </Field>

          <Link className=" text-xs font-medium" to="/recovery-password">
            Forgot Password ?
          </Link>
          <Separator />
          <ButtonUI type="submit">Login</ButtonUI>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Separator />
        <div className="flex justify-center space-x-4">
          <ButtonUI className="w-auto">
            <BrandGoogle /> Google
          </ButtonUI>
          <ButtonUI className="w-auto">
            <BrandFacebook /> FaceBook
          </ButtonUI>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
