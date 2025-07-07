import { useEffect, useRef, useState } from "react";
import { Modal, Pressable, Text, View, Animated, Image, ScrollView, Dimensions } from "react-native"
import { DropdownButton } from "./dropdownButton";

interface RoteiroModalProps {
  showRoteiro: boolean;
  setShowRoteiro: (e: boolean) => void;
  selected: any
  setSelected: (e: any) => void
}

export const RoteiroModal = ({showRoteiro, setShowRoteiro, selected, setSelected}: RoteiroModalProps) => {


  const scrollRef = useRef<ScrollView | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  useEffect(() => {
      if (!showRoteiro) return;
      const interval = setInterval(() => {
        setCarouselIndex((prev) => {
          const next = (prev + 1) % selected.images.length || [].length;
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
      <ScrollView className="bg-white">
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
            {selected.images && selected.images.map((img: any, idx: number) => (
              <Image
                key={idx}
                source={{ uri: img }}
                resizeMode="cover"
                className="w-[100vw] h-[200px]"
              />
            ))}
          </Animated.ScrollView>
        </View>
        <View className="flex flex-col bg-white mb-10">
          <View className="p-3">
            <Text className="text-3xl font-semibold">{selected.name}</Text>
            <Text className="text-xl">
              {selected.description}
            </Text>
          </View>
          
          <View className="w-full flex items-center">
            {selected.data && selected.data.map((day: any, i: number) => (
              <DropdownButton data={day} key={i} />
            ))}
          </View>
        </View>
      </ScrollView>
    </Modal>
  )
}