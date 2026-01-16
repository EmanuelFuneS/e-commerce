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
import { useForm } from "react-hook-form";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "../../utils/schemas/register.schema";
import ButtonUI from "../ui/button";

const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card className="w-75 py-6 text-gray-800 dark:text-muted-foreground">
      <CardHeader className="text-center">
        <Label className="text-lg w-full">Forgot Password</Label>
        <Label className="text-xs font-normal">
          Enter the email address associated with your account and we'll send
          you a link to reset your password
        </Label>
      </CardHeader>
      <CardContent>
        <form
          id="forgot-password"
          className="space-y-4"
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
          <Separator />
          <ButtonUI type="submit">Send Recovery Link</ButtonUI>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4"></CardFooter>
    </Card>
  );
};

export default ForgotPasswordForm;
