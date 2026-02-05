import { Controller } from "react-hook-form";
import {
  Card,
  CardContent,
  CardHeader,
  Field,
  FieldError,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Label,
  Separator,
} from "../../../../../packages/ui/src/components";
import ButtonUI from "../ui/button";

interface TokenResetFormProps {
  form: any;
  setStep: (step: number) => void;
}

const ValidateTokenForm = ({ form, setStep }: TokenResetFormProps) => {
  const nextStep = () => {
    setStep(2);
  };
  return (
    <Card className=" w-75 py-6 text-gray-800 dark:text-muted-foreground">
      <CardHeader>
        <Label className="text-lg">Validate Token</Label>
        <Label className="text-xs font-normal">
          Check email for verification code and enter it below
        </Label>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Field>
            <Controller
              name="token"
              control={form.control}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            <FieldError className="text-xs h-1">
              {" "}
              {form.formState.errors.token?.message}
            </FieldError>
          </Field>

          <Separator />
          <ButtonUI onClick={nextStep}>Reset Password</ButtonUI>
        </form>
      </CardContent>
    </Card>
  );
};

export default ValidateTokenForm;
