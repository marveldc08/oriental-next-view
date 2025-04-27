"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";

export default function PeriodManagementPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page-container">
      <Header pageName="Lifting Periods" moduleName="Period Setup" />
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <div className="row mt-5" style={{ width: "100%" }}>
                <div className="col-xl-12 col-ml-12 col-lg-12">
                  <div className="card border-left-primary">
                    <div className="card-body">
                      <h4 className="header-title">Lifting Periods</h4>

                      {/* Filter Form */}
                      <form>
                        <div className="form-row">
                          <div className="col-md-3 mb-3">&nbsp;</div>
                          <div className="col-md-3 mb-3">&nbsp;</div>
                          <div className="col-md-3 mb-3">
                            <label>Start Date</label>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="Start Date"
                            />
                          </div>
                          <div className="col-md-3 mb-3">
                            <label>End Date</label>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="End Date"
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="col-md-3 mb-3">&nbsp;</div>
                          <div className="col-md-3 mb-3">
                            <button
                              type="button"
                              className="btn btn-primary btn-block"
                              onClick={() => setShowModal(true)}
                            >
                              <i className="fa fa-plus-circle"></i> &nbsp;Create
                              New Period
                            </button>
                          </div>
                          <div className="col-md-3 mb-3">
                            <button
                              type="submit"
                              className="btn btn-outline-primary btn-block"
                            >
                              <i className="fa fa-search"></i> Search
                            </button>
                          </div>
                          <div className="col-md-3 mb-3">
                            <button
                              type="reset"
                              className="btn btn-outline-danger btn-block"
                            >
                              <i className="fa fa-recycle"></i> Clear Filter
                            </button>
                          </div>
                        </div>
                      </form>

                      <br />
                      <hr />

                      {/* Table */}
                      <div className="table-responsive">
                        <table
                          className="table table-borderless"
                          id="dataTable"
                          width="100%"
                          cellSpacing="0"
                        >
                          <thead className="bg-light">
                            <tr>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Start Date</th>
                              <th>Expected End Date</th>
                              <th>Status</th>
                              <th>Date Created</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                name: "2024-Q1 Lifting Period",
                                description:
                                  "This period is the period of the first lifting for the Okwok well.",
                                start: "2011/04/25",
                                end: "2011/04/25",
                                status: "Current",
                                badge: "warning",
                                created: "2011/04/25",
                              },
                              {
                                name: "2024-Q3 Lifting Period",
                                description:
                                  "This period is the period of the first lifting for the Okwok well.",
                                start: "2011/04/25",
                                end: "2011/04/25",
                                status: "Not Started",
                                badge: "secondary",
                                created: "2011/04/25",
                              },
                              {
                                name: "2023-Q4 Lifting Period",
                                description:
                                  "This period is the period of the first lifting for the Okwok well.",
                                start: "2011/04/25",
                                end: "2011/04/25",
                                status: "Aborted",
                                badge: "danger",
                                created: "2011/04/25",
                              },
                              {
                                name: "2023-Q1 Lifting Period",
                                description:
                                  "This period is the period of the first lifting for the Okwok well.",
                                start: "2011/04/25",
                                end: "2011/04/25",
                                status: "Completed",
                                badge: "success",
                                created: "2011/04/25",
                              },
                            ].map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.start}</td>
                                <td>{item.end}</td>
                                <td>
                                  <span
                                    className={`badge badge-pill badge-${item.badge}`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                                <td>{item.created}</td>
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
                                          {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Period</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Name or Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name or Title of Period"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Give a brief of the lifting period."
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Start Date</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Expected End Date</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary btn-block w-100"
                >
                  <i className="fa fa-plus-circle"></i>&nbsp;Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
