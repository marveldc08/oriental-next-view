"use client";
import { useState } from "react";
// import "../../../public/assets/css/bootstrap.min.css";
// import "@/public/assets/css/styles.css";
// import "../../../public/assets/css/styles.css";
import Header from "../../../components/Header";

export default function RoleManagement() {
  const [activeTab, setActiveTab] = useState<"basic" | "roles">("basic");

  return (
    <div className="page-container">
      <Header pageName="Configuration" moduleName="Role Management" />
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
                <b>Role Management</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
