import React from "react";

const NoMoviesFound: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold">No movies found.</h1>
    </div>
  );
};

export default NoMoviesFound;
