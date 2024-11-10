"use client";
import React, { useCallback } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layers2Icon } from "lucide-react";
import { CustomDialogHeader } from "@/components/dialog/custom-dialog-header";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from "@/schema/workflows";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { createWorkflow } from "@/actions/workflows/create-workflow";
import { toast } from "sonner";

interface CreateWorkflowDialogProps {
  triggerText?: string;
}

export const CreateWorkflowDialog = ({
  triggerText,
}: CreateWorkflowDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow,
    onSuccess: () => {
      toast.success("Workflow created successfully", {
        id: "create-workflow",
      });
    },
    onError: () => {
      toast.error("Failed to create workflow", {
        id: "create-workflow",
      });
    },
  });

  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      toast.loading("Creating workflow...", {
        id: "create-workflow",
      });
      mutate(values);
    },
    [mutate]
  );

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {},
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          {triggerText ?? "Create Workflow"}
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subtitle="Create a new workflow to automate your tasks."
        />
        <div className="p-6">
          <Form {...form}>
            <form
              className="space-y-5 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      The name of the workflow. This will be displayed in the
                      dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Description
                      <p className="text-xs text-muted-foreground">
                        (optional)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      A short description of the workflow. This will be
                      displayed in the dashboard.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating..." : "Create Workflow"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
