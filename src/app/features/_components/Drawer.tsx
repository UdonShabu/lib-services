"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function RightDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button className="bg-sky-300 p-2" onClick={() => setIsOpen(true)}>
        Open
      </button>
      <Drawer placement="top" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Nani
      </Drawer>
    </div>
  );
}

type DrawerProps = {
  children: React.ReactNode;
  isOpen: boolean;
  placement?: Placement;
  onClose: () => void;
};

type Placement = "left" | "right" | "top" | "bottom";
type Styles = { position: string; transform: string };

function Drawer({
  children,
  isOpen,
  onClose,
  placement = "left",
}: DrawerProps) {
  const placementStyles: Record<Placement, Styles> = {
    left: {
      position: `top-0 left-0 w-2/3 h-48 `,
      transform: isOpen ? "translate-x-0" : "-translate-x-full",
    },
    right: {
      position: `top-0 right-0 w-2/3 h-48 `,
      transform: isOpen ? "translate-x-0" : "translate-x-full",
    },
    top: {
      position: `top-0  w-full h-[400px] `,
      transform: isOpen ? "translate-y-0" : "-translate-y-full",
    },
    bottom: {
      position: `top-0  w-full h-[400px] `,
      transform: isOpen ? "translate-y-0" : "-translate-y-full",
    },
  };

  const styles = placementStyles[placement] || placementStyles.left;
  return (
    <div
      className={cn(
        "bg-slate-300 p-3 absolute z-50  ",
        "transition-all",
        styles.position,
        styles.transform
      )}
    >
      <p>{children} </p>
      <button onClick={onClose} className="absolute top-0 right-0">
        X
      </button>
    </div>
  );
}
