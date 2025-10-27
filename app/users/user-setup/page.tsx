"use client";

import React, { useState, useEffect, useCallback} from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Header from "../../../components/Header";
import { useLocalStorageObject } from "../../../hooks/useLocalStorage";
import { toast } from "react-toastify";






export default function UserManagementPage() {
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([])
  const [statuses, setStatuses] = useState([])
  const [users, setUsers] = useState([])
  const [staffs, setStaffs] = useState([])

  const [user, setUser] = useLocalStorageObject("user", null);
  const [token, setToken] = useLocalStorageObject("token", null);
  const [userName, setUserName] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleStaffChange = (e) => {
    const selectedUserName = e.target.value;
    const staff = staffs.find((s) => s.userName === selectedUserName);
    setSelectedStaff(staff);
  };
  const handleRoleChange = (e) => {
    const selectedRoleName = e.target.value;
    const role = roles.find((r) => r.name === selectedRoleName);
    setSelectedRole(role);
  };


  useEffect(() => {
    if (user) {
      setUserName(`${user.firstName} ${user.lastName}`);
     
    } else {
      console.log("No user data found.");
    }
  }, [user]);





  const getRoles = useCallback(async () => {
    try {
      const response = await fetch('/api/roles/get-roles', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // console.log(`Error fetching roles: ${response.status} ${response.text()}`);
          const errorText = await response.text();
         console.error(`Error fetching roles: ${response.status} ${errorText}`);
        throw new Error("Failed to fetch roles");
      }

      const data = await response.json();
      console.log(data)

      return data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      console.error("Error fetching roles:", error.message, error.stack);
      throw error; // Re-throw the error to handle it in the calling function

    }
  }, [token]);

  const getStatuses = useCallback(async () => {
    try {
      const response = await fetch("/api/statuses/get-statuses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
          const errorText = await response.text();
  console.error(`Error fetching statuses: ${response.status} ${errorText}`);
        // console.log(`Error fetching statuses: ${response.status} ${response.text()}`); nb
        throw new Error("Failed to fetch statuses");
      }

      const data = await response.json();
      console.log(data)

      return data;
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  }, [token]);

  const getUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/users/get-users',{
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        // console.log(`Error fetching users: ${response.status} ${response.text()}`);
        const errorText = await response.text();
         console.error(`Error fetching roles: ${response.status} ${errorText}`);
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      console.log(data)

      return data;
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  }, [token]);

  const getStaffs = useCallback(async () => {
    try {
      const response = await fetch('/api/staffs/get-staffs',{
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        console.log(`Error fetching users: ${response.status} ${response.text()}`);
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  }, [token]);

  const createUser = async (staffId: number, roleId: number) => {
    try {
      const response = await fetch('/api/users/create-user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ staffId, roleId }),
      });

      if (!response.ok) {
        console.log(`Error creating user: ${response.status} ${response.text()}`);
        throw new Error("Failed to create user");
      }

      const data = await response.json();
  
      return data;
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      console.warn("Token is not available yet.");
      return;
    }

    const fetchRoles = async () => {
      const roleData = await getRoles();
      if (roleData) {
        setRoles(roleData.data);
      }
    };

    const fetchStatuses = async () => {
      const statusesData = await getStatuses();
      if (statusesData) {
        setStatuses(statusesData.data);
      }
    };

    const fetchUsers = async () => {
      const usersData = await getUsers();
      if (usersData) {
        setUsers(usersData.data);
      }
    };
    const fetchStaffs = async () => {
      const staffsData = await getStaffs();
      if (staffsData) {
        setStaffs(staffsData.data); 
      }
    };

    fetchRoles();
    fetchStatuses();
    fetchUsers();
    fetchStaffs();

  }, [token, getRoles, getStatuses, getUsers, getStaffs]);





  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!selectedStaff) {
      console.error("No staff selected");
      return;
    }
    const staffId = selectedStaff.id;
    const roleId = selectedRole.id; 

    try {
      const newUser = await createUser(staffId, roleId);

      toast.success("User created successfully!");
      setShowModal(false); 

    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="page-container">
      <Header pageName="Users" moduleName="User Setup" userName={userName} />
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <div className="row" style={{ width: "100%" }}>
                {/* Page Header */}
                <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
                  <div className="card border-left-primary">
                    <div className="card-body">
                      <h4 className="header-title">Platform Users</h4>

                      <form className="needs-validation" noValidate>
                        <div className="form-row">
                          <div className="col-md-3 mb-3">
                            <label>Status</label>
                            <select className="form-control">
                              <option>Select a Status</option>
                              {statuses.map((status)=> (
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
                            <input
                              className="form-control"
                              type="date"
                              placeholder="Start Date"
                            />
                          </div>
                          <div className="col-md-3 mb-3">
                            <label>End Date</label>
                            <input
                              className="form-control"
                              type="date"
                              placeholder="End Date"
                            />
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
                              <i className="fa fa-plus-circle"></i>&nbsp;Create
                              New User
                            </button>
                          </div>
                          <div className="col-md-3 mb-3">
                            <button
                              className="btn btn-outline-primary btn-block"
                              type="submit"
                            >
                              <i className="fa fa-search"></i> Search
                            </button>
                          </div>
                          <div className="col-md-3 mb-3">
                            <button
                              className="btn btn-outline-danger btn-block"
                              type="submit"
                            >
                              <i className="fa fa-recycle"></i> Clear Filter
                            </button>
                          </div>
                        </div>
                      </form>

                      <br />
                      <hr />

                      <div className="table-responsive">
                        <table
                          className="table table-borderless"
                          id="dataTable"
                          width="100%"
                        >
                          <thead className="bg-light">
                            <tr>
                              <th>
                                <div className="custom-control custom-checkbox">
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="checkAll"
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="checkAll"
                                  ></label>
                                </div>
                              </th>
                              <th>Staff ID</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email Address</th>
                              <th>Role</th>
                              <th>Status</th>
                              <th>Date Created</th>
                              <th>First Login Date</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user) => (
                              <tr key={user.id}>
                                <td>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id={`check${user.id}`}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={`check${user.id}`}
                                    ></label>
                                  </div>
                                </td>
                                <td>{user.employeeId}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.emailAddress}</td>
                                <td>{user.roles[0].name}</td>
                                <td>
                                  <span className="badge badge-pill badge-primary">
                                    {user.status}
                                  </span>
                                </td>
                                <td>{user.dateCreated}</td>
                                <td>{user.firstLogindate}</td>
                                <td>
                                  <PopupState
                                    variant="popover"
                                    popupId="demo-popup-popover"
                                  >
                                    {(popupState) => (
                                      <div>
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
                                          <div className="actionBtn">
                                            <a
                                              className="btn btn-outline-primary"
                                              href={`/users/user-detail?id=${user.id}`}
                                            >
                                              <i className="fa fa-eye"></i>
                                              &nbsp;View
                                            </a>
                                          </div>
                                        </Popover>
                                      </div>
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
                    className="modal  show d-block"
                    tabIndex={-1}
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <div
                      className="modal-dialog modal-dialog-centered"
                      role="document"
                    >
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
                          <form className="needs-validation" noValidate>
                            <div className="form-row">
                              <div className="col-md-6 mb-3">
                                <label>Staffs</label>
                                <select className="form-control" onChange={handleStaffChange}>
                                  <option value="">Select Staff</option>
                                  {staffs.map((staff) => (
                                    <option key={staff.id} value={staff.userName}>
                                      {staff.userName} 
                                    </option>
                                  ))}
                                </select>
                          
                              </div>
                              <div className="col-md-6 mb-3">
                                <label>Role</label>
                                <select className="form-control" onChange={handleRoleChange}>
                                  <option value="">Select Role</option>
                                 {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                      {role.name}
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
                                  placeholder="Staff ID"
                                  value={selectedStaff ? selectedStaff.id : ""}
                                  disabled
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label>Email Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email Address"
                                  value={selectedStaff ? selectedStaff.emailAddress : ""}
                                  disabled
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="submit"
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
