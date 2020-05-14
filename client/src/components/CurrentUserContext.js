import React, { createContext, useReducer } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUserData, setCurrentUserData] = React.useState(null);
  const [status, setSatus] = React.useState(false);

  React.useEffect(() => {
    const profileData = async () => {
      try {
        let data = await fetch("/api/me/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });
        // console.log(data);
        if (data.status === 200) {
          let retrievedData = await data.json();
          setSatus(true);
          setCurrentUserData(retrievedData);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log("error", err);
      }
    };
    profileData();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUserData, setCurrentUserData, status }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
