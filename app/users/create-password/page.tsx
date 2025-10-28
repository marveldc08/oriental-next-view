"use client";

import { Suspense } from "react";
import CreatePasswordPage from "./CreatePasswordPageInner";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePasswordPage />
    </Suspense>
  );
}











