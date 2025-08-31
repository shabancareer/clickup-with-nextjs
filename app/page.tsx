import Image from "next/image";
import logo from "../public/assets/logo.svg";
import styles from "./page.module.css";
import Link from "next/link";
import ProductDropdown from "./utilizes/productDropdown";
import SolutionsDropdown from "./utilizes/solutionsDropdown";
import ResourcesDropdown from "./utilizes/resourcesDropdown";

export default function Home() {
  return (
    <nav className="grid grid-cols-3 justify-around mx-auto">
      {/* <div className=""> */}
      <div className=" navItems mx-auto">
        <Link href="/" className="flex items-center gap-1 w-51">
          <Image
            src={logo}
            alt="Company Logo"
            priority
            className="h-6"
          />
          <div/>
          <span className="font-medium text-sm leading-none">
            The everything app, for work.
          </span>
        </Link>
      </div>
      <div className="navItems justify-between">
        <ProductDropdown />
        <SolutionsDropdown />
        <ResourcesDropdown />
        <Link href="">Pricing</Link>
        <Link href="">Enterprise</Link>
      </div>
      <div className=" flex gap-5 mx-auto items-center justify-between">
        <div className="navItems ">
          <span className="hover:bg-gray-100 p-1 rounded-sm">
            <div className="">
              <button className="cursor-pointer ">Contact Sales</button>
            </div>
          </span>
          
        </div>
        <div className="navItems">
          <span>
            <div className="mx-auto hover:bg-gray-100 p-2 rounded-sm">
              <button className="cursor-pointer">Login</button>
            </div>
          </span>
          <span className="font-extrabold cta rounded-lg mx-2 p-2
           backgroundColor: `rgb(var(--color-button-tertiary-background))`,
          ">
            <div>
              <button
                className=" text-sm cursor-pointer"
              >
                Sing Up
              </button>
            </div>
          </span>
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
}
