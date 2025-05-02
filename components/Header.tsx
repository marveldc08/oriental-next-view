'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MetisMenu from 'metismenujs';

export default function Header({ pageName, moduleName }: { pageName: string, moduleName: string }) {
  const menuRef = useRef<HTMLUListElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuName, setMenuName] = useState<string | null>(null);

  const toggleMenu = (menuName: string)=>{
    setMenuName((prev)=> (prev === menuName ? null : menuName))
  }

  useEffect(() => {
    if (menuRef.current) {
      const metis = new MetisMenu(menuRef.current);

      return () => {
        metis.dispose(); // 💥 Clean up MetisMenu instance
      };
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.classList.toggle('sidebar-collapsed');
  };

  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar-menu ${sidebarOpen ? '' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <Link href="/"><Image src="/assets/images/icon/logo.png" alt="logo" width={150} height={50} /></Link>
          </div>
        </div>
        <div className="main-menu">
          <div className="menu-inner">
            <nav>
              <ul className="metismenu" id="menu" ref={menuRef}>
                <li className="active">
                  <Link href="/dashboard"><i className="ti-dashboard"></i><span>Dashboard</span></Link>
                </li>
                <li>
                 <div onClick={()=> toggleMenu("Configuration")}>
                 <a href="#" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}} >
                 <div> <i className="ti-settings"></i><span>Configuration</span></div>
                 <i className={`${menuName === 'Configuration' ? 'ti-angle-up' : 'ti-angle-down'}`} style={{fontSize:"15px"}} />
                 </a>
                 {/* <i className={`ti-angle-down transform transition-transform rotate-180`} /> */}
                 </div>
                 {menuName === "Configuration" && (
                   <ul >
                      <li><Link href="/time-parameters">Setup Time Parameters</Link></li>
                      <li><Link href="/activities">Setup Activities</Link></li>
                      <li><Link href="/role-management">Setup Authorization</Link></li>
                    </ul>
                 )}
                </li>
                <li>
                <div onClick={()=> toggleMenu("User")}>
                  <a href="#" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}} >
                    <div><i className="ti-user"></i><span>User Management</span></div>
                  <i className={`${menuName === 'Usre' ? 'ti-angle-up' : 'ti-angle-down'}`} style={{fontSize:"15px"}} />
                  </a>
                </div>
                {menuName === "User" && (
                  <ul>
                    <li><Link href="/user-setup">All Users</Link></li>
                    <li><Link href="/user-detail">Search User</Link></li>
                  </ul>
                )}

                </li>
                <li>
                <div onClick={()=> toggleMenu("Lifting")}>
                   <a href="#" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}} >
                    <div><i className="ti-timer"></i><span>Lifting Periods</span></div>
                    <i className={`${menuName === 'Lifting' ? 'ti-angle-up' : 'ti-angle-down'}`} style={{fontSize:"15px"}} />
                   </a>
                </div>
                {menuName === "Lifting" && (
                  <ul>
                    <li><Link href="/period-setup">Manage Periods</Link></li>
                </ul>
                )}
                </li>
                <li>
                <div onClick={()=> toggleMenu("Reporting")}>
                  <a href="#" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}} >
                    <div><i className="ti-file"></i><span>Reporting</span></div>
                  <i className={`${menuName === 'Reporting' ? 'ti-angle-up' : 'ti-angle-down'}`} style={{fontSize:"15px"}} />
                  </a>
                </div>
                {menuName === "Reporting" && (
                  <ul>
                    <li><Link href="/reports">Reports</Link></li>
                    <li><Link href="/report-setup">Fill Lifting Report</Link></li>
                  </ul>
                )}

                </li>
                <li>
                <div onClick={()=> toggleMenu("System")}>
                   <a href="#" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}} >
                    <div><i className="ti-book"></i><span>System Audit</span></div>
                    <i className={`${menuName === 'System' ? 'ti-angle-up' : 'ti-angle-down'}`} style={{fontSize:"15px"}} />
                   </a>
                </div>
                {menuName === "System" && (
                  <ul>
                  <li><Link href="/system-audit">Manage Audit</Link></li>
                </ul>
                )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header-area">
        <div className="row align-items-center">
          <div className="col-md-6 col-sm-8 clearfix">
            <div className="nav-btn pull-left" onClick={toggleSidebar} style={{ cursor: "pointer" }}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="search-box pull-left"></div>
          </div>
          <div className="col-md-6 col-sm-4 clearfix">
            <ul className="notification-area pull-right">
              <li className="dropdown">
                <i className="ti-bell dropdown-toggle" data-toggle="dropdown">
                  <span>2</span>
                </i>
                <div className="dropdown-menu bell-notify-box notify-box">
                  <span className="notify-title">You have 3 new notifications <a href="#">view all</a></span>
                  <div className="nofity-list">
                    {Array(5).fill(null).map((_, i) => (
                      <a href="#" className="notify-item" key={i}>
                        <div className="notify-thumb"><i className="ti-key btn-danger"></i></div>
                        <div className="notify-text">
                          <p>You have Changed Your Password</p>
                          <span>Just Now</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="settings-btn">
                <i className="ti-settings"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Page Title Area */}
      <div className="page-title-area">
        <div className="row align-items-center">
          <div className="col-sm-6">
            <div className="breadcrumbs-area clearfix">
              <h4 className="page-title pull-left">{pageName}</h4>
              <ul className="breadcrumbs pull-left">
                <li><Link href="/dashboard">Home</Link></li>
                <li><span>{moduleName}</span></li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 clearfix">
            <div className="user-profile pull-right">
              <Image className="avatar user-thumb" src="/assets/images/author/avatar.png" alt="avatar" width={40} height={40} />
              <h4 className="user-name dropdown-toggle" data-toggle="dropdown">
                Dun-Smart <i className="fa fa-angle-down"></i>
              </h4>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Message</a>
                <a className="dropdown-item" href="#">Settings</a>
                <a className="dropdown-item" href="#">Log Out</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
