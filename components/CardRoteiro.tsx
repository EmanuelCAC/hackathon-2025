import { useEffect, useRef, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, Animated } from "react-native"

interface CardRoteiroProps {
  title: string;
  description: string;
  image: string;
  guideProfile?: string;
  autoPlay?: boolean;
}

export const CardRoteiro = ({title, description, image, guideProfile, autoPlay = false}: CardRoteiroProps) => {

  const scrollRef = useRef<ScrollView | null>(null);
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const images = [
    require("../assets/praia.jpg"),
    require("../assets/praia.jpg"),
    require("../assets/praia.jpg")
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => {
        const next = (prev + 1) % images.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: next * 360,
            animated: true,
          });
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);


  return (
    <View className="flex flex-col bg-white rounded-lg w-[360px] mx-2 h-min">
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{flexGrow: 1}}
        style={{ width: 360, height: 180, borderRadius: 16, backgroundColor: '#d1d5db', marginBottom: 8 }}
      >
        {images.map((img, idx) => (
          <Image
            key={idx}
            source={img}
            resizeMode="cover"
            style={{ width: 360, height: 180, borderRadius: 16 }}
          />
        ))}
      </Animated.ScrollView>

      {!guideProfile ? (
        <>
          <Text className="text-lg font-semibold">
            {title}
          </Text>
          <Text>
            {description}
          </Text>
        </>
      ) : (
        <View className="flex flex-row">
          <View className="flex-1">
            <Text className="text-lg font-semibold">
              {title}
            </Text>
            <Text>
              {description}
            </Text>
          </View>
          <Image
            source={require("../assets/praia.jpg")}
            resizeMode="cover"
            className="h-14 w-14 mt-2 rounded-full bg-gray-300"
          />
        </View>
      )}
    </View>
  )
}