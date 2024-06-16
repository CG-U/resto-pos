import { onValue, ref } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import { CartItem, database } from "../../../App";

export interface SaleStatsProps {}

export function SaleStats() {
  const [saleStats, setSaleStats] = useState<CartItem[]>();
  const grossSales = useMemo(() => {
    let total = 0;
    saleStats?.forEach((saleStat) => (total += saleStat.total || 0));
    return total;
  }, [saleStats]);

  function getSalesStats() {
    const salesRef = ref(database, "sales");
    onValue(salesRef, (snapshot) => {
      const data = snapshot.val();

      const allCartItems: CartItem[] = Object.values(data).flatMap(
        (entry: any) => entry as CartItem
      );

      setSaleStats(allCartItems);
    });
  }
  useEffect(() => {
    getSalesStats();
  }, []);
  return (
    <div>
      <p className="text-2xl">
        Total Number of Sales:{" "}
        <span className="text-accent">{saleStats?.length}</span>
      </p>
      <p className="text-2xl">
        Total Gross Sales: <span className="text-success">{grossSales}</span>
      </p>

      <p className="mt-8 text-xl font-bold">Order History</p>
      {saleStats?.map((saleStat, index) => {
        return (
          <div key={index} className="grid grid-cols-10 p-4 border-b">
            <p className="col-span-2 font-bold"> Order number: {index + 1}</p>
            <div className="col-span-7 ">
              {saleStat.cartValue.map((cartItem) => {
                const { name, price } = cartItem.food;
                return (
                  <div key={index + name} className="w-full">
                    <div className="flex justify-between w-full px-8 ">
                      <p>{name}</p>
                      <p>
                        {cartItem.quantity} x P{price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="font-bold">Total: {saleStat.total}</p>
          </div>
        );
      })}
    </div>
  );
}
