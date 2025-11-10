import { StyleSheet } from "react-native";

export default StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	container: {
		width: "100%",
		maxWidth: 600,
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 16,
		elevation: 6,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 8,
	},
	form: {
		paddingBottom: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 6,
		paddingHorizontal: 12,
		paddingVertical: 8,
		marginBottom: 8,
	},
	buttonsRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 8,
	},
	button: {
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 6,
		backgroundColor: "#f0f0f0",
		marginLeft: 8,
	},
	buttonText: {
		color: "#333",
		fontWeight: "500",
	},
	primaryButton: {
		backgroundColor: "#007AFF",
	},
	primaryButtonText: {
		color: "#fff",
	},
});
