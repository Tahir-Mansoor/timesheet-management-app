import { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
  refresh: () => void;
  editItem?: any;
};

export default function TimesheetModal({
  onClose,
  refresh,
  editItem,
}: Props) {
  const isEdit = !!editItem;

  const [week, setWeek] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editItem) {
      setWeek(editItem.week || "");
      setDate(editItem.date || "");
      setStatus(editItem.status || "Pending");
    }
  }, [editItem]);

  const handleSubmit = async () => {
    setError("");

    if (!week || !date) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/timesheets", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editItem?.id,
          week,
          date,
          status,
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      refresh();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full border border-gray-200 bg-gray-50 p-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[480px] rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* HEADER */}
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-base font-semibold text-gray-900">
            {isEdit ? "Edit Timesheet" : "Add Timesheet"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 space-y-4">
          <input
            value={week}
            placeholder="Week number"
            className={inputStyle}
            onChange={(e) => setWeek(e.target.value)}
          />

          <input
            type="date"
            value={date}
            className={inputStyle}
            onChange={(e) => setDate(e.target.value)}
          />

          <select
            value={status}
            className={inputStyle}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-5 py-4 border-t border-gray-200 flex justify-end gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "Saving..." : isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}