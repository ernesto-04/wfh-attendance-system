import { useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../api/axios";

import { toast } from "react-toastify";

function AttendancePage() {
  const [notes, setNotes] = useState("");

  const [photo, setPhoto] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      return toast.error("Please select photo");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("photo", photo);

      formData.append("notes", notes);

      await api.post("/attendance/checkin", formData);

      toast.success("Attendance submitted");

      setNotes("");
      setPhoto(null);
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to submit attendance";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded shadow p-6 max-w-xl">
        <h1 className="text-2xl font-bold mb-6">Attendance Check-In</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Notes</label>

            <textarea
              className="w-full border rounded px-3 py-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Upload Photo</label>

            <div className="border rounded px-3 py-3 flex items-center gap-4">
              <label className="bg-gray-100 hover:bg-gray-200 border rounded px-4 py-2 cursor-pointer transition">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setPhoto(e.target.files[0]);
                    }
                  }}
                />
              </label>

              <span className="text-gray-600 text-sm">
                {photo ? photo.name : "No file chosen"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded"
          >
            {loading ? "Submitting..." : "Submit Attendance"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default AttendancePage;
