import React, { useContext } from "react";
import "./header.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  const history = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    // eslint-disable-next-line
    if (data.status !== 201) {
      console.log("error");
    } else {
      console.log("user logout");
      let token = localStorage.removeItem("usersdatatoken");
      setLoginData(false);
      history("/");
    }
  };

  const goDash = () => {
    history("/dash");
  };

  const goError = () => {
    history("*");
  };

  return (
    <>
      <header>
        <nav>
          <h1>EduCast</h1>

          <div className="avtar">
            {logindata.ValidUserOne ? (
              <Avatar style={{ background: "#3bba9c" }} onClick={handleClick}>
                {logindata.ValidUserOne.fname[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar style={{ background: "#3bba9c" }} onClick={handleClick} />
            )}
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {logindata.ValidUserOne ? (
              <>
                <MenuItem
                  onClick={() => {
                    goDash();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logoutuser();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    goError();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
              </>
            )}
          </Menu>
        </nav>
      </header>
    </>
  );
};

export default Header;
