import Image from "next/image";
import logo from "../public/assets/logo.svg";
import styles from "./page.module.css";
import Link from "next/link";
import ProductDropdown from "./utilizes/productDropdown";
import SolutionsDropdown from "./utilizes/solutionsDropdown";
import ResourcesDropdown from "./utilizes/resourcesDropdown";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomCheckboxes from "@/components/checkbox/CustomCheckboxes";
import Checkbox from "@mui/material/Checkbox";

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
      <main className="CuHome_mainWrapper__QDbpa">
        <div className="CuHome_mainContent__xfnhR h-[60vh] flex justify-around items-center">
          <div className="flex flex-col items-center space-y-5">
            <h1 className="font-extrabold text-7xl tracking-[-2px] leading-[76px]">
              The everything app, for work.
            </h1>
            <div className="max-w-[560px] text-center py-4">
              <p className="text-[1.1875rem] leading-[1.3684210526] font-medium">
                One app for projects, knowledge, conversations, and more. Get
                more done faster—together.
              </p>
            </div>
            <div className="space-y-1 flex flex-col items-center justify-between">
              <button className="cta text-base rounded-lg mx-2 p-2 cursor-pointer ">
                <strong>Get started. Its FREE!</strong>
                <ArrowRightAltIcon />
              </button>
              <div>
                <p className="freeForever">Free Forever. No Credit Card.</p>
              </div>
            </div>
          </div>
        </div>
        {/* CheckBox section */}
        <div className="HeroWorkspaceBuilder_grid__4o06N">
          <div className="HeroWorkspaceBuilder_carousel__ldEid">
            <svg
              fill="none"
              height="957"
              preserveAspectRatio="none"
              viewBox="0 0 1600 800"
              width="1600"
              xmlns="http://www.w3.org/2000/svg"
              className="HeroWorkspaceBuilder_carousel-noise__SD1jf"
            >
              <filter id="noiseFilter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="3"
                  stitchTiles="stitch"
                ></feTurbulence>
              </filter>
              <rect
                width="100%"
                height="100%"
                filter="url(#noiseFilter)"
              ></rect>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1600"
              height="957"
              viewBox="0 0 1600 957"
              fill="none"
              preserveAspectRatio="none"
              className="HeroWorkspaceBuilder_carousel-gradient__eI9B1"
              data-active="true"
            >
              <g filter="url(#filter0_f_1_41378)">
                <path
                  d="M1367.5 592.5C1411.9 435.641 1475 366 1138.53 416.716C666.86 346.799 390.776 198.005 264.775 276.296C143.573 351.606 343.398 344.178 157.167 453.284C-55.802 578.055 974.05 591.222 1160.46 606.225C1182.36 607.987 1204.71 611.414 1225.75 616.049C1311.38 634.915 1348.5 813.999 1367.5 592.5Z"
                  fill="url(#paint0_linear_1_41378)"
                ></path>
              </g>
              <defs>
                <filter
                  id="filter0_f_1_41378"
                  x="-125.682"
                  y="0.123413"
                  width="1782.96"
                  height="956.141"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  ></feBlend>
                  <feGaussianBlur
                    stdDeviation="127"
                    result="effect1_foregroundBlur_1_41378"
                  ></feGaussianBlur>
                </filter>
                <linearGradient
                  id="paint0_linear_1_41378"
                  x1="652.428"
                  y1="391.04"
                  x2="639.353"
                  y2="525.213"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#40DDFF"></stop>
                  <stop offset="1" stopColor="#7612FA"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
      <CustomCheckboxes />
        </div>
      </main>
    </>
  );
}
