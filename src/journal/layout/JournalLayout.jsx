import { Toolbar } from "@mui/material";
import { Box } from "@mui/system"
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({children}) => {
  return (
      <Box sx={{display:'flex'}}>

        {/* Navbar */}
        <NavBar drawerWidth={drawerWidth}/>
        {/* Sidebar */}
        <SideBar drawerWidth={drawerWidth} title='Josue Zorrilla'/>
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
