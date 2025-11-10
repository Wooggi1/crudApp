import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import Card from "@/components/Card/Card";
import Modal from "@/components/Modal/Modal";

type MusicData = {
  songTitle: string;
  artistName: string;
  albumName: string;
  releaseYear: string;
  duration: string;
  bannerUrl?: string;
};

export default function EditScreen() {
  // local list of songs (in a real app this would come from a store or API)
  const [songs, setSongs] = useState<MusicData[]>([
    {
      songTitle: "Digital Blue",
      artistName: "TOKYOPILL",
      albumName: "VIRTUAL DEATH 9 5",
      releaseYear: "2021",
      duration: "2:03",
      bannerUrl: "https://i.scdn.co/image/ab67616d0000b273a40e697b69b315242dee4d5d",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<MusicData | undefined>(undefined);

  useEffect(() => {
    // placeholder for fetching songs from an API/store if needed
    // fetchSongs();
  }, []);

  function fetchSongs() {
    // keep for future: load songs into `songs` state
  }

  // Open modal. If a song is provided, we pass it as initialValues for editing.
  function openModal(item?: MusicData) {
    setEditing(item);
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setEditing(undefined);
  }

  // onSave receives the edited/created data from the Modal.
  function handleSave(data: MusicData) {
    if (editing) {
      // update existing song (match by songTitle here for simplicity)
      setSongs((prev) => prev.map((s) => (s.songTitle === editing.songTitle ? data : s)));
      Alert.alert("Sucesso", "Música atualizada com sucesso!");
    } else {
      // add new song
      setSongs((prev) => [data, ...prev]);
      Alert.alert("Sucesso", "Música adicionada com sucesso!");
    }
    closeModal();
  }

  return (
    <View style={{ flex: 1 }}>
      {songs.map((s, i) => (
        <TouchableOpacity key={i} onPress={() => openModal(s)}>
          <Card
            img={s.bannerUrl ?? ""}
            title={s.songTitle}
            artist={s.artistName}
            album={s.albumName}
            releaseYear={s.releaseYear}
            duration={s.duration}
          />
        </TouchableOpacity>
      ))}

      {/* Modal for editing/creating songs */}
      <Modal visible={modalVisible} onClose={closeModal} onSave={handleSave} initialValues={editing} />
    </View>
  );
}