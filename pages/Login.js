import React from 'react';
import welcome from '../assets/images/welome.webp';
import MainForm from '../features/authentication/MainForm';

function Login() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${welcome})`,
      }}
    >
      <MainForm />
    </div>
  );
}

export default Login;
