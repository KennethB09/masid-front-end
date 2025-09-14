import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SearchForm } from "@/components/search-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductProvider } from "@/context/ProductContext";
import ProductList from "@/components/productList";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddProduct from "@/components/addProduct";
import { Toaster } from "@/components/ui/sonner"

export default function AdminDashboard() {
  return (
    <ProductProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "19rem",
          } as React.CSSProperties
        }
      >
        <Toaster />
        <AppSidebar />
        <SidebarInset className="h-screen">
          <header className="flex shrink-0 items-center gap-2 p-4 justify-between">
            <div className="flex flex-col w-full gap-5">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row">
                  <SidebarTrigger className="-ml-1" />
                  <h1 className="font-semibold text-lg text-neutral-800">
                    Manage
                  </h1>
                </div>
                <SearchForm />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={"outline"}
                  className="text-neutral-800 font-semibold"
                >
                  Manage Categories
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="text-neutral-800 font-semibold"
                    >
                      <Plus size={25} className="text-neutral-800" /> Product
                    </Button>
                  </DialogTrigger>
                  <AddProduct />
                </Dialog>
              </div>
            </div>
          </header>
          <ProductList />
        </SidebarInset>
      </SidebarProvider>
    </ProductProvider>
  );
}
