import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Header from "../../components/Header";

const PeriodInformationPage = () => {
  return (
    <div className='page-container'>
        <Header pageName="Lifting Period" moduleName=" Period Detail" />
        {/* Page Header */}
    <div className="row" style={{ width: "100%",padding: "20px"}}>
      <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
        <div className="card border-left-primary">
          <div className="card-body">
            <h4 className="header-title">Lifting Period Information</h4>
            <hr />

            <div className="row">
              <div className="col-md-7 mb-5">
                <h6 className="header-title">Period Details</h6>
                <form className="needs-validation" noValidate>
                  <div className="form-row">
                    <div className="col-md-8 mb-3">
                      <label>Period Title</label>
                      <input type="text" className="form-control" disabled value="2023-Q1 Lifting Period" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-8 mb-3">
                      <label>Description</label>
                      <textarea className="form-control" disabled rows={5} placeholder="This period is the period of the first lifting for the Okwok well."></textarea>
                    </div>
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
                  <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#updatePeriodModal"><i className="fa fa-edit"></i>&nbsp;Update Lifting Period</button>
                  <button className="btn btn-outline-primary ml-2" type="button" data-toggle="modal" data-target="#addActivityModal"><i className="fa fa-plus-circle"></i>&nbsp;Add New Task</button>
                  <button className="btn btn-outline-info ml-2" type="button" data-toggle="modal" data-target="#addActivityModal"><i className="fa fa-first-order"></i>&nbsp;Order Period Tasks</button>

                </form>
              </div>
              <div className="col-md-5 mb-5">
                <h6 className="header-title">Task Schedule</h6>
                <div className="list-group">
                  {Array(6).fill(null).map((_, idx) => (
                    <a key={idx} href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-1">List group item heading</h6>
                        <small>2011/04/25</small>
                      </div>
                      <p className="mb-1 font-weight-normal">A new activity has been added as a subset of Activity 1 with time adjustments made.</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <h4 className="header-title">Period Tasks</h4>
            <hr />
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-borderless" id="dataTable" width="100%" cellSpacing="0">
                  <thead className="bg-light">
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Timeline</th>
                      <th>Status</th>
                      <th>Due Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Not Published', 'Not Started', 'In Progress', 'Terminated', 'Completed'].map((status, idx) => (
                      <tr key={idx}>
                        <td>Export Permit Application</td>
                        <td>Apply for Quarterly Crude Oil Export Permit from the Federal Ministry...</td>
                        <td><div>October 1, 2023</div></td>
                        <td><div><span className={`badge badge-pill badge-${statusColor(status)}`}>{status}</span></div></td>
                        <td><div>2011/04/25</div></td>
                        <td>
                        <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                              <div>
                                <Button  {...bindTrigger(popupState)}>
                                <i className="fa fa-ellipsis-h"></i>
                                </Button>
                                <Popover
                                  {...bindPopover(popupState)}
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                  }}
                                  transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                  }}
                                 
                                >
                                  {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
                                  <div  className="actionBtn">
                                  <Link href="/period-activity-detail" className="btn btn-outline-primary">
                                    <i className="fa fa-eye"></i>&nbsp;View
                                  </Link>
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
    <div className="modal fade" id="updatePeriodModal">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Create New Period</h5>
                <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
            </div>
            <div className="modal-body">
                <form className="needs-validation" noValidate>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>Name or Title</label>
                            <input type="text" className="form-control" placeholder="Name or Title of Period"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>Description</label>
                            <textarea className="form-control" rows={4} placeholder="Give a brief of the lifting period."></textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Start Date</label>
                            <input className="form-control" type="date" id="example-date-input" placeholder="End Date"/>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Expected End Date</label>
                            <input className="form-control" type="date" id="example-date-input" placeholder="End Date"/>
                        </div>
                    </div>


                </form>
            </div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-primary btn-block"><i className="fa fa-plus-circle"></i>&nbsp;Update Period</button>
            </div>
        </div>
    </div>
</div>

<div className="modal fade bd-example-modal-lg" id="addActivityModal">
    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Add New Activity</h5>
                <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
            </div>
            <div className="modal-body">
                <form className="needs-validation" noValidate>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>Title</label>
                            <input type="text" className="form-control" placeholder="Name or Title of Activity"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>Description</label>
                            <textarea  className="form-control" rows={4} placeholder="Give a brief of the lifting Activity."></textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>Milestones</label>
                            <textarea  className="form-control" rows={7} placeholder="Give a detail or list of milestones for this activity that drives its completion or success."></textarea>
                        </div>
                    </div>
                    <hr />
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <div className="form-row align-items-center">
                                <div className="col-sm-3 my-1">
                                    <label>Time Parameter</label>
                                    <select className="form-control">
                                        <option>Select Parameter</option>
                                        <option>Yearly Quarter (Q)</option>
                                        <option>Subject Month (M)</option>
                                        <option>Crude Lifting Day (D)</option>
                                    </select>
                                </div>
                                <div className="col-sm-3 my-1">
                                    <label>Operators</label>
                                    <select className="form-control">
                                        <option>Select Operator</option>
                                        <option>Multiplication (x)</option>
                                        <option>Addition (+)</option>
                                        <option>Subtraction (-)</option>
                                        <option>Division (/)</option>
                                    </select>
                                </div>
                                <div className="col-sm-2 my-1">
                                    <label>Constant</label>
                                    <input type="text" className="form-control" placeholder="E.g 1,2,3"/>
                                </div>
                                <div className="col-sm-4 my-1">
                                    <label >Result</label>
                                    <input type="text" className="form-control" value="D + 25"/>
                                </div>
                                <div className="col-sm-2 my-1">
                                    <label className="sr-only">&nbsp;</label>
                                    <button type="submit" className="btn btn-secondary"><i className="fa fa-recycle"></i>&nbsp;Clear Selection</button>
                                </div>
                                                
                            </div>
                        </div>
                    </div>

                </form>
            </div>
            <div className="modal-footer">
                <button type="submit" className="btn btn-primary btn-block"><i className="fa fa-plus-circle"></i>&nbsp;Add New Activity</button>
            </div>
        </div>
    </div>
</div>






    </div>
  );
};







const statusColor = (status: string): string => {
  switch (status) {
    case 'Not Published': return 'secondary';
    case 'Not Started': return 'light';
    case 'In Progress': return 'warning';
    case 'Terminated': return 'danger';
    case 'Completed': return 'success';
    default: return 'primary';
  }
};

export default PeriodInformationPage;
export const metadata = {
  title: 'Lifting Period Information',
  description: 'View and manage lifting period information.',
};