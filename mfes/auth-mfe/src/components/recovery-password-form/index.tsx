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
import { useNavigate } from "react-router";
import useRecoveryPassword from "../../utils/hooks/useRecoveryPassword";
import {
  recoveryPasswordSchema,
  RecoveryPasswordSchema,
} from "../../utils/schemas/register.schema";
import ButtonUI from "../ui/button";

const RecoveryPasswordForm = () => {
  const navigate = useNavigate();
  const recoveryPassword = useRecoveryPassword();
  const form = useForm<RecoveryPasswordSchema>({
    resolver: zodResolver(recoveryPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (formData: any) => {
    try {
      await recoveryPassword.mutateAsync(formData, {
        onSuccess: (data) => {
          setTimeout(() => {
            navigate("/reset-password");
          }, 2000);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-75 py-6 text-gray-800 dark:text-muted-foreground">
      <CardHeader className="text-center">
        <Label className="text-lg w-full">Recovery Password</Label>
        <Label className="text-xs font-normal">
          Enter the email address associated with your account and we'll send
          you a link to reset your password
        </Label>
      </CardHeader>
      <CardContent>
        <form
          id="Recovery-password"
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

export default RecoveryPasswordForm;
