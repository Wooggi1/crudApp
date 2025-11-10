import { View } from "react-native";
import Card from "@/components/Card/Card";

export default function ListagemScreen() {
  function fetchSongs() {
    // Função para buscar dados da API ou fonte de dados
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Card
        img="https://i.scdn.co/image/ab67616d0000b273a40e697b69b315242dee4d5d"
        title="Digital Blue"
        artist="TOKYOPILL"
        album="VIRTUAL DEATH 9 5"
        releaseYear="2021"
        duration="2:03" 
      />

    </View>);
}