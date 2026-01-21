import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ResetPasswordForm from "../../components/reset-password-form";
import ValidateTokenForm from "../../components/validate-token-form";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "../../utils/schemas/register.schema";

type Props = {};

const ResetPasswordPage = (props: Props) => {
  const [step, setStep] = useState(1);

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      token: "",
      password: "",
      confirmPassword: "",
    },
  });
  console.log(form.watch());
  switch (step) {
    case 1:
      return <ValidateTokenForm form={form} setStep={setStep} />;
    case 2:
      return <ResetPasswordForm form={form} />;
  }
};

export default ResetPasswordPage;
