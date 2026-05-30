import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div>
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-bold cursor-pointer hover:text-gray-700 transition"
          >
            WFH Attendance System
          </h1>

          <p className="text-gray-500 text-sm">Welcome, {user.name}</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6">{children}</div>
    </div>
  );
}

export default DashboardLayout;
