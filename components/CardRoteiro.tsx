import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

interface CardRoteiroProps {
  size: number;
  title: string;
  description: string;
  image: string[];
  guideProfile?: string;
  autoPlay?: boolean;
  cardDays: number;
}

export const CardRoteiro = ({
  size,
  title,
  description,
  image,
  guideProfile,
  autoPlay = false,
  cardDays,
}: CardRoteiroProps) => {
  const scrollRef = useRef<ScrollView | null>(null);
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const images = [
    require("../assets/praia.jpg"),
    require("../assets/praia.jpg"),
    require("../assets/praia.jpg"),
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => {
        const next = (prev + 1) % image.length;
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            x: next * size,
            animated: true,
          });
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay]);

  return (
    <View
      style={{ width: size }}
      className={`flex flex-col bg-white rounded-3xl mx-2 border border-black/25 h-full shadow-[0px_4px_4px_rgba(0,0,0,1)] shadow-black`}
    >
      <View>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          snapToInterval={size}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{
            width: size,
            height: 180,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            backgroundColor: "#d1d5db",
            marginBottom: 8,
          }}
        >
          {image.map((img, idx) => (
            <Image
              key={idx}
              source={{ uri: img }}
              resizeMode="cover"
              style={{
                width: size,
                height: 180,
              }}
            />
          ))}
        </Animated.ScrollView>
      </View>

      {!guideProfile ? (
        <View className="px-4 py-2 h-full flex">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-lg font-semibold"
          >
            {title}
          </Text>
          <Text numberOfLines={2} ellipsizeMode="tail" className="text-lg">
            {description}
          </Text>
          <Text className="text-lg bg-secondary ml-auto px-6 py-2 rounded-full font-bold text-white">
            {cardDays} {cardDays > 1 ? "dias" : "dia"}
          </Text>
        </View>
      ) : (
        <View className="flex flex-row">
          <View className="p-10">
            <Text className="text-lg font-semibold">{title}</Text>
            <Text>{description}</Text>
          </View>
          <Image
            source={require("../assets/praia.jpg")}
            resizeMode="cover"
            className="h-14 w-14 mt-2 rounded-full bg-gray-300"
          />
        </View>
      )}
    </View>
  );
};
