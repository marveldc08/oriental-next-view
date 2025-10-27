"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
// import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../components/Header";
import { useLocalStorageObject } from "../../../hooks/useLocalStorage";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader";
import { useCallback } from "react";
import router from "next/router";

export default function PeriodManagementPage() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useLocalStorageObject("user", null);
  const [token, setToken] = useLocalStorageObject("token", null);
  const [userName, setUserName] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formulae, setFormulae] = useState("");
  const [formulaeDescription, setFormulaeDescription] = useState("");
  const [startDate, setStartDate] = useState('')
  const [expectedEndDate, setExpectedEndDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [periods, setPeriods] = useState([]);
  const [periodId, setPeriodId] = useState<number | null>(null);
  const [fields, setFields] = useLocalStorageObject("fields", null);
  const [selectedField, setSelectedField] = useState(null);

  const getFields = useCallback( async () => {
  try {
    const response = await fetch("/api/fields/get-fields", {
      method: "GET",
      headers: { "Content-Type": "application/json",
         "authorization": `Bearer ${token}` }
    })
    
      if (!response.ok) {
        console.log(`Error fetching fields: ${response.status} ${response.text()}`);
        throw new Error("Failed to fetch fields");
      }

    const data = await response.json();
    if (response.ok) {
      setFields(data.data ?? null);
    } else {
      
    }
    return data
  } catch (error) {
    console.error("error Fetching fields:", error);
  }
}, [token]);

  useEffect(() => {
    if (!token) {
      console.warn("Token is not available yet.");
      return;
    }

    const fetchFields = async () => {
      const fieldData = await getFields();
      if (fieldData) {
        setFields(fieldData.data);
      }
    };

    fetchFields();

  }, [token, getFields]);


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

  useEffect(() => {
    if (user) {
      setUserName(`${user.firstName} ${user.lastName}`);
    } else {
      console.log("No user data found.");
    }
  }, [user]);



  useEffect(() => {
    if (!token) {
      console.log("No token found, redirecting to login.");
      window.location.href = "/login";
    }
  }, [token]);


  const handleCreatePeriod = async(name: string, description: string,  startDate: string, expectedEndDate:string ) => {
    setLoading(true);
    if (!name || !description || !startDate || !expectedEndDate) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const fieldId = fields.length > 0 ? fields[0].id : null; 
      const response = await fetch('/api/periods/create-period', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ fieldId, name, description, startDate, expectedEndDate })
      })

      const data = await response.json();

      if (response.ok) {

        toast.success("Successfully created period")
      }else{
        console.log("error creating period:", data)
        toast.error(data.message ||"Error in the period creation process")
        // throw new Error(data.message || "error creating period")
      }

    } catch (err) {
      console.error("Error during period creation:", err);
      toast.error("Error during period creation")
    } finally{
       setLoading(false)
    }
  }

  const handleClearFilter = () => {
    setStartDate('');
    setExpectedEndDate('');
  };

  console.log("PERIODS:", periods);

  return (
    <div className="page-container">
      {loading && <Loader/>}
      <Header pageName="Lifting Periods" moduleName="Period Setup" userName={userName} />
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
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                            />
                          </div>
                          <div className="col-md-3 mb-3">
                            <label>End Date</label>
                            <input
                              type="date"
                              className="form-control"
                              placeholder="End Date"
                              value={expectedEndDate}
                              onChange={(e) => setExpectedEndDate(e.target.value)}
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
                              onClick={handleClearFilter}
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
                              <th>Field</th>
                              <th>Start Date</th>
                              <th>End Date</th>
                              <th>Status</th>
                              <th>Date Created</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                             {periods.map((period) => (
                              <tr key={period.id}>
                                <td>{period.name}</td>
                                <td>{period.description}</td>
                                <td>{period.field.name}</td>
                                <td>{period.startDate}</td>
                                <td>{period.endDate}</td>
                                <td>
                                  <span
                                    // className={`badge badge-pill badge-${period.badge}`}
                                    className={`badge badge-pill badge-${statusColor(period.status)} `}
                                  >
                                    {period.status}
                                  </span>
                                </td>
                                 <td>{period.dateCreated}</td>
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
                                          <div className="actionBtn" onClick={() => {setPeriodId(period.id); popupState.close()}}>
                                            <a className="btn btn-outline-primary" href={`/periods/${periodId}?id=${periodId}`}>
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
                  {/* <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Field</label>
                      <select className="form-control" onChange={handleFieldChange}>
                        <option value="">Select Field</option>
                        {fields.map((field) => (
                          <option key={field.id[0]} value={field.name}>
                            {field.name}
                          </option>
                        ))}

                      </select>
                    </div>
                  </div> */}
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Field Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name or Title of Period"
                        value={fields[0].name}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Name or Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name or Title of Period"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
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
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Start Date</label>
                      <input type="date" className="form-control" 
                        value={startDate}
                        onChange={(e)=> setStartDate(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Expected End Date</label>
                      <input type="date" className="form-control" 
                         value={expectedEndDate}
                        onChange={(e)=> setExpectedEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary btn-block w-100"
                  disabled={loading}
                  onClick={() => handleCreatePeriod(name, description, startDate, expectedEndDate )}
                >
                  <i className="fa fa-plus-circle"></i>&nbsp; {loading ? "Creating" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
const statusColor = (status: string): string => {
  switch (status) {
    case 'Not Published': return 'secondary';
    case 'Not Started': return 'light';
    case 'In Progress': return 'warning';
    case 'Terminated': return 'danger';
    case 'Cancelled': return 'danger';
    case 'Completed': return 'success';
    default: return 'primary';
  }
};
