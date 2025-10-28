'use client';

import React, { useEffect, useState } from 'react';
import { Tab, Tabs, Nav, Card, Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/Header';
import { useLocalStorageObject } from '../../../hooks/useLocalStorage';

const ReportSetupPage = () => {

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
    
        useEffect(() => {
          if (user) {
            setUserName(`${user.firstName} ${user.lastName}`);
          } else {
            console.log("No user data found.");
          }
        }, [user]);
  return (
    <div className='page-container'>
     <Header pageName="Reporting" moduleName="Report Setup" userName={userName} />
    <Container fluid className="mt-5">
      <Row>
        <Col xl={12} className="mt-4">
          <Card className="border-left-primary">
            <Card.Body>
              <h4 className="header-title">Fill Lifting Report</h4>
              <hr />
              <Card>
                <Card.Body>
                <Tab.Container defaultActiveKey="basicInfo">
                    <Tabs defaultActiveKey="basicInfo" className="mt-3" id="myTabContent">
                        <Tab eventKey="basicInfo" title="Basic Information">
                            <div className="col-md-10 p-5">
                            <form>
                                <div className="form-row">
                                <div className="col-md-4 mb-3">
                                    <label>Export Terminal</label>
                                    <select className="form-control">
                                    <option>Select Terminal</option>
                                    <option>Ebok</option>
                                    <option>Okwok</option>
                                    <option>Okoro</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Lifter</label>
                                    <select className="form-control">
                                    <option>Select Lifter</option>
                                    <option>NNPC</option>
                                    <option>Oriental</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Nominated Volume (In Barrels)</label>
                                    <input type="number" className="form-control" placeholder="1000 Barrels" />
                                </div>
                                </div>
                                <div className="form-row">
                                <div className="col-md-4 mb-3">
                                    <label>Estimated Time of Arrival</label>
                                    <input type="date" className="form-control" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Laycan (From)</label>
                                    <input type="date" className="form-control" />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Laycan (To)</label>
                                    <input type="date" className="form-control" />
                                </div>
                                </div>
                                <div className="form-row">
                                <div className="col-md-4 mb-3">
                                    <label>Cargo Type</label>
                                    <select className="form-control">
                                    <option>Select Cargo Type</option>
                                    <option>Active</option>
                                    <option>New</option>
                                    <option>Deactivated</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Unique Cargo Number</label>
                                    <input type="number" className="form-control" placeholder="1000" />
                                </div>
                                </div>
                                <div className="form-row">
                                <div className="col-md-4 mb-3">
                                    <label>Consignor</label>
                                    <select className="form-control">
                                    <option>Select Consignor</option>
                                    <option>NNPC Supplier to Calson Limited</option>
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label>Consignee</label>
                                    <select className="form-control">
                                    <option>Select Consignee</option>
                                    <option>BNP Paribas</option>
                                    </select>
                                </div>
                                </div>
                                <br />
                                <button className="btn btn-primary ml-auto float-end" type="button">
                                <i className="fa fa-save"></i>&nbsp; Save Changes
                                </button>
                            </form>
                            </div>
                        </Tab>

                        <Tab eventKey="vessel" title="Vessel Details">
                            <div className="col-md-10 p-5">
                            {/* Copy similar structure here for vessel details */}
                            <p>Vessel form content goes here...</p>
                            </div>
                        </Tab>

                        <Tab eventKey="export" title="Export Details">
                            <div className="col-md-10 p-5">
                            {/* Copy similar structure here for export details */}
                            <p>Export form content goes here...</p>
                            </div>
                        </Tab>

                        <Tab eventKey="documentation" title="Documentation">
                            <div className="col-md-10 p-5">
                            {/* Add any content or file uploads later */}
                            <p>Documentation form goes here...</p>
                            </div>
                        </Tab>

                        <Tab eventKey="financial" title="Financial">
                            <div className="col-md-10 p-5">
                            {/* Copy similar structure here for financials */}
                            <p>Financial form content goes here...</p>
                            </div>
                        </Tab>
                    </Tabs>
                </Tab.Container>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

    </div>
  );
};

export default ReportSetupPage;
