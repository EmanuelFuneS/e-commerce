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
  resetPasswordSchema,
  ResetPasswordSchema,
} from "../../utils/schemas/register.schema";
import ButtonUI from "../ui/button";

const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card className="w-75 py-6 text-gray-800 dark:text-muted-foreground">
      <CardHeader className="text-center">
        <Label className="text-lg">Reset Password</Label>
        <Label className="text-xs font-normal">
          Ensure your account is using a long, random password to stay secure
        </Label>
      </CardHeader>
      <CardContent>
        <form
          id="resetPassword"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Field>
            <FieldLabel>New Password</FieldLabel>
            <Input
              id="new-password"
              aria-invalid={!!form.formState.errors.password}
              {...form.register("password")}
              placeholder="Enter new password"
            />
            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.password?.message}
            </FieldError>
          </Field>

          <Field>
            <FieldLabel>Confirm Password</FieldLabel>
            <Input
              id="confirm-password"
              placeholder="Confirm Password"
              aria-invalid={!!form.formState.errors.confirmPassword}
              {...form.register("confirmPassword")}
            />
            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.confirmPassword?.message}
            </FieldError>
          </Field>

          <Separator />
          <ButtonUI type="submit">Reset Password</ButtonUI>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Separator />
        <p>password requirements</p>
      </CardFooter>
    </Card>
  );
};

export default ResetPasswordForm;
