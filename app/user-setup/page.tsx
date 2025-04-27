"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Header from "../../components/Header";

export default function UserManagementPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page-container">
      <Header pageName="Users" moduleName="User Setup" />
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
                              <option>Active</option>
                              <option>New</option>
                              <option>Deactivated</option>
                            </select>
                          </div>
                          <div className="col-md-3 mb-3">
                            <label>Role</label>
                            <select className="form-control">
                              <option>Select a Role</option>
                              <option>Super Administrator</option>
                              <option>Lifting Administrator</option>
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
                            {[...Array(10)].map((_, idx) => (
                              <tr key={idx}>
                                <td>
                                  <div className="custom-control custom-checkbox">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id={`check${idx}`}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={`check${idx}`}
                                    ></label>
                                  </div>
                                </td>
                                <td>AA1024{idx}</td>
                                <td>First{idx}</td>
                                <td>Last{idx}</td>
                                <td>user{idx}@oriental-er.com</td>
                                <td>Super Administrator</td>
                                <td>
                                  <span className="badge badge-pill badge-primary">
                                    New
                                  </span>
                                </td>
                                <td>2011/04/25</td>
                                <td>2011/04/25</td>
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
                                              href="#"
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
                                <label>User</label>
                                <select className="form-control">
                                  <option>Select User</option>
                                  <option>Active</option>
                                  <option>New</option>
                                  <option>Deactivated</option>
                                </select>
                              </div>
                              <div className="col-md-6 mb-3">
                                <label>Role</label>
                                <select className="form-control">
                                  <option>Select a Role</option>
                                  <option>Super Administrator</option>
                                  <option>Lifting Administrator</option>
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
                                  disabled
                                />
                              </div>
                              <div className="col-md-6 mb-3">
                                <label>Email Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email Address"
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
