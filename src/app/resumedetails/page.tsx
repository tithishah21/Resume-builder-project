import React, { Suspense } from 'react';
import ClientResumePage from './ClientResumePage';

export default function ResumePageWrapper() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading resume form...</div>}>
      <ClientResumePage />
    </Suspense>
  );
}
