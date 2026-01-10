import Link from "next/link";
import React from "react";
import CustomCheckboxes from "../checkbox/CustomCheckboxes";
import CampaignsToOperations from "../checkbox/campaignsToOperations/CampaignsToOperations";

// import './workspace.css';
const TheWorkspace = () => {
  return (
    <div className="workspace v4">
      <div className="title-wrapper">
        <p className="label">The all in one workspace</p>
      </div>
      <div className="heading-wrapper">
        <h2 className="h2 v4 font-black">
          Do your most important work, faster
        </h2>
      </div>
      <div className="para-wrapper">
        <p className="font-medium text-[18px] leading-[24px]">
          From campaigns to operations and more, this is just the tip of the
          iceberg.
        </p>
      </div>
      <div className="button-wrapper">
        <Link href="" className="flex items-center sell-btn v4">
          <strong className="font-extrabold text-[18px] leading-[24px] p-2">
            See all use cases
          </strong>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </span>
        </Link>
      </div>
      {/* CheckBox section */}
      <div className="HeroWorkspaceBuilder_grid__4o06N">
        <div className="HeroWorkspaceBuilder_carousel__ldEid">
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
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
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
        <div className="mt-10">
          <CampaignsToOperations />
        </div>
      </div>
    </div>
  );
};

export default TheWorkspace;
