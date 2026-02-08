import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
export default function AssignmentHeaderControlButtons() {
  return (
    <div className="float-end d-flex align-items-center gap-2">
      <div className="border rounded px-2 py-1">40% of Total</div>
      <FaPlus />
      <IoEllipsisVertical />
    </div>
  );
}
