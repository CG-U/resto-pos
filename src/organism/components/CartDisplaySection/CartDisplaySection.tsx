import { useMemo, useState } from "react";
import { Food, database } from "../../../App";
import { getDatabase, set, push, ref, update } from "firebase/database";
import { Modal } from "../../../atom/components";

export interface CartDisplaySectionProps {
  billDivRef?: React.RefObject<HTMLDivElement>;
  cart: {
    food: Food;
    quantity: number;
  }[];
  clearCart: () => void;
  getMenu: () => void;
}

export function CartDisplaySection({
  billDivRef,
  cart,
  clearCart,
  getMenu,
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

  function writeReceipt(
    cart: { food: Food; quantity: number }[],
    cartValue: number
  ) {
    const salesRef = ref(database, "sales");
    push(salesRef, {
      cartValue: cart,
      total: cartValue,
    })
      .then((res) => {
        reduceStocksAfterPurchase();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function reduceStocksAfterPurchase() {
    const updates: any = {};

    cart.forEach(
      (cartItem) =>
        (updates["menu/" + cartItem.food.name] = {
          ...cartItem.food,
          stock: cartItem.food.stock - cartItem.quantity,
        })
    );
    update(ref(database), updates)
      .then(() => {
        setOrderCompleteModalOpen(true);
        // getMenu();
      })
      .catch((err) => console.log(err));
  }

  const [orderCompleteModalOpen, setOrderCompleteModalOpen] =
    useState<boolean>(false);

  function closeModal() {
    setOrderCompleteModalOpen(false);
    clearCart();
  }
  return (
    <div className="flex flex-col justify-between w-full h-full p-2 bg-white rounded-lg md:w-1/3">
      <Modal
        className="flex w-4/5 h-3/5"
        isOpen={orderCompleteModalOpen}
        onRequestClose={() => {
          closeModal();
        }}
      >
        <div className="flex flex-col items-center h-full">
          <h1 className="flex items-center flex-1 text-3xl font-bold">
            Order Completed!
          </h1>
          <button
            onClick={() => {
              closeModal();
            }}
            className="font-bold btn btn-success"
          >
            Next order
          </button>
        </div>
      </Modal>
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
      <button className="btn" onClick={() => writeReceipt(cart, cartValue)}>
        Complete Order
      </button>
    </div>
  );
}
