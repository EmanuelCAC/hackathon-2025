import { useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
 
export const DropdownButton = () => {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <View className="p-3 px-5 border-t border-b border-gray-500">
      <Pressable
        onPress={() => setIsSelected(!isSelected)}
      >
        <Text className="text-2xl">
          Day 1
        </Text>
      </Pressable>
      {isSelected && (
        <View className="flex flex-col my-3">
          <View className="flex flex-row">
            <View className="flex w-[30%] h-[150px] items-center justify-center relative">
              <View className="h-[100%] w-0 border-r border-black" />
              <View className="bg-white flex items-center justify-center w-6 h-6 border border-black rounded-full absolute">
                <Text>1</Text>
              </View>
            </View>
            <View className="flex justify-center ml-10">
              <Image
                source={require("../assets/praia.jpg")}
                resizeMode="contain"
                className="h-[90px] w-[200px]"
              />
            </View>
          </View>
          <View className="flex flex-row">
            <View className="flex w-[30%] h-[150px] items-center justify-center relative">
              <View className="h-[100%] w-0 border-r border-black" />
              <View className="bg-white flex items-center justify-center w-6 h-6 border border-black rounded-full absolute">
                <Text>2</Text>
              </View>
            </View>
            <View className="flex justify-center ml-10">
              <Image
                source={require("../assets/praia.jpg")}
                resizeMode="contain"
                className="h-[90px] w-[200px]"
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}