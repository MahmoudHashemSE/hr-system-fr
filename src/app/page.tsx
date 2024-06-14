"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Drawer, Label, TextInput, Table } from "flowbite-react";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleClose = () => {
    setIsOpen(false);
    setSelectedEmployee(null);
    setFormData({ name: "", email: "" });
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://hr-system-api.azurewebsites.net/employees", {
        withCredentials: true,
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEditClick = (employee: any) => {
    setSelectedEmployee(employee);
    setFormData({ name: employee.name, email: employee.email });
    setIsOpen(true);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    const employee: any =
      selectedEmployee;
    if (employee) {
      try {
        await axios.put(
          `https://hr-system-api.azurewebsites.net/employees/${employee._id}`,
          formData,
          {
            withCredentials: true,
          }
        );
        fetchEmployees();
        handleClose();
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Employee name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Group</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {employees.map((employee: any) => (
              <Table.Row
                key={employee._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {employee.name}
                </Table.Cell>
                <Table.Cell>{employee.email}</Table.Cell>
                <Table.Cell>
                  {employee.group === "normalEmployee"
                    ? "Normal Employee"
                    : employee.group}
                </Table.Cell>
                <Table.Cell>
                  <>
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      onClick={() => handleEditClick(employee)}
                    >
                      Edit
                    </button>
                    <Drawer open={isOpen} onClose={handleClose}>
                      <Drawer.Header title="Update Employee" />
                      <Drawer.Items>
                        <form onSubmit={handleSave}>
                          <div className="mb-6 mt-3">
                            <div className="mb-6">
                              <Label htmlFor="name" className="mb-2 block">
                                Name
                              </Label>
                              <TextInput
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                              />
                            </div>
                            <Label htmlFor="email" className="mb-2 block">
                              Email
                            </Label>
                            <TextInput
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="mb-6">
                            <Button type="submit" className="w-full">
                              Save
                            </Button>
                          </div>
                        </form>
                      </Drawer.Items>
                    </Drawer>
                  </>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </main>
  );
}
