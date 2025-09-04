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
  const [selected, setSelected] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        // Remove from selection
        const newSelection = prev.filter((item) => item !== id);
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
    <div className="grid grid-cols-2 grid-rows-1 gap-1">
      {/* Images */}
      <div className="">
        <Image
          width={2160}
          height={1597}
          src={currentImg || items[0].img}
          alt="Selected"
          className={`rounded-xl shadow-md max-h-[400px] object-cover transition ${
            active === null ? "blur-sm" : ""
          }`}
        />
      </div>
      {/* Checkboxes */}
      <div className="grid grid-cols-3 grid-rows-4 gap-1 checkbox">
        {items.map((item) => (
          <div
            key={item.id}
            // onClick={() => setActive(item.id)}
            onClick={() => handleToggle(item.id)}
            className={`cursor-pointer border rounded-xl flex items-center justify-center text-center shadow-sm 
              transition ${
                selected.includes(item.id)
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300 hover:border-purple-400"
              }`}
          >
            <span className="font-medium">{item.label}</span>

            <Checkbox checked={selected.includes(item.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
