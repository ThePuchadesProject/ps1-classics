import { db } from "../data/db";
import type { CartItem, Game } from "../types";

// Tipos de acciones para el carrito
export type CartActions =
  | { type: "add-to-cart"; payload: { item: Game } } // Añadir juego
  | { type: "removeFromCart"; payload: { id: Game["id"] } } // Quitar juego por ID
  | { type: "increaseQuantity"; payload: { id: Game["id"] } } // Incrementar cantidad
  | { type: "decreaseQuantity"; payload: { id: Game["id"] } } // Reducir cantidad
  | { type: "clearCart" }; // Vaciar carrito

// Estructura del estado global del carrito
export type CartState = {
  data: Game[]; // Lista de juegos
  cart: CartItem[]; // Elementos en el carrito
};

// Recupero el carrito del localStorage o devuelvo un arreglo vacío
const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem("cart");
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

// Estado inicial de la aplicación
export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

const MIN_ITEMS = 1;
const MAX_ITEMS = 5;

// Reducer principal del carrito
export const cartReducer = (
  state: CartState = initialState,
  action: CartActions,
) => {
  if (action.type === "add-to-cart") {
    // Busco si el juego ya está en el carrito para evitar duplicados
    const itemExists = state.cart.find(
      (game) => game.id === action.payload.item.id,
    );

    let updatedCart: CartItem[] = [];
    if (itemExists) {
      // Si existe, recorro el carrito y sumo 1 a su cantidad (hasta el máximo)
      updatedCart = state.cart.map((item) => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < MAX_ITEMS) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    } else {
      // Si no existe, lo añado al carrito con cantidad 1
      const newItem: CartItem = { ...action.payload.item, quantity: 1 };
      updatedCart = [...state.cart, newItem];
    }

    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "removeFromCart") {
    // Filtro el carrito para eliminar el juego por ID
    const updatedCart = state.cart.filter(
      (item) => item.id !== action.payload.id,
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "increaseQuantity") {
    // Busco el juego y aumento su cantidad sin exceder el máximo
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "decreaseQuantity") {
    // Busco el juego y reduzco su cantidad sin bajar del mínimo
    const decreasedCart = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    return {
      ...state,
      cart: decreasedCart,
    };
  }

  if (action.type === "clearCart") {
    // Devuelvo el estado con el carrito vacío
    return {
      ...state,
      cart: [],
    };
  }

  return state;
};
