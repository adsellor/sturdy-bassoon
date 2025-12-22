"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { CartItem, CartState } from "@/lib/types";

interface CartContextValue extends CartState {
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

const STORAGE_KEY = "apple-storefront-cart";

const initialState: CartState = {
  items: [],
  updatedAt: null,
};

type Action =
  | { type: "hydrate"; payload: CartState }
  | { type: "add"; payload: CartItem }
  | { type: "update"; payload: { id: string; quantity: number } }
  | { type: "remove"; payload: { id: string } }
  | { type: "clear" };

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "hydrate":
      return action.payload;
    case "add": {
      const existing = state.items.find((item) => item.id === action.payload.id);
      const items = existing
        ? state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          )
        : [...state.items, action.payload];
      return {
        items,
        updatedAt: new Date().toISOString(),
      };
    }
    case "update": {
      const items = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item,
        )
        .filter((item) => item.quantity > 0);
      return {
        items,
        updatedAt: new Date().toISOString(),
      };
    }
    case "remove":
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
        updatedAt: new Date().toISOString(),
      };
    case "clear":
      return initialState;
    default:
      return state;
  }
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: "hydrate", payload: JSON.parse(stored) });
      }
    } catch (error) {
      console.error("Failed to hydrate cart", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Unable to persist cart", error);
    }
  }, [state]);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: "add", payload: item });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: "update", payload: { id, quantity } });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "remove", payload: { id } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const subtotal = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
    [state.items],
  );

  const itemCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items],
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
