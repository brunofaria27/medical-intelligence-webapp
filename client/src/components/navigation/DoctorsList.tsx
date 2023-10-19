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
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


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
            <strong>MÉDICOS INDICADOS</strong>
            </Typography>
            <hr style={{ marginBottom: "20px" }}></hr>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: "white" }}>
            <div
                style={{
                  paddingLeft: 10,
                  height: "auto",
                  marginBottom: 10,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderTopColor: "white",
                  borderRadius: "15px",
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                    color: "black",
                  }}
                >
                  <p>Médico 1</p>
                  
                  <div
                  style={{
                    textAlign: "left",
                    color: "rgba(180, 180, 180)",
                  }}
                >
                  <p>Endereço</p>
                </div>

                </div>
              </div>
              <div
                style={{
                  paddingLeft: 10,
                  height: "auto",
                  marginBottom: 10,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderTopColor: "white",
                  borderRadius: "15px",
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                    color: "black",
                  }}
                >
                  <p>Médico 2</p>
                  
                  <div
                  style={{
                    textAlign: "left",
                    color: "rgba(180, 180, 180)",
                  }}
                >
                  <p>Endereço</p>
                </div>

                </div>
              </div>
    </List>
        </Container>
      </nav>
    </Box>
  );
}