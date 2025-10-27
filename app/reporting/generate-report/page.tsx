"use client"
import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Header from '../../../components/Header';
import { useLocalStorageObject } from '../../../hooks/useLocalStorage';
import router from 'next/router';
import { toast } from 'react-toastify';

const ReportPage = () => {
     const [user, setUser] = useLocalStorageObject("user", null);
      const [token, setToken] = useLocalStorageObject("token", null);
      const [userName, setUserName] = useState("");
      const [showInitiateReportModal, setShowInitiateReportModal] = useState(false);
      const [periods, setPeriods] = useState([]);
  
      useEffect(() => {
        if (user) {
          setUserName(`${user.firstName} ${user.lastName}`);
        } else {
          console.log("No user data found.");
        }
      }, [user]);

       const getPeriods = useCallback(async () => {
          try {
            const response = await fetch('/api/periods/get-periods', {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
              },
            });
      
            if (!response.ok) {
              console.log(`Error fetching periods: ${response.status} ${response.text()}`);
              throw new Error("Failed to fetch periods");
            }
      
            const data = await response.json();
      
            return data;
          } catch (error) {
            console.error("Error fetching periods:", error);
            console.error("Error fetching periods:", error.message, error.stack);
            throw error; // Re-throw the error to handle it in the calling function
      
          }
        }, [token]);
      
      
        useEffect(() => {
          if (!token) {
            console.log("No token found, redirecting to login.");
           router.push("/login");
            return;
          }
      
          const fetchPeriods = async () => {
            try {
              const periodsData = await getPeriods();
              setPeriods(periodsData.data);
      
            } catch (error) {
              console.error("Error fetching periods:", error);
              toast.error("Failed to fetch periods");
            }
          };
      
          fetchPeriods();
          
        }, [token, getPeriods]);

        console.log("PERIODS DATA:", periods);

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedPeriod = e.target.value;
      console.log("Selected Period:", selectedPeriod);
    };


        
  return (
    <div className='page-container'>
        <Header pageName="Reporting" moduleName="Generate Reports" userName={userName} />
        {/* Page Header */}
    <div className="row" style={{ width: "100%",padding: "20px"}}>
      <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
        <div className="card border-left-primary">
          <div className="card-body">
            <h4 className="header-title">Lifting Exports</h4>
            <form className="needs-validation" noValidate>
              <div className="form-row">
                <div className="col-md-3 mb-3">
                  <label>Vessel Name</label>
                  <input type="text" className="form-control" placeholder="Vessel Name" />
                </div>
                <div className="col-md-3 mb-3">
                  <label>Terminal</label>
                  <select className="form-control">
                    <option>Select a Terminal</option>
                    <option>Large select</option>
                    <option>Small select</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>Lifter</label>
                  <select className="form-control">
                    <option>Select a Lifter</option>
                    <option>Large select</option>
                    <option>Small select</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>Status</label>
                  <select className="form-control">
                    <option>Select a Status</option>
                    <option>Large select</option>
                    <option>Small select</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-3 mb-3">
                  <label>Start Date</label>
                  <input type="date" className="form-control" placeholder="Start Date" />
                </div>
                <div className="col-md-3 mb-3">
                  <label>End Date</label>
                  <input type="date" className="form-control" placeholder="End Date" />
                </div>
                <div className="col-md-3 mb-3">
                  <label>Users</label>
                  <select className="form-control">
                    <option>Select a User</option>
                    <option>Large select</option>
                    <option>Small select</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>Cargo Number</label>
                  <input type="text" className="form-control" placeholder="Cargo Number" />
                </div>
              </div>
              <div className="form-row">
                <div className="col-md-3 mb-3">&nbsp;</div>
                <div className="col-md-3 mb-3">
                  <button className="btn btn-primary btn-block" type="submit">
                    <i className="fa fa-download"></i>&nbsp; Generate Report
                  </button>
                </div>
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

            <hr />
            <div className="form-row">
              <div className="col-md-3 mb-3 ml-auto">
                <a className="btn btn-primary btn-block text-white" href="/reporting/report-setup">
                  <i className="fa fa-sticky-note-o"></i>&nbsp; Fill Lifting Report
                </a>
              </div>
            </div>

            <hr />
            <div className="table-responsive">
              <table className="table" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Vessel Name</th>
                    <th>Terminal</th>
                    <th>Laycan</th>
                    <th>Lifter</th>
                    <th>BOL Date</th>
                    <th>BOL Volume (In Barrels)</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Lifting Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i}>
                      <td>Tiger Nixon</td>
                      <td>Ebok</td>
                      <td>System Architect</td>
                      <td>NNPC</td>
                      <td>2011/04/25</td>
                      <td>61</td>
                      <td>2011/04/25</td>
                      <td>2011/04/25</td>
                      <td>
                        <span className="badge badge-pill badge-primary">New</span>
                      </td>
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

      {showInitiateReportModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)",backdropFilter: "blur(5px)", }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
               <div>
                 <h5 className="modal-title">Initiate Lifting Report</h5>
               
               </div>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowInitiateReportModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="needs-validation" noValidate>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Periods</label>
                      <select className="form-control" onChange={handlePeriodChange}>
                        <option value="">Select Periods</option>
                        {periods.map((period) => (
                          <option key={period.id} value={period.name}>
                            {period.name}
                          </option>
                        ))}
                      </select>
                
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                >
                  <i className="fa fa-plus-circle"></i>&nbsp;Assign Selected Users
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReportPage;
