import { Button } from "@/components/ui/button.tsx";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <div className="container p-8 flex place-content-between">
        <h1 className="font-bold text-xl">📦 Produktdatenbank</h1>
        <div>
          <Link to={"/add-product"}>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Produkt anlegen
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
