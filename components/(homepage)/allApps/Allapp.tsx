import {
  Folder, FileText, Brain, MessageSquare,
  Search, CheckSquare, Workflow, Link, Sparkles, Calendar, PenSquare, Briefcase, LayoutTemplate,
  PieChart, Flag, CalendarDays, Disc,
  Diamond, NotepadText, Zap, Settings2,
  ListTodo, Clock, LayoutDashboard, Phone, Table, Monitor, BarChartHorizontal, Map, Inbox,
  Video, LayoutGrid, Cable
} from "lucide-react";
import Image from "next/image";

<Image src="feature-projects.png" alt="" />

const gridItems = Array.from({ length: 80 }, (_, i) => {
  const id = i + 1;
  let item: any = { id, label: "", icon: null, size: "small" };

  // Row 1 (1-10)
  if (id === 11) item = { ...item, label: "Dependencies", icon: Search };
  if (id === 12) item = { ...item, label: "Connected Search", icon: Search };
  if (id === 13) item = { ...item, label: "Tasks", icon: CheckSquare };
  if (id === 14) item = { ...item, label: "Mind Maps", icon: Workflow };
  if (id === 15) item = { ...item, label: "Wikis", icon: Link };
  if (id === 16) item = { ...item, label: "AI Notetaker", icon: Sparkles };
  if (id === 17) item = { ...item, label: "Calendar", icon: Calendar };
  if (id === 18) item = { ...item, label: "Proofing", icon: PenSquare };
  if (id === 19) item = { ...item, label: "Portfolios", icon: Briefcase };
  if (id === 20) item = { ...item, label: "Templates", icon: LayoutTemplate };

  // Row 2 (21-30) 
  if (id === 21) item = { ...item, label: "Reminders", icon: PieChart };
  if (id === 22) item = { ...item, label: "Reporting", icon: PieChart };
  if (id === 23) item = { ...item, label: "Goals", icon: Flag };
  if (id === 28) item = { ...item, label: "Sprints", icon: CalendarDays };
  if (id === 29) item = { ...item, label: "Custom Status", icon: Disc };
  if (id === 30) item = { ...item, label: "AI Writer", icon: Disc };

  // Large Items (Row 3/4 and Row 5/6)
  // Projects (24 - spans 24, 25, 34, 35)
  // Projects (24 - spans 24, 25, 34, 35)
  if (id === 24) return { id, label: "Projects", image: "feature-projects.png", size: "large", color: "text-blue-500", highlight: true, useH3: true };

  // Docs (26 - spans 26, 27, 36, 37)
  if (id === 26) return { id, label: "Docs", image: "https://placehold.co/200x200", icon: FileText, size: "large", color: "text-blue-400", highlight: true, useH3: true };
  // Brain (44 - spans 44, 45, 54, 55)
  if (id === 44) return { id, label: "Brain", image: "https://placehold.co/200x200", icon: Brain, size: "large", color: "text-purple-500", highlight: true, useH3: true };
  // Chat (46 - spans 46, 47, 56, 57)
  if (id === 46) return { id, label: "Chat", image: "https://placehold.co/200x200", icon: MessageSquare, size: "large", color: "text-purple-600", highlight: true, useH3: true };

  // Skip items consumed by large blocks
  const consumed = [
    25, 34, 35, // by 24
    27, 36, 37, // by 26
    45, 54, 55, // by 44
    47, 56, 57  // by 46
  ];
  if (consumed.includes(id)) return null;

  // Row 3 (31-40) - 24,25,26,27 taken/large.
  if (id === 31) item = { ...item, label: "API Calls", icon: Diamond };
  if (id === 32) item = { ...item, label: "Milestones", icon: Diamond };
  if (id === 33) item = { ...item, label: "Forms", icon: NotepadText };
  // if (id === 34) item = { ...item, label: "Automations", icon: Zap };
  // if (id === 35) item = { ...item, label: "Custom Fields", icon: Settings2 };
  if (id === 36) item = { ...item, label: "Time Estimates", icon: Clock };

  // Row 4 (31-40) - 34,35,36,37 consumed.
  if (id === 37) item = { ...item, label: "Priorities", icon: Flag };
  if (id === 38) item = { ...item, label: "Automations", icon: Video };
  if (id === 39) item = { ...item, label: "Custom Fields", icon: LayoutGrid };
  if (id === 40) item = { ...item, label: "Timesheets", icon: LayoutGrid };

  // Row 5 (41-50) - 44,45,46,47 taken/large.
  if (id === 41) item = { ...item, label: "Emails", icon: LayoutDashboard };
  if (id === 42) item = { ...item, label: "Priorities", icon: Clock };
  // 43 is empty in image logic
  if (id === 43) item = { ...item, label: "Time Tracking", icon: Cable };
  if (id === 48) item = { ...item, label: "Time Tracking", icon: Cable };
  if (id === 49) item = { ...item, label: "Time Tracking", icon: Cable };
  if (id === 50) item = { ...item, label: "Time Tracking", icon: Cable };


  // Row 6 (51-60) - 54,55,56,57 consumed.
  if (id === 51) item = { ...item, label: "24/7 Support", icon: Phone };
  if (id === 52) item = { ...item, label: "Checklists", icon: ListTodo };
  if (id === 53) item = { ...item, label: "Scheduling", icon: CalendarDays };
  if (id === 54) item = { ...item, label: "Whiteboards", icon: Monitor };
  if (id === 55) item = { ...item, label: "Spreadsheets", icon: Table };

  // Row 7 (61-70)
  if (id === 56) item = { ...item, label: "Gantt Charts", icon: BarChartHorizontal };
  if (id === 57) item = { ...item, label: "Roadmaps", icon: Map };
  if (id === 58) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 59) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 60) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 61) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 62) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 63) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 64) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 65) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 66) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 67) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 68) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 69) item = { ...item, label: "Inbox", icon: Inbox };
  if (id === 70) item = { ...item, label: "Inbox", icon: Inbox };


  return item;
});


