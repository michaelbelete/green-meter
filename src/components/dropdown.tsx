import React, { useState, forwardRef, useImperativeHandle } from "react";

type DropdownProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

export type DropdownRef = {
  close: () => void;
};

const Dropdown = forwardRef<DropdownRef, DropdownProps>(
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
            className={`absolute top-[62px] z-20 flex w-full flex-col gap-4 rounded-lg border-gray-600 bg-slate-800    py-4 text-white ${
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

Dropdown.displayName = "Dropdown";

export default Dropdown;
