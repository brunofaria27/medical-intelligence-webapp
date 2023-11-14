import Box from '@mui/material/Box';
import List from '@mui/material/List';
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