"use client"
import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Header from '../../../components/Header';
import { useLocalStorageObject } from '../../../hooks/useLocalStorage';
import router from 'next/router';
import { toast } from 'react-toastify';
import Loader from "../../../components/Loader";


      interface Periods  {
          id: number;
          name: string;
          description: string;
          field: {id: number, name: string };
          startDate: string;
          endDate: string;
          status: string;
          dateCreated: string;
          // add other properties if needed
      };
const ReportPage = () => {
      type User = {
        id: number;
        firstName: string;
        lastName: string;
        emailAddress: string;
        // add other properties as needed
      };
  
     const [user, setUser] = useLocalStorageObject<User | null>("user", null);
      const [token, setToken] = useLocalStorageObject("token", null);
      const [userName, setUserName] = useState("");
      const [showInitiateReportModal, setShowInitiateReportModal] = useState(false);
      const [periods, setPeriods] = useState<Periods[]>([]);
      const [fromDate, setFromDate] = useState<string | null>(null);
      const [toDate, setToDate] = useState<string | null>(null);
      const [loading, setLoading] = useState(false);
      const [selectedPeriodId, setSelectedPeriodId] = useState<number | null>(null);
      const [fieldId, setFieldId] = useState<number | null>(null);


  
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

            if (error instanceof Error) {
              console.error("Error fetching periods:", error.message, error.stack);
            } else {
              console.error("Error fetching periods: Unknown error", error);
            }
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

    const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedPeriod = e.target.value;
      setSelectedPeriodId(periods.find(period => period.name === selectedPeriod)?.id ?? null);
      setFieldId(periods.find(period => period.name === selectedPeriod)?.field.id ?? null);

      console.log("Selected Period:", selectedPeriod);
    };


    function convertToFullTimestamp(dateStr: string): string {
      if (!dateStr) throw new Error("Date string is empty");

      let day: number, month: number, year: number;

      // Detect common formats
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        // ✅ Format: YYYY-MM-DD (from <input type="date">)
        const [y, m, d] = dateStr.split("-").map(Number);
        year = y;
        month = m;
        day = d;
      } else if (/^\d{1,2}\/\d{1,2}\/\d{2,4}$/.test(dateStr)) {
        // ✅ Format: DD/MM/YY or DD/MM/YYYY
        const [d, m, y] = dateStr.split("/").map(Number);
        year = y < 100 ? 2000 + y : y;
        month = m;
        day = d;
      } else if (/^\d{1,2}-\d{1,2}-\d{2,4}$/.test(dateStr)) {
        // ✅ Format: DD-MM-YY or DD-MM-YYYY
        const [d, m, y] = dateStr.split("-").map(Number);
        year = y < 100 ? 2000 + y : y;
        month = m;
        day = d;
      } else {
        throw new Error(`Unsupported date format: "${dateStr}"`);
      }

      const date = new Date(year, month - 1, day);

      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date value after parsing: "${dateStr}"`);
      }

      const iso = date.toISOString().replace("Z", "");
      const microseconds = (Math.random() * 1_000_0000).toFixed(6);
      return `${iso.substring(0, 19)}.${microseconds}`;
    }



    const handleFetchPeriodsByDate = async(fromDate:string , toDate:string) => {
      setLoading(true);
     
      const convertedFromDate = convertToFullTimestamp(fromDate);
      const convertedToDate = convertToFullTimestamp(toDate);
      console.log("Converted From Date:", convertedFromDate);
      console.log("Converted To Date:", convertedToDate);
       try {
            const response = await fetch(`/api/periods/get-periods?startDate=${convertedFromDate}&endDate=${convertedToDate}`, {
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
            console.log("Filtered PERIODS DATA:", data);
            setPeriods(data.data);
      
            // return data;
          } catch (error) {
            console.error("Error fetching periods:", error);
          if (error instanceof Error) {
            console.error("Error fetching periods:", error.message, error.stack);
          } else {
            console.error("Error fetching periods: Unknown error", error);
          }
            throw error; // Re-throw the error to handle it in the calling function
      
          }
    }

    const handleInitiateReport = () => {
      if (!selectedPeriodId || !fieldId) {
        toast.error("Please select a valid period.");
        return;
      }
      try {
        
      } catch (error) {
        
      }
    }

    console.log("PERIODS:", periods);
  


        
  return (
    <div className='page-container'>
       {loading && <Loader/>}
        <Header pageName="Reporting" moduleName="Manage Reports" userName={userName} />
        {/* Page Header */}
    <div className="row" style={{ width: "100%", padding: "20px"}}>
      <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
        <div className="card border-left-primary">
          <div className="card-body">
            <h4 className="header-title">Manage Reports</h4>
   

            <hr />
            <div className="form-row">
              <div className="col-md-3 mb-3 ml-auto">
                <button className="btn btn-primary btn-block text-white"  onClick={() => setShowInitiateReportModal(true)}>
                  <i className="fa fa-sticky-note-o"></i>&nbsp; Initiate Lifting Report
                </button>
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
                                  <a className="btn btn-outline-primary"  href={`/reporting/report-setup?${i}`}>
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
                    <div className="col-md-4 mb-3">
                      <label>From:</label>
                      <input type="date" className='form-control' onChange={(e) => setFromDate(e.target.value)}
                        value={fromDate? fromDate : ''}
                       />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label>To:</label>
                     <input type="date" className='form-control' onChange={(e) => setToDate(e.target.value)}
                        value={toDate? toDate : ''} />
                    </div>
                    <div className="col-md-4 mb-3 mt-4 d-flex">
                    
                      {/* <div>&nbsp;</div> */}
                      <button type='button' className='btn btn-primary' onClick={()=> handleFetchPeriodsByDate(fromDate ?? "", toDate ?? "")}><i className="fa fa-spinner"></i>&nbsp;Load Period</button>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Periods</label>
                      <select className="form-control" onChange={handlePeriodChange}>
                        <option value="">Select Periods</option>
                        {periods.map((period) => (
                          <option key={period.id} value={period.name}>
                            {period.name} - {period.field.name}
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
                  <i className="fa fa-cogs"></i>&nbsp;Initiate Report
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
function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

