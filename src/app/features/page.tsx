import React from "react";
import InfiniteScroll from "./_components/InfiniteScroll";
import SwipeToDismiss from "./_components/SwipeToDismiss";
import SoundVolume from "./_components/SoundVolume";
import SocialShare from "./_components/SocialShare";
import PressDelayVisualCue from "./_components/PressDelayVisualCue";
import VoiceRecorder from "./_components/VoiceRecorder";
import CalendarApp from "./_components/CalendarApp";
import RightDrawer from "./_components/Drawer";
import Accordion from "./_components/Accordion";
import ScrollProgress from "./_components/ScrollProgress";
import MultiStepForm from "./_components/MultiStepForm";
import SwipeAction from "./_components/SwipeAction";
import AutoSaveForm from "@/components/AutoSaveForm";
import AutoLogout from "./_components/AutoLogout";

import ScrollToTop from "./_components/ScrollToTop";
import DebouncedSearch from "./_components/DebouncedSearch";
import AutoLogoutCountDown from "./_components/AutoLogoutCountDown";
import PrevInputValue from "./_components/PrevInputValue";
import TodoApp from "./_components/_undo-redo/TodoApp";
import TanTable from "./_components/tanstack/TanTable";

const FeaturesPage = () => {
  return (
    <div className="">
      {/* <div className="h-[1000px]"> */}
      <TanTable />
    </div>
  );
};

export default FeaturesPage;
