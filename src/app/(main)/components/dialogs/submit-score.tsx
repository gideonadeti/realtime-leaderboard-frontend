import { z } from "zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import useActivities from "../../activities/hooks/use-activities";
import useScores from "../../hooks/use-scores";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SubmitScoreProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  activityId: z.string(),
  value: z.coerce
    .number()
    .int("Value must be an integer")
    .min(1, "Value must be at least 1")
    .max(100, "Value must be at most 100"),
});

const SubmitScore = ({ open, onOpenChange }: SubmitScoreProps) => {
  const { activitiesQuery } = useActivities();
  const { createScoreMutation } = useScores();
  const activities = activitiesQuery.data || [];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const selectedActivity = form.watch("activityId")
    ? activities.find((activity) => activity.id === form.watch("activityId"))
    : null;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createScoreMutation.mutate({ ...values, form, onOpenChange });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Score</DialogTitle>
          <DialogDescription>
            Submit a score from 1 - 100 to an activity
          </DialogDescription>
        </DialogHeader>
        {activitiesQuery.isPending ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="activityId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Activity</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? selectedActivity?.name || "Select activity"
                              : "Select activity"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search activity..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No activity found.</CommandEmpty>
                            <CommandGroup>
                              {activities.map((activity) => (
                                <CommandItem
                                  value={activity.name}
                                  key={activity.id}
                                  onSelect={() => {
                                    form.setValue("activityId", activity.id);
                                  }}
                                >
                                  {activity.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      activity.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter value"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                type="submit"
                disabled={
                  !form.formState.isValid || createScoreMutation.isPending
                }
              >
                {createScoreMutation.isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubmitScore;
