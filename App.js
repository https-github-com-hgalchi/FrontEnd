import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import axios from 'axios';



export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {


    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // let location = await Location.getCurrentPositionAsync({accuracy:5});
      // setLocation(location.coords);
      Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 100, distanceInterval: 1 },
        position => {
          setLocation(position.coords);
        })


    })();
  }, []);

  let text = 'Waiting..'
  let mylat = '';
  let mylong = '';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    mylat = location.latitude;
    mylong = location.longitude;
  }
  // ?lat=${mylat}&lng=${mylong}

  // axios.get(`https://6cbfa40d-1b54-4b5d-8c72-774f14fba01d.mock.pstmn.io`,
  axios.get(`http://localhost:8080/map/location`,
    {
      params: {
        mylat,
        mylong,
      }
    })
    .then((response) => {
      console.log(mylat, mylong);
      console.log("succ")
    })
    .catch((error) => {
      console.log(error);
    });


  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{mylat}</Text>
      <Text style={styles.paragraph}>{mylong}</Text>
      <MapView style={styles.map}
        region={{
          latitude: mylat,
          longitude: mylong,
          latitudeDelta: 0.00999,
          longitudeDelta: 0.00521,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {/* <Marker coordinate={location}>
        </Marker> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: "80%",
    height: "80%",
  }
});
