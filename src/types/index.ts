export type Game = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItem = Game & {
  quantity: number;
};

// export type GameID = Game["id"];
// export type GameID = Pick<Game, 'id'>;

// export type CartItem = Pick<Game, "id" | "name" | "image"> & {
//   quantity: number;
// };

// export type CartItem = Omit<Game, "id" | "description" | "price"> & {
//   quantity: number;
// };
