// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const EmergencyCall = () => {
//     const navigation = useNavigation();

//     return (
//         <View style={styles.container}>
//             <Text style={styles.text}>Emergency Call Screen</Text>
//             <TouchableOpacity
//                 style={styles.backButton}
//                 onPress={() => navigation.goBack()}
//             >
//                 <Text style={styles.backButtonText}>뒤로 가기</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         position: 'relative',
//     },
//     backButton: {
//         position: 'absolute',
//         top: 10,
//         left: 10,
//         backgroundColor: 'lightgray',
//         paddingVertical: 5,
//         paddingHorizontal: 10,
//         borderRadius: 5,
//     },
//     backButtonText: {
//         color: 'black',
//         fontSize: 16,
//     },
//     text: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
// });

// export default EmergencyCall;






import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

import { TextInput, IconButton } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const EmergencyCall = () => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState(null);

    const Device = Platform.OS === 'android' ? '?' : '&';
    const navigation = useNavigation();

    useEffect(() => {
        handlePos()
    }, []);

    let text = ''
    let mylat = '';
    let mylong = '';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location)
        mylat = parseFloat(JSON.stringify(location.latitude));
        mylong = parseFloat(JSON.stringify(location.longitude));
    }

    const handlePos = async () => {

        let location = await Location.getCurrentPositionAsync({ accuracy: 5 });
        setLocation(location.coords);

        console.log(mylat, mylong)

    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                곧바로 119에{"\n"}신고하세요
            </Text>

            <MapView style={styles.map}
                region={{
                    latitude: mylat,
                    longitude: mylong,
                    latitudeDelta: 0.00999,
                    longitudeDelta: 0.00821,
                }}
                provider={PROVIDER_GOOGLE}
            >
                <Marker coordinate={{
                    latitude: location ? mylat : 0,
                    longitude: location ? mylong : 0
                }} />
            </MapView>

            <Text style={{
                position: 'absolute', top: 130, left: 72, color: "#626262",
                width: 245, height: 34, backgroundColor: "#FFFFFF", padding: 7,
            }}>{address === null ? "현재 위치 표시" : address}</Text>
            <MaterialIcons name="my-location" size={17} color="black" onPress={() => { handlePos(), setAddress(mylat) }}
                style={{ position: 'absolute', right: 70, top: 130, padding: 8, backgroundColor: "#FFFFFF" }}
            />

            <View style={styles.buttonWrap}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}>
                    <IconButton
                        icon="phone"
                        mode='contained'
                        backgroundColor="#F24E1E"
                        iconColor="white"
                        style={{ marginTop: 25, }}
                        size={35}
                        onPress={() => Linking.openURL(`tel:119`)}
                    />
                    <IconButton
                        icon="message"
                        mode='contained'
                        backgroundColor="#F24E1E"
                        iconColor="white"
                        style={{ marginTop: 25, }}
                        size={35}
                        onPress={() => Linking.openURL(`sms:119${Device}body=긴급한 상황입니다. 현재 위치 주소는***입니다.`)}
                    />
                </View>
                <Text style={{ textAlign: "center", color: "#626262" }}>{"\n"}현재 위치 주소와{"\n"}함께 신고할 수 있습니다.</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // position: 'relative',
        backgroundColor: "#FFFFFF",
    },

    text: {
        fontSize: 25,
        fontWeight: 800,
        top: 20,
        left: 25,
    },
    map: {
        // position:"absolute",
        // flex:1,
        width: "100%",
        height: "85%",
        top: 40,
    },
    buttonWrap: {
        bottom: 180,
        height: "100%",
        backgroundColor: "#FFFFFFA1",
        // alignItems:"center",
        borderTopLeftRadius: 40, borderTopRightRadius: 40,
    },
});

export default EmergencyCall;