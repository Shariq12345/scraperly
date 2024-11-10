import React, { Suspense } from "react";
import { getWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, InboxIcon } from "lucide-react";
import { CreateWorkflowDialog } from "./_components/create-workflow-dialog";
import { WorkflowCard } from "./_components/workflow-card";

const WorkflowsPage = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Create and manage workflows.</p>
        </div>
        <CreateWorkflowDialog triggerText="Create Workflow" />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}

async function UserWorkflows() {
  const workflows = await getWorkflowsForUser();
  if (!workflows) {
    return (
      <div>
        <Alert variant={"destructive"}>
          <AlertCircleIcon className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error fetching your workflows. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={35} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflows created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first workflow.
          </p>
        </div>
        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}

export default WorkflowsPage;