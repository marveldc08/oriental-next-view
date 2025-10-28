"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify"; 
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useLocalStorageObject } from "../../../hooks/useLocalStorage";
import FixMalformedUrl from "../../../components/FixMalformedUrl";

interface UserOnboardData {
  StaffId: number,
  Name: string,
  Email: string,
  Role: string,
  IsPasswordCreationRequired: boolean
};

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [decrypted, setDecrypted] = useState<string | null>(null);
  const [userOnboardData, setUserOnboardData] = useState<UserOnboardData | null>(null);
   const [loading, setLoading] = useState(false); 
  const [token, setToken] = useLocalStorageObject("token", null);


  useEffect(() => {
  const currentUrl = window.location.href;

  if (currentUrl.includes("%255C") || currentUrl.includes("%3D")) {
    // Fix the URL by decoding and redirecting
    const decoded = decodeURIComponent(currentUrl);

    // Now rewrite it if needed:
    const fixedUrl = decoded.replace("\\", "/").replace("extras=", "?extras=");

    // Remove double slashes
    const cleanedUrl = fixedUrl.replace(/\/{2,}/g, "/");

    // Redirect to the corrected URL
    window.location.href = cleanedUrl;
  }
}, []);


  const searchParams = useSearchParams();
  const encryptedBase64 = searchParams.get("extras");

  useEffect(() => {

    if (encryptedBase64) {
     
      decryptAES256CBC(encryptedBase64)
        .then(setDecrypted)
        .catch((err) => console.error("Decryption error:", err));
    } else {
      console.log("No parameter found in URL.");
    }
  }, [encryptedBase64]);

  // ✅ Proper Base64 normalization
  function normalizeBase64(base64: string): string {
    let normalized = base64
      .replace(/ /g, "+")         // spaces to +
      .replace(/[^\w+/=]/g, "");  // remove all invalid characters (e.g. ')')
      
    const pad = normalized.length % 4;
    if (pad > 0) {
      normalized += "=".repeat(4 - pad);
    }
    return normalized;
  }


  // ✅ AES-256-CBC decryption function using Web Crypto API
  async function decryptAES256CBC(encryptedBase64: string) {
    function hexToBytes(hex: string) {
      const bytes = new Uint8Array(hex.length / 2);
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
      }
      return bytes;
    }

    const secretKeyHex = process.env.NEXT_PUBLIC_SECRET_KEY ;
    const initiatorVectorHex = process.env.NEXT_PUBLIC_INITIATOR_VECTOR ;

    const secretKeyBytes = hexToBytes(secretKeyHex ?? "");
    const initiatorVectorBytes = hexToBytes(initiatorVectorHex ?? "");

    const decodedParam = decodeURIComponent(encryptedBase64);
    const cleanedBase64 = normalizeBase64(decodedParam);


    let encryptedBytes;
    try {
      encryptedBytes = Uint8Array.from(atob(cleanedBase64), (c) => c.charCodeAt(0));
    } catch (e) {
      console.error("Invalid Base64");
      throw e;
    }

    const cryptoKey = await crypto.subtle.importKey("raw", secretKeyBytes, { name: "AES-CBC" }, false, [
      "decrypt",
    ]);

    const decryptedBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv: initiatorVectorBytes,
      },
      cryptoKey,
      encryptedBytes
    );

    const decoded = new TextDecoder().decode(decryptedBuffer);
    return decoded;
  }

  useEffect(() => {
    if (decrypted) {
      try {
        let parsed = JSON.parse(decrypted);

        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }
        setUserOnboardData(parsed);


        if (!userOnboardData?.IsPasswordCreationRequired) {
          router.push("/login");
          
        }
         
      } catch (error) {
        console.error("Error processing decrypted value:", error);
        
      }
    }
  }, [decrypted, router, userOnboardData?.IsPasswordCreationRequired]);




  const handleSubmit = async(userName: string, password: string, confirm: string) => {
    setLoading(true)
   

      if (!userOnboardData || typeof userOnboardData !== "object") {

        toast.error("User data not loaded properly.");
        setLoading(false);
        return;
      }


  
      try {
        if (!password || !confirm) {
          toast.warning("Please fill in both password fields.");
          return;
        }

        if (password !== confirm) {
          toast.error("Passwords do not match.");
          return;
        }

        if (/\s/.test(userName)) {
          toast.warning("User Name should not include space");
          return;
        }

        const staffId = userOnboardData.StaffId;

        const response = await fetch("/api/auth/create-password", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ staffId, password, userName }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log({ data });
          toast.success("Successfully created password");
          router.push("/login");
        } else {
          // 👇 don't throw, instead handle the error cleanly
          toast.error(data.message || "Login failed");
        }

      } catch (err) {
        console.error("Error during form submission:", err);
        toast.error("Error during form submission.");
      } finally {
        setLoading(false); // ✅ this runs whether success or failure
      };

  };

  return (
    <div className="login-area login-s2">
    <FixMalformedUrl />
      {/* {loading && <Loader />} */}
      <div className="container">
        <div className="login-box ptb--100">
          <form>
            <div className="login-form-head">
              <h4>Create New Password</h4>
              <p>Set a secure password for your account.</p>
            </div>

            <div className="login-form-body">
              <div className={`form-gp ${userName ? "active" : ""}`}>
                <input
                  type="text"
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <i className="ti-lock" />
                <label htmlFor="userName">User Name</label>
              </div>
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
              </div>

              <div className="submit-btn-area">
                <button type="button" className="btn btn-primary btn-block" style={{cursor: loading ? "not-allowed" : "pointer"}} disabled={loading} onClick={() => handleSubmit(userName, password, confirm)}>
                  {loading ? "Creating..." : "Create Password"}  <i className="ti-check" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
