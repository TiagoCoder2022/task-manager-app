"use client";
import React from "react";
import { useGlobalState } from "../context/global-provider";
import Tasks from "../components/tasks/tasks";

function page() {
  const { incompleteTasks } = useGlobalState();
  return <Tasks title="Incompleted Tasks" tasks={incompleteTasks} />;
}

export default page;
