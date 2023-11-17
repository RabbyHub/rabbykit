import clsx from "clsx";
import { docPath } from "../../constant";

export const ViewDocButton = ({ className }: { className?: string }) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={docPath}
      className={clsx(
        "w-[224px] h-[52px] bg-blue-default rounded-md justify-center items-center inline-flex text-center text-title2 text-[20px] font-[510]",
        className
      )}
    >
      View the Docs
    </a>
  );
};
