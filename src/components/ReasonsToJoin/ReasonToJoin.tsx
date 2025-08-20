import type { ReactElement } from "react";
import { SvgGradient } from "./SvgGradient";

interface ReasonToJoinI {
  title?: string;
  subtext?: string;
  icon?: ReactElement;
}

export default function ReasonToJoin({ title, subtext, icon }: ReasonToJoinI) {
  return (
    <div className="reason-container flex flex-col mr-2 justify-between items-start p-4 bg-[linear-gradient(115deg,rgba(21,26,63,0.8),rgba(50,22,47,0.8))] rounded-2xl">
      <div className="reason-text-container flex flex-col gap-2">
        <div className="header text-white text-2xl font-bold">{title}</div>
        <div className="subtext text-gray-500 text-base/snug font-medium">
          {subtext}
        </div>
      </div>
      <div className="icon-container self-end mt-8">
        <SvgGradient icon={icon} />
      </div>
    </div>
  );
}
