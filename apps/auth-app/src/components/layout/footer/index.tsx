import { Label } from "../../../../../../packages/ui/src/components";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full text-gray-800 dark:text-muted-foreground h-[50px] flex justify-center items-center bg-card">
      <Label className="text-xs">
        @2025 AuthService Inc. All rights reserved
      </Label>
    </footer>
  );
};

export default Footer;
