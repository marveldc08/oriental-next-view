import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Header from '../../components/Header';

const ActivityInformation = () => {
  return (
    <div className='page-container'>
    <Header pageName="Activity Information" moduleName="Period Activity Detail" />
     <div className="row mt-5" style={{ width: "100%",padding: "20px"}}>
      <div className="col-xl-12 col-lg-12">
        <div className="card border-left-primary">
          <div className="card-body">
            <h4 className="header-title">Period Task Information</h4>
            <hr />
            <div className="row">
              <div className="col-md-7 mb-5">
                <h6 className="header-title">Task Details</h6>
                <form noValidate>
                  <div className="form-row">
                    <div className="col-md-8 mb-3">
                      <label>Task Title</label>
                      <input type="text" className="form-control" defaultValue="Export Permit Application" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-8 mb-3">
                      <label>Description</label>
                      <textarea rows={5} className="form-control" defaultValue="Apply for Quarterly Crude Oil Export Permit from the Federal Ministry of Industry, Trade and investment through the Nigerian Upstream Petroleum Regulator Commission (NUPRC)..."></textarea>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Timeline Formula</label>
                    <input type="text" className="form-control" disabled value="D + 25" />
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Date Created</label>
                      <div className="text-secondary font-italic">Wednesday, 10th April, 2024 by 12:00pm</div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Start Date</label>
                      <div className="text-secondary font-italic">Wednesday, 10th April, 2024 by 12:00pm</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Expected End Date</label>
                      <div className="text-secondary font-italic">Wednesday, 10th April, 2024 by 12:00pm</div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>End Date</label>
                      <div className="text-secondary font-italic">Wednesday, 10th April, 2024 by 12:00pm</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Delay Time</label>
                      <input type="text" className="form-control border-bottom-danger" disabled placeholder="7 Days 20 Hours" />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Status</label>
                      <div><span className="badge badge-pill badge-warning font-14">In Progress</span></div>
                    </div>
                  </div>
                  <br />
                  <button className="btn btn-outline-primary mr-2" type="button"><i className="fa fa-tasks"></i>&nbsp;Start Task</button>
                  <button className="btn btn-primary mr-2" type="button"><i className="fa fa-edit"></i>&nbsp;Update Task</button>
                  <button className="btn btn-outline-primary" type="button" data-toggle="modal" data-target="#addUserModal"><i className="fa fa-user-plus"></i>&nbsp;Add Users</button>
                </form>
              </div>

              <div className="col-md-5 mb-5">
                <div className="card">
                  <div className="card-body">
                    <h6 className="header-title">Milestones</h6>
                    <ul className="list-group">
                      {[1, 2, 3].map(n => (
                        <li key={n} className="list-group-item d-flex justify-content-between align-items-center">
                          Milestone {n} <span className="badge badge-success badge-pill">successful</span>
                        </li>
                      ))}
                      {[4, 5, 6].map(n => (
                        <li key={n} className="list-group-item d-flex justify-content-between align-items-center">
                          Milestone {n} <span className="badge badge-danger badge-pill">Failed</span>
                        </li>
                      ))}
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Milestone 7 <span className="badge badge-light badge-pill">Not Started</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className="row mt-5">
              <div className="col-md-5 mb-5">
                <div className="card">
                  <div className="card-body">
                    <h6 className="header-title">Users</h6>
                    <ul className="list-group">
                      {Array(7).fill("Dun-Smart Avong").map((name, idx) => (
                        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                          {name}
                          <span><a className="btn btn-outline-danger"><i className="fa fa-remove">&nbsp; Remove</i></a></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-7 mb-5">
                <div className="card">
                  <div className="card-body">
                    <h6 className="header-title">Comments/Feedbacks</h6>
                    <div className="list-group">
                      {Array(6).fill("There is a need for you to make changes to the FSO before we can initiate a full lifting documentation.").map((msg, idx) => (
                        <a key={idx} href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                          <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1 text-primary" style={{ fontSize: "12px" }}>Dun-Smart Avong</h6>
                            <small>3 days ago</small>
                          </div>
                          <p className="mb-1 font-14">{msg}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="addUserModal">
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Activity User</h5>
                    <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
                  </div>
                  <div className="modal-body">
                    <form noValidate>
                      <div className="form-row">
                        <div className="col-md-12 mb-3">
                          <label>Name or Title</label>
                          <select className="form-control">
                            <option>Select User</option>
                            <option>Dun-Smart Avong</option>
                            <option>Ademola Adeniran</option>
                            <option>Dotun Oluwadamilare</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col-md-12 mb-3">
                          <label>User Category</label>
                          <select className="form-control">
                            <option>Select User</option>
                            <option>Responsible Party (R)</option>
                            <option>Consulted Party (C)</option>
                            <option>Accountable Party (A)</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary btn-block">
                      <i className="fa fa-plus-circle"></i>&nbsp;Add User
                    </button>
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
};

export default ActivityInformation;
