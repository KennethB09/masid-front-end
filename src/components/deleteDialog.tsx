import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

type DeleteDialogProps = {
  action: (id: string) => void;
  productId: string;
  triggerText: string;
  title: string;
  description: string;
  icon?: boolean;
};

export default function DeleteDialog({
  action,
  triggerText,
  title,
  description,
  productId,
  icon,
}: DeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="flex flex-col gap-2 border-[1.5px] border-neutral-800 w-24 font-semibold hover:border-red-700 hover:text-red-700"
          variant={"outline"}
        >
          {icon && <Trash size={25} />}
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => action(productId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
