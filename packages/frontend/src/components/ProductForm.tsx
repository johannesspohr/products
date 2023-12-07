import { ProductRequestBody, ProductSearchControllerService } from "@/api";
import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { DialogFooter } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Loader2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export type ProductFormData = Pick<
  ProductRequestBody,
  "gtin" | "title" | "description"
>;

export type Error = {
  field: string;
  message: string;
};

export const ProductForm = (props: {
  errors?: Error[];
  onSubmit: (data: ProductFormData) => void;
  isLoading: boolean;
  defaultValues?: ProductFormData;
  autocompleteProductByGtin: boolean;
}) => {
  const form = useForm<ProductFormData>({
    defaultValues: props.defaultValues ?? {
      gtin: "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    // This error handling is surely not pretty, but it works for now.
    const error =
      props.errors && props.errors?.length > 0 ? props.errors[0] : undefined;
    if (error) {
      form.setError(error.field as keyof ProductFormData, {
        message: error.message,
      });
    } else {
      form.clearErrors();
    }
  }, [props.errors, form]);

  const { onSubmit } = props;
  const handleSubmit = useCallback(
    (data: ProductFormData) => {
      onSubmit(data);
    },
    [onSubmit],
  );

  const loadProductData = useMutation({
    mutationFn: ProductSearchControllerService.executeSearchProductGet,
    onSuccess: (data) => {
      // we probably don't want to overwrite the user's input, but it's good enough for now
      if (data) {
        form.setValue("title", data.title);
        form.setValue("description", data.description);
      }
    },
  });

  const { autocompleteProductByGtin } = props;
  const handleBlur = useCallback(() => {
    if (autocompleteProductByGtin) {
      loadProductData.mutate(form.getValues("gtin"));
    }
  }, [autocompleteProductByGtin, loadProductData, form]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <fieldset disabled={props.isLoading}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="gtin"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel htmlFor="name" className="text-right">
                      GTIN
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456789"
                        {...field}
                        onBlur={() => {
                          handleBlur();
                          field.onBlur();
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Die GTIN ist ein internationaler Code zur eindeutigen
                      Identifizierung eines Produkts.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel htmlFor="name" className="text-right">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormLabel htmlFor="name" className="text-right">
                      Beschreibung
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </fieldset>
          <DialogFooter>
            <Button type="submit" disabled={props.isLoading}>
              {props.isLoading && (
                <Loader2Icon className="h-4 w-4 animate-spin mr-2" />
              )}
              Speichern
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
