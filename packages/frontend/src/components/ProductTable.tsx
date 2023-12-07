import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductEntityControllerService } from "@/api";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { AlertCircle, EditIcon, InfoIcon, TrashIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Link } from "react-router-dom";

export const ProductTable = () => {
  const [page, setPage] = useState(0);
  const [deletingProduct, setDeletingProduct] = useState<string | null>(null);

  const products = useQuery({
    queryKey: ["products", page],
    queryFn: () =>
      ProductEntityControllerService.getCollectionResourceProductGet1(page, 10),
  });

  const handleNextPage = useCallback(() => {
    setPage((p) => p + 1);
  }, [setPage]);

  const handlePreviousPage = useCallback(() => {
    setPage((p) => p - 1);
  }, [setPage]);

  const handleCancelDelete = useCallback(
    (open: boolean) => {
      if (!open) {
        setDeletingProduct(null);
      }
    },
    [setDeletingProduct],
  );

  const queryClient = useQueryClient();
  const handleDelete = useCallback(async () => {
    if (deletingProduct) {
      await ProductEntityControllerService.deleteItemResourceProductDelete(
        deletingProduct,
      );
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // TODO: Error handling
      setDeletingProduct(null);
    }
  }, [deletingProduct, setDeletingProduct, queryClient]);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell width="40%">Produkt</TableCell>
            <TableCell width="40%">GTIN</TableCell>
            <TableCell width="20%">Aktionen</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.isLoading && (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </>
          )}
          {products.isError && (
            <TableRow>
              <TableCell colSpan={3}>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Fehler</AlertTitle>
                  <AlertDescription>
                    Die Produkte konnte nicht geladen werden.
                  </AlertDescription>
                </Alert>
              </TableCell>
            </TableRow>
          )}
          {products.isSuccess &&
            products.data._embedded?.products?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Alert variant="default">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Keine Produkte vorhanden</AlertTitle>
                    <AlertDescription>
                      Legen Sie jetzt Ihr erstes Produkt an.
                    </AlertDescription>
                  </Alert>
                </TableCell>
              </TableRow>
            )}

          {products.data?._embedded?.products?.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.title}</TableCell>
              <TableCell>{product.gtin}</TableCell>
              <TableCell className="flex gap-2">
                <Link to={`/products/${product.id}`}>
                  <Button size="sm" title="Bearbeiten">
                    <EditIcon className="h-4 w-4 mr-2" />
                    Bearbeiten
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  size="sm"
                  title="Löschen"
                  onClick={() => setDeletingProduct(product.id!)}
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Löschen
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {(products.data?.page?.totalPages ?? 0) > 1 && (
        <div className="flex justify-end gap-2 items-center mt-2">
          {page > 0 && (
            <Button
              variant="secondary"
              onClick={handlePreviousPage}
              title="Vorherige Seite"
              size="sm"
            >
              &laquo;
            </Button>
          )}
          Seite {page + 1} von {products.data?.page?.totalPages ?? 1}
          {(products.data?.page?.totalPages ?? 1) > page + 1 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleNextPage}
              title="Nächste Seite"
            >
              &raquo;
            </Button>
          )}
        </div>
      )}
      <Dialog open={deletingProduct !== null} onOpenChange={handleCancelDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Produkt löschen</DialogTitle>
          </DialogHeader>
          <p>Wollen Sie das Produkt wirklich löschen?</p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setDeletingProduct(null)}
            >
              Abbrechen
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const SkeletonRow = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="w-[400] h-[20px] rounded-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="w-[100] h-[20px] rounded-full" />
    </TableCell>
    <TableCell></TableCell>
  </TableRow>
);
