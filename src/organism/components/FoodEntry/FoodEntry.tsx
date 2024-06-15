import { Food, database } from "../../../App";
import { ref, set } from "firebase/database";
import { categoryColorHelper } from "../../../pages/components/Order";

export interface FoodEntryProps {
  food: Food;
  getMenu: () => void;
  addToCart: (food: Food, quantity?: number) => void;
}

export const foodCategoryColors = {
  burger: "bg-green-200",
};

export function FoodEntry({ food, getMenu, addToCart }: FoodEntryProps) {
  function removeFood(name: string) {
    set(ref(database, "menu/" + food.name), null).then(() => {
      getMenu();
    });
  }

  return (
    <div className="flex flex-col p-4 rounded-lg bg-base-100 text-base-content">
      <p className="flex-1">{food.name}</p>
      <p>Stock: {food.stock}</p>

      <section className="flex ">
        {/* <button
          onClick={() => {
            removeFood(food.name);
          }}
        >
          delete
        </button> */}

        <button
          className={`ml-auto btn ${
            categoryColorHelper(food.category).button
          } `}
          disabled={food.stock < 1}
          onClick={() => addToCart(food, 1)}
        >
          Add To Cart
        </button>
      </section>
    </div>
  );
}
