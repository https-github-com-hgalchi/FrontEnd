import React from "react";
import { View, StyleSheet } from "react-native";
import MapComponent from "./MapComponent";

export default function App() {
	return (
		<View style={styles.container}>
			<MapComponent />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
