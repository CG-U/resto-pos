import { useMemo } from "react";
import { Food } from "../../../App";

export interface CartDisplaySectionProps {
  billDivRef?: React.RefObject<HTMLDivElement>;
  cart: {
    food: Food;
    quantity: number;
  }[];
}

export function CartDisplaySection({
  billDivRef,
  cart,
}: CartDisplaySectionProps) {
  const computeSubtotal = () => {
    let subtotal = 0;

    if (cart.length > 0)
      cart.forEach(
        (cartItem) => (subtotal += cartItem.food.price * cartItem.quantity)
      );

    if (billDivRef?.current) {
      billDivRef.current.scrollTop = billDivRef.current.scrollHeight;
    }

    return subtotal;
  };
  const cartValue = useMemo(() => computeSubtotal(), [cart]);
  return (
    <div className="flex flex-col justify-between w-full h-full p-2 bg-white rounded-lg md:w-1/3">
      <div className="h-full overflow-y-scroll" ref={billDivRef}>
        {cart.map((cartContent) => {
          return (
            <div className="flex justify-between space-x-2">
              <p className="flex-1 line-clamp-1 hover:line-clamp-none active:line-clamp-none">
                {cartContent.food.name}
              </p>
              <p className="w-fit">
                {cartContent.quantity} x {cartContent.food.price}
              </p>
            </div>
          );
        })}
      </div>

      <section className="flex justify-between w-full mb-2 border-black border-y-2">
        <p className="font-semibold">TOTAL:</p>
        <p className="font-bold">{cartValue}</p>
      </section>
      <button className="btn">Complete Order</button>
    </div>
  );
}
