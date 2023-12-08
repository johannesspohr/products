import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { ProductForm } from "@/components/ProductForm.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductEntityControllerService } from "@/api";
import { useMatch, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const AddProductDialog = () => {
  const isVisible = useMatch("/add-product");
  const navigate = useNavigate();
  const handleClose = useCallback(
    (show: boolean = false) => {
      if (!show) {
        navigate("/");
      }
    },
    [navigate],
  );
  const queryClient = useQueryClient();
  const create = useMutation({
    mutationFn:
      ProductEntityControllerService.postCollectionResourceProductPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      handleClose();
    },
  });

  return (
    <Dialog open={!!isVisible} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Produkt anlegen</DialogTitle>
          <DialogDescription>
            Wir werden versuchen, den Namen und die Beschreibung automatisch
            auszufüllen.
          </DialogDescription>
        </DialogHeader>
        <ProductForm
          isLoading={create.isPending}
          onSubmit={create.mutate}
          error={create.error}
          autocompleteProductByGtin={true}
        />
      </DialogContent>
    </Dialog>
  );
};
