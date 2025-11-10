import React, { useEffect, useState } from "react";
import {
	Modal as RNModal,
	View,
	Text,
	TextInput,
	Button,
	Alert,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import styles from "./styles";

type MusicData = {
	songTitle: string;
	artistName: string;
	albumName: string;
	releaseYear: string;
	duration: string;
	bannerUrl?: string;
};

type Props = {
	visible: boolean;
	onClose: () => void;
	onSave: (data: MusicData) => void;
	initialValues?: Partial<MusicData>;
	title?: string;
};

export default function Modal({
	visible,
	onClose,
	onSave,
	initialValues = {},
	title = "Editar Música",
}: Props) {
	const [songTitle, setSongTitle] = useState("");
	const [artistName, setArtistName] = useState("");
	const [albumName, setAlbumName] = useState("");
	const [releaseYear, setReleaseYear] = useState("");
	const [duration, setDuration] = useState("");
	const [bannerUrl, setBannerUrl] = useState("");

	useEffect(() => {
		setSongTitle(initialValues.songTitle ?? "");
		setArtistName(initialValues.artistName ?? "");
		setAlbumName(initialValues.albumName ?? "");
		setReleaseYear(initialValues.releaseYear ?? "");
		setDuration(initialValues.duration ?? "");
		setBannerUrl(initialValues.bannerUrl ?? "");
	}, [initialValues, visible]);

	function handleSave() {
		if (!songTitle || !artistName || !albumName || !releaseYear || !duration) {
			Alert.alert("Erro", "Por favor, preencha todos os campos.");
			return;
		}

		onSave({ songTitle, artistName, albumName, releaseYear, duration, bannerUrl });
		onClose();
	}

	return (
		<RNModal visible={visible} transparent animationType="slide">
			<View style={styles.overlay}>
				<View style={styles.container}>
					<Text style={styles.title}>{title}</Text>

					<ScrollView contentContainerStyle={styles.form}>
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
					</ScrollView>

					<View style={styles.buttonsRow}>
						<TouchableOpacity style={styles.button} onPress={onClose}>
							<Text style={styles.buttonText}>Cancelar</Text>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleSave}>
							<Text style={[styles.buttonText, styles.primaryButtonText]}>Salvar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</RNModal>
	);
}
