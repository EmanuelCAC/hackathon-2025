import React from "react";
import { Image, Text, View } from "react-native";
import { icons } from "../constants";

function CardGuia({
  avatar,
  name,
  width,
  bio,
}: {
  avatar: string;
  name: string;
  width: number;
  bio: string;
}) {
  return (
    <View className="mx-2">
      <View
        style={{ width, height: 132, zIndex: 1, bottom: -4 }}
        className="absolute bg-black/25 z-0 rounded-xl -right-1"
      ></View>
      <View
        style={{ width }}
        className="rounded-2xl border border-black/25 bg-white flex flex-row relative z-10"
      >
        <Image
          source={{ uri: avatar }}
          resizeMode="cover"
          className="rounded-l-2xl"
          height={132}
          width={90}
        />
        <View className="p-4 flex-1">
          <Text className="text-primary text-xl font-bold">{name}</Text>
          <Text
            className="text-primary text-lg"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {bio}
          </Text>
          <View className="bg-[#ebebeb] ml-auto px-4 py-2 rounded-full flex-row gap-2 items-center">
            <Image
              source={icons.star}
              resizeMode="contain"
              width={10}
              height={10}
              className="w-6 h-6"
            />
            <Text className="text-xl font-bold">4.8</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CardGuia;
