import React, { useState, useEffect, useRef } from "react";
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
import { useFetchAddress } from "./useFetchAddress";
import { useFetchEmergency } from "./useFetchEmergency";
import { MaterialIcons } from '@expo/vector-icons';
import { getCurrentPositionAsync } from "expo-location";

const MapComponent = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState([]);
    const [emergencyMarkers, setEmergencyMarkers] = useState([]);
    const [markerInfo, setMarkerInfo] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    const mapRef = useRef(null);//현재 위치로 돌아오는 속도 개선을 위해 추가(테스트중)

    const handlePos = async () => {
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        setLocation(location.coords);

        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.00799,
                longitudeDelta: 0.00321,
            }, 500); // 500ms 동안 지도 이동 애니메이션을 적용합니다.
        }
    };



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

    useEffect(() => {
        //받아온 응급실 데이터 보여주기
        // console.log("Fetched emergency markers:", emergencyMarkers);
    }, [emergencyMarkers]);


    // 데이터 보내기 기능 사용
    // useSendLocation(location);
    // 데이터 받기 기능 사용
    useFetchAddress(location, setAddress);
    useFetchEmergency(address, setEmergencyMarkers);

    // console.log(address)
    //더미데이터
    // useEffect(() => {
    //     setMarkers(markersData);
    // }, []);

    let mylat = location?.latitude || 0;
    let mylong = location?.longitude || 0;


    //경로 그리기 test중
    // const fetchRoute = async (origin, destination) => {
    //     try {
    //         const response = await axios.get(
    //             `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=AIzaSyD3weTrIItxYGaJK-h4EUDIX_xrVLxGKX0`
    //         );

    //         const points = decode(response.data.routes[0].overview_polyline.points);
    //         const coords = points.map((point) => {
    //             return {
    //                 latitude: point[0],
    //                 longitude: point[1],
    //             };
    //         });

    //         setRouteCoordinates(coords);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // Polyline 디코딩 함수
    // function decode(t, e) {
    //     for (
    //         var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5);
    //         (n = t.charCodeAt(u++)) - 63;

    //     ) {
    //         (a = (n &= 31) >>
    //             0), (h |= (n & 31) << (i += 5)) >= 32 && (i -= 32), (l += h % (a ? 1 << i : c)), (h /= a ? 1 << i : c), (i -= a), (o = t.charCodeAt(u++)) - 63, (a = (o &= 31) >> 0), (h |= (o & 31) << (i += 5)) >= 32 && (i -= 32), (r += h % (a ? 1 << i : c)), (h /= a ? 1 << i : c), (i -= a), d.push([l / c * (a ? 1 << i : 1), r / c * (a ? 1 << i : 1)]);
    //     }
    //     return (d = d.map(function (t) {
    //         return { latitude: t[0], longitude: t[1] };
    //     }));
    // }





    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                region={{
                    latitude: mylat,
                    longitude: mylong,
                    latitudeDelta: 0.99,
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
                {emergencyMarkers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.wgs84Lat,
                            longitude: marker.wgs84Lon,
                        }}
                        title={marker.dutyName}
                        description={marker.dutyAddr}
                    >
                        <Callout>
                            <TouchableOpacity>
                                <View>
                                    <Text>{marker.dutyName}</Text>
                                    <Text>{marker.dutyAddr}</Text>
                                    <Text>{marker.dutyTell}</Text>
                                </View>
                            </TouchableOpacity>
                        </Callout>
                    </Marker>
                ))}
                {/* marker test */}
                {/* <Marker
                    coordinate={{
                        latitude: 37.541895,
                        longitude: 127.013,
                    }}
                    title="hospital"
                    description="seoul hospital"
                    onPress={() => console.log("pressed")}
                /> */}
                {/* <Polyline
                    coordinates={routeCoordinates}
                    strokeWidth={5}
                    strokeColor="#ff0000"
                /> */}
            </MapView>
            {/* 실시간 위치 이동 버튼 */}
            <MaterialIcons name="my-location" size={35} color="black" onPress={() => handlePos()}
                style={{
                    position: 'absolute', flex: 1, right: 30, bottom: 30, backgroundColor: 'white', padding: 8,
                    borderTopLeftRadius: 30, borderTopRightRadius: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
                }}
            />

            {/* {markerInfo && (
                <View style={styles.markerInfo}>
                    <Text>Title: {markerInfo.title}</Text>
                    <Text>Description: {markerInfo.description}</Text>
                </View>
            )} */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: "center",
    },
    map: {
        flex: 1,
        width: Dimensions.get("window").width,
        // width: "100%",
        height: Dimensions.get("window").height,
    },
});

export default MapComponent;