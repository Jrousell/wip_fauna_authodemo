import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { settings } from "utils/config";

const Secure = () => {
  const [haveToken, setHaveToken] = useState(false);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: settings.audience,
          scope: settings.scopes,
        });
        setHaveToken(token);

        const res = await fetch("http://localhost:8080/test", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
        console.log("error getting token", e);
      }
    })();
  }, [getAccessTokenSilently]);

  if (!isAuthenticated) return null;

  return (
    <>
      <h1>secure</h1>
      {haveToken}
      <hr />
    </>
  );
};

export default Secure;
