import { Header } from "../components/navigation/Header";
import { ImageProcess } from "../components/file-upload/ImageProcess";
import { LoginInterceptor } from "../components/interceptors/LoginInterceptor";

export const ImagePage = () => {
  return (
    <LoginInterceptor >
      <Header />
      <ImageProcess />
    </LoginInterceptor>
  );
};