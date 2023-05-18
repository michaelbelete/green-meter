import React, { useState, forwardRef, useImperativeHandle } from "react";

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export type DropdownRef = {
  close: () => void;
};

const CustomDropdown = forwardRef<DropdownRef, DropdownProps>(
  ({ children, trigger }: DropdownProps, ref) => {
    const [showDropdown, setShowDropdown] = useState(false);

    useImperativeHandle(ref, () => ({
      close() {
        setShowDropdown(false);
      },
    }));

    return (
      <>
        {/* overlay when clicked outside hide the drop down */}
        <div
          className={`left-0 top-0 z-10 h-full w-full  ${
            showDropdown ? "absolute" : "hidden"
          }`}
          onClick={() => {
            setShowDropdown(false);
          }}
        />

        <div className="relative grid w-full items-center gap-2">
          <div
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            {trigger}
          </div>
          <div
            className={`absolute top-16 z-20 flex w-full flex-col gap-4 rounded-lg border border-gray-300 bg-white py-4 text-black ${
              showDropdown ? "" : "hidden"
            }`}
          >
            {children}
          </div>
        </div>
      </>
    );
  }
);

CustomDropdown.displayName = "Dropdown";

export default CustomDropdown;
