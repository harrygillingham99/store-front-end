import React from "react";
import { Navbar, Nav, DropdownButton, Dropdown } from "react-bootstrap";
import { AppContainer } from "../state/AppState";
import { Routes } from "../types/Routes";
import loggedIn from "../assets/user.svg";
import loggedOut from "../assets/user-x.svg";
import firebase from "firebase";
import {
  signInWithGoogle,
  signInAnonymously,
  signOut,
} from "../utils/Firebase";
import { CartMenu } from "./CartMenu";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";
import { IsUserAdministrator } from "../utils/Admin";
import { AppAlertContainer } from "../state/AppAlertState";
import { AdminIcon } from "./AdminIcon";
import { EmailPasswordModal } from "./EmailPasswordModal";

const NavigationBar = () => {
  const {
    SetUser,
    user,
    toggleAccountModal,
    setAdmin,
    isAdmin,
  } = AppContainer.useContainer();
  const { ToggleAlert } = AppAlertContainer.useContainer();
  const [emailPasswordModal, setEmailPasswordModal] = React.useState<boolean>(
    false
  );

  React.useEffect(() => {
    const IsAdminUser = () => {
      if (user === undefined) return;

      IsUserAdministrator(user)
        .then((res) => setAdmin(res))
        .catch(() =>
          ToggleAlert(
            true,
            "danger",
            "Error!",
            "Failed to get user information."
          )
        );
    };
    IsAdminUser();
  }, [setAdmin, user, ToggleAlert]);

  const isLoggedIn = user !== undefined && firebase.auth().currentUser !== null;

  return (
    <Navbar className="navbar navbar-dark bg-dark">
      <Navbar.Brand href="#home">Ninebarrow Pet Supplies</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto justify-content-end">
          <Nav.Link href={Routes.Home}>Home</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          {isAdmin && <AdminIcon show={isAdmin} />}
          <CartMenu show={isLoggedIn} />
          <DropdownButton
            id="basic-nav-dropdown"
            variant="light"
            menuAlign="right"
            className="list-unstyled"
            title={
              <img alt="account icon" src={isLoggedIn ? loggedIn : loggedOut} />
            }
          >
            <>
              <IfFirebaseUnAuthed>
                {() => (
                  <>
                    <Dropdown.Item onClick={() => signInWithGoogle(SetUser)}>
                      Login with Google
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setEmailPasswordModal(true)}>
                      Login with Email and Password
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => signInAnonymously(SetUser)}>
                      Login as Guest
                    </Dropdown.Item>
                  </>
                )}
              </IfFirebaseUnAuthed>
              <IfFirebaseAuthed>
                {() => {
                  return (
                    <>
                      <Dropdown.Item onClick={() => toggleAccountModal(true)}>
                        Account
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => signOut(SetUser)}>
                        Sign Out
                      </Dropdown.Item>
                    </>
                  );
                }}
              </IfFirebaseAuthed>
            </>
          </DropdownButton>
        </Nav>
      </Navbar.Collapse>
      <EmailPasswordModal
        SetUser={SetUser}
        setEmailPasswordModal={setEmailPasswordModal}
        show={emailPasswordModal}
      />
    </Navbar>
  );
};

export default NavigationBar;
