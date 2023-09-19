import axios from "axios";

export async function getAddressByCEP(CEP: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${CEP}/json/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro na busca de endereço:", error);
    return {};
  }
}
