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
  id: string;
  titulo: string;
  artista: string;
  album: string;
  anoLancamento: string;
  duracao: string;
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
  const [id, setId] = useState("");
	const [titulo, settitulo] = useState("");
	const [artista, setartista] = useState("");
	const [album, setalbum] = useState("");
	const [anoLancamento, setanoLancamento] = useState("");
	const [duracao, setduracao] = useState("");
	const [bannerUrl, setBannerUrl] = useState("");

	useEffect(() => {
    setId(initialValues.id ?? "");
		settitulo(initialValues.titulo ?? "");
		setartista(initialValues.artista ?? "");
		setalbum(initialValues.album ?? "");
		setanoLancamento(initialValues.anoLancamento ?? "");
		setduracao(initialValues.duracao ?? "");
		setBannerUrl(initialValues.bannerUrl ?? "");
	}, [initialValues, visible]);

	function handleSave() {
		if (!titulo || !artista || !album || !anoLancamento || !duracao) {
			Alert.alert("Erro", "Por favor, preencha todos os campos.");
			return;
		}

		onSave({ id, titulo, artista, album, anoLancamento, duracao, bannerUrl });
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
							value={titulo}
							onChangeText={settitulo}
							style={styles.input}
						/>

						<TextInput
							placeholder="Artista"
							value={artista}
							onChangeText={setartista}
							style={styles.input}
						/>

						<TextInput
							placeholder="Álbum"
							value={album}
							onChangeText={setalbum}
							style={styles.input}
						/>

						<TextInput
							placeholder="Ano de Lançamento"
							value={anoLancamento}
							onChangeText={setanoLancamento}
							style={styles.input}
							keyboardType="numeric"
						/>

						<TextInput
							placeholder="Duração"
							value={duracao}
							onChangeText={setduracao}
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
