import Image from "next/image";
import logo from "../public/assets/logo.svg";
import styles from "./page.module.css";
import Link from "next/link";
import ProductDropdown from "./utilizes/productDropdown";

export default function Home() {
  return (
    <nav className="grid grid-cols-3 gap-1">
      <div className=" navItems ml-auto mr-3.5">
        <Link href="/" className="flex items-center gap-1 w-51">
          <Image
            src={logo}
            alt="Company Logo"
            priority
            className="h-6 w-auto"
          />
          <div className="h-8 w-px bg-gray-300" />
          <span className="font-medium text-sm leading-none">
            The everything app, for work.
          </span>
        </Link>
      </div>
      <div className="navItems justify-around">
        <ProductDropdown />
        <h1>Shaban</h1>
        <h1>Shaban</h1>
        <h1>Shaban</h1>
        <h1>Shaban</h1>
      </div>
      <div className="bg-yellow-300 navItems">
        <h1>Shaban</h1>
        <h1>Shaban</h1>
      </div>
    </nav>
  );
}
