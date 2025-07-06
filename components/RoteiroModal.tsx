import { useEffect, useRef, useState } from "react";
import { Modal, Pressable, Text, View, Animated, Image, ScrollView, Dimensions } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { DropdownButton } from "./dropdownButton";

interface RoteiroModalProps {
  showRoteiro: boolean;
  setShowRoteiro: (e: boolean) => void;
  selected: Array<any>
  setSelected: (e: any) => void
  images: Array<any>;
}

export const RoteiroModal = ({showRoteiro, setShowRoteiro, images, selected, setSelected}: RoteiroModalProps) => {

  const scrollRef = useRef<ScrollView | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  useEffect(() => {
      if (!showRoteiro) return;
      const interval = setInterval(() => {
        setCarouselIndex((prev) => {
          const next = (prev + 1) % images.length;
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              x: next * SCREEN_WIDTH,
              animated: true,
            });
          }
          return next;
        });
      }, 5000);
      return () => clearInterval(interval);
    }, [showRoteiro]);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showRoteiro}
      className="relative"
      onRequestClose={() => {
        setShowRoteiro(false)
        setSelected([])
      }}
    >
      <Pressable className="absolute p-1 px-2 bg-black-100 top-3 left-3 z-50 rounded-lg"
        onPress={() => {
          setShowRoteiro(false)
          setSelected([])
        }}
      >
        <Text className="text-lg text-white">
          Voltar
        </Text>
      </Pressable>
      <ScrollView>
        <View className="w-full" style={{ height: 200 }}>
          <Animated.ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            snapToInterval={SCREEN_WIDTH}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            className="w-full"
            style={{ height: 200 }}
          >
            {images.map((img, idx) => (
              <Image
                key={idx}
                source={img}
                resizeMode="cover"
                className="w-[100vw] h-[200px]"
              />
            ))}
          </Animated.ScrollView>
        </View>
        <View className="flex flex-col bg-white">
          <View className="p-3">
            <Text className="text-3xl font-semibold">Loren Ipsum</Text>
            <Text className="text-xl">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
            </Text>
          </View>
          <View className="m-8 rounded-lg overflow-hidden" style={{ height: 300 }}>
            <MapView
              style={{ flex: 1 }}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: -23.621222,
                longitude: -45.383078,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              minZoomLevel={13}
            />
          </View>
          <DropdownButton />
          <DropdownButton />
          <DropdownButton />
        </View>
      </ScrollView>
    </Modal>
  )
}