import type { Game } from "../types";

type GameProps = {
  game: Game;
  addToCart: (item: Game) => void;
};

export default function Game({ game, addToCart }: GameProps) {
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
          onClick={() => addToCart(game)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
