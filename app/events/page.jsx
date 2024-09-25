import React, { Suspense } from 'react';
import Events from './Event'; // Import the Events component

export default function Page() {
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <Events /> {/* Render Events inside the Suspense */}
    </Suspense>
  );
}