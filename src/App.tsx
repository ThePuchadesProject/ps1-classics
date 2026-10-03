import { useEffect, useReducer, useState, useMemo } from "react";
import Game from "./components/Game";
import Header from "./components/Header";
import { cartReducer, initialState } from "./reducers/cart-reducer";

export default function App() {
  // Reducer para controlar el carrito
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Estado local para el buscador
  const [searchTerm, setSearchTerm] = useState("");

  // Guardado automático del carrito en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // Manejador de cambio del input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Función para vaciar la barra de búsqueda
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  // Filtro los juegos según el texto buscado
  // Uso useMemo para evitar renderizados innecesarios
  const filteredGames = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return state.data.filter((game) => game.name.toLowerCase().includes(term));
  }, [state.data, searchTerm]);

  return (
    <>
      <Header cart={state.cart} dispatch={dispatch} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Our PS1 Collection</h2>

        <div className="search-container mt-4">
          <input
            type="text"
            className="search-input"
            placeholder="Search game by name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button className="btn btn-dark" onClick={handleClearSearch}>
              X
            </button>
          )}
        </div>

        <div className="row mt-5">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <Game key={game.id} game={game} dispatch={dispatch} />
            ))
          ) : (
            <p className="text-center fs-4">No games found matching "{searchTerm}"</p>
          )}
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
