import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

import styles from "./Button.module.css";

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: Props) {
  return (
    <button className={cn(styles.Button)} {...props}>
      {children}
    </button>
  );
}
