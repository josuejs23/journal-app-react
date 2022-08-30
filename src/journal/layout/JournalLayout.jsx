import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { useDispatch, useSelector } from "react-redux";
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({children}) => {

  return (
      <Box sx={{display:'flex'}} className="animate__animated animate__fadeIn animate__faster">

        {/* Navbar */}
        <NavBar drawerWidth={drawerWidth}/>
        {/* Sidebar */}
        <SideBar drawerWidth={drawerWidth}/>
        <Box
            component='main'
            drawerWidth={drawerWidth}
            sx={{flexGrow:1, p:3}}
        >
            <Toolbar/>
            {children}
        </Box>
      </Box>
  )
}
