"use client"
import React,{useEffect, useState} from 'react'
import Link from 'next/link'
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Header from '../../components/Header'
import { PieChart } from '@mui/x-charts/PieChart';
import { useLocalStorageObject } from '../../hooks/useLocalStorage';



const uData = [3000, 3460, 3200, 2780, 1490, 2390, 3490];
const pData = [2400, 1398, 4800, 3908, 4800, 3800, 4300];
const amtData = [2100, 2210, 2340, 2400, 2481, 2500, 2300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

export default function DashboardPage() {
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
      <Header pageName="Dashboard" moduleName="Dashboard"  userName={userName} />
      <div id="wrapper" >
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
              <div className="row">&nbsp;</div>

              {/* Row of Cards */}
              <div className="row">
                {[
                  {
                    title: "Earnings (Monthly)",
                    value: "$40,000",
                    border: "primary",
                    icon: "calendar",
                    text: "text-primary",
                  },
                  {
                    title: "Earnings (Annual)",
                    value: "$215,000",
                    border: "success",
                    icon: "dollar",
                    text: "text-success",
                  },
                  {
                    title: "Tasks",
                    value: "50%",
                    border: "info",
                    icon: "clipboard",
                    text: "text-info",
                    isProgress: true,
                  },
                  {
                    title: "Pending Requests",
                    value: "18",
                    border: "warning",
                    icon: "comments",
                    text: "text-warning",
                  },
                ].map((card, index) => (
                  <div key={index} className="col-xl-3 col-md-6 mb-4 ">
                    <div
                      className={`card border-left-${card.border} shadow h-100 py-2 px-4`}
                    >
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div
                              className={`text-xs font-weight-bold ${card.text} text-uppercase mb-1`}
                            >
                              {card.title}
                            </div>
                            {!card.isProgress ? (
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {card.value}
                              </div>
                            ) : (
                              <div className="row no-gutters align-items-center">
                                <div className="col-auto">
                                  <div className="h5 mb-0  font-weight-bold text-gray-800">
                                    {card.value}
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="progress progress-sm mx-4 ">
                                    <div
                                      className="progress-bar bg-info"
                                      role="progressbar"
                                      style={{ width: "50%",borderRadius: "5px" }}
                                      aria-valuenow={50}
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-auto">
                            <i
                              className={`fa fa-${card.icon} fa-2x text-gray-300`}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Area Chart */}
              <div className="row">
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Productivity Outlook
                      </h6>
                      <div className="dropdown no-arrow">
                        <a
                          className="dropdown-toggle"
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <div className="dropdown-header">Filter By</div>
                          <a className="dropdown-item" href="#">
                            Last 24 Hours
                          </a>
                          <a className="dropdown-item" href="#">
                            Last One Month
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      {/* <div className="chart-area">
                        <canvas id="myAreaChart"></canvas>
                      </div> */}
                      
                         <LineChart
                        //  width={auto}
                         height={500}
                         series={[
                           { data: uData, label: 'uv', area: false, stack: 'total', showMark: false },
                           { data: pData, label: 'pv', area: false, stack: 'total', showMark: false },
                           {data: amtData,label: 'amt',area: false,stack: 'total',showMark: false},
                         ]}
                         xAxis={[{ scaleType: 'point', data: xLabels }]}
                         sx={{
                           [`& .${lineElementClasses.root}`]: {
                             display: 'none',
                           },
                         }}
                       />
                      
                    </div>
                  </div>
                </div>

                {/* Placeholder for Pie Chart Column */}
                <div className="col-xl-4 col-lg-5">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Activity Distribution
                      </h6>
                      <div className="dropdown no-arrow">
                        <a
                          className="dropdown-toggle"
                          href="#"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <i className="fa fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <div className="dropdown-header">Filter By</div>
                          <a className="dropdown-item" href="#">
                            Last 24 Hours
                          </a>
                          <a className="dropdown-item" href="#">
                            Last One Month
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className='card-body'>
                      {/* <div className="chart-pie pt-4 pb-2"> */}
                      <PieChart 
                        series={[
                          {
                            data: [
                              { id: 0, value: 10, label: 'series A' },
                              { id: 1, value: 15, label: 'series B' },
                              { id: 2, value: 20, label: 'series C' },
                            ],
                          },
                        ]}
                        // width={400}
                        height={200}
                      />
                      <PieChart
                        series={[
                          {
                            data: [
                              { id: 0, value: 10, label: 'series A' },
                              { id: 1, value: 15, label: 'series B' },
                              { id: 2, value: 5, label: 'series C' },
                              { id: 3, value: 38, label: 'series D' },
                              { id: 4, value: 20, label: 'series E' },
                            ],
                          },
                        ]}
                        // width={400}
                        height={200}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                {/* Timeline area */}
                <div className="col-xl-8 col-ml-7 col-lg-7 mt-5">
                  <div className="card border-left-primary">
                    <div className="card-body">
                      <h4 className="header-title">
                        Operations Activity Timeline
                      </h4>
                      <div className="timeline-area">
                        {[
                          {
                            icon: "fa-envelope",
                            bg: "bg1",
                            desc: "Rashed sent you an email",
                            time: "09:35",
                            content: true,
                          },
                          {
                            icon: "fa-exclamation-triangle",
                            bg: "bg2",
                            desc: "Rashed sent you an email",
                            time: "09:35",
                            content: true,
                          },
                          {
                            icon: "fa-exclamation-triangle",
                            bg: "bg2",
                            desc: "Rashed sent you an email",
                            time: "09:35",
                            content: false,
                          },
                          {
                            icon: "fa-bomb",
                            bg: "bg3",
                            desc: "Rashed sent you an email",
                            time: "09:35",
                            content: true,
                          },
                          {
                            icon: "ti-signal",
                            bg: "bg3",
                            desc: "Rashed sent you an email",
                            time: "09:35",
                            content: true,
                          },
                        ].map((item, idx) => (
                          <div className="timeline-task" key={idx}>
                            <div className={`icon ${item.bg}`}>
                              <i className={`fa ${item.icon}`} />
                            </div>
                            <div className="tm-title">
                              <h4>{item.desc}</h4>
                              <span className="time">
                                <i className="ti-time" /> {item.time}
                              </span>
                            </div>
                            {item.content && (
                              <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Esse distinctio itaque at.
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lifting Periods */}
                <div className="col-xl-4 col-ml-5 col-lg-5 mt-5">
                  <div className="card border-left-primary">
                    <div className="card-body">
                      <h4 className="header-title">
                        Lifting Periods{" "}
                        <span className="small"> - Last 10</span>
                        <span className="small float-right">
                          <Link href="/period/setup" className="btn-link">
                            <i className="fa fa-forward" /> &nbsp;View More
                          </Link>
                        </span>
                      </h4>
                      <div className="list-group">
                        {[
                          "Okwok 2024-Q1 Lifting Period",
                          "Ebok 2023-Q1 Lifting Period",
                          "2023-Q1 Lifting Period",
                          "2023-Q1 Lifting Period",
                          "2023-Q1 Lifting Period",
                          "2023-Q1 Lifting Period",
                          "2023-Q1 Lifting Period",
                          "2023-Q1 Lifting Period",
                          "2023-Q1 Lifting Period",
                          "2023-Q1 Lifting Period",
                          "2023-Q1 Lifting Period",
                        ].map((title, idx) => (
                          <Link
                            key={idx}
                            href="/period/detail"
                            className="list-group-item list-group-item-action flex-column align-items-start"
                          >
                            <div className="d-flex justify-content-between">
                              <h6 className="mb-1 font-14">{title}</h6>
                              <span className="badge badge-primary badge-pill">
                                2
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* End of Lifting Periods */}
              </div>

              <div className="row">
                <div className="col-xl-12 col-ml-12 col-lg-12 mt-5">
                  <div className="card border-left-primary">
                    <div className="card-body">
                      <h4 className="header-title">Lifting Exports</h4>
                      <form className="needs-validation" noValidate>
                        <div className="form-row">
                          <div className="col-md-3 mb-3">
                            <label>Vessel Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Vessel Name"
                            />
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
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Cargo Number"
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-md-3 mb-3">&nbsp;</div>
                          <div className="col-md-3 mb-3">&nbsp;</div>
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
                              type="reset"
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
                          className="table"
                          id="dataTable"
                          width="100%"
                          cellSpacing="0"
                        >
                          <thead>
                            <tr>
                              <th>Vessel Name</th>
                              <th>Terminal</th>
                              <th>Laycan</th>
                              <th>Lifter</th>
                              <th>BOL Date</th>
                              <th>BOL Volume (In Barrels)</th>
                              <th>Out Turn Volume (In Barrels)</th>
                              <th>Start date</th>
                              <th>End date</th>
                              <th>Lifting Status</th>
                              <th>Date Created</th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from({ length: 6 }).map((_, index) => (
                              <tr key={index}>
                                <td>Tiger Nixon</td>
                                <td>Ebok</td>
                                <td>System Architect</td>
                                <td>NNPC</td>
                                <td>2011/04/25</td>
                                <td>61</td>
                                <td>75</td>
                                <td>2011/04/25</td>
                                <td>2011/04/25</td>
                                <td>
                                  <span
                                    className={`badge badge-pill ${
                                      index % 4 === 0
                                        ? "badge-primary"
                                        : index % 4 === 1
                                        ? "badge-warning"
                                        : index % 4 === 2
                                        ? "badge-success"
                                        : "badge-danger"
                                    }`}
                                  >
                                    {index % 4 === 0
                                      ? "New"
                                      : index % 4 === 1
                                      ? "In Progress"
                                      : index % 4 === 2
                                      ? "Completed"
                                      : "Aborted"}
                                  </span>
                                </td>
                                <td>2011/04/25</td>
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
          </div>
        </div>
      </div>

    </div>
  );
}
