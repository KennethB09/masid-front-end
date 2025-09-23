import { SearchForm } from "../search-form";
import { useProductContext } from "@/context/ProductContext";
import ProductCard from "../productCard";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function SearchProduct() {
  const { product } = useProductContext();

  return (
    <div>
      <header className="m-4 flex gap-5">
        <Link to={"/buyer"}>
          <Button
            variant={"outline"}
            className="text-neutral-800 font-semibold"
          >
            <ArrowLeft /> Back
          </Button>
        </Link>
        <SearchForm className="w-96" />
      </header>
      <main className="flex flex-wrap overflow-y-scroll gap-2 mx-4 max-h-full">
        {product.length !== 0 ? (
          product.map((p) => <ProductCard data={p} />)
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-2xl text-neutral-800 font-semibold">
              No Product
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
