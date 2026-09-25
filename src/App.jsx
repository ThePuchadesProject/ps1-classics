import { useState, useEffect } from "react";
import Game from "./components/Game";
import Header from "./components/Header";
import { db } from "./data/db";
export default function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(db);
  });
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    const itemExists = cart.findIndex((game) => game.id === item.id);
    if (itemExists >= 0) {
      // existe en el carrito
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }

    saveLocalStorage();
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((game) => game.id !== id));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const decreasedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(decreasedCart);
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Our PS1 Collection</h2>

        <div className="row mt-5">
          {data.map((game) => (
            <Game
              key={game.id}
              game={game}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5 text-white">
        <div className="container-xl text-center">
          <p
            className="fs-5 fw-bold mb-2 text-uppercase text-primary"
            style={{ letterSpacing: "1px" }}
          >
            PS1 Classics Store
          </p>
          <p className="text-white-50 mb-3 fs-6">
            Retro gaming showcase built with React &amp; Vite
          </p>
          <div className="d-flex justify-content-center align-items-center gap-3 text-white-50 fs-6 flex-wrap mb-3">
            <span>
              Logo by{" "}
              <a
                href="https://www.reddit.com/user/Goh_billy/"
                target="_blank"
                rel="noreferrer"
                className="text-white text-decoration-underline"
              >
                Goh_billy
              </a>
            </span>
            <span>•</span>
            <span>
              Controller Art by{" "}
              <a
                href="https://www.artstation.com/hobbits"
                target="_blank"
                rel="noreferrer"
                className="text-white text-decoration-underline"
              >
                Andrey N
              </a>
            </span>
          </div>
          <p
            className="small m-0"
            style={{ fontSize: "0.8rem", color: "#8a909d" }}
          >
            PlayStation and related marks are trademarks of Sony Interactive
            Entertainment Inc. This project is for educational &amp; portfolio
            purposes.
          </p>
        </div>
      </footer>
    </>
  );
}
