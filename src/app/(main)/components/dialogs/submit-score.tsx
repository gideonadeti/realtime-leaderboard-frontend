import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubmitScoreProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubmitScore = ({ open, onOpenChange }: SubmitScoreProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Score</DialogTitle>
          <DialogDescription>
            Submit a score from 1 - 100 to an activity
          </DialogDescription>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitScore;
