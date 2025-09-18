import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import type { category } from "@/types/data";
import { useAuthContext } from "@/context/AuthContext";
import Loading from "./loading";
import { toast } from "sonner";
import { useProductContext } from "@/context/ProductContext";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [categories, setCategories] = useState<category[] | []>([]);
  const { user } = useAuthContext();
  const { categories, dispatch } = useProductContext();

  useEffect(() => {
    async function getProductCategoty() {
      setIsLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/category/get-all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        return toast.warning(json.message);
      }


      setIsLoading(false);
      // setCategories(json.categoryList);
      dispatch({ type: "SET_CATEGORIES", payload: json.categoryList })
    }

    getProductCategoty();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("searchValue", input);

    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/product/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: form,
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      return toast.warning(json.message);
    }
    setIsLoading(false);
    dispatch({ type: "SEARCH_PRODUCT", payload: json.productList });
  };

  async function handleFilterByCategory(categoryId: string) {
    let route = `${
      import.meta.env.VITE_SERVER_URL
    }/product/get-by-category-id/${categoryId}`;

    if (categoryId === "unfilter") {
      route = `${import.meta.env.VITE_SERVER_URL}/product/get-all`;
    }

    const response = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      return toast.warning(json.message);
    }

    setIsLoading(false);
    dispatch({ type: "SEARCH_PRODUCT", payload: json.productList });
  }

  return (
    <div className="flex flex-row gap-2">
      <form {...props} onSubmit={handleSearch}>
        <Input
          type="search"
          placeholder="Search Products"
          className="border-1 border-neutral-800"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      <Select onValueChange={(value) => handleFilterByCategory(value)}>
        <SelectTrigger className="border-neutral-800 min-w-[8rem] text-neutral-700 font-medium capitalize">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {isLoading && <Loading />}
          <SelectItem value="unfilter">Unfilter</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.id.toString()} className="capitalize">
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
