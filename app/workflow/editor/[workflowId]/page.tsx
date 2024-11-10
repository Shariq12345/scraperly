import React from "react";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Editor } from "../../_components/editor";

interface EditorPageProps {
  params: {
    workflowId: string;
  };
}

const EditorIDPage = async ({ params }: EditorPageProps) => {
  const { workflowId } = params;
  const { userId } = auth();

  if (!userId) return <div>Unauthenticated</div>;

  const workflow = await prisma.workflow.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) return <div>Not found</div>;

  return <Editor workflow={workflow} />;
};

export default EditorIDPage;
