"use client";

import { useRef, useState } from "react";

export default function AutoSaveForm() {
  const [text, setText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const TIMEOUT_SEC = 3000;

  const handleKeyUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      saveChange();
    }, TIMEOUT_SEC);
  };

  const saveChange = () => {
    setTimeout(() => {
      setIsSaving(false);
    }, TIMEOUT_SEC);
  };
  return (
    <div className="p-4 mx-auto w-40">
      <textarea
        name=""
        id=""
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-2 border-grey-300 p-2"
        onKeyUp={handleKeyUp}
      />
      <p>{isSaving ? "Saving.." : "Change saved!"} </p>
    </div>
  );
}
