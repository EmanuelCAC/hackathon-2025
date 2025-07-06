import React, { useEffect, useRef, useState } from "react";
import { PermissionsAndroid, Text, View, StyleSheet, Animated, ScrollView, Dimensions } from "react-native";
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardRoteiro } from "../../components/CardRoteiro";

 
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


  const CARD_WIDTH = 374;
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  const cards = [
    { title: "Loren Ipsun", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", image: "" },
    { title: "Loren Ipsun", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", image: "", guideProfile: "a" },
    { title: "Loren Ipsun", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", image: "", guideProfile: "a" },
    { title: "Loren Ipsun", description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.", image: "" },
  ];

  const [mainIndex, setMainIndex] = useState(0);
  const [mainIndex2, setMainIndex2] = useState(0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} 
        region={{
            latitude: -23.621222,
            longitude: -45.383078,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        loadingEnabled={true}
        minZoomLevel={14}
        showsUserLocation={true}
        userLocationPriority={'high'}
        showsMyLocationButton={false}
      >
      </MapView> */}

      <Text className="text-4xl px-5 py-3">
        Roteiros
      </Text>

      <View>
        <Text className="text-2xl p-5">
          Personalizados para você
        </Text>
        <Animated.ScrollView
          horizontal
          contentContainerStyle={{
            flexGrow: 1,
            paddingLeft: (SCREEN_WIDTH - CARD_WIDTH) / 2,
            paddingRight: (SCREEN_WIDTH - CARD_WIDTH) / 2,
          }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          scrollEventThrottle={16}
          decelerationRate={0}
          onMomentumScrollEnd={e => {
            const i = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
            setMainIndex(i);
          }}
        >
          {cards.map((card, i) => (
            <CardRoteiro
              title={card.title}
              description={card.description}
              image={card.image}
              key={i}
              autoPlay={i === mainIndex}
              guideProfile={card?.guideProfile}
            />
          ))}
        </Animated.ScrollView>
      </View>

      <View>
        <Text className="text-2xl p-5">
          Melhor Avaliado
        </Text>
        <Animated.ScrollView
          horizontal
          contentContainerStyle={{
            flexGrow: 1,
            paddingLeft: (SCREEN_WIDTH - CARD_WIDTH) / 2,
            paddingRight: (SCREEN_WIDTH - CARD_WIDTH) / 2,
          }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          scrollEventThrottle={16}
          decelerationRate={0}
          onMomentumScrollEnd={e => {
            const i = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
            setMainIndex2(i);
          }}
        >
          {cards.map((card, i) => (
            <CardRoteiro
              title={card.title}
              description={card.description}
              image={card.image}
              key={i}
              autoPlay={i === mainIndex2}
              guideProfile={card?.guideProfile}
            />
          ))}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});