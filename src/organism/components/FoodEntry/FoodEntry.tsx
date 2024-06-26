import { Food } from "../../../App";
import { categoryColorHelper } from "../../../pages/components/Order";
import { useState } from "react";

export interface FoodEntryProps {
  food: Food;
  addToCart: (food: Food, quantity?: number) => void;
  max: number;
}

export const foodCategoryColors = {
  burger: "bg-green-200",
};

export function FoodEntry({ food, addToCart, max }: FoodEntryProps) {
  const [orderQuantity, setOrderQuantity] = useState<number>(1);

  return (
    <div className="flex flex-col p-4 rounded-lg bg-base-100 text-base-content">
      <div className="py-8 md:flex">
        <p className="flex-1 line-clamp-1">{food.name}</p>
        <p>Stock: {max}</p>
      </div>

      <section className="flex flex-col space-y-2">
        <label className="flex items-center justify-center flex-1 w-full space-x-2 ">
          <p className="font-semibold">Quantity:</p>
          <input
            type="number"
            value={orderQuantity}
            onChange={(e) => {
              setOrderQuantity(parseInt(e.target.value));
            }}
            max={max}
            min={1}
            className="w-1/2 text-center rounded-lg h-9"
          />
        </label>
        <button
          className={`ml-auto btn w-full ${
            categoryColorHelper(food.category).button
          } `}
          disabled={orderQuantity > max || orderQuantity < 1 || !orderQuantity}
          onClick={() => {
            addToCart(food, orderQuantity);
          }}
        >
          {orderQuantity > max
            ? "We dont have that much stocks"
            : "Add to cart"}
        </button>
      </section>
    </div>
  );
}
