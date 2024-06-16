import { Link } from "react-router-dom";
export function AddToInventory() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex items-center justify-center w-full h-full px-4 space-x-4 rounded-lg min-w-fit md:w-2/3 md:h-2/3 lg:w-1/3 lg:h-1/3 bg-base-100 drop-shadow-lg">
        <p className="font-bold">Choose Action:</p>
        <Link to="create-food" className="btn btn-outline btn-primary">
          Add Food To Menu
        </Link>
        <Link to="manage-stock" className="btn btn-outline btn-accent">
          Manage Stock
        </Link>
      </div>
    </div>
  );
}
