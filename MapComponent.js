import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import markersData from "./markerData";
import { useSendLocation } from "./SendLocation";
import { useFetchData } from "./FetchData";

export default function MapComponent() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([]);
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

    // 데이터 보내기 기능 사용
    // useSendLocation(location);
    // 데이터 받기 기능 사용
    // useFetchData(location, setMarkers);
    //더미데이터
    useEffect(() => {
        setMarkers(markersData);
    }, []);

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