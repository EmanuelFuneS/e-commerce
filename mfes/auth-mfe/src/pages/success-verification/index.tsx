import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Label,
  Separator,
} from "../../../../../packages/ui/src/components";
import Layout from "../layout";

type Props = {};

const SuccessVerification = (props: Props) => {
  return (
    <Layout>
      <Card className="w-75">
        <CardHeader>
          <Label>Verification Email Success </Label>
        </CardHeader>
        <CardContent>
          <Label className="text-xs font-normal text-center">
            Your email has been successfully verified. You can now access your
            account and enjoy all the features of our platform.
          </Label>
          <Separator className="my-5" />
          <Button className="w-full">Got to Home</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SuccessVerification;
