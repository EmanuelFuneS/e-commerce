/* import ChangePasswordForm from "../../components/change-password-form"; */
import ValidateTokenForm from "../../components/validate-token-form";
import Layout from "../layout";
const ChangePasswordPage = () => {
  //handle token logic
  return (
    <Layout>
      <ValidateTokenForm />
      {/* <ChangePasswordForm /> */}
    </Layout>
  );
};

export default ChangePasswordPage;
