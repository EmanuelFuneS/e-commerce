import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
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
import useChangePassword from "../../utils/hooks/useChangePassword";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "../../utils/schemas/register.schema";
import ButtonUI from "../ui/button";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const changePassword = useChangePassword();
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const result = await changePassword.mutateAsync(data, {
        onSuccess: (data) => {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
      });
      // redirect to user settings
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="w-76 py-6 text-gray-800 dark:text-muted-foreground">
      <CardHeader>
        <Label className="text-lg">Change Password</Label>
        <Label className="text-xs font-normal">
          Ensure your account is using a long, random password to stay secure
        </Label>
      </CardHeader>
      <CardContent className="">
        <form
          id="changePassword"
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Field>
            <FieldLabel>Old Password</FieldLabel>
            <Input
              id="oldPassword"
              aria-invalid={!!form.formState.errors.oldPassword}
              {...form.register("oldPassword")}
              placeholder="Enter Old Password"
            />
            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.oldPassword?.message}
            </FieldError>
          </Field>
          <Separator />
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input
              id="password"
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
              id="confirmPassword"
              aria-invalid={!!form.formState.errors.confirmPassword}
              {...form.register("confirmPassword")}
              placeholder="Confirm Password"
            />
            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.confirmPassword?.message}
            </FieldError>
          </Field>
          <Separator />
          <ButtonUI type="submit">Update Password</ButtonUI>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm;
