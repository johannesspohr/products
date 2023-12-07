import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { ProductForm, ProductFormData } from "@/components/ProductForm.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductEntityControllerService } from "@/api";
import { useMatch, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { AlertCircle } from "lucide-react";

export const EditProductDialog = () => {
  const pathMatch = useMatch("/products/:id");
  const isVisible = pathMatch != null;
  const productId = pathMatch?.params.id;
  const navigate = useNavigate();
  const productData = useQuery({
    queryKey: ["product", pathMatch?.params.id],
    queryFn: () =>
      ProductEntityControllerService.getItemResourceProductGet(productId!),
    enabled: isVisible && !!productId,
  });
  const handleClose = useCallback(
    (show: boolean = false) => {
      if (!show) {
        navigate("/");
      }
    },
    [navigate],
  );
  const queryClient = useQueryClient();
  const save = useMutation({
    mutationFn: (body: ProductFormData) =>
      ProductEntityControllerService.putItemResourceProductPut(
        productId!,
        body,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      handleClose();
    },
  });

  let content = null;
  if (productData.data) {
    content = (
      <ProductForm
        isLoading={save.isPending}
        onSubmit={save.mutate}
        errors={(save.error as any)?.body}
        autocompleteProductByGtin={false}
        defaultValues={productData.data}
      />
    );
  } else if (productData.isPending) {
    content = (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  } else if (productData.error) {
    content = (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Fehler</AlertTitle>
        <AlertDescription>
          Das Product konnte nicht geladen werden.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Produkt bearbeiten</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};
