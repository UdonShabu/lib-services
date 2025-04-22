"use client";
import React, { useState } from "react";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <div
        className="bg-gray-200 p-4 cursor-pointer hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl">{title}</h3>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

const Accordion = () => {
  return (
    <div className="w-1/2 mx-auto mt-10">
      <AccordionItem title="Item 1">Content for item 1</AccordionItem>
      <AccordionItem title="Item 2">Content for item 2</AccordionItem>
    </div>
  );
};

export default Accordion;
