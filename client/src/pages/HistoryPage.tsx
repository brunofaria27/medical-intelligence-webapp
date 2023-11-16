import { Header } from "../components/navigation/Header";
import { DiagnosticHistory } from "../components/history/DiagnosticHistory";
import { LoginInterceptor } from "../components/interceptors/LoginInterceptor";

export const HistoryPage = () => {
  return (
    <LoginInterceptor >
      <Header />
      <DiagnosticHistory />
    </LoginInterceptor>
  );
};