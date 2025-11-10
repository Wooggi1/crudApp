import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Alert, FlatList, Button } from "react-native";
import Card from "@/components/Card/Card";
import Modal from "@/components/Modal/Modal";
import { db } from "../../../src/firebaseConfig";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

type MusicData = {
  id: string;
  titulo: string;
  artista: string;
  album: string;
  anoLancamento: string;
  duracao: string;
  bannerUrl?: string;
};

export default function EditScreen() {
  const [songs, setSongs] = useState<MusicData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<MusicData | undefined>(undefined);

  async function fetchSongs() {
    try {
      const querySnapshot = await getDocs(collection(db, "musicas2"));
      const data: MusicData[] = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<MusicData, "id">),
      }));
      setSongs(data);
    } catch (error) {
      console.error("Erro ao buscar músicas:", error);
      Alert.alert("Erro", "Falha ao carregar músicas.");
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  function openModal(item?: MusicData) {
    setEditing(item);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setEditing(undefined);
  }

  async function handleSave(data: MusicData) {
    try {
      if (editing) {
        const docRef = doc(db, "musicas2", editing.id);
        await updateDoc(docRef, { ...data });
        Alert.alert("Sucesso", "Música atualizada com sucesso!");
      }
      await fetchSongs();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    } finally {
      closeModal();
    }
  }

  async function handleDelete(id: string) {

    try {
      await deleteDoc(doc(db, "musicas2", id));
      setSongs((prev) => prev.filter((s) => s.id !== id));
      Alert.alert("Sucesso", "Música excluída!");
    } catch (error) {
      console.error("Erro ao excluir:", error);
      Alert.alert("Erro", "Não foi possível excluir a música.");
    }

  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <Card
              img={item.bannerUrl ?? ""}
              title={item.titulo}
              artist={item.artista}
              album={item.album}
              releaseYear={item.anoLancamento}
              duration={item.duracao}
            />
            <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        onClose={closeModal}
        onSave={(data) => handleSave(data)}
        initialValues={editing}
      />
    </View>
  );
}
