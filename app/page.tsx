"use client";

import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="login-box ptb--100">
      <form>
        <div className="login-form-head">
          <h4>Sign In</h4>
          <p>
            Kindly sign in with your <b>Oriental email and password</b> to
            access the dashboard.
          </p>
        </div>

        <div className="login-form-body">
          {/* Email Field */}
          <div className="form-gp">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <div className="input-container">
              <input type="email" id="exampleInputEmail1" required />
              <Mail className="input-icon" />
            </div>
            <div className="text-danger"></div>
          </div>

          {/* Password Field */}
          <div className="form-gp">
            <label htmlFor="exampleInputPassword1">Password</label>
            <div className="input-container">
              <input type="password" id="exampleInputPassword1" required />
              <Lock className="input-icon" />
            </div>
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
          <div className="submit-btn-area">
            <button id="form_submit" type="submit">
              Submit <ArrowRight className="ml-1" />
            </button>
          </div>

          {/* Navigation Link */}
          <div className="test-navigation">
            <Link href="/dashboard">
              Test Navigate <ArrowRight className="ml-1" />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
