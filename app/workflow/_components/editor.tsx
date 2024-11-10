"use client";
import React from "react";
import { Workflow } from "@prisma/client";

import { ReactFlowProvider } from "@xyflow/react";
import { FlowEditor } from "./flow-editor";

interface EditorProps {
  workflow: Workflow;
}

export const Editor = ({ workflow }: EditorProps) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <section className="flex h-full overflow-auto">
          <FlowEditor workflow={workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};
