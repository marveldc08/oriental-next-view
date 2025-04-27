"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Do not show footer on the home page ("/")
  if (pathname === "/") return null;

  return (
    <footer>
      <div className="footer-area">
        <p>
          © Copyright 2024. All right reserved. Information Tech |{" "}
          <a href="https://oriental-er.com/">Oriental Energy Resources</a>.
        </p>
      </div>
    </footer>
  );
}
