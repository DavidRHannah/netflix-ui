import { useRef, useState, useEffect, type ReactNode } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface ScrollCarouselProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  itemClassName?: string;
  gap?: string;
  scrollAmount?: number;
  maxWidth?: string;
}

export default function ScrollCarousel<T>({
  data,
  renderItem,
  className = "",
  itemClassName = "",
  gap = "gap-6",
  scrollAmount = 600,
  maxWidth = "max-w-5xl",
}: ScrollCarouselProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setShowLeftButton(scrollLeft > 20);
      setShowRightButton(clientWidth < scrollWidth - scrollLeft - 20);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();

      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`flex items-center p-0 relative ${className}`}>
      <button
        className={`
          bg-gray-800/60 hover:bg-gray-800/100 
          cursor-pointer 
          rounded-xl
          h-32 w-9 
          transition-all duration-500 ease-in-out
          absolute left-0 z-10
          ${
            showLeftButton
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 -translate-x-4 pointer-events-none"
          }
        `}
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        <ChevronRightIcon className="!text-white !text-4xl !scale-x-[-1]" />
      </button>

      <div
        ref={scrollContainerRef}
        className={`
          flex ${gap} overflow-x-auto overflow-y-hidden py-4 px-3 w-full ${maxWidth} scrollbar-hide
          transition-all duration-500 ease-in-out
          ${showLeftButton ? "pl-12" : "pl-3"}
          ${showRightButton ? "pr-12" : "pr-3"}
        `}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data.map((item, index) => (
          <div key={index} className={`flex-shrink-0 ${itemClassName}`}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      <button
        className={`
          bg-gray-800/60 hover:bg-gray-800/100 
          cursor-pointer 
          rounded-xl 
          h-32 w-9 
          transition-all duration-500 ease-in-out
          absolute right-0 z-10
          ${
            showRightButton
              ? "opacity-100 translate-x-0 pointer-events-auto"
              : "opacity-0 translate-x-4 pointer-events-none"
          }
        `}
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        <ChevronRightIcon className="!text-white !text-4xl" />
      </button>
    </div>
  );
}
