import React from 'react'
import { Grid, AppBar, Toolbar, Typography, Box } from "@material-ui/core";
import "./Navbar.css";
//import { Link } from "react-router-dom";


function  Navbar() { 
  return(
  <>
      <AppBar position="static" className="navbar" style={{ backgroundColor: '#F4A460' }}>
        <Toolbar variant="dense">
          <Grid container justifyContent={'space-between'}>
            <Box style={{ cursor: 'pointer' }}>
              <Typography variant="h5" color="inherit">
              <img className='image' src="/src/assets/logo.jpg" alt="" style={{ width: '205px', height: '40px' }} />
              </Typography>

            </Box>
            <Box display="flex" justifyContent="start">
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Typography variant="h6" color="inherit">
                  inicio 
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Typography variant="h6" color="inherit">
                  cestas
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Typography variant="h6" color="inherit">
                  loja
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Typography variant="h6" color="inherit">
                  sobre nós 
                </Typography>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
<<<<<<< HEAD
                
=======
>>>>>>> f06cee59b1003b234d16b1a8e0bed5cca915e477
                  <Typography variant="h6" color="inherit">
                    login
                  </Typography>
<<<<<<< HEAD
                
=======
>>>>>>> f06cee59b1003b234d16b1a8e0bed5cca915e477
              </Box>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}



export default Navbar