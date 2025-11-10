import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import styles from "./styles";
import { db } from "../../../src/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function CadastroScreen() {
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [duration, setDuration] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  async function handleCadastro() {
    if (!songTitle || !artistName || !albumName || !releaseYear || !duration) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await addDoc(collection(db, "musicas2"), {
        titulo: songTitle.trim(),
        artista: artistName.trim(),
        album: albumName.trim(),
        anoLancamento: releaseYear.trim(),
        duracao: duration.trim(),
        bannerUrl: bannerUrl.trim() || null,
        criadoEm: new Date().toISOString()
      });

      Alert.alert("Sucesso", "🎵 Música cadastrada com sucesso!");

      setSongTitle("");
      setArtistName("");
      setAlbumName("");
      setReleaseYear("");
      setDuration("");
      setBannerUrl("");

    } catch (error) {
      console.error("Erro ao salvar música:", error);
      Alert.alert("Erro", "Não foi possível salvar a música.");
    } 
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>Cadastrar Música</Text>

      <TextInput
        placeholder="Título da Música"
        value={songTitle}
        onChangeText={setSongTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Artista"
        value={artistName}
        onChangeText={setArtistName}
        style={styles.input}
      />

      <TextInput
        placeholder="Álbum"
        value={albumName}
        onChangeText={setAlbumName}
        style={styles.input}
      />

      <TextInput
        placeholder="Ano de Lançamento"
        value={releaseYear}
        onChangeText={setReleaseYear}
        style={styles.input}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Duração"
        value={duration}
        onChangeText={setDuration}
        style={styles.input}
      />

      <TextInput
        placeholder="Banner URL (opcional)"
        value={bannerUrl}
        onChangeText={setBannerUrl}
        style={styles.input}
      />

      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
}
