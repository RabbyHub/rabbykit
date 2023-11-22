import clsx from "clsx";
import { docPath } from "../../constant";

export const ViewDocButton = ({
  className,
  sm = false,
}: {
  className?: string;
  sm?: boolean;
}) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={docPath}
      className={clsx(
        "bg-blue-default rounded-md justify-center items-center inline-flex text-center text-title2",
        "hover:shadow-button-hover",
        sm
          ? "w-[128px] h-[36px] text-[13px]"
          : "w-[180px] h-[44px] text-[17px]",
        "font-[510] ",
        "md:w-[224px] md:h-[52px]  md:text-[20px] ",
        className
      )}
    >
      View the Docs
    </a>
  );
};
