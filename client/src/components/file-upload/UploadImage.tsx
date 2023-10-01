import * as React from "react";

import {
  Box,
  Button,
  Container,
  IconButton,
  ImageListItem,
  Modal,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import InfoIcon from "@mui/icons-material/Info";
import { darkTheme } from "../style/darkTheme";

export const UploadImage = () => {
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [openInfoModal, setOpenInfoModal] = React.useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles[0]);
  };

  function handleRemoveImage() {
    setSelectedImage(null);
  }

  function handleUpload() {
    if (selectedImage) {
      // TODO: Tratar envio para o backend
    }
  }

  const handleOpenInfoModal = () => setOpenInfoModal(true);
  const handleCloseInfoModal = () => setOpenInfoModal(false);

  return (
    <ThemeProvider theme={darkTheme}>
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
          🤖 <strong>DIAGNÓSTICO INTELIGENTE</strong>
        </Typography>

        <hr style={{ marginBottom: "20px" }}></hr>

        {selectedImage ? (
          <>
            <Box
              sx={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LabelImportantIcon
                  color="error"
                  sx={{ fontSize: "35px", marginRight: "5px" }}
                />
                Você selecionou a imagem:
              </Typography>

              <IconButton
                onClick={() => {
                  handleOpenInfoModal();
                }}
              >
                <InfoIcon color="primary" style={{ fontSize: "35px" }} />
              </IconButton>
            </Box>

            <ImageListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={URL.createObjectURL(selectedImage)}
                loading="lazy"
                alt="Preview Site Images"
                style={{
                  boxShadow: "4px 12px 12px rgba(0, 0, 0, 0.3)",
                  maxWidth: "75%",
                  maxHeight: "50vh",
                  width: "auto",
                  height: "auto",
                }}
              />
            </ImageListItem>

            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                color="error"
                onClick={handleRemoveImage}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<SendIcon />}
                sx={{ marginLeft: "10px" }}
                onClick={handleUpload}
              >
                Enviar
              </Button>
            </Box>
          </>
        ) : (
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                style={{
                  paddingLeft: 10,
                  height: "auto",
                  marginBottom: 10,
                  marginTop: 10,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  borderColor: "black",
                  borderTopColor: "white",
                  borderRadius: "15px",
                  backgroundColor: "rgba(243, 243, 243)",
                }}
              >
                <input {...getInputProps()} />
                <div
                  style={{
                    textAlign: "center",
                    color: "rgba(180, 180, 180)",
                  }}
                >
                  <p>Arraste a imagem ou clique para selecionar uma imagem</p>
                  <CloudUploadIcon
                    sx={{
                      fontSize: 75,
                    }}
                  />
                </div>
              </div>
            )}
          </Dropzone>
        )}

        <Modal
          open={openInfoModal}
          onClose={handleCloseInfoModal}
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography color="black" variant="body1">
                <strong>Informações importantes</strong>
              </Typography>

              <IconButton color="error" onClick={handleCloseInfoModal}>
                <CloseIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Box>

            <hr />

            <Typography
              color="black"
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                textAlign: "justify",
              }}
            >
              A imagem que você selecionou irá ser utilizada para um diagnóstico
              feito por uma inteligência artificial. Após isso ela será
              descartada, caso deseje outra imagem basta CANCELAR e enviar
              outra. Vale a pena ressaltar que se trata de uma inteligência
              treinada e que você ainda assim deve consultar um médico próprio
              para dar um veredito sobre as possibilidades de doenças.
            </Typography>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};
