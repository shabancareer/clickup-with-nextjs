"use client";
import { useState } from "react";
import Image from "next/image";
import Checkbox from "@mui/material/Checkbox";
const items = [
  {
    id: 1,
    label: "Tasks",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-projects-desktop.png",
  },
  {
    id: 2,
    label: "Chat",
    img: "/homePageAssets/customCheckbox/home-tabs-v4-chat-desktop.png",
  },
  {
    id: 3,
    label: "AI",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-AI.png",
  },
  {
    id: 4,
    label: "Sprints",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-sprints-desktop.png",
  },
  {
    id: 5,
    label: "Time Tracking",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-time-tracking.png",
  },
  {
    id: 6,
    label: "Calendar",
    img: "/homePageAssets/customCheckbox/Calendar.png",
  },
  {
    id: 7,
    label: "Docs",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-docs-desktop.png",
  },
  { id: 8, label: "Goals", img: "/homePageAssets/customCheckbox/Goals.png" },
  {
    id: 9,
    label: "Dashboards",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-dashboards-desktop.png",
  },
  {
    id: 10,
    label: "Whiteboards",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-whiteboards-desktop.png",
  },
  {
    id: 11,
    label: "Forms",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-forms-desktop.png",
  },
  {
    id: 12,
    label: "Automations",
    img: "/homePageAssets/customCheckbox/home-tabs-v3-automations-desktop.png",
  },
];

export default function CustomCheckboxes() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex gap-10">
      {/* Checkboxes */}
      <div className="grid grid-cols-3 gap-4 w-1/2">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`cursor-pointer border rounded-xl p-4 flex items-center justify-center text-center shadow-sm 
              transition ${
                active === item.id
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300 hover:border-purple-400"
              }`}
          >
            <span className="font-medium">
              {item.label}
              </span>
              
             <Checkbox
  checked={active === item.id}
  onChange={() => setActive(item.id)}
/>
          </div>
        ))}
      </div>

      {/* Images */}
      <div className="w-1/2 flex items-center justify-center">
        {active ? (
          <>
            <Image
              width={2160}
              height={1597}
              src={items.find((i) => i.id === active)?.img || items[0].img}
              alt="Selected"
              className="rounded-xl shadow-md max-h-[400px] object-cover transition"
            />
          </>
        ) : (
          <Image
            width={2160}
            height={1597}
            src={items[0].img}
            alt="Default"
            loading="eager"
            className="rounded-xl shadow-md max-h-[400px] object-cover blur-sm"
          />
        )}
      </div>
    </div>
  );
}
