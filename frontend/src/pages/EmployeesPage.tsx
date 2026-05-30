import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../api/axios";

import { toast } from "react-toastify";

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  department?: string;
};

function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [department, setDepartment] = useState("");

  const [role, setRole] = useState("EMPLOYEE");

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");

      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/employees", {
        name,
        email,
        password,
        department,
        role,
      });

      toast.success("Employee created");

      setName("");
      setEmail("");
      setPassword("");
      setDepartment("");
      setRole("EMPLOYEE");

      fetchEmployees();
    } catch (error) {
      toast.error("Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Delete employee?");

    if (!confirmed) return;

    try {
      await api.delete(`/employees/${id}`);

      fetchEmployees();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <DashboardLayout>
      {/* CREATE FORM */}
      <div className="bg-white rounded shadow p-6 mb-8">
        <h1 className="text-2xl font-bold mb-6">Create Employee</h1>

        <form
          onSubmit={handleCreateEmployee}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="EMPLOYEE">EMPLOYEE</option>

            <option value="ADMIN">ADMIN</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded px-4 py-2"
          >
            {loading ? "Creating..." : "Create Employee"}
          </button>
        </form>
      </div>

      {/* EMPLOYEE TABLE */}
      <div className="bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Employee List</h1>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Name</th>

                <th className="border px-4 py-2">Email</th>

                <th className="border px-4 py-2">Role</th>

                <th className="border px-4 py-2">Department</th>

                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>

            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="border px-4 py-8 text-center text-gray-500"
                  >
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="border px-4 py-2">{employee.name}</td>

                    <td className="border px-4 py-2">{employee.email}</td>

                    <td className="border px-4 py-2">{employee.role}</td>

                    <td className="border px-4 py-2">{employee.department}</td>

                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
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

export default EmployeesPage;
