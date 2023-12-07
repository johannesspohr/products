import { Header } from "@/components/Header.tsx";
import { ProductTable } from "@/components/ProductTable.tsx";
import { AddProductDialog } from "@/components/AddProductDialog.tsx";
import { EditProductDialog } from "@/components/EditProductDialog.tsx";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <ProductTable />
        <AddProductDialog />
        <EditProductDialog />
      </div>
    </>
  );
}

export default App;
