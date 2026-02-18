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
import { useNavigate } from "react-router";
import useRegister from "../../utils/hooks/useRegister";
import {
  RegisterSchema,
  registerSchema,
} from "../../utils/schemas/form.schema";
import ButtonUI from "../ui/button";

const RegisterForm = () => {
  const navigate = useNavigate();
  const register = useRegister();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);

      const result = await register.mutateAsync(data);
      console.log(result);
      //redirect to home
      window.location.href = import.meta.env.VITE_NEXT_PUBLIC_APP_URL;
    } catch (error) {
      console.error(error);
    }
  };

  console.log(form.formState.errors);

  return (
    <Card className="w-75 py-6 text-gray-800 dark:text-muted-foreground">
      <CardHeader>
        <Label className="text-lg">Register</Label>
        <Label className="text-xs font-normal">
          Please enter your email address and a secure password to register for
          an account.
        </Label>
      </CardHeader>
      <CardContent>
        <form
          id="register"
          className="space-y-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              id="email"
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
              placeholder="Enter Email"
            />
            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.email?.message}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              id="name"
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
              placeholder="EnterName"
            />

            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.name?.message}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              id=""
              aria-invalid={!!form.formState.errors.password}
              {...form.register("password")}
              placeholder="Enter password"
            />
            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.password?.message}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <Input
              id=""
              aria-invalid={!!form.formState.errors.password}
              {...form.register("confirmPassword")}
              placeholder="Confirm password"
            />
            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.confirmPassword?.message}
            </FieldError>
          </Field>

          <Separator />
          <ButtonUI type="submit">Register</ButtonUI>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Separator />
        <div className="flex justify-center space-x-4">
          <ButtonUI>
            <BrandGoogle /> Google
          </ButtonUI>
          <ButtonUI>
            <BrandFacebook /> FaceBook
          </ButtonUI>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
