import { useMemo, useState } from "react";
import { database, Food, categories, Category } from "../../../App";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

export interface CreateFoodProps {
  menu: Food[];
}

export function CreateFood({ menu }: CreateFoodProps) {
  const [foodName, setFoodname] = useState("");
  const [category, setCategory] = useState<Category>("burgers");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState(0);

  const foodExistsInMenu = useMemo(
    () =>
      menu.some(
        (menuItem) =>
          menuItem.name.replaceAll(" ", "").toLowerCase() ===
          foodName.replaceAll(" ", "").toLowerCase()
      ),
    [foodName]
  );

  const navigate = useNavigate();
  function addFoodToMenu(food: Food) {
    set(ref(database, "menu/" + food.name), {
      category: food.category,
      name: food.name,
      price: food.price,
      stock: food.stock,
    }).then(() => {
      clear();
      navigate("/inventory");
    });
  }

  function clear() {
    setFoodname("");
    setPrice(0);
    setStock(0);
  }

  return (
    <div className="box-border flex flex-col justify-between w-full h-full max-h-full p-4 rounded-lg bg-base-100">
      <h1 className="w-full text-xl font-black text-center text-accent">
        ADD FOOD
      </h1>
      <label>
        <p>Category</p>
        <select
          className="w-full p-2 rounded-lg select-primary"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as Category);
          }}
        >
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </label>

      <label className="flex flex-col space-y-2">
        <p>Food Name</p>
        <input
          type="text"
          className="p-2 rounded-lg input-primary"
          value={foodName}
          onChange={(e) => {
            setFoodname(e.target.value);
          }}
        />
      </label>
      <label className="flex flex-col space-y-2">
        <p>Price</p>
        <input
          type="number"
          className="p-2 rounded-lg input-primary"
          value={price}
          onChange={(e) => {
            setPrice(parseInt(e.target.value));
          }}
        />
      </label>
      <label className="flex flex-col space-y-2">
        <p>Stock</p>
        <input
          type="number"
          className="p-2 rounded-lg input-primary"
          value={stock}
          onChange={(e) => {
            setStock(parseInt(e.target.value));
          }}
        />
      </label>
      <button
        onClick={() => {
          addFoodToMenu({
            category: category,
            name: foodName,
            price: price,
            stock: stock,
          });
        }}
        className="ml-auto btn btn-primary"
        disabled={
          price <= 0 ||
          stock < 1 ||
          !price ||
          !stock ||
          !foodName ||
          foodExistsInMenu
        }
      >
        {foodExistsInMenu ? "Already In The Menu" : "Add Sample Food"}
      </button>
    </div>
  );
}
