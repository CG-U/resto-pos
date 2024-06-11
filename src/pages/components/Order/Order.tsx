import { Category, Food } from "../../../App";

export interface OrderProps {
  menu?: Food[];
}

export function Order({ menu }: OrderProps) {
  const categories: Category[] = ["burgers", "desert", "drink", "sides"];

  function categoryColorHelper(category: Category) {
    let colors;
    switch (category) {
      case "drink":
        colors = {
          background: "bg-yellow-100",
        };
        break;
      case "burgers":
        colors = {
          background: "bg-green-100",
        };
        break;
      case "sides":
        colors = {
          background: "bg-blue-100",
        };
        break;
      case "desert":
        colors = {
          background: "bg-pink-100",
        };
        break;
    }

    return colors;
  }

  return (
    <div className="w-full h-full px-2 py-4 bg-black">
      <div className="h-full p-4 rounded-lg bg-base-100">
        <nav className="flex items-center space-x-4">
          <p>Categories:</p>
          <ul className="flex flex-1 space-x-4">
            {categories.map((category) => {
              return (
                <li
                  key={category}
                  className={`${
                    categoryColorHelper(category).background
                  } text-accent-content py-1 px-2 w-fit flex-1 text-center rounded-lg drop-shadow-lg`}
                  role="button"
                >
                  {category.toUpperCase()}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
