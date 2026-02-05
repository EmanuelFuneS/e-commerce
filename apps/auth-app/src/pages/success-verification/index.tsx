import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Label,
  Separator,
} from "../../../../../packages/ui/src/components";

const SuccessVerification = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  return (
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
  );
};

export default SuccessVerification;
