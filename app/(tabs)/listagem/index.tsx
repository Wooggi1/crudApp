import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, Text, Alert } from "react-native";
import Card from "@/components/Card/Card";
import { db } from "../../../src/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type MusicData = {
  id: string;
  titulo: string;
  artista: string;
  album: string;
  anoLancamento: string;
  duracao: string;
  bannerUrl?: string;
};

export default function ListagemScreen() {
  const [songs, setSongs] = useState<MusicData[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchSongs() {
    try {
      const querySnapshot = await getDocs(collection(db, "musicas2"));
      const data: MusicData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<MusicData, "id">),
      }));
      setSongs(data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      Alert.alert("Erro", "Não foi possível carregar as músicas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Carregando músicas...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={songs}
        renderItem={({ item }) => (
          <Card
            img={item.bannerUrl ?? ""}
            title={item.titulo}
            artist={item.artista}
            album={item.album}
            releaseYear={item.anoLancamento}
            duration={item.duracao}
          />
        )}
      />
    </View>
  );
}
