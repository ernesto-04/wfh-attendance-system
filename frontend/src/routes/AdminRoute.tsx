import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

function AdminRoute({ children }: Props) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;
