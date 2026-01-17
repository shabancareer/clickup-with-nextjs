import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Image from "next/image";
import brain from "../../public/assets/brain.svg";
import search from "../../public/assets/search.svg";
import agent from "../../public/assets/agent.svg";
import tasks from "../../public/assets/tasks.svg";
import dashboards from "../../public/assets/dashboards.svg";
import board from "../../public/assets/board-view.svg";
import gantt from "../../public/assets/gantt.svg";
import doc from "../../public/assets/docs.svg";
import whiteboards from "../../public/assets/whiteboards.svg";
import wiki from "../../public/assets/wiki.svg";
import forms from "../../public/assets/forms.svg";
import chat from "../../public/assets/chat.svg";
import syncup from "../../public/assets/syncup.svg";
import inbox from "../../public/assets/inbox.svg";
import clips from "../../public/assets/clips.svg";
import calendar from "../../public/assets/calendar.svg";
import scheduling from "../../public/assets/scheduling.svg";
import automations from "../../public/assets/automations.svg";
import timeTracking from "../../public/assets/time-tracking.svg";
import Link from "next/link";
import StarIcon from "@/components/ui/staricon";
import AllFeaturesIcons from "@/components/ui/AllFeaturesIcons";
import Integrations from "@/components/ui/Integrations";
import WatchDemo from "@/components/ui/WatchDemo";
import Downloads from "@/components/ui/Downloads";
// import "../../app/globals.css";

