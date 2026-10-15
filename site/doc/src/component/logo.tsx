import React from "react";

export const LogoName = ({
  name,
  width = 36,
  height = 32,
}: {
  name?: React.ReactNode;
  width?: number;
  height?: number;
}) => {
  return (
    <div className="flex items-center gap-[10px]">
      <img src="/logo.svg" alt="logo" width={width} height={height} />
      {name && (
        <span className="text-center text-white text-base font-bold ">
          {name}
        </span>
      )}
    </div>
  );
};
