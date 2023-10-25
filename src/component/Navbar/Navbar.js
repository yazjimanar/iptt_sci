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

const drawerWidth = 200;
const drawer = (
  <div>
    <Toolbar>
      <img
        src={require("../assests/long.png")}
        alt="Logo"
        loading="lazy"
        style={{
          height: "140px",
          width: "130px",
          overflow: Hidden,
          paddingTop: "25px",
        }}
      />
    </Toolbar>
    <List>
      {mainNavbarItems.map((text, index) => (
        <ListItem key={text.id} disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: "#9DA4AE" }}>{text.icon}</ListItemIcon>
            <ListItemText primary={text.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>
);
const Navbar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          backgroundColor: "#111927",
          color: "#9DA4AE",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Navbar;
