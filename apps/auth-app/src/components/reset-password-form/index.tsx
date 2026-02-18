import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Label,
  Separator,
} from "@workspace/ui/components";
import { useNavigate } from "react-router";
import useResetPassword from "../../utils/hooks/useResetPassword";
import ButtonUI from "../ui/button";

interface ResetPasswordFormProps {
  form: any;
}

const ResetPasswordForm = ({ form }: ResetPasswordFormProps) => {
  const navigate = useNavigate();
  const resetPassword = useResetPassword();

  const onSubmit = async (formData: any) => {
    try {
      await resetPassword.mutateAsync(formData, {
        onSuccess: (data) => {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log(form.watch());
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
          <ConfirmedEmail form={form} />
        </form>
      </CardContent>
    </Card>
  );
};

interface ConfirmedEmailProps {
  form: any;
}
const ConfirmedEmail = ({ form }: ConfirmedEmailProps) => {
  const passwordState = form.getFieldState("confirmPassword", form.formState);
  const disabled = !!passwordState.error;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonUI
          type="button"
          disabled={disabled}
          className="disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm Email
        </ButtonUI>
      </DialogTrigger>
      <DialogContent className="py-4 bg-card dark:bg-card">
        <DialogHeader>
          <DialogTitle>Confirm Email</DialogTitle>
          <DialogDescription>
            Please confirm Email for Reset Password
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <ButtonUI type="submit" form="resetPassword">
            Confirm Email
          </ButtonUI>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordForm;
