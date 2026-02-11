import { Button, Input } from "@workspace/ui/components";

import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
} from "@workspace/ui/lib";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-card dark:text-primary font-semibold flex items-center justify-center py-10">
      <div className="w-full text-center md:text-start max-w-7xl px-4 md:px-6 flex flex-col md:flex-row md:justify-between ">
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Exclusive</h2>
          <p className="text-xs">Get 10% off your first order</p>
          <div className="w-full px-22 md:px-0 md:max-w-xs flex items-center gap-2">
            <Input
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Email"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Support</h2>
          <p className="text-xs">SN San Martin, Cordoba, Cordoba</p>
          <p className="text-xs">exclusive@gmail.com</p>
          <p className="text-xs">+54 0351 555555</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Networks</h2>
          <div className="w-full flex flex-wrap justify-center  md:justify-start pb-4 items-center gap-4">
            <a href="#" aria-label="Facebook" className="hover:text-amber-100">
              <BrandFacebook size={30} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-amber-100">
              <BrandInstagram size={30} />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-amber-100">
              <BrandTwitter size={30} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-amber-100">
              <BrandLinkedin size={30} />
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Quick Links</h2>
          <p className="text-xs">
            <Link href="#" className="hover:text-amber-100">
              Privacy Policy
            </Link>
          </p>
          <p className="text-xs">
            <Link href="#" className="hover:text-amber-100">
              Terms of Use
            </Link>
          </p>
          <p className="text-xs">
            <Link href="#" className="hover:text-amber-100">
              FAQ
            </Link>
          </p>
          <p className="text-xs">
            <Link href="#" className="hover:text-amber-100">
              Contact
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
