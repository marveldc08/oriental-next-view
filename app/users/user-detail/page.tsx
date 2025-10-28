"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
// @ts-ignore: allow CSS side-effect import without type declarations
import "../../../public/assets/css/bootstrap.min.css";
// import "@/public/assets/css/styles.css";
// @ts-ignore: allow CSS side-effect import without type declarations
import "../../../public/assets/css/styles.css";
import Header from "../../../components/Header";
import { useLocalStorageObject } from "../../../hooks/useLocalStorage";
import {useSearchParams} from "next/navigation";  
import formatDate from "../../../components/DateFormater";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserInformationPage />
    </Suspense>
  );
}

function UserInformationPage() {
  type User = {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    // add other properties as needed
  };
      const [user, setUser] = useLocalStorageObject<User | null>("user", null);
      const [activeTab, setActiveTab] = useState<"basic" | "roles">("basic");
      const [token, setToken] = useLocalStorageObject("token", null);
      const [userName, setUserName] = useState("");
      const [symUser, setSymUser] = useState<any>({});
      const [users, setUsers] = useState<User[]>([])

      const searchParams = useSearchParams();
      const userId = searchParams.get("id");

      const rawDateCreated = symUser.dateCreated ? symUser.dateCreated : "";
      const rawFirstLoginDate = symUser.firstLoginDate ? symUser.firstLoginDate : "";
      console.log("Raw Date Created:", rawFirstLoginDate);
      const dateCreated = formatDate(rawDateCreated);
      const firstLoginDate = formatDate(rawFirstLoginDate);

      const getUser = useCallback(async () => {
        try {
          const response = await fetch(`/api/users/get-users/${userId}?id=${userId}`,{
            method: "GET",
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
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
      }, [token, userId]);

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
  
      useEffect(() => {
        if (user) {
          setUserName(`${user.firstName} ${user.lastName}`);
        } else {
          console.log("No user data found.");
        }

        const fetchUser = async () => {
          const usersData = await getUser();
          if (usersData) {
            setSymUser(usersData.data);
          }
        };

        const fetchUsers = async () => {
          const usersData = await getUsers();
          if (usersData) {
            setUsers(usersData.data);
          }
        };

        fetchUser();
        fetchUsers();
      }, [user, getUser, getUsers]);


    const handleSerarch = async(e: React.FormEvent, userId: number) => {
      e.preventDefault(); 
      
        try {
          const response = await fetch(`/api/users/get-users/${userId}`,{
            method: "GET",
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          })
    
          if (!response.ok) {
            console.log(`Error fetching users: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch users");
          }
    
          const data = await response.json();
          console.log("Fetched user data:", data);
    
          return data;
        } catch (error) {
          console.log("Error fetching users:", error);
        }
     
    }
  return (
    <div className="page-container">
      <Header pageName="Users" moduleName="User Detail" userName={userName} />
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <div className="row" style={{ width: "100%" }}>
                <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
                  <div className="card border-left-primary">
                    <div className="card-body">
                      <h4 className="header-title">User Information</h4>

                      {/* Search Form */}
                      <div className="col-md-6 offset-md-3">
                        <form>
                          <div className="form-row align-items-center">
                            <h3>Search User: <i className="fa fa-search" /></h3>
                            <div className="col-sm-7 my-1">
                              <select className="form-control" onChange={(e) => setSymUser(users.find(user => user.id === Number(e.target.value)) || {})}>
                                <option>Select User</option>
                                {users.map((user: any) => (
                                  <option key={user.id} value={user.id}>
                                    {user.firstName} {user.lastName}
                                  </option>
                                ))}
                              </select>
                        
                            </div>
                            {/* <div className="col-sm-5 my-1">
                              <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                onClick={(e) => handleSerarch(e, Number(symUser.id))}
                              >
                                <i className="fa fa-search" /> Search
                              </button>
                            </div> */}
                          </div>
                        </form>
                      </div>

                      <hr />
                      <br />

                      {/* Tabs */}
                      <div className="card">
                        <div className="card-body">
                          <ul className="nav nav-tabs">
                            <li className="nav-item">
                              <button
                                className={`nav-link ${
                                  activeTab === "basic" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("basic")}
                              >
                                Basic Information
                              </button>
                            </li>
                            <li className="nav-item">
                              <button
                                className={`nav-link ${
                                  activeTab === "roles" ? "active" : ""
                                }`}
                                onClick={() => setActiveTab("roles")}
                              >
                                Role & Permissions
                              </button>
                            </li>
                          </ul>

                          {/* Tab Content */}
                          <div className="tab-content mt-3">
                            {activeTab === "basic" && (
                              <div className="tab-pane fade show active">
                                <div
                                  className="col-md-10"
                                  style={{ padding: "30px" }}
                                >
                                  <form>
                                    <div className="form-row">
                                      <div className="col-md-6 mb-3">
                                        <label>Staff ID</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled
                                          value={symUser.roles ? symUser.id : ""}
                                        />
                                      </div>
                                      <div className="col-md-6 mb-3">
                                        <label>Email Address</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled
                                          value={symUser.roles ? symUser.emailAddress : ""}
                                        />
                                      </div>
                                    </div>

                                    <div className="form-row">
                                      <div className="col-md-6 mb-3">
                                        <label>First Name</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled
                                          value={symUser.roles ? symUser.firstName : ""}
                                        />
                                      </div>
                                      <div className="col-md-6 mb-3">
                                        <label>Last Name</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled
                                          value={symUser.roles ? symUser.lastName : ""}
                                        />
                                      </div>
                                    </div>

                                    <div className="form-row">
                                      <div className="col-md-6 mb-3">
                                        <label>Default Role</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled
                                          value={symUser.roles ? symUser.roles[0].name : ""}
                                        />
                                      </div>
                                      <div className="col-md-6 mb-3">
                                        <label>Status</label>
                                        <div>
                                          <span className="badge badge-pill badge-primary">
                                           {symUser.status ? symUser.status : ""}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="form-row">
                                      <div className="col-md-6 mb-3">
                                        <label>Date Created</label>
                                        <div className="text-secondary">
                                          &nbsp;{dateCreated}
                                        </div>
                                      </div>
                                      <div className="col-md-6 mb-3">
                                        <label>First Login Date</label>
                                        <div className="text-secondary">
                                          &nbsp;{firstLoginDate || "Wednesday, 10th April, 2024 by 12:00pm"}
                                        </div>
                                      </div>
                                    </div>

                                    <br />
                                    <button
                                      className="btn btn-primary disabled"
                                      type="button"
                                    >
                                      <i className="fa fa-upload"></i>
                                      &nbsp;Update User Information
                                    </button>
                                    <button
                                      className="btn btn-danger ml-2"
                                      type="submit"
                                    >
                                      <i className="fa fa-remove"></i>
                                      &nbsp;Deactivate User
                                    </button>
                                  </form>
                                </div>
                              </div>
                            )}

                            {activeTab === "roles" && (
                              <div className="tab-pane fade show active">
                                <div
                                  className="col-md-10"
                                  style={{ padding: "30px" }}
                                >
                                  <div id="accordion2">
                                    <div className="card">
                                      <div className="card-header">
                                        <div
                                          // className="btn btn-link"
                                          // data-toggle="collapse"
                                          // data-target="#adminAccordion"
                                        >
                                         <b>Role: </b> { symUser.roles ? symUser.roles[0].name : "" }
                                        </div>
                                      </div>
                                      <div
                                        id="adminAccordion"
                                        className="collapse show"
                                      >
                                        
                                        <div className="card-body">
                                          <b>Permissions: </b>{" "}
                                          <span className="badge badge-pill badge-dark font-weight-bold">
                                            Configure Time Parameters
                                          </span>{" "}
                                          <span className="badge badge-pill badge-dark font-weight-bold">
                                            Create Periods
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* <div className="card">
                                      <div className="card-header">
                                        <button
                                          className="btn btn-link collapsed"
                                          data-toggle="collapse"
                                          data-target="#admin2Accordion"
                                        >
                                          Lifting Administrator
                                        </button>
                                      </div>
                                      <div
                                        id="admin2Accordion"
                                        className="collapse"
                                      >
                                        <div className="card-body">
                                          Lorem ipsum dolor sit amet
                                          consectetur, adipisicing elit.
                                          Quisquam, voluptatem.
                                        </div>
                                      </div>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* End card */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
