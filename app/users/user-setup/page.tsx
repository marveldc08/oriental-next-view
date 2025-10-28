"use client";

import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Header from "../../../components/Header";
import { useLocalStorageObject } from "../../../hooks/useLocalStorage";
import { toast } from "react-toastify";

// ✅ Define types outside the component (cleaner)
type User = {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  employeeId?: string;
  roles: { name: string }[];
  status?: string;
  dateCreated?: string;
  firstLogindate?: string;
};

type Role = {
  id: number;
  name: string;
};

type Staff = {
  id: number;
  userName: string;
  emailAddress: string;
};

type Status = {
  id: number;
  name: string;
};

export default function UserManagementPage() {
  // ✅ Ensure proper typing for custom hook
  const [user] = useLocalStorageObject<User | null>("user", null);
  const [token] = useLocalStorageObject<string | null>("token", null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [staffs, setStaffs] = useState<Staff[]>([]);

  const [userName, setUserName] = useState<string>("");
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // ✅ Add event typing
  const handleStaffChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedUserName = e.target.value;
    const staff = staffs.find((s) => s.userName === selectedUserName) || null;
    setSelectedStaff(staff);
  };

  const handleRoleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRoleName = e.target.value;
    const role = roles.find((r) => r.name === selectedRoleName) || null;
    setSelectedRole(role);
  };

  useEffect(() => {
    if (user) {
      setUserName(`${user.firstName} ${user.lastName}`);
    } else {
      console.log("No user data found.");
    }
  }, [user]);

  // ✅ safer error typing
  const getRoles = useCallback(async () => {
    try {
      const response = await fetch("/api/roles/get-roles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error fetching roles: ${response.status} ${errorText}`);
        throw new Error("Failed to fetch roles");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching roles:", error.message);
      throw error;
    }
  }, [token]);

  const getStatuses = useCallback(async () => {
    try {
      const response = await fetch("/api/statuses/get-statuses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error fetching statuses: ${response.status} ${errorText}`);
        throw new Error("Failed to fetch statuses");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching statuses:", error.message);
    }
  }, [token]);

  const getUsers = useCallback(async () => {
    try {
      const response = await fetch("/api/users/get-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error fetching users: ${response.status} ${errorText}`);
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
    }
  }, [token]);

  const getStaffs = useCallback(async () => {
    try {
      const response = await fetch("/api/staffs/get-staffs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error fetching staffs: ${response.status} ${errorText}`);
        throw new Error("Failed to fetch staffs");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error fetching staffs:", error.message);
    }
  }, [token]);

  const createUser = async (staffId: number, roleId: number) => {
    try {
      const response = await fetch("/api/users/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ staffId, roleId }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error creating user: ${response.status} ${errorText}`);
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error creating user:", error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      console.warn("Token is not available yet.");
      return;
    }

    const fetchAll = async () => {
      const [roleData, statusesData, usersData, staffsData] = await Promise.all([
        getRoles(),
        getStatuses(),
        getUsers(),
        getStaffs(),
      ]);

      if (roleData) setRoles(roleData.data);
      if (statusesData) setStatuses(statusesData.data);
      if (usersData) setUsers(usersData.data);
      if (staffsData) setStaffs(staffsData.data);
    };

    fetchAll();
  }, [token, getRoles, getStatuses, getUsers, getStaffs]);

  // ✅ Properly type event
  const handleCreateUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedStaff || !selectedRole) {
      console.error("Staff or Role not selected");
      return;
    }

    try {
      await createUser(selectedStaff.id, selectedRole.id);
      toast.success("User created successfully!");
      setShowModal(false);
    } catch (error: any) {
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div className="page-container">
      <Header pageName="Users" moduleName="User Setup" userName={userName} />
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              {/* Content */}
              <div className="row" style={{ width: "100%" }}>
                <div className="col-xl-12 col-lg-12 mt-5">
                  <div className="card border-left-primary">
                    <div className="card-body">
                      <h4 className="header-title">Platform Users</h4>

                      {/* Filters */}
                      <form className="needs-validation" noValidate>
                        <div className="form-row">
                          <div className="col-md-3 mb-3">
                            <label>Status</label>
                            <select className="form-control">
                              <option>Select a Status</option>
                              {statuses.map((status) => (
                                <option key={status.id} value={status.name}>
                                  {status.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-md-3 mb-3">
                            <label>Role</label>
                            <select className="form-control">
                              <option value="">Select Role</option>
                              {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                  {role.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-md-3 mb-3">
                            <label>Start Date</label>
                            <input className="form-control" type="date" />
                          </div>

                          <div className="col-md-3 mb-3">
                            <label>End Date</label>
                            <input className="form-control" type="date" />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="col-md-3 mb-3">&nbsp;</div>
                          <div className="col-md-3 mb-3">
                            <button
                              className="btn btn-primary btn-block"
                              type="button"
                              onClick={() => setShowModal(true)}
                            >
                              <i className="fa fa-plus-circle"></i>&nbsp;Create New User
                            </button>
                          </div>
                          <div className="col-md-3 mb-3">
                            <button className="btn btn-outline-primary btn-block" type="submit">
                              <i className="fa fa-search"></i> Search
                            </button>
                          </div>
                          <div className="col-md-3 mb-3">
                            <button className="btn btn-outline-danger btn-block" type="reset">
                              <i className="fa fa-recycle"></i> Clear Filter
                            </button>
                          </div>
                        </div>
                      </form>

                      <hr />

                      {/* Table */}
                      <div className="table-responsive">
                        <table className="table table-borderless" id="dataTable" width="100%">
                          <thead className="bg-light">
                            <tr>
                              <th></th>
                              <th>Staff ID</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email Address</th>
                              <th>Role</th>
                              <th>Status</th>
                              <th>Date Created</th>
                              <th>First Login Date</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((u) => (
                              <tr key={u.id}>
                                <td>
                                  <input type="checkbox" id={`check${u.id}`} />
                                </td>
                                <td>{u.employeeId}</td>
                                <td>{u.firstName}</td>
                                <td>{u.lastName}</td>
                                <td>{u.emailAddress}</td>
                                <td>{u.roles?.[0]?.name}</td>
                                <td>
                                  <span className="badge badge-pill badge-primary">{u.status}</span>
                                </td>
                                <td>{u.dateCreated}</td>
                                <td>{u.firstLogindate}</td>
                                <td>
                                  <PopupState variant="popover" popupId={`popup-${u.id}`}>
                                    {(popupState) => (
                                      <>
                                        <Button {...bindTrigger(popupState)}>
                                          <i className="fa fa-ellipsis-h"></i>
                                        </Button>
                                        <Popover
                                          {...bindPopover(popupState)}
                                          anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                          }}
                                          transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                          }}
                                        >
                                          <div className="actionBtn p-2">
                                            <a
                                              className="btn btn-outline-primary"
                                              href={`/users/user-detail?id=${u.id}`}
                                            >
                                              <i className="fa fa-eye"></i>&nbsp;View
                                            </a>
                                          </div>
                                        </Popover>
                                      </>
                                    )}
                                  </PopupState>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal */}
                {showModal && (
                  <div
                    className="modal show d-block"
                    tabIndex={-1}
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Create New User</h5>
                          <button
                            type="button"
                            className="close"
                            onClick={() => setShowModal(false)}
                          >
                            <span>&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form noValidate>
                            <div className="form-row">
                              <div className="col-md-6 mb-3">
                                <label>Staffs</label>
                                <select
                                  className="form-control"
                                  onChange={handleStaffChange}
                                  value={selectedStaff?.userName || ""}
                                >
                                  <option value="">Select Staff</option>
                                  {staffs.map((s) => (
                                    <option key={s.id} value={s.userName}>
                                      {s.userName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-md-6 mb-3">
                                <label>Role</label>
                                <select
                                  className="form-control"
                                  onChange={handleRoleChange}
                                  value={selectedRole?.name || ""}
                                >
                                  <option value="">Select Role</option>
                                  {roles.map((r) => (
                                    <option key={r.id} value={r.name}>
                                      {r.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="form-row">
                              <div className="col-md-6 mb-3">
                                <label>Staff ID</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={selectedStaff?.id || ""}
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label>Email Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  disabled
                                  value={selectedStaff?.emailAddress || ""}
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={handleCreateUser}
                          >
                            <i className="fa fa-plus-circle"></i>&nbsp;Create
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
