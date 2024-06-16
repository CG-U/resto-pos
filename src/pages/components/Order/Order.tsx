import { useState, useRef } from "react";
import { Category, Food, categories } from "../../../App";
import { CartDisplaySection, FoodEntry } from "../../../organism/components";
import { Modal } from "../../../atom/components";

export interface OrderProps {
  menu?: Food[];
  getMenu: () => void;
}

export function Order({ menu, getMenu }: OrderProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<Category | null>(null);
  const [cart, setCart] = useState<{ food: Food; quantity: number }[]>([]);

  // Cart Total Purchase Calculator
  const billDivRef = useRef<HTMLDivElement>(null);

  function addToCart(food: Food, quantity?: number) {
    const cartIncludesTheFood = cart.some(
      (cartItem) => cartItem.food.name === food.name
    );

    if (cartIncludesTheFood) {
      const updatedCartItems = cart.map((cartItem) => {
        if (cartItem.food.name === food.name)
          return {
            food: cartItem.food,
            quantity: cartItem.quantity + (quantity || 0),
          };
        else return cartItem;
      });

      setCart(updatedCartItems);
    } else
      setCart((prev) => [...prev, { food: food, quantity: quantity || 1 }]);
  }

  function clearCart() {
    setCart([]);
  }

  function removeFoodFromCart(foodName: string) {
    setCart((prev) =>
      prev.filter((cartItem) => cartItem.food.name !== foodName)
    );
  }

  function getMaxOrderForAnItem(foodName: string) {
    const foodItemInCart = cart.find(
      (cartItem) => cartItem.food.name === foodName
    );
    const foodItemInMenu = menu?.find((menuItem) => menuItem.name === foodName);
    if (foodItemInCart && foodItemInMenu) {
      return foodItemInMenu.stock - foodItemInCart.quantity;
    }

    return foodItemInMenu?.stock || 0;
  }

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="flex flex-col h-full p-4 space-y-4 rounded-lg bg-base-100">
        <nav className="flex items-center justify-between space-x-4 md:justify-normal ">
          <p className="text-lg font-bold">Categories:</p>
          <ul className="flex-1 hidden space-x-4 md:flex">
            {categories.map((category) => {
              return (
                <li
                  key={category}
                  className={`${
                    categoryColorHelper(category).button
                  } btn flex-1 text-base-300 `}
                  role="button"
                  onClick={() => {
                    setFilterCategory(category);
                  }}
                >
                  {category.toUpperCase()}
                </li>
              );
            })}
            {filterCategory !== null && (
              <button className="btn" onClick={() => setFilterCategory(null)}>
                Clear filter
              </button>
            )}
          </ul>
          <span
            className="ml-auto transition-all material-symbols-outlined md:hidden active:text-base "
            role="button"
            onClick={() => {
              setIsFilterModalOpen(true);
            }}
          >
            menu
          </span>
          <Modal
            isOpen={isFilterModalOpen}
            onRequestClose={() => setIsFilterModalOpen(false)}
          >
            <ul className="flex-1 space-x-4">
              {categories.map((category) => {
                return (
                  <li
                    key={category}
                    className={`${
                      categoryColorHelper(category).button
                    } btn flex-1 text-base-300 `}
                    role="button"
                    onClick={() => {
                      setFilterCategory(category);
                      setIsFilterModalOpen(false);
                    }}
                  >
                    {category.toUpperCase()}
                  </li>
                );
              })}
              {filterCategory !== null && (
                <button className="btn" onClick={() => setFilterCategory(null)}>
                  Clear filter
                </button>
              )}
            </ul>
          </Modal>
        </nav>

        <section className="flex flex-col h-full space-y-4 md:space-y-0 md:flex-row md:space-x-4 text-slate-800 overflow-clip">
          {/* Menu Section */}
          <div className="grid w-full h-full grid-cols-2 gap-2 p-2 overflow-y-scroll bg-white rounded-lg">
            {menu?.map((foodItem) => {
              if (
                filterCategory === null ||
                foodItem.category === filterCategory
              )
                return (
                  <FoodEntry
                    food={foodItem}
                    addToCart={addToCart}
                    key={foodItem.name}
                    max={getMaxOrderForAnItem(foodItem.name)}
                  />
                );
            })}
          </div>

          {/* Cart / Computation */}
          {cart.length > 0 && (
            <CartDisplaySection
              cart={cart}
              billDivRef={billDivRef}
              removeFoodFromCart={removeFoodFromCart}
              clearCart={clearCart}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export function categoryColorHelper(category: Category) {
  let colors;
  switch (category) {
    case "drink":
      colors = {
        button: "btn-warning ",
      };
      break;
    case "burgers":
      colors = {
        button: "btn-success",
      };
      break;
    case "sides":
      colors = {
        button: "btn-info",
      };
      break;
    case "desert":
      colors = {
        button: "btn-error",
      };
      break;
  }

  return colors;
}
