"use client";

import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Header from '../../components/Header';
import "../../public/assets/css/dataTables.bootstrap4.css" ;
import 'bootstrap/dist/css/bootstrap.min.css'
import { useLocalStorageObject } from '../../hooks/useLocalStorage';

const SystemAudit = () => {
     const [user, setUser] = useLocalStorageObject("user", null);
      const [token, setToken] = useLocalStorageObject("token", null);
      const [userName, setUserName] = useState("");
  
      useEffect(() => {
        if (user) {
          setUserName(`${user.firstName} ${user.lastName}`);
        } else {
          console.log("No user data found.");
        }
      }, [user]);
  return (
    <div className='page-container'>
   <Header pageName="System Activity Audit" moduleName="System Audit" userName={userName} />
    <div className="row" style={{ width: "100%",padding: "20px"}}>
      <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
        <div className="card border-left-primary">
          <div className="card-body">
            <h4 className="header-title">System Activity Audit</h4>
            <form noValidate>
              <div className="form-row">
                <div className="col-md-3 mb-3">
                  <label>Activity Type</label>
                  <select className="form-control">
                    <option>Select Activity Type</option>
                    <option>Active</option>
                    <option>New</option>
                    <option>Deactivated</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>User</label>
                  <select className="form-control">
                    <option>Select User</option>
                    <option>Super Administrator</option>
                    <option>Lifting Administrator</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>Start Date</label>
                  <input type="date" className="form-control" placeholder="Start Date" />
                </div>
                <div className="col-md-3 mb-3">
                  <label>End Date</label>
                  <input type="date" className="form-control" placeholder="End Date" />
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-3 mb-3">&nbsp;</div>
                <div className="col-md-3 mb-3">&nbsp;</div>
                <div className="col-md-3 mb-3">
                  <button className="btn btn-outline-primary btn-block" type="submit">
                    <i className="fa fa-search"></i> Search
                  </button>
                </div>
                <div className="col-md-3 mb-3">
                  <button className="btn btn-outline-danger btn-block" type="submit">
                    <i className="fa fa-recycle"></i> Clear Filter
                  </button>
                </div>
              </div>
            </form>
            <br />
            <hr />
            <div className="table-responsive">
              <table className="table table-borderless" id="dataTable" width="100%" cellSpacing={0}>
                <thead className="bg-light">
                  <tr>
                    <th>Staff ID</th>
                    <th>Name</th>
                    <th>Activity Type</th>
                    <th>Description</th>
                    <th>Date Occured</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <tr key={i}>
                      <td>AK10246</td>
                      <td>Joshua Akinyoade</td>
                      <td><div>User Creation</div></td>
                      <td>
                        <div>
                          The staff with ID AK10246 created a new user on 2011/04/25 12:00pm.
                        </div>
                      </td>
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
                                  <a className="btn btn-outline-primary"  href="#">
                                    <i className="fa fa-eye"></i>&nbsp;View
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

  );
};

export default SystemAudit;
