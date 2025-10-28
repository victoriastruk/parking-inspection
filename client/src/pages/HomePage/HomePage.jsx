import React, { useState } from "react";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";

const HomePage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn((prev) => !prev);
  };

  return (
    <main>
      {isSignIn ? (
        <SignIn onToggle={toggleForm} />
      ) : (
        <SignUp onToggle={toggleForm} />
      )}
    </main>
  );
};

export default HomePage;
