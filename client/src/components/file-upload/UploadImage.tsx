import * as React from "react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { postDiagnostic } from "../../repositories/diagnostic_repository";
import { Diagnostic } from "../../models/Diagnostic";
import { darkTheme } from "../style/darkTheme";
import { predictIA } from "../../repositories/predict";
import { Alerts } from "../notifications/Alerts";

import {
  Box,
  Button,
  Container,
  CircularProgress,
  IconButton,
  ImageListItem,
  Modal,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Dropzone from "react-dropzone";
import ErrorIcon from '@mui/icons-material/Error';
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from '@mui/icons-material/Image';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InfoIcon from "@mui/icons-material/Info";

export type AiResponse = {
  accuracy: number,
  classification: string
}

const ACURACIA_MINIMA = 0.8

export const UploadImage = () => {
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [lastImage, setLastImage] = React.useState<File | null>(null);
  const [openInfoModal, setOpenInfoModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [errorSaveDiagnostic, setErrorSaveDiagnostic] = React.useState(false);
  const [errorSendImage, setErrorSendImage] = React.useState(false);
  const [successSendImage, setSuccessSendImage] = React.useState(false);
  const [aiResponse, setAiResponse] = React.useState({} as AiResponse);

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles[0]);
  };

  const showDiagnostic = React.useMemo(() => {
    if (lastImage && aiResponse && !isLoading)
      if (aiResponse.accuracy >= ACURACIA_MINIMA)
        return true
    return false
  }, [aiResponse, lastImage, isLoading])

  function handleRemoveImage() {
    setSelectedImage(null);
  }

  async function saveDiagnostic(aiRespose: any) {
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        setErrorSaveDiagnostic(true);
        setTimeout(() => {
          setErrorSaveDiagnostic(false);
        }, 5000);
        return
      }

      const formattedDate = format(new Date(), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });

      const diagnostic: Diagnostic = {
        userEmail: userEmail,
        date: formattedDate.substring(0, 10),
        time: formattedDate.substring(11, 19),
        accuracy: aiRespose.accuracy,
        classification: aiRespose.classification,
      };

      await postDiagnostic(diagnostic);

    } catch (error) {
      setErrorSaveDiagnostic(true);
      setTimeout(() => {
        setErrorSaveDiagnostic(false);
      }, 5000);
    }
  }

  async function uploadImage() {
    try {
      if (selectedImage) {
        setIsLoading(true);
        const response = await predictIA(selectedImage);

        if (response) {
          setAiResponse(response);
          setLastImage(selectedImage);
          setSuccessSendImage(true);
          setSelectedImage(null)
          setTimeout(() => {
            setSuccessSendImage(false);
          }, 2000);

          if (response.accuracy >= ACURACIA_MINIMA)
            saveDiagnostic(response);
        }
        setIsLoading(false);
      }
    } catch (error) {
      setErrorSendImage(true);
      setTimeout(() => {
        setErrorSendImage(false);
      }, 5000);
    }
  }

  const handleOpenInfoModal = () => setOpenInfoModal(true);
  const handleCloseInfoModal = () => setOpenInfoModal(false);

  return (
    <ThemeProvider theme={darkTheme}>
      {successSendImage && (
        <Alerts
          severity={"success"}
          messageTitle={"Success!"}
          message={"A imagem foi enviada com sucesso para o diagnóstico."}
        />
      )}

      {errorSendImage && (
        <Alerts
          severity={"error"}
          messageTitle={"Error!"}
          message={"Erro ao enviar a imagem para o diagnóstico."}
        />
      )}

      {errorSaveDiagnostic && (
        <Alerts
          severity={"error"}
          messageTitle={"Error!"}
          message={"Erro ao salvar o diagnóstico no histórico."}
        />
      )}

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
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500
                }}
              >
                <ImageIcon
                  sx={{ fontSize: "25px", marginRight: "5px" }}
                />
                Imagem selecionada:
              </Typography>

              <IconButton
                onClick={() => {
                  handleOpenInfoModal();
                }}
              >
                <InfoIcon color="warning" style={{ fontSize: "35px" }} />
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
                margin: "30px 0px 15px 0px",
                display: "flex",
                justifyContent: "center",
                "& .Mui-disabled": { backgroundColor: "rgba(0, 0, 0, 0.3) !important", color: "white !important" }
              }}
            >
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                color="error"
                disabled={isLoading}
                onClick={handleRemoveImage}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<SendIcon />}
                sx={{ marginLeft: "10px", color: "white" }}
                onClick={uploadImage}
                disabled={isLoading}
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
                  borderWidth: 2,
                  borderStyle: "dashed",
                  borderColor: "black",
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
                  <p>Arraste uma imagem ou clique para selecionar</p>
                  <AddPhotoAlternateIcon
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

        {isLoading &&
          <Box sx={{
            textAlign: "center",
            padding: "16px"
          }}>
            <CircularProgress color="error"/>
          </Box>}

        {showDiagnostic ?
          <Box sx={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "16px", marginLeft: "4px" }}>
            {lastImage &&
              <img
                src={URL.createObjectURL(lastImage)}
                loading="lazy"
                alt="Preview Site Images"
                style={{
                  boxShadow: "-4px 4px 4px 0px rgba(0, 0, 0, 0.3)",
                  maxWidth: "100px",
                  borderRadius: "10px",
                }}
              />
            }
            <Box>
              <Box sx={{
                display: "flex",
                gap: "8px",
                alignItems: "flex-end"
              }}>
                <Typography
                  sx={{
                    fontWeight: 700
                  }}
                >
                  Diagnóstico obtido:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 500
                  }}
                >
                  {aiResponse.classification}
                </Typography>
              </Box>
              <Box sx={{
                display: "flex",
                gap: "8px",
                alignItems: "flex-end"
              }}>
                <ErrorIcon color="warning" />
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginTop: "8px",
                    fontWeight: 500
                  }}
                >
                  Apesar da alta acurácia obtida, lembre-se de consultar um médico para obter um diagnóstico preciso.
                </Typography>
              </Box>
            </Box>
          </Box>

          : lastImage && !isLoading &&
          <Box sx={{
            display: "flex",
            gap: "8px",
            alignItems: "flex-end"
          }}>
            <ErrorIcon color="error" />
            <Typography
              sx={{
                fontSize: "14px",
                marginTop: "15px",
                fontWeight: 500
              }}
            >
              A acurácia alcançada pela IA não foi o suficiente para obter um diagnóstico aceitável, procure um médico.
            </Typography>
          </Box>
        }
      </Container>
    </ThemeProvider>
  );
};