const Allapp = () => {
  return (
    <div className="pt-40 flex flex-col items-center justify-center ml-10">
      <div>
        <h2 className="text-5xl font-bold tracking-wide">
          All apps, AI Agents,
          <br />
        </h2>
        <h2 className="text-4xl font-bold">and humans in ClickUp.</h2>
        <div>
          <p className="text-lg text-[#838383] font-bold py-4">
            100+ products to replace fragmented software & maximize human productivity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1 mt-10 w-full grid-container ">
        {gridItems.map((item, index) => {
          if (!item) return null; // Skip consumed items

          const isLarge = item.size === "large";

          return (
            <div
              key={item.id}
              className={`
                bg-gray-200 rounded cursor-pointer transition-all
                hover:border-2 hover:border-gray-400 border-2 border-transparent
                flex flex-col items-center justify-center text-center p-2
                ${isLarge ? "col-span-2 row-span-2 w-full h-full" : "aspect-square"}
              `}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.label}
                  className="mb-2 w-full h-auto object-cover rounded max-h-[100px]"
                />
              ) : item.icon && (
                <item.icon
                  className={`mb-2 ${isLarge ? "w-10 h-10" : "w-6 h-6"} ${item.color || "text-gray-600"}`}
                />
              )}
              {item.label && (
                item.useH3 ? (
                  <h3 className={`font-bold leading-tight ${isLarge ? "text-xl" : "text-sm"}`}>{item.label}</h3>
                ) : (
                  <span className={`text-[10px] font-medium leading-tight ${isLarge ? "text-lg" : "text-xs"}`}>
                    {item.label}
                  </span>
                )
              )}
              {/* Fallback for empty cells (just number if no label) */}
              {!item.label && !item.icon && <span className="text-gray-400 opacity-50">{item.id}</span>}
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Allapp;