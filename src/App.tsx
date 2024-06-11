import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { useState, useEffect } from "react";
import { FoodEntry } from "./organism/components";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { AddToInventory, Order } from "./pages/components";

const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL:
    "https://resto-pos-c1516-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

export type Category = "drink" | "burgers" | "sides" | "desert";
export type Size = "" | "small" | "regular" | "large";
export type Food = {
  category: Category;
  name: string;
  size?: Size;
  price: number;
  stock: number;
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

function App() {
  const [menu, setMenu] = useState<{ [itemName: string]: Food } | null>(null);
  const [location, setLocation] = useState(window.location.pathname);

  const sampleFood: Food = {
    category: "burgers",
    name: "Double Cheese Burger",
    price: 350,
    size: "",
    stock: 100,
  };

  useEffect(() => {
    getMenu();
  }, []);

  function addFoodToMenu(food: Food) {
    set(ref(database, "menu/" + food.name), {
      category: food.category,
      name: food.name,
      size: food.size,
      price: food.price,
      stock: food.stock,
    }).then(() => {
      getMenu();
    });
  }

  function getMenu() {
    const dbReference = ref(getDatabase());
    get(child(dbReference, "menu"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setMenu(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-base-300">
        <nav className="flex justify-between navbar bg-base-100">
          <Link to={"/"} className="text-2xl font-black">
            Burger Garage POS
          </Link>
          <ul className="flex space-x-4">
            <Link
              onClick={() => {
                setLocation("order");
              }}
              to={"/order"}
              className={`${
                location.includes("order") ? "font-bold underline " : ""
              }  transition-all hover:font-bold  `}
            >
              Order
            </Link>
            <Link
              onClick={() => {
                setLocation("inventory");
              }}
              to={"/inventory"}
              className={`${
                location.includes("inventory") ? "font-bold underline " : ""
              }  transition-all hover:font-bold  `}
            >
              Inventory
            </Link>

            <Link
              onClick={() => {
                setLocation("sale-stats");
              }}
              to={"/sale-stats"}
              className={`${
                location.includes("sale-stats") ? "font-bold underline " : ""
              }  transition-all hover:font-bold  `}
            >
              Sales
            </Link>
          </ul>
        </nav>
        <div className="flex-1">
          <Routes>
            <Route path="/inventory" element={<AddToInventory />} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </div>

        {menu &&
          Object.entries(menu).map(([itemName, itemDetails]) => (
            <FoodEntry food={itemDetails} getMenu={getMenu} />
          ))}
        <button
          onClick={() => {
            addFoodToMenu(sampleFood);
          }}
        >
          Add sample food
        </button>
      </div>
    </BrowserRouter>
  );
}

export default App;