export default function ProductDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent hover:bg-gray-100">
          Product
          <ExpandMoreIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" grid grid-cols-3 min-h-[70vh] rounded-2xl mx-15 mt-6"
        align="center"
      >
        <DropdownMenuGroup className="[min-inline-size:300px] aiFeatures border-r">
          <DropdownMenuLabel className="text-gray-400">
            AI Features
            <Divider />
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/brain">
              <div className="flex justify-evenly my-2">
                <Image
                  src={brain}
                  alt="Product brain"
                  priority
                  className="h-10 w-auto"
                />
                <span className="ml-2">
                  <p className="font-medium">Brain</p>
                  <p>The complete work AI platform</p>
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
          <Divider />
          <DropdownMenuItem>
            <Link href="/brain/max">
              <div className="flex justify-evenly my-2">
                <Image
                  src={brain}
                  alt="Product brain"
                  priority
                  className="h-10 w-auto"
                />
                <span className="ml-2">
                  <p className="font-medium">
                    Brain{" "}
                    <span className="bg-amber-600 p-1 relative bottom-2 left-0.5 italic">
                      MAX
                    </span>
                  </p>
                  <p>One AI App to rule them all</p>
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
          <Divider />
          <DropdownMenuItem>
            <Link href="/brain/enterprise-search">
              <div className="flex justify-evenly my-2">
                <Image
                  src={search}
                  alt="Product brain"
                  priority
                  className="h-10 w-auto"
                />
                <span className="ml-2">
                  <p className="font-medium">Enterprise Search</p>
                  <p>One search for all your work</p>
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
          <Divider />
          <DropdownMenuItem>
            <Link href="brain/ai-notetaker">
              <div className="flex justify-evenly my-2">
                <Image
                  src={agent}
                  alt="Product brain"
                  priority
                  className="h-10 w-auto"
                />
                <span className="ml-2">
                  <p className="font-medium">AI Notetaker</p>
                  <p>Connect call notes to your network.</p>
                </span>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="grid grid-cols-2">
          <div className=" space-y-2 p-2 border-r-1">
            <DropdownMenuLabel className="text-gray-400">
              Projects
            </DropdownMenuLabel>
            <DropdownMenuItem className="items-center">
              <Link href="/features/tasks" className="flex items-center gap-2">
                <Image src={tasks} alt="Tasks" />
                <span>Tasks</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/features/dashboards"
                className="flex items-center gap-2"
              >
                <Image src={dashboards} alt="dashboards" />
                <span>Dashboards</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/features/kanban-board"
                className="flex items-center gap-2"
              >
                <Image src={board} alt="board-view" />
                <span>Board</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/features/gantt-chart-view"
                className="flex items-center gap-2"
              >
                <Image src={gantt} alt="gantt" />
                <span>Gantt</span>
              </Link>
            </DropdownMenuItem>
          </div>
          <div className="space-y-2 p-2 border-r-1">
            <DropdownMenuLabel className="text-gray-400">
              knowledge
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href="features/docs" className="flex items-center gap-2">
                <Image src={doc} alt="Doc" />
                <span>Doc</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="features/whiteboards"
                className="flex items-center gap-2"
              >
                <Image src={whiteboards} alt="Whiteboards" />
                <span>Whiteboards</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="features/knowledge-management"
                className="flex items-center gap-2"
              >
                <Image src={wiki} alt="Wiki" />
                <span>Wiki</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="features/forms" className="flex items-center gap-2">
                <Image src={forms} alt="Forms" />
                <span>Forms</span>
              </Link>
            </DropdownMenuItem>
          </div>
          <div className="space-y-2 p-2 border-r-1 border-t-2">
            <DropdownMenuLabel className="text-gray-400">
              Communication
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href="/features/chat" className="flex items-center gap-2">
                <Image src={chat} alt="Chat" />
                <span>Chat</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/features/sync-up"
                className="flex items-center gap-2"
              >
                <Image src={syncup} alt="Syncup" />
                <span>Syncup</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/features/inbox" className="flex items-center gap-2">
                <Image src={inbox} alt="Inbox" />
                <span>Inbox</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/features/clips" className="flex items-center gap-2">
                <Image src={clips} alt="Clips" />
                <span>Clips</span>
              </Link>
            </DropdownMenuItem>
          </div>
          <div className="space-y-2 p-2 border-r-1 border-t-2">
            <DropdownMenuLabel className="text-gray-400">
              Time
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href="/features/calendar"
                className="flex items-center gap-2"
              >
                <Image src={calendar} alt="calendar" />
                <span>Calendar</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/features/time-estimates"
                className="flex items-center gap-2"
              >
                <Image src={scheduling} alt="scheduling" />
                <span>Scheduling</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="features/automations"
                className="flex items-center gap-2"
              >
                <Image src={automations} alt="automations" />
                <span>Automations</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="features/project-time-tracking"
                className="flex items-center gap-2"
              >
                <Image src={timeTracking} alt="timeTracking" />
                <span>Time tracking</span>
              </Link>
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="flex flex-col h-auto">
          <div className="flex flex-col flex-1">
            <DropdownMenuLabel className="aiRightDropdown flex pt-2 ml-1">
              <StarIcon />
              <span className="ml-1 text-black">NEW</span>
            </DropdownMenuLabel>
            <DropdownMenuItem className="flex-col aiFeatures">
              <Link href="/brain/talk-to-text">
                <div>
                  <h4 className="font-bold">Talk to Text</h4>
                </div>
                <div className="flex-1 flex flex-col justify-between pt-14">
                  <p className="overflow-x-auto tracking-wide">
                    Instantly convert your voice to text, across any <br />
                    desktop app, doc, or site.
                  </p>
                  <span className="pt-6 font-bold text-gray-500 text-sm leading-6">
                    Learn More <ArrowRightAltIcon />
                  </span>
                </div>
              </Link>
            </DropdownMenuItem>
          </div>
          <div className="grid grid-cols-2 flex-1 border-t-2">
            <DropdownMenuItem className="border-r flex justify-center">
              <Link href="/features" className="flex flex-col items-center">
                <AllFeaturesIcons />
                <span>All Features</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-center justify-center">
              <Link href="integrations" className="flex flex-col items-center justify-center">
                <Integrations />
                <span>Integrations</span>{" "}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="border-r border-t flex flex-col items-center justify-center">
              <Link href="on-demand-demo" className="flex flex-col items-center justify-center">
                <WatchDemo />
                <span>Watch demo</span>{" "}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="border-t flex flex-col items-center justify-center">
              <Link href="on-demand-demo" className="flex flex-col items-center justify-center">
                <Downloads />
                <span>Downloads</span>{" "}
              </Link>
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
