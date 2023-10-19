import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Typography, Container } from "@mui/material";


export const DoctorsList = () => {
  return (
    <Box style={{
        paddingLeft: 10,
        height: "auto",
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "black",
        borderTopColor: "white",
        borderRadius: "15px",
        backgroundColor: "rgba(243, 243, 243)",
      }}>
      <nav aria-label="main mailbox folders">
        <Container
            sx={{
            marginTop: "50px",
            padding: "15px",
            boxShadow: 12,
            backgroundColor: "white",
            borderRadius: "12px",
            }}
        >
            <Typography
            variant="h6"
            gutterBottom
            sx={{
                marginBottom: "15px",
            }}
            >
            <strong>LISTA DE MÉDICOS</strong>
            </Typography>
            <hr style={{ marginBottom: "20px" }}></hr>
            <List>
            <ListItem disablePadding>
                <ListItemButton>
                {/* <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon> */}
                <ListItemText primary="Médico 1" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                {/* <ListItemIcon>
                    <DraftsIcon />
                </ListItemIcon> */}
                <ListItemText primary="Médico 2" />
                </ListItemButton>
            </ListItem>
            </List>
        </Container>
      </nav>
    </Box>
  );
}