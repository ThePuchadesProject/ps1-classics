import type { CartActions } from "../reducers/cart-reducer";
import type { Game } from "../types";
import type { ActionDispatch } from "react";
type GameProps = {
  game: Game;
  dispatch: ActionDispatch<[action: CartActions]>;
};

export default function Game({ game, dispatch }: GameProps) {
  const { name, image, description, price } = game;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid game-cover"
          src={`/img/${image}.jpg`}
          alt={`${name} cover`}
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">{price} €</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          onClick={() =>
            dispatch({ type: "add-to-cart", payload: { item: game } })
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
