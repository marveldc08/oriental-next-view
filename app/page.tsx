"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {useState} from "react";




export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    router.push("/dashboard");
  };
  return (
    <div className="login-area login-s2">
      <div className="container">
      <div className="login-box ptb--100 " >
      <form>
        <div className="login-form-head">
          <h4>Sign In</h4>
          <p>
            Kindly sign in with your <b>Oriental email and password</b> to
            access the dashboard.
          </p>
        </div>

        <div className="login-form-body">

          <div className={`form-gp ${email ? "active" : ""}`}>
                <input
                  type="password"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="ti-email" /> 
                <label htmlFor="email">Email address</label>
                <div className="text-danger"></div>
          </div>

          {/* Password Field */}

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

          {/* Remember Me and Reset Password */}
          <div className="row mb-4 rmber-area">
            <div className="col-6">
              <div className="custom-control custom-checkbox mr-sm-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customControlAutosizing"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customControlAutosizing"
                >
                  Remember Me
                </label>
              </div>
            </div>
            <div className="col-6 text-right">
              <Link href="/reset-password">Reset your Password?</Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="submit-btn-area" >
            {/* <button id="form_submit" type="submit">
              Submit <i className="ti-arrow-right"/>
            </button> */}
            <button id="form_submit" type="button" onClick={handleSubmit}>
              Submit <i className="ti-arrow-right" />
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
