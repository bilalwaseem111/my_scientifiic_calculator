import React from 'react';
import Calculator from '../components/Calculator';
// import LinkedInLogo from '../components/LinkedInLogo';

export default function HomePage() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1></h1>
      <Calculator />
      {/* <LinkedInLogo /> */}
    </main>
  );
}
