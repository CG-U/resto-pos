import { Food, database } from "../../../App";
import { ref, set } from "firebase/database";

export interface FoodEntryProps {
  food: Food;
  getMenu: () => void;
}

export const foodCategoryColors = {
  burger: "bg-green-200",
};

export function FoodEntry({ food, getMenu }: FoodEntryProps) {
  function removeFood(name: string) {
    set(ref(database, "menu/" + food.name), null).then(() => {
      getMenu();
    });
  }

  return (
    <div className="flex w-full ">
      <p className="flex-1">{food.name}</p>
      <p>{food.stock}</p>
      <button
        onClick={() => {
          removeFood(food.name);
        }}
      >
        delete
      </button>
    </div>
  );
}
