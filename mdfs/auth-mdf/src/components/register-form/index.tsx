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

const RegisterForm = () => {
  return (
    <Card className="h-120 w-75 py-8">
      <CardHeader>
        <Label className="text-xl">Secure Access</Label>
        <Label className="text-lg">Resgister</Label>
      </CardHeader>
      <CardContent className="h-[70%] ">
        <form className="space-y-4">
          <Input placeholder="Email" />
          <Input placeholder="Name" />
          <Input placeholder="Password" />
          <Input placeholder="Confirm Password" />
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

export default RegisterForm;
