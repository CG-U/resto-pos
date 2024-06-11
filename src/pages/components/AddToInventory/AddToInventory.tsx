export interface AddToInventoryProps {
  prop?: string;
}

export function AddToInventory({
  prop = "default value",
}: AddToInventoryProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-2 py-4">
      <div className="flex items-center justify-center w-full h-full space-x-4 rounded-lg md:w-2/3 md:h-2/3 lg:w-1/3 lg:h-1/3 bg-base-100 drop-shadow-lg">
        <p className="font-bold">Choose Action:</p>
        <button className="btn btn-outline btn-primary">
          Add Food To Menu
        </button>
        <button className="btn btn-outline btn-accent"> Manage Stock</button>
      </div>
    </div>
  );
}
