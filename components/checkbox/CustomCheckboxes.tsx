"use client";
import { useState } from "react";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Icon } from "lucide-react";
import StarIcon from "../ui/staricon";
import Chat from "../ui/Chat";
import TimeTracking from "../ui/TimeTracking";
import Tasks from "../ui/Tasks";
import Calendar from "../ui/Calendar";
import Docs from "../ui/Docs";
import Goals from "../ui/Goals";
import Dashboards from "../ui/Dashboards";
import Whiteboards from "../ui/Whiteboards";
import Forms from "../ui/Forms";
import Automations from "../ui/Automations";

const items = [
  {
    id: 1,
    label: "Tasks",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-projects-desktop.png",
    Icon: Tasks,
  },
  {
    id: 2,
    label: "Chat",
    img: "/homePageAssets/customCheckbox/home-tabs-v4-chat-desktop.png",
    Icon: Chat,
  },
  {
    id: 3,
    label: "AI",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-AI.png",
    Icon: StarIcon,
  },
  {
    id: 4,
    label: "Sprints",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-sprints-desktop.png",
    Icon: TimeTracking,
  },
  {
    id: 5,
    label: "Time Tracking ",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-time-tracking.png",
    Icon: TimeTracking,
  },
  {
    id: 6,
    label: "Calendar",
    img: "/homePageAssets/customCheckbox/Calendar.png",
    Icon: Calendar,
  },
  {
    id: 7,
    label: "Docs",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-docs-desktop.png",
    Icon: Docs,
  },
  {
    id: 8,
    label: "Goals",
    img: "/homePageAssets/customCheckbox/Goals.png",
    Icon: Goals,
  },
  {
    id: 9,
    label: "Dashboards",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-dashboards-desktop.png",
    Icon: Dashboards,
  },
  {
    id: 10,
    label: "Whiteboards",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-whiteboards-desktop.png",
    Icon: Whiteboards,
  },
  {
    id: 11,
    label: "Forms",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-forms-desktop.png",
    Icon: Forms,
  },
  {
    id: 12,
    label: "Automations",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-automations-desktop.png",
    Icon: Automations,
  },
];
export default function CustomCheckboxes() {
  const [selected, setSelected] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  // console.log("Active Img==", active)
  // console.log("Selected Img==", selected);

  const handleToggle = (id: number) => {
    setSelected((prev) => {
      // console.log("prev=",prev)
      if (prev.includes(id)) {
        // Remove from selection
        const newSelection = prev.filter((item) => item !== id);
        console.log(newSelection);
        // If it was the last clicked, update last clicked
        if (active === id) {
          setActive(
            newSelection.length > 0
              ? newSelection[newSelection.length - 1]
              : null
          );
        }
        return newSelection;
      } else {
        // Add to selection
        setActive(id);
        return [...prev, id];
      }
    });
  };

  const currentImg =
    active !== null ? items.find((i) => i.id === active)?.img : items[0].img;

  return (
    <>
      <div className="HeroWorkspaceBuilder_carousel-wrapper__oQVc8">
        {/* Images */}
        <div
          className="Fade_fadeIn__T_S70"
          style={{ animationDuration: "0ms" }}
        >
          <Image
            width={2160}
            height={1597}
            src={currentImg || items[0].img}
            alt="Selected"
            className={`HeroWorkspaceBuilder_carouselImage__caaM1 rounded-xl shadow-md max-h-[400px] object-cover transition ${
              active === null ? "blur-sm" : ""
            }`}
          />
        </div>
      </div>
      {/* Checkboxes */}
      <div className="HeroWorkspaceBuilder_builder__OUAb1">
        <svg
          className="HeroWorkspaceBuilder_builder-gradient__hdANn"
          width="677"
          height="749"
          viewBox="0 0 677 749"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_6920_404880)">
            <path
              d="M520.999 150.497C470.237 361.041 585.62 554.102 480.186 591.539C378.768 627.549 420.658 549.423 271.922 605.817C101.831 670.307 211.253 302.83 226.786 226.424C228.61 217.45 151.439 187.505 150.034 178.408C147.997 151.667 427.383 154.22 520.999 150.497Z"
              fill="url(#paint0_linear_6920_404880)"
            ></path>
          </g>
          <defs>
            <filter
              id="filter0_f_6920_404880"
              x="0.0234375"
              y="0.496094"
              width="676.336"
              height="762.875"
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
                stdDeviation="75"
                result="effect1_foregroundBlur_6920_404880"
              ></feGaussianBlur>
            </filter>
            <linearGradient
              id="paint0_linear_6920_404880"
              x1="161.097"
              y1="163.39"
              x2="530.899"
              y2="474.155"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8930FD"></stop>
              <stop offset="1" stopColor="#49CCF9"></stop>
            </linearGradient>
          </defs>
        </svg>
        <div className="GlassContainer_container__mEENe">
          <div className="GlassContainer_inner__vd_c5">
            <div
              className="stack"
              style={{ ["--stack-spacing" as any]: "20px" }}
            >
              <div
                className="stack HeroWorkspaceBuilder_builderTitle__UK00C"
                style={{ ["--stack-spacing" as any]: "4px" }}
              >
                <div className="CuMarkdown_wrapper__0ea92">
                  <p className="paragraph-lg">
                    <strong>Set up your Workspace</strong>
                  </p>
                </div>
                <div className="CuMarkdown_wrapper__0ea92">
                  <p className="paragraph-sm">
                    Start with what you need, customize as you go.
                  </p>
                </div>
              </div>
              <div
                className="grid grid-cols-3 grid-rows-4 gap-2"
                style={
                  {
                    "--flow-gap": "7px",
                    "--flow-wrap": "wrap",
                  } as React.CSSProperties
                }
              >
                {items.map((item) => (
                  <button
                    type="button"
                    data-testid="checkbox"
                    data-active={selected.includes(item.id)}
                    data-hovered="false"
                    className={`cursor-pointer Checkbox_checkbox__ZyW3J transition ${
                      selected.includes(item.id)
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-300 hover:border-purple-400"
                    }`}
                    key={item.id}
                    onClick={() => handleToggle(item.id)}
                  >
                    <span className="grid grid-cols-1 gap-1 m-1">
                      <span className="flex justify-center items-center">
                        <item.Icon />
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </span>
                    <span className="relative left-2 bottom-6">
                      <Checkbox checked={selected.includes(item.id)} />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div
              className="cta w-full mx-auto my-2.5"
              // style={{ "--hover-shine-x": "-43%" } as React.CSSProperties}
            >
              <button className=" mx-auto">Get started</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
