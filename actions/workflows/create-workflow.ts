"use server";

import { z } from "zod";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflows";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/types/workflows";
import { redirect } from "next/navigation";

export async function createWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error("Invalid form data");
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Create workflow
  const workflow = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: "TODO",
      ...data,
    },
  });

  if (!workflow) {
    throw new Error("Failed to create workflow");
  }

  redirect(`/workflow/editor/${workflow.id}`);
}
