
import React from 'react';
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
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface DeleteOfferDialogProps {
  onDelete: () => void;
  confirmationText: string;
  deleteButtonText: string;
  cancelButtonText: string;
  confirmationTitle: string;
}

const DeleteOfferDialog = ({ 
  onDelete, 
  confirmationText, 
  deleteButtonText, 
  cancelButtonText,
  confirmationTitle
}: DeleteOfferDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive"
          size="icon"
          className="h-8 w-8"
          title={deleteButtonText}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmationTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {confirmationText}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelButtonText}</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteOfferDialog;
