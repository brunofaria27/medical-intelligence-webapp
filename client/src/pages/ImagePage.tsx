import { Header } from "../components/Header";
import { ImageProcess } from "../components/ImageProcess";
import { LoginInterceptor } from "../components/interceptors/LoginInterceptor";

export const ImagePage = () => {
  return (
    <LoginInterceptor >
      <Header />
      <ImageProcess />
    </LoginInterceptor>
  );
};