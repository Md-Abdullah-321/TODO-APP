import React from 'react';

const NotFound = () => {
  return (
    <div className="bg-Background-Color h-screen flex justify-center items-center font-mono">
      <div className="bg-Secondary-Color w-5/6 md:w-1/3 rounded-md p-8">
        <h1 className="text-center text-2xl font-semibold uppercase text-Primary-Color mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-Text-Color">
          Oops! The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
