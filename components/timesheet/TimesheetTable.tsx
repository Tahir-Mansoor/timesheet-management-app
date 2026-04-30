import { Timesheet } from "../../types";

type Props = {
  data: Timesheet[];
  onEdit?: (item: Timesheet) => void;
  onDelete?: (id: number) => void;
};

export default function TimesheetTable({
  data,
  onEdit,
  onDelete,
}: Props) {
  return (
    <table className="w-full text-sm border-collapse">
      
      {/* HEADER */}
      <thead className="bg-gray-50 text-xs uppercase text-gray-500">
        <tr>
          <th className="p-3 text-left">Week</th>
          <th className="p-3 text-left">Date</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={4} className="p-6 text-center text-gray-400">
              No timesheets found. Click "Add Timesheet" to create one.
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr
              key={item.id}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >
              {/* WEEK */}
              <td className="p-3">{item.week}</td>

              {/* DATE */}
              <td className="p-3">
                {new Date(item.date).toLocaleDateString()}
              </td>

              {/* STATUS */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="p-3 flex gap-4">
                
                {/* EDIT */}
                <button
                  onClick={() => onEdit?.(item)}
                  className="text-blue-500 text-sm hover:underline transition"
                >
                  Edit
                </button>

                {/* DELETE */}
                <button
                  onClick={() => {
                    const confirmDelete = confirm(
                      "Are you sure you want to delete this timesheet?"
                    );
                    if (confirmDelete) {
                      onDelete?.(item.id);
                    }
                  }}
                  className="text-red-500 text-sm hover:underline transition"
                >
                  Delete
                </button>

              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}