"use client";
import React from "react";
import { useGlobalState } from "../context/global-provider";
import Tasks from "../components/tasks/tasks";

function page() {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks} />;
}

export default page;
