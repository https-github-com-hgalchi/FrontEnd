import React, { useState, useEffect } from "react";
import {
	Platform,
	Text,
	View,
	StyleSheet,
	Button,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import markersData from "./markerData";

export default function App() {
	const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [markers, setMarkers] = useState([]);
	// const [selectedMarker, setSelectedMarker] = useState(null);
	const [markerInfo, setMarkerInfo] = useState(null);

	//위치 변경될 때 마다 렌더링 되도록 요청
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			Location.watchPositionAsync(
				{
					accuracy: Location.Accuracy.Balanced,
					timeInterval: 100,
					distanceInterval: 1,
				},
				(position) => {
					setLocation(position.coords);
				}
			);
		})();
	}, []);

	//////////데이터 보내기/////////////
	// const sendLocationData = async (location) => {
	//   try {
	//     const response = await axios.post("http://localhost:8080/map/location", {
	//       latitude: location.latitude,
	//       longitude: location.longitude,
	//     });

	//     console.log(response.data);
	//   } catch (error) {
	//     console.log(error);
	//   }
	// };

	// useEffect(() => {
	//   if (location) {
	//     sendLocationData(location);
	//   }
	// }, [location]);

	//////////데이터 받기///////////////
	// axios 사용 버전
	// useEffect(() => {
	// 	if (location) {
	// 		const { latitude, longitude } = location;
	// 		axios
	// 			.get("http://localhost:8080/map/location", {
	// 				params: {
	// 					latitude,
	// 					longitude,
	// 				},
	// 			})
	// 			.then((response) => {
	// 				console.log(latitude, longitude);
	// 				console.log("suc");
	// 				setMarkers(response.data);
	// 			})
	// 			.catch((error) => {
	// 				console.log(error);
	// 			});
	// 	}
	// }, [location]);

	//fetch 사용버전
	// useEffect(() => {
	// 	if (location) {
	// 		const { latitude, longitude } = location;
	// 		fetch(
	// 			`http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytListInfoInqire?serviceKey=NrQI5b0K8twIELQnktYwdAABNNMSCg3uPfykA6hogdCNwbKlk7huaHMXzbWJ%2F0nFzsQTKGIqQbIBcUG21fgZ7A%3D%3D&Q0=경기도용인시처인&pageNo=1&numOfRows=30&yPos=${latitude}&xPos=${longitude}`
	// 		)
	// 			.then((response) => response.json())
	// 			.then((data) => {
	// 				setMarkers(data);
	// 			})
	// 			.catch((error) => {
	// 				console.log(error);
	// 			});
	// 	}
	// }, [location]);

	//dummy data 사용버전
	// useEffect(() => {
	// 	setMarkers(markersData);
	// }, []);

	// const handleMarkerPress = (markerId, markerTitle) => {
	// 	setSelectedMarker({ id: markerId, title: markerTitle });
	// };

	//Marker 설명 하단에 적을 때 사용
	const showMarkerInfo = (marker) => {
		const defaultInfo = {
			title: "마커 정보 없음",
			description: "설명 없음",
		};

		const displayedInfo = {
			title: marker.title || defaultInfo.title,
			description: marker.description || defaultInfo.description,
		};

		setMarkerInfo(displayedInfo);
	};

	let mylat = location?.latitude || 0;
	let mylong = location?.longitude || 0;

	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>{mylat}</Text>
			<Text style={styles.paragraph}>{mylong}</Text>
			<MapView
				style={styles.map}
				region={{
					latitude: mylat,
					longitude: mylong,
					latitudeDelta: 0.00999,
					longitudeDelta: 0.00521,
				}}
				provider={PROVIDER_GOOGLE}
			>
				<Marker
					coordinate={{
						latitude: mylat,
						longitude: mylong,
					}}
					onPress={() => {
						console.log("Pressed");
					}}
					title="현재 위치"
					description="주소"
				/>

				{/* Marker 여러개 생성 시 사용 */}
				{markers.map((marker, index) => (
					<Marker
						key={index}
						coordinate={{
							latitude: marker.latitude,
							longitude: marker.longitude,
						}}
						title={marker.title}
						description={marker.description}
					>
						<Callout>
							<TouchableOpacity
								onPress={() => showMarkerInfo(marker)}
							>
								<View>
									<Text>{marker.title}</Text>
									<Text>{marker.description}</Text>
								</View>
							</TouchableOpacity>
						</Callout>
					</Marker>
				))}
				{/* marker test */}
				<Marker
					coordinate={{
						latitude: 37.541895,
						longitude: 127.013,
					}}
					title="hospital"
					description="seoul hospital"
					onPress={() => console.log("pressed")}
				/>
			</MapView>
			{markerInfo && (
				<View style={styles.markerInfo}>
					<Text>Title: {markerInfo.title}</Text>
					<Text>Description: {markerInfo.description}</Text>
				</View>
			)}

			<Text>Minjoon</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	paragraph: {
		fontSize: 18,
		textAlign: "center",
	},
	map: {
		width: Dimensions.get("window").height,
		height: "80%",
	},
});
