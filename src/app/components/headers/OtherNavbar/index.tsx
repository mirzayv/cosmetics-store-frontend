import {
  Box,
  Button,
  Container,
  Stack,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "../Basket";
import { CartItem } from "../../../../lib/types/search";
import { useGlobals } from "../../../hooks/useGlobals";
import { serverApi } from "../../../../lib/config";
import Logout from "@mui/icons-material/Logout";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  return (
    <div className={"other-navbar"}>
      <Container className={"navbar-container"}>
        <Stack className={"menu"}>
          <Box>
            <NavLink to="/">
              <span className="brand-logo-text">Cosmetics Store</span>
            </NavLink>
          </Box>
          <Stack className={"links"}>
            <Box className={"hover-line"}>
              <NavLink to="/">Home</NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to="/products" activeClassName={"underline"}>
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/orders" activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to="/about" activeClassName="underline">
                About Us
              </NavLink>
            </Box>
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />
            {!authMember ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  className="signup-nav-link"
                  onClick={() => setSignupOpen(true)}
                  sx={{ cursor: "pointer" }}
                >
                  Sign Up
                </Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Stack>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/icons/default-user.svg"
                }
                aria-haspopup={"true"}
                onClick={handleLogoutClick}
                alt=""
              />
            )}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  borderRadius: "14px",
                  boxShadow: "0 16px 36px rgba(20, 3, 66, 0.22)",
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
              <MenuItem
                onClick={handleLogoutRequest}
                sx={{
                  borderRadius: "10px",
                  mx: 0.5,
                  my: 0.25,
                  fontFamily: "Poppins, sans-serif",
                  "&:hover": { backgroundColor: "#f2eefc" },
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "#140342" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
