import Line from "../../assets/line.svg?react";

export default function Curve() {
  return (
    <div className="curve-container absolute left-0 -bottom-0.5 w-full overflow-visible">
      <Line
        width="100%"
        height="100%"
        className="relative"
        preserveAspectRatio="none"
      />
    </div>
  );
}
