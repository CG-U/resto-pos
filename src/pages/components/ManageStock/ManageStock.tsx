import { useState } from "react";
import { Food, database } from "../../../App";
import { Modal } from "../../../atom/components";
import { ref, update } from "firebase/database";

export interface ManageStockProps {
  menu: Food[];
}

export function ManageStock({ menu }: ManageStockProps) {
  const [isManageStockModalOpen, setIsManageStockModalOpen] =
    useState<boolean>(false);
  const [currentMenuItem, setIsCurrentMenuItem] = useState<Food>();
  const [additionalStock, setAdditionalStock] = useState<number>(1);

  function updateStock(additionalStock: number, menuItem: Food) {
    const newStockValue = {
      ...menuItem,
      stock: menuItem.stock + additionalStock,
    };

    const updates: any = {};
    updates["/menu/" + menuItem.name] = newStockValue;

    return update(ref(database), updates);
  }
  return (
    <div className="box-border flex flex-col justify-between w-full h-full max-h-full p-4 overflow-y-scroll rounded-lg bg-base-100">
      <h1 className="text-2xl font-bold">Manage Stocks</h1>
      <Modal
        isOpen={isManageStockModalOpen}
        onRequestClose={() => setIsManageStockModalOpen(false)}
      >
        <p className="text-2xl font-bold">
          Add stock to {currentMenuItem?.name}:{" "}
        </p>
        <label className="flex w-full p-8 space-x-4">
          <p>Quantity</p>
          <input
            type="number"
            min={1}
            value={additionalStock}
            className="w-full text-center"
            onChange={(e) => setAdditionalStock(parseInt(e.target.value))}
          />
        </label>

        <button
          onClick={() => {
            if (currentMenuItem) {
              updateStock(additionalStock, currentMenuItem);
              setIsManageStockModalOpen(false);
            }
          }}
          className="btn btn-success"
          disabled={additionalStock < 1 || !additionalStock}
        >
          {additionalStock < 1 || !additionalStock ? "Invalid amount" : "Add"}
        </button>
      </Modal>
      <div className="flex flex-col mt-4 space-y-2">
        <div className="grid grid-cols-10 pb-2 border-b">
          <p className="flex items-center">Category</p>
          <p className="flex items-center col-span-6 row">Name</p>
          <p className="flex items-center">Price</p>
          <p className="flex items-center">Stock</p>
        </div>
        {menu.map((menuItem) => {
          return (
            <div
              key={menuItem.name}
              className="grid grid-cols-10 pb-2 border-b"
            >
              <p className="flex items-center">{menuItem.category}</p>
              <p className="flex items-center col-span-6 row">
                {menuItem.name}
              </p>
              <p className="flex items-center">{menuItem.price}</p>
              <p className="flex items-center">{menuItem.stock}</p>
              <button
                className="btn btn-info"
                onClick={() => {
                  setIsCurrentMenuItem(menuItem);
                  setIsManageStockModalOpen(true);
                }}
              >
                Add stocks +
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
