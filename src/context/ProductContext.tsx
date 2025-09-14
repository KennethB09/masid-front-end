import type { product } from "@/types/data";
import { createContext, useContext, useReducer, type ReactNode } from "react";

export interface ProductState {
  product: product[] | null;
}

type ProductAction =
  | { type: "SET_PRODUCT"; payload: product[] }
  | { type: "ADD_PRODUCT"; payload: product }
  | {
      type: "UPDATE_PRODUCT";
      payload: { productId: string; updatedData: product };
    }
  | { type: "DELETE_PRODUCT"; payload: product }
  | { type: "SEARCH_PRODUCT"; payload: product[] };

type ProductContextType = {
  product: product[] | null;
  dispatch: React.Dispatch<ProductAction>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "SET_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        product: state.product ? [...state.product, action.payload] : null,
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        product: state.product
          ? state.product?.map((p) =>
              p.id === action.payload.productId
                ? (p = action.payload.updatedData)
                : p
            )
          : state.product,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        product: state.product
          ? state.product?.filter((p) => p.id !== action.payload.id)
          : null,
      };
    case "SEARCH_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(productReducer, {
        product: null
    });

    return (
        <ProductContext.Provider value={{...state, dispatch}}>
            {children}
        </ProductContext.Provider>
    )
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductContextProvider');
  }
  return context;
};