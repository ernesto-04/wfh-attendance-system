import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../api/axios";

type Attendance = {
  id: number;
  notes?: string;
  photoPath: string;
  createdAt: string;

  employee?: {
    name: string;
    email: string;
  };
};

function AttendanceHistoryPage() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchAttendances = async () => {
    try {
      const endpoint = user.role === "ADMIN" ? "/attendance" : "/attendance/my";

      const response = await api.get(endpoint);

      setAttendances(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadAttendances = async () => {
      await fetchAttendances();
    };

    loadAttendances();
  }, []);

  return (
    <DashboardLayout>
      <div className="bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Attendance History</h1>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                {user.role === "ADMIN" && (
                  <th className="border px-4 py-2">Employee</th>
                )}

                <th className="border px-4 py-2">Notes</th>

                <th className="border px-4 py-2">Photo</th>

                <th className="border px-4 py-2">Check In Time</th>
              </tr>
            </thead>

            <tbody>
              {attendances.length === 0 ? (
                <tr>
                  <td
                    colSpan={user.role === "ADMIN" ? 4 : 3}
                    className="border px-4 py-8 text-center text-gray-500"
                  >
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                attendances.map((attendance) => (
                  <tr key={attendance.id}>
                    {user.role === "ADMIN" && (
                      <td className="border px-4 py-2">
                        <div>
                          <p className="font-medium">
                            {attendance.employee?.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {attendance.employee?.email}
                          </p>
                        </div>
                      </td>
                    )}

                    <td className="border px-4 py-2">{attendance.notes}</td>

                    <td className="border px-4 py-2">
                      <img
                        src={`${API_URL}/uploads/${attendance.photoPath}`}
                        alt="Attendance"
                        className="w-24 h-24 object-cover rounded"
                      />
                    </td>

                    <td className="border px-4 py-2">
                      {new Date(attendance.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AttendanceHistoryPage;
