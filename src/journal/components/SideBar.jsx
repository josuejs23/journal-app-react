import { TurnedInNot } from "@mui/icons-material"
import { Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"

export const SideBar = ({drawerWidth=240, title}) => {
  return (
      <Box
        component='nav'
        sx={{width:{sm:drawerWidth}, flexShrink:{sm:0} }}
      >
          <Drawer
            variant="permanent"
            open
            sx={{
                display:{xs:'block'},
                '& .MuiDrawer-paper':{boxSizing:'border-box', width:drawerWidth}
            }}
          >
              <Toolbar>
                <Typography variant="h6" noWrap component="div"> 
                    {title} 
                </Typography>
              </Toolbar>
              <Divider/>
              <List>
                  {
                      ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'].map( item => 
                          (
                            <ListItem key={item} disablePadding variant="">
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot/> 
                                    </ListItemIcon>
                                    <Grid container>
                                        <ListItemText primary={item}/>
                                        <ListItemText secondary='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium voluptate provident magnam soluta ea sint et!'/> 
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                          )
                      )
                  }
              </List>
          </Drawer>
      </Box>
  )
}
