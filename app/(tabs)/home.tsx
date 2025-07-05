import React, { useEffect } from "react";
import { PermissionsAndroid, Text, View, StyleSheet } from "react-native";
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

 
export default function Home() {
  useEffect(() => {
    const granted = async () => {
      try {
        const permisson = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
        )
        if (permisson === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
      } catch (err) {
        console.warn(err)
      }
    }
    granted()
  }, [])

  return (
    <View className="flex-1 bg-white relative">
      <MapView
        style={styles.map}
        // provider={PROVIDER_GOOGLE} 
        // region={{
        //     latitude: -23.621222,
        //     longitude: -45.383078,
        //     latitudeDelta: 0.005,
        //     longitudeDelta: 0.005,
        //   }}
        // loadingEnabled={true}
        // minZoomLevel={14}
        // showsUserLocation={true}
        // userLocationPriority={'high'}
        // showsMyLocationButton={false}
      >
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});