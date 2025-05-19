"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {useState} from "react";



export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = () => {
    router.push("/dashboard");
  };
  return (
    <div className="login-area login-s2">
      <div className="container" >
      <div className="login-box ptb--100 " >
      <form>
        <div className="login-form-head">
          <h4>Create New Password</h4>
          <p>
          Set a secure password for your account.
          </p>
        </div>

        <div className="login-form-body">
   
          <div className={`form-gp ${password ? "active" : ""}`}>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="ti-lock" />
                <label htmlFor="password">New Password</label>
                <div className="text-danger"></div>
          </div>


     
          <div className={`form-gp ${confirm ? "active" : ""}`}>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
                <i className="ti-lock" />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="text-danger"></div>
              </div>

        

          {/* Submit Button */}
          <div className="submit-btn-area">
                <button type="button" onClick={handleSubmit}>
                  Create Password <i className="ti-check" />
                </button>
          </div>

          {/* Navigation Link */}
          {/* <div className="test-navigation submit-btn-area">
            <Link href="/dashboard">
              Test Navigate <i className="ti-arrow-right"/>
            </Link>
          </div> */}
        </div>
       
      </form>
    </div>
      </div>
    </div> 

  );
}
