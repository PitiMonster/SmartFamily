import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";

import logoImgPath from "../../assets/icons/idea.svg";
import classes from "./index.module.scss";

import NotificationsInvitationsTabWindow from "./components/NotificationsInvitationsTabWindow";

// import history from "history/browser";

import { useHistory, useLocation } from "react-router-dom";
import { History } from "history";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { logout } from "../../store/auth/actions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(1),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const MyAppBar = () => {
  const dispatch = useAppDispatch();
  const history = useHistory<History>();
  const location = useLocation() as any;

  const appBarRef = React.useRef<null | HTMLElement>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] =
    React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [unreadMessagesCount, setUnreadMessagesCount] =
    React.useState<string>("0");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => {
    const newCount = localStorage.getItem("unreadMessagesCount") as string;
    if (newCount && newCount !== unreadMessagesCount) {
      setUnreadMessagesCount(newCount);
    }
  }, [localStorage.getItem("unreadMessagesCount")]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClickNotifications = (event: React.MouseEvent<HTMLElement>) => {
    console.log(isNotificationsOpen);
    if (window.innerWidth < 900) {
      setNotificationsAnchorEl(appBarRef as any);
    } else setNotificationsAnchorEl(event.currentTarget);
    setIsNotificationsOpen((isNotificationsOpen) => !isNotificationsOpen);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      onClick={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      onClick={handleMobileMenuClose}
      id={mobileMenuId}
      keepMounted
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          onClick={() => history.push("/chats")}
        >
          <Badge badgeContent={unreadMessagesCount} color="error">
            <ChatIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={handleClickNotifications}
        >
          <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => dispatch(logout)}
        >
          <LogoutIcon />
        </IconButton>
        <p>Log out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      ref={appBarRef}
      sx={{
        flexGrow: 1,
        gridArea: "appBar",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AppBar position="sticky">
        <Toolbar>
          {location.pathname !== "/groups" && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{
                mr: 2,
                alignSelf: "center",
                display: { xs: "block", sm: "none" },
              }}
              onClick={() => history.goBack()}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <div
            onClick={() => {
              history.push("/");
            }}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <img className={classes.logo__image} src={logoImgPath} alt="logo" />
            <Typography
              variant="h6"
              noWrap
              component="div"
              // sx={{ display: { xs: "none", sm: "block" } }}
            >
              Smart Family
            </Typography>
          </div>
          <Search sx={{ display: { xs: "none", sm: "block" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => history.push("/chats")}
              // onClick={() => {
              //   history.push("/chats");
              //   window.location.reload();
              // }}
            >
              <Badge badgeContent={unreadMessagesCount} color="error">
                <ChatIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleClickNotifications}
            >
              <NotificationsIcon />
            </IconButton>
            <Popper
              open={isNotificationsOpen}
              anchorEl={notificationsAnchorEl}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Box
                    sx={{
                      mt: { xs: 8, md: 1 },
                      mr: { xs: 0, md: 1 },
                      boxShadow: 3,
                      backgroundColor: "#fff",
                      width: { xs: "100vw", md: "350px" },
                      height: { xs: "93vh", md: "400px" },
                      overflowY: "auto",
                      overflowX: "hidden",
                    }}
                  >
                    <NotificationsInvitationsTabWindow />
                  </Box>
                </Fade>
              )}
            </Popper>
            <IconButton
              size="large"
              edge="end"
              onClick={() => dispatch(logout)}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </Box>
  );
};

export default MyAppBar;
