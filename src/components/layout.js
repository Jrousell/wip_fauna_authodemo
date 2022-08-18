import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Layout = (props) => {
  const { logout, isAuthenticated, user, loginWithRedirect } = useAuth0();
  const { children } = props;

  console.log(user);

  return (
    <>
      <nav>
        {isAuthenticated && (
          <div>
            <img src={user.picture} />
            <b>{user.name}</b>
          </div>
        )}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/secure">Secure</Link>
          </li>
          <li>
            {isAuthenticated && (
              <Link to="/" onClick={() => logout()}>
                logout
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/" onClick={() => loginWithRedirect()}>
                login
              </Link>
            )}
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
};

export default Layout;
