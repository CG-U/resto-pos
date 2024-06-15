import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { AddToInventory, CreateFood, Order } from "./pages/components";

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
  price: number;
  stock: number;
};

export const categories: Category[] = ["burgers", "desert", "drink", "sides"];

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

function App() {
  const [menu, setMenu] = useState<Food[]>();
  const [location, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    getMenu();
  }, []);

  function getMenu() {
    const dbReference = ref(getDatabase());
    get(child(dbReference, "menu"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const menuData = snapshot.val();
          const menuArray = Object.keys(menuData).map((itemName) => ({
            ...menuData[itemName],
            name: itemName,
          }));
          setMenu(menuArray);
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
          <Link to={"/order"} className="text-2xl font-black">
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
        <div className="flex-1 h-full p-4 overflow-y-auto ">
          <Routes>
            <Route path="/inventory">
              <Route path="" element={<AddToInventory />} />
              <Route
                path="create-food"
                element={<CreateFood getMenu={getMenu} />}
              />
            </Route>
            <Route
              path="/order"
              element={<Order menu={menu} getMenu={getMenu} />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
