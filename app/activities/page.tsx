"use client";
import { useState } from "react";
import "../../public/assets/css/bootstrap.min.css";
// import "@/public/assets/css/styles.css";
import "../../public/assets/css/styles.css";
import Header from "../../components/Header";

export default function ConfigurationActivites() {
  const [activeTab, setActiveTab] = useState<"basic" | "roles">("basic");

  return (
    <div className="page-container">
      <Header pageName="Configuration" moduleName="Activites" />
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid">
                <b>Activites</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
