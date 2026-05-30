import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

function DashboardPage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <DashboardLayout>
      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ATTENDANCE */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-3">Attendance</h2>

          <p className="text-gray-600 mb-6">
            Submit your work-from-home attendance.
          </p>

          <button
            onClick={() => navigate("/attendance")}
            className="bg-black text-white px-5 py-2 rounded"
          >
            Open Attendance
          </button>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-3">Attendance History</h2>

          <p className="text-gray-600 mb-6">
            View submitted attendance records.
          </p>

          <button
            onClick={() => navigate("/attendance-history")}
            className="bg-black text-white px-5 py-2 rounded"
          >
            Open History
          </button>
        </div>

        {/* EMPLOYEE MANAGEMENT */}
        {user.role === "ADMIN" && (
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-2xl font-bold mb-3">Employee Management</h2>

            <p className="text-gray-600 mb-6">
              Manage employee data and accounts.
            </p>

            <button
              onClick={() => navigate("/employees")}
              className="bg-black text-white px-5 py-2 rounded"
            >
              Open Employees
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
