import Image from "next/image";
import logo from "../public/assets/logo.svg";
import styles from "./page.module.css";
import Link from "next/link";
import ProductDropdown from "./utilizes/productDropdown";
import SolutionsDropdown from "./utilizes/solutionsDropdown";
import ResourcesDropdown from "./utilizes/resourcesDropdown";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
export default function Home() {
  return (
    <>
      <nav className="grid grid-cols-3 justify-around mx-auto ">
        <div className=" navItems mx-auto">
          <Link href="/" className="flex items-center gap-2 w-55">
            <Image
              src={logo}
              alt="Company Logo"
              priority
              className="h-6 w-auto"
            />
            <div />
            <span className="font-medium text-xs leading-none pl-2 border-l border-gray-300">
              The everything app, for work.
            </span>
          </Link>
        </div>
        <div className="navItems justify-around w-2xl relative right-36">
          <ProductDropdown />
          <SolutionsDropdown />
          <ResourcesDropdown />
          <Link href="">Pricing</Link>
          <Link href="">Enterprise</Link>
        </div>

        <div className=" flex gap-5 mx-auto items-center justify-between">
          <div className="navItems ">
            <span className="hover:bg-gray-100 p-1 rounded-sm">
              <button className="cursor-pointer ">Contact Sales</button>
            </span>
          </div>
          <div className="navItems">
            <span>
              <div className="mx-auto hover:bg-gray-100 p-2 rounded-sm">
                <Link href="" className="cursor-pointer">
                  Login
                </Link>
              </div>
            </span>
            <span
              className="font-extrabold cta rounded-lg mx-2 p-2
           backgroundColor: `rgb(var(--color-button-tertiary-background))`,
          "
            >
              <div>
                <button className=" text-sm cursor-pointer">Sing Up</button>
              </div>
            </span>
          </div>
        </div>
      </nav>
      <main className="CuHome_mainWrapper__QDbpa bg-amber-100">
        <div className="CuHome_mainContent__xfnhR flex justify-around items-center bg-green-600">
          <div className="bg-amber-300 w-full mx-auto justify-center">
            <h1 className="font-extrabold text-4xl leading-[40px]">
              The everything app, for work.
            </h1>
            <div className="">
              <p className="font-medium">
                One app for projects, knowledge, conversations, and more. Get
                more done faster—together.
              </p>
            </div>
            <div className="">
              <button className="cta text-base cursor-pointer rounded-lg mx-2 p-2">
                <strong>Get started. Its FREE!</strong>
                <ArrowRightAltIcon />
              </button>
            </div>
            <div className="text-sm">
              <p>Free Forever. No Credit Card.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
