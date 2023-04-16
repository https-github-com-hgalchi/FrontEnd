import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Callout, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import axios from "axios";
import markersData from "./markerData";
import { useSendLocation } from "./SendLocation";
import { useFetchData } from "./FetchData";

export default function MapComponent() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [markerInfo, setMarkerInfo] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

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


    //경로 그리기 test중
    const fetchRoute = async (origin, destination) => {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=AIzaSyD3weTrIItxYGaJK-h4EUDIX_xrVLxGKX0`
            );

            const points = decode(response.data.routes[0].overview_polyline.points);
            const coords = points.map((point) => {
                return {
                    latitude: point[0],
                    longitude: point[1],
                };
            });

            setRouteCoordinates(coords);
        } catch (error) {
            console.log(error);
        }
    };
    // Polyline 디코딩 함수
    function decode(t, e) {
        for (
            var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5);
            (n = t.charCodeAt(u++)) - 63;

        ) {
            (a = (n &= 31) >>
                0), (h |= (n & 31) << (i += 5)) >= 32 && (i -= 32), (l += h % (a ? 1 << i : c)), (h /= a ? 1 << i : c), (i -= a), (o = t.charCodeAt(u++)) - 63, (a = (o &= 31) >> 0), (h |= (o & 31) << (i += 5)) >= 32 && (i -= 32), (r += h % (a ? 1 << i : c)), (h /= a ? 1 << i : c), (i -= a), d.push([l / c * (a ? 1 << i : 1), r / c * (a ? 1 << i : 1)]);
        }
        return (d = d.map(function (t) {
            return { latitude: t[0], longitude: t[1] };
        }));
    }





    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>{mylat}</Text>
            <Text style={styles.paragraph}>{mylong}</Text>
            <MapView
                style={styles.map}
                region={{
                    latitude: mylat,
                    longitude: mylong,
                    latitudeDelta: 0.00799,
                    longitudeDelta: 0.00321,
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
                                onPress={() => {
                                    showMarkerInfo(marker);
                                    fetchRoute({ latitude: mylat, longitude: mylong }, { latitude: marker.latitude, longitude: marker.longitude });
                                }}>
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
                <Polyline
                    coordinates={routeCoordinates}
                    strokeWidth={5}
                    strokeColor="#ff0000"
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