import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useTimesheets from "../../hooks/useTimesheets";
import TimesheetTable from "../../components/timesheet/TimesheetTable";
import TimesheetModal from "../../components/timesheet/TimesheetModal";

export default function Dashboard() {
  const router = useRouter();
  const { data = [], loading, refresh } = useTimesheets();

  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const token = sessionStorage.getItem("timesheet_token");

    if (!token) {
      router.push("/");
    } else {
      setAuthLoading(false);
    }
  }, []);

  const handleEdit = (item: any) => {
    setEditItem(item);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditItem(null);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/timesheets", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    refresh();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  // pagination logic
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

 
   return (
  <div className="min-h-screen bg-gradient-to-b from-[#F7F8FA] to-[#EEF2F7]">

    {/* TOP NAV */}
    <div className="w-full bg-white/80 backdrop-blur border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-900">Ticktock</span>
        <span className="text-xs text-gray-400">Timesheet</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">John Doe</span>

        <button
          onClick={() => {
            sessionStorage.removeItem("timesheet_token");
            router.push("/");
          }}
          className="text-sm text-red-500 hover:text-red-600"
        >
          Logout
        </button>
      </div>
    </div>

    {/* CENTER WRAPPER */}
    <div className="flex justify-center">
      <div className="w-full max-w-6xl m-6">

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">

          {/* HEADER */}
          <div className="px-6 py-5 flex justify-between items-center border-b border-gray-100">

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Your Timesheets
              </h1>             
            </div>

            <button
              onClick={handleAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition"
            >
              + Add Timesheet
            </button>

          </div>

          {/* FILTER BAR */}
          <div className="px-6 py-4 flex items-center gap-3  border-b border-gray-100">

            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500">
              <option>Date Range</option>
            </select>

            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring-2 focus:ring-blue-500">
              <option>Status</option>
            </select>

            <div className="ml-auto text-sm text-gray-500">
              Total: <span className="font-semibold text-gray-800">{data.length}</span>
            </div>

          </div>

          {/* TABLE */}
          <div className="p-5">

            <TimesheetTable
              data={paginatedData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* PAGINATION */}
            <div className="flex justify-between items-center mt-6">

              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition"
              >
                ← Prev
              </button>

              <span className="text-sm text-gray-600">
                Page <b>{page}</b> of {totalPages || 1}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition"
              >
                Next →
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>

    {/* MODAL */}
    {open && (
      <TimesheetModal
        onClose={() => {
          setOpen(false);
          setEditItem(null);
        }}
        refresh={refresh}
        editItem={editItem}
      />
    )}

  </div>
);
}
