"use client"
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Header from "../../../components/Header";
import { useLocalStorageObject } from '../../../hooks/useLocalStorage';
import router from 'next/router';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import Loader from '../../../components/Loader';




const PeriodInformationPage = () => {
       const [user, setUser] = useLocalStorageObject("user", null);
        const [token, setToken] = useLocalStorageObject("token", null);
        const [userName, setUserName] = useState("");
      const [fetchedPeriod, setFetchedPeriod] = useState({} as any);
      const searchParams = useSearchParams();
      const periodId = searchParams.get("id");
      const parsedPeriodId = JSON.parse(periodId)

      const [showUpdateModal, setShowUpdateModal] = useState(false);
      const [showAddActivityModal, setShowAddActivityModal] = useState(false);
      const [showOrderTasksModal, setShowOrderTasksModal] = useState(false);
      const [showModal, setShowModal] = useState(false);
      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [loading, setLoading] = useState(false);
      const [formulae, setFormulae] = useState("");
      const [formulaeSummary, setFormulaeSummary] = useState("");

      const [updateName, setUpdateName] = useState("");
      const [updateDescription, setUpdateDescription] = useState("");
      const [updateStartDate, setUpdateStartDate] = useState("");
      const [updateExpectedEndDate, setUpdateExpectedEndDate] = useState("");

      // const [taskUpdate, setTaskUpdate] = useState("");

      const [tasks, setTasks]= useState([])

      const getPeriod = useCallback(async () => {
        try {
          const response = await fetch(`/api/periods/get-periods/${parsedPeriodId}?id=${parsedPeriodId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            console.log(`Error fetching period: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch period");
          }
    
          const data = await response.json();
    
          return data;
        } catch (error) {
          console.error("Error fetching period:", error);
          console.error("Error fetching period:", error.message, error.stack);
          throw error; // Re-throw the error to handle it in the calling function
    
        }
      }, [parsedPeriodId, token]);

      const getTasks = useCallback(async () => {
        try {
          const response = await fetch('/api/periods/tasks/get-period-task', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            console.log(`Error fetching tasks: ${response.status} ${response.text()}`);
            throw new Error("Failed to fetch tasks");
          }

          const data = await response.json();

          return data;
        } catch (error) {
          console.error("Error fetching tasks:", error);
          console.error("Error fetching tasks:", error.message, error.stack);
          throw error; 

        }
      }, [token]);


      useEffect(() => {
        const fetchTasks = async () => {
          try {
            const tasksData = await getTasks();
            
            setTasks(tasksData.data);

          } catch (error) {
            console.error("Error fetching tasks:", error);
            toast.error("Failed to fetch tasks");
          }
        };

        fetchTasks();
        
      }, [token, getTasks]);
        
      useEffect(() => {
        if (!token) {
          console.log("No token found, redirecting to login.");
          router.push("/login");
          return;
        }
    
        const fetchPeriod = async () => {
          try {
            const periodData = await getPeriod();
            
            setFetchedPeriod(periodData.data);
    
          } catch (error) {
            console.error("Error fetching periods:", error);
            toast.error("Failed to fetch periods");
          }
        };
    
        fetchPeriod();

      }, [token, getPeriod]);

      function formatDateTime(input: string): string {
     
      const date = new Date(input);
      if (isNaN(date.getTime())) return input; // Return original if invalid

      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const day = date.getDate();
      const weekday = daysOfWeek[date.getDay()];
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      const getDaySuffix = (d: number): string => {
        if (d >= 11 && d <= 13) return "th";
        switch (d % 10) {
          case 1: return "st";
          case 2: return "nd";
          case 3: return "rd";
          default: return "th";
        }
      };

      const suffix = getDaySuffix(day);

      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const isPM = hours >= 12;
      const period = isPM ? 'pm' : 'am';
      hours = hours % 12 || 12;

      return `${weekday}, ${day}${suffix} ${month}, ${year} by ${hours}:${minutes}${period}`;
    }

    function formatDateFields(obj: Record<string, any>): Record<string, any> {
      const result: Record<string, any> = {};

      for (const key in obj) {
        const value = obj[key];

        if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/)) {
          result[key] = formatDateTime(value);
        } else {
          result[key] = value;
        }
      }

      return result;
    }

    const formattedPeriodObj = formatDateFields(fetchedPeriod);
  //   const formatedTaskObj = formatDateFields(tasks[0])
  //  console.log(formatedTaskObj)

    useEffect(() => {
      if (user) {
        setUserName(`${user.firstName} ${user.lastName}`);
      } else {
        console.log("No user data found.");
        router.push("/login");
      }
    }, [user, fetchedPeriod]);

    const handleAddTask = async (periodId: number, name: string, description: string, formulae: string, formulaeSummary: string, startDate: string, endDate: string) => {
      setLoading(true);
      try {
        const response = await fetch('/api/periods/tasks/create-period-task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({periodId, name, description, formulae, formulaeSummary, startDate, endDate}),
        });

        if (!response.ok) {
          console.error(`Error adding period task: ${response.status} ${response.statusText}`);
          throw new Error("Failed to add period task");
        }

        const data = await response.json();
        getTasks();
        // setTaskUpdate("Active")
        toast.success("Period task added successfully");
        setShowModal(false);
        setLoading(false);
        // router.push("/periods/period-setup");
      } catch (error) {
        console.error("Error adding period task:", error);
        toast.error("Failed to add period task");
        setLoading(false);
      }
    }


    const handleUpdatePeriod = async (name: string, description: string, startDate: string, expectedEndDate: string) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/periods/update-period/${parsedPeriodId}?id=${parsedPeriodId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            description,
            startDate,
            expectedEndDate
          }),
        });

        if (!response.ok) {
          console.error(`Error updating period: ${response.status} ${response.statusText}`);
          throw new Error("Failed to update period");
        }

        const data = await response.json();
        toast.success("Period updated successfully");
        setShowModal(false);
        setLoading(false);
       
      } catch (error) {
        console.error("Error updating period:", error);
        toast.error("Failed to update period");
        setLoading(false);
      }
    }


    const handleCancelPeriod = async () => {
      setLoading(true);
     console.log("CANCEL PERIOD ID", parsedPeriodId);
      try {
        const response = await fetch(`/api/periods/cancel-period/${parsedPeriodId}?id=${parsedPeriodId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          console.error(`Error cancelling period: ${response.status} ${response.statusText}`);
          throw new Error("Failed to cancel period");
        }

        const data = await response.json();
        toast.success("Period cancelled successfully");
        setLoading(false);
       
      } catch (error) {
        console.error("Error cancelling period:", error);
        toast.error("Failed to cancel period");
        setLoading(false);
      }
    }




    const now = new Date();

    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${
      String(now.getMonth() + 1).padStart(2, '0')
    }/${now.getFullYear()}`;

    console.log("FETCHED PERIOD:", fetchedPeriod);



  return (
    <div className='page-container'>
      {loading && <div className="loader-overlay"><Loader /></div>}
      <Header pageName="Lifting Period" moduleName=" Period Detail" userName={userName} />
  
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
                        <input type="text" className="form-control" disabled value={fetchedPeriod ? fetchedPeriod.name : ''} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-8 mb-3">
                        <label>Description</label>
                        <textarea className="form-control" disabled rows={5} value={fetchedPeriod ? fetchedPeriod.description : ''}></textarea>
                      </div>
                    </div>
                    {/* <div className="form-row">
                      <div className="col-md-8 mb-3">
                        <label>Field</label>
                        <textarea className="form-control" disabled rows={5} value={fetchedPeriod ? fetchedPeriod.field.name : ''}></textarea>
                      </div>
                    </div> */}
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label>Date Created</label>
                        <div className="text-secondary font-italic">{formattedPeriodObj?.dateCreated}</div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Start Date</label>
                        <div className="text-secondary font-italic">{formattedPeriodObj?.startDate}</div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label>Expected End Date</label>
                        <div className="text-secondary font-italic">{formattedPeriodObj?.expectedEndDate}</div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>End Date</label>
                        <div className="text-secondary font-italic">{formattedPeriodObj?.endDate}</div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col-md-6 mb-3">
                        <label>Delay Time</label>
                        <input type="text" className="form-control border-bottom-danger" disabled placeholder={fetchedPeriod ? fetchedPeriod.delayTime : ''}/>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Status</label>
                        <div><span className={`badge badge-pill badge-${statusColor(fetchedPeriod.status)} font-14`}>{fetchedPeriod ? fetchedPeriod.status : ''}</span></div>
                      </div>
                    </div>
                    <br />
                    <button className="btn btn-primary my-1 mx-1" type="button" data-toggle="modal" 
                    data-target="#updatePeriodModal" onClick={() => setShowUpdateModal(true)}
                    ><i className="fa fa-edit"></i>&nbsp;Update Lifting Period</button>
                    <button className="btn btn-outline-primary my-1 mx-1" type="button" data-toggle="modal" data-target="#addActivityModal" onClick={() => setShowModal(true)}><i className="fa fa-plus-circle"></i>&nbsp;Add New Task</button>
                    {/* <button className="btn btn-outline-info my-1 mx-1" type="button" data-toggle="modal" data-target="#addActivityModal" onClick={() => setShowAddActivityModal(true)}><i className="fa fa-first-order"></i>&nbsp;Order Period Tasks</button> */}
                    <button className="btn btn-outline-danger my-1 mx-1" type="button" onClick={handleCancelPeriod}><i className="fa fa-times"></i>&nbsp;Cancel Period</button>

                  </form>
                </div>
                <div className="col-md-5 mb-5">
                  <h6 className="header-title">Task Schedule</h6>
                  <div className="list-group">
                    {tasks.length > 0 ? (
                      tasks.map((_, idx) => (
                        <a key={idx} href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                          <div className="d-flex w-100 justify-content-between">
                            {/* <p>{taskUpdate}</p> */}
                            <h6 className="mb-1 float-left">Task Activity</h6>
                            <small>{formattedDate}</small>
                          </div>
                          <p className="mb-1 font-weight-normal">A new activity has been added as a subset of <b>{`${fetchedPeriod ? fetchedPeriod.name : 'This Activity'}`}</b> with time adjustments made.</p>
                        </a>
                      ))
                    ) : (
                      <p>No activities found.</p>
                    )}
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
                      {tasks.map((task, idx) => (
                        <tr key={idx}>
                          <td>{task.name}</td>
                          <td>{task.description}</td>
                          <td><div>October 1, 2023</div></td>
                          <td><div><span className={`badge badge-pill badge-${statusColor(task.status)}`}>{task.status}</span></div></td>
                          <td><div>{task.dueDate}</div></td>
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

                                    <div className="actionBtn" >
                                      <a className="btn btn-outline-primary" href={`/periods/period-activity-detail/${task.id}?id=${task.id}`}>
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

      {/* Modals */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)", overflowY: "scroll" }} id="addPeriodModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Task</h5>
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
                    <div className="col-md-12 mb-3">
                      <label>Formulae</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Formulae"
                        value={formulae}
                        onChange={(e)=> setFormulae(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-12 mb-3">
                      <label>Formulae Summary</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder="Give a brief of the formulae."
                        value={formulaeSummary}
                        onChange={(e)=> setFormulaeSummary(e.target.value)}
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
                         value={endDate}
                        onChange={(e)=> setEndDate(e.target.value)}
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
                  onClick={() => { handleAddTask(parsedPeriodId, name, description, formulae, formulaeSummary, startDate, endDate)}}
                >
                  <i className="fa fa-plus-circle"></i>&nbsp; {loading ? "Adding..." : "Add New Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showUpdateModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)"}}id="updatePeriodModal">
          <div className="modal-dialog modal-dialog-centered" >
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title">Update Period</h5>
                      <button type="button" className="close" onClick={()=> setShowUpdateModal(false)}><span>&times;</span></button>
                  </div>
                  <div className="modal-body">
                      <form className="needs-validation" noValidate>
                          <div className="form-row">
                              <div className="col-md-12 mb-3">
                                  <label>Name or Title</label>
                                  <input type="text" className="form-control"
                                   placeholder="Update Period Name"
                                   value={updateName}
                                   onChange={(e) => setUpdateName(e.target.value)}
                                   />
                              </div>
                          </div>
                          <div className="form-row">
                              <div className="col-md-12 mb-3">
                                  <label>Description</label>
                                  <textarea className="form-control" rows={4} 
                                  placeholder="Update Period Description"
                                  value={updateDescription}
                                  onChange={(e) => setUpdateDescription(e.target.value)}
                                  ></textarea>
                              </div>
                          </div>
                          <div className="form-row">
                              <div className="col-md-6 mb-3">
                                  <label>Start Date</label>
                                  <input className="form-control" type="date" id="example-date-input"
                                   placeholder="Update Start Date"
                                   value={updateStartDate}
                                   onChange={(e) => setUpdateStartDate(e.target.value)}
                                   />
                              </div>
                              <div className="col-md-6 mb-3">
                                  <label>Expected End Date</label>
                                  <input className="form-control" type="date" id="example-date-input" 
                                  placeholder="Update Expected End Date"
                                  value={updateExpectedEndDate}
                                  onChange={(e) => setUpdateExpectedEndDate(e.target.value)}
                                  />
                              </div>
                          </div>


                      </form>
                  </div>
                  <div className="modal-footer">
                      <button type="submit" className="btn btn-primary btn-block"
                      onClick={() => handleUpdatePeriod(updateName, updateDescription, updateStartDate, updateExpectedEndDate)}
                      disabled={loading}>
                        <i className="fa fa-plus-circle"></i>&nbsp;Update Period</button>
                  </div>
              </div>
          </div>
      </div>
      )}

      {showAddActivityModal && (
              <div className="modal fade show d-block" style={{backgroundColor: "rgba(0,0,0,0.5)", overflowY: "scroll"}} id="addActivityModal">
          <div className="modal-dialog modal-md modal-dialog-centered" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title">Add New Activity</h5>
                      <button type="button" className="close" onClick={() => setShowAddActivityModal(false)}><span>&times;</span></button>
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
      )}
    </div>
  );
};







const statusColor = (status: string): string => {
  switch (status) {
    case 'Not Published': return 'secondary';
    case 'Not Started': return 'light';
    case 'In Progress': return 'warning';
    case 'Cancelled': return 'danger';
    case 'Completed': return 'success';
    default: return 'primary';
  }
};

export default PeriodInformationPage;
