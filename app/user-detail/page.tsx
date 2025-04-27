"use client";
import { useState } from "react";
import "../../public/assets/css/bootstrap.min.css";
// import "@/public/assets/css/styles.css";
import "../../public/assets/css/styles.css";
import Header from "../../components/Header";

export default function UserInformationPage() {
  const [activeTab, setActiveTab] = useState<"basic" | "roles">("basic");

  return (
    <div className="page-container">
      <Header pageName="Users" moduleName="User Detail" />
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
                            <div className="col-sm-7 my-1">
                              <select className="form-control">
                                <option>Select User</option>
                                <option>Active</option>
                                <option>New</option>
                                <option>Deactivated</option>
                              </select>
                            </div>
                            <div className="col-sm-5 my-1">
                              <button
                                type="submit"
                                className="btn btn-primary btn-block"
                              >
                                <i className="fa fa-search" /> Search
                              </button>
                            </div>
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
                                          placeholder="Staff ID"
                                        />
                                      </div>
                                      <div className="col-md-6 mb-3">
                                        <label>Email Address</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled
                                          placeholder="Email Address"
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
                                          placeholder="First Name"
                                        />
                                      </div>
                                      <div className="col-md-6 mb-3">
                                        <label>Last Name</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          disabled
                                          placeholder="Last Name"
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
                                          placeholder="Default Role"
                                        />
                                      </div>
                                      <div className="col-md-6 mb-3">
                                        <label>Status</label>
                                        <div>
                                          <span className="badge badge-pill badge-primary">
                                            New
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="form-row">
                                      <div className="col-md-6 mb-3">
                                        <label>Date Created</label>
                                        <div className="text-secondary">
                                          &nbsp;Wednesday, 10th April, 2024 by
                                          12:00pm
                                        </div>
                                      </div>
                                      <div className="col-md-6 mb-3">
                                        <label>First Login Date</label>
                                        <div className="text-secondary">
                                          &nbsp;Wednesday, 10th April, 2024 by
                                          12:00pm
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
                                        <button
                                          className="btn btn-link"
                                          data-toggle="collapse"
                                          data-target="#adminAccordion"
                                        >
                                          Super Administrator
                                        </button>
                                      </div>
                                      <div
                                        id="adminAccordion"
                                        className="collapse show"
                                      >
                                        <div className="card-body">
                                          <span className="badge badge-pill badge-dark font-weight-bold">
                                            Create User
                                          </span>{" "}
                                          <span className="badge badge-pill badge-dark font-weight-bold">
                                            Deactivate User
                                          </span>{" "}
                                          <span className="badge badge-pill badge-dark font-weight-bold">
                                            Configure Time Parameters
                                          </span>{" "}
                                          <span className="badge badge-pill badge-dark font-weight-bold">
                                            Create Periods
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="card">
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
                                    </div>
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
