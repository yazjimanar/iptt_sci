import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { mainNavbarItems } from "../Navbar/consts/navbarItems";
import { Hidden } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 320;

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 220,
          boxSizing: "border-box",
          backgroundColor: "#101F33",
          color: "rgba(255, 255, 255, 0.7)",
        },
      }}
    >
      <Toolbar>
        {/* <img
          src={require("../assests/long.png")}
          alt="Logo"
          loading="lazy"
          style={{
            height: "120px",
            width: "120px",
            overflow: Hidden,
            paddingTop: "25px",
          }}
        /> */}
      </Toolbar>
      <List>
        {mainNavbarItems.map((text, index) => (
          <ListItem key={text.id} disablePadding>
            <ListItemButton onClick={() => navigate(text.route)}>
              <ListItemIcon sx={{ color: "#9DA4AE" }}>{text.icon}</ListItemIcon>
              <ListItemText primary={text.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Navbar;
