import Line from "../../assets/line.svg?react";

export default function Curve() {
  return (
    <div className="curve-container absolute left-0 bottom-0 w-full h-32 overflow-visible">
      <Line
        width="100%"
        height="100%"
        className="relative"
        preserveAspectRatio="none"
      />
    </div>
  );
}
