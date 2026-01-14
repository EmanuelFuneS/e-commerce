import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Input,
  Label,
  Separator,
} from "@workspace/ui/components";
import { BrandFacebook, BrandGoogle } from "@workspace/ui/lib/index";

const LoginForm = () => {
  return (
    <Card className="h-120 w-75 py-8">
      <CardHeader>
        <Label className="text-xl">Secure Access</Label>
        <Label className="text-lg">Login</Label>
      </CardHeader>
      <CardContent className="h-[60%] ">
        <form className="space-y-8 mt-8">
          <Input placeholder="Email" />
          <Input placeholder="Password" />
          <Separator />
          <Button className="w-full" type="submit">
            Register
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Separator />
        <div className="flex justify-center space-x-4">
          <Button className="w-full">
            <BrandGoogle />
          </Button>
          <Button className="w-full">
            <BrandFacebook />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
