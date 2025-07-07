import React from "react";
import { Image, Text, View } from "react-native";
import { icons } from "../constants";

function Header() {
  return (
    <View className="flex flex-row justify-between w-full bg-primary py-4 px-5 fixed top-0 z-10">
      <Text className="text-white text-2xl italic">
        Tour<Text className="font-bold text-2xl not-italic">It</Text>
      </Text>
      <Image source={icons.bell} resizeMode="contain" className="w-8 h-8" />
    </View>
  );
}

export default Header;
