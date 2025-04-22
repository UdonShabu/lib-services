import React from "react";
import { cn } from "@/lib/utils";

import styles from "./FloatingControls.module.css";

export interface Props {
  children: React.ReactNode;
}

export function FloatingControls({ children }: Props) {
  return <div className={cn(styles.FloatingControls)}>{children}</div>;
}
