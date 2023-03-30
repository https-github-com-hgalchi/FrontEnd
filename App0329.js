// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet, Button  } from 'react-native';
// import * as Location from 'expo-location';
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import axios from 'axios';

// export default function App1() {
//   const [location, setLocation] = useState(null);
//   const [location2, setLocation2] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   const [res, setRes] = useState(null);

//   useEffect(() => {
//     (async () => {
     
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({accuracy:5});
//       setLocation(location.coords);
    
//       // const { coords:{latitude, longitude} } = await Location.getCurrentPositionAsync({accuracy: 5});
//       // const location2 = await Location.reverseGeocodeAsync(
//       //   {latitude, longitude}, {useGoogleMaps: false}
//       // )
//       // setLocation2(location2)

//     })();
//   }, []);

//   let text='Waiting..'
//   let myLatitude = '';
//   let myLongtitude= '';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     // text = JSON.stringify(location2);
//     myLatitude = parseFloat(JSON.stringify(location.latitude));
//     myLongtitude = parseFloat(JSON.stringify(location.longitude));
//   }

//   // let server = ''
//   // const getLocation = () => {
//   //   axios.get("http://localhost:8080/map/location")
//   //   .then(response => setRes(response.data))

//   //   server = JSON.stringify(res);
//   // }



//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{text}</Text>
      
//       <MapView style={styles.map} 
//         initialRegion={{
//             latitude: myLatitude,
//             longitude: myLongtitude,
//             latitudeDelta: 0.00999,
//             longitudeDelta: 0.00521,
//           }}
//         provider={PROVIDER_GOOGLE}
//       />

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   map:{
//     width:"80%",
//     height:"80%",
//   }
// });
