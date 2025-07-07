import React, { useEffect, useRef, useState } from "react";
import { PermissionsAndroid, Text, View, StyleSheet, Animated, ScrollView, Dimensions, Pressable, Modal, Image, TouchableOpacity } from "react-native";
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardRoteiro } from "../../components/CardRoteiro";
import { DropdownButton } from "../../components/dropdownButton";
import { RoteiroModal } from "../../components/RoteiroModal";
import { getRoteiros, getRoteirosWithPontos } from "../../lib/firebase";

 
export default function Home() {
  const [roteiros, setRoteiros] = useState<any[]>([])

  const fetchRoteiros = async () => {
    const data = await getRoteirosWithPontos()
    data.forEach((item: any) => {
      item.images = item.data.flatMap((day: any) => day.data.map((parada: any) => parada.ponto.foto));
    })
    setRoteiros(data)
  }

  useEffect(() => {
    fetchRoteiros()
  }, [])

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


  
  const CARD_MARGIN = 8 * 2; // mx-2 = 8px de cada lado
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const CARD_WIDTH = SCREEN_WIDTH - 60; // ou qualquer valor dinâmico
  const effectiveCardWidth = CARD_WIDTH + CARD_MARGIN;

  const [mainIndex, setMainIndex] = useState(0);
  const [mainIndex2, setMainIndex2] = useState(0);


  //Parte do Modal  
  const [showRoteiro, setShowRoteiro] = useState(false)
  const [selected, setSelected] = useState<any>({})
  
  const images = [
    require("../../assets/praia.jpg"),
    require("../../assets/praia.jpg"),
    require("../../assets/praia.jpg")
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <RoteiroModal setSelected={setSelected} showRoteiro={showRoteiro} setShowRoteiro={setShowRoteiro} selected={selected} />
      
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
            paddingLeft: (SCREEN_WIDTH - effectiveCardWidth) / 2,
            paddingRight: (SCREEN_WIDTH - effectiveCardWidth) / 2,
          }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={effectiveCardWidth}
          scrollEventThrottle={16}
          decelerationRate={0}
          onMomentumScrollEnd={e => {
            const i = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
            setMainIndex(i);
          }}
        >
          {roteiros.map((card, i) => (
            <TouchableOpacity key={i} onPress={() => {
              setShowRoteiro(true)
              setSelected(card)
            }}>
              <CardRoteiro
                size={CARD_WIDTH}
                title={card.name}
                description={card.description}
                image={card.images}
                key={i}
                autoPlay={i === mainIndex}
                guideProfile={""}
              />
            </TouchableOpacity>
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
            paddingLeft: (SCREEN_WIDTH - effectiveCardWidth) / 2,
            paddingRight: (SCREEN_WIDTH - effectiveCardWidth) / 2,
          }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={effectiveCardWidth}
          scrollEventThrottle={16}
          decelerationRate={0}
          onMomentumScrollEnd={e => {
            const i = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
            setMainIndex2(i);
          }}
        >
          {/* {cards.map((card, i) => (
            <TouchableOpacity key={i}>
              <CardRoteiro
                size={CARD_WIDTH}
                title={card.title}
                description={card.description}
                image={card.image}
                key={i}
                autoPlay={i === mainIndex2}
                guideProfile={card?.guideProfile}
              />
            </TouchableOpacity>
          ))} */}
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