import Game from "./components/Game";
import Header from "./components/Header";

import { useCart } from "./hooks/useCart";

export default function App() {
  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Our PS1 Collection</h2>

        <div className="row mt-5">
          {data.map((game) => (
            <Game key={game.id} game={game} addToCart={addToCart} />
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
            Retro gaming showcase built with React &amp; Vite,
            <span>
              {" "}
              made by{" "}
              <a
                href="https://thepuchadesproject.com/"
                target="_blank"
                rel="noreferrer"
                className="text-white text-decoration-underline"
              >
                The Puchades Project
              </a>
            </span>
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
            <span> || </span>
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
