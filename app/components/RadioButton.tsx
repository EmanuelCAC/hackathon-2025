import { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface RadioButtonProps {
    id: number,
    selectedValue: number;
    setSelectedValue: (value: number) => void;
    name: string
}

export default function RadioButton({id, selectedValue, setSelectedValue, name}: RadioButtonProps) {

  const handlePress = (value: number) => {
    setSelectedValue(value)
  };

  return (
    <View className="flex flex-row gap-2">
        <TouchableOpacity
          key={id}
          onPress={() => handlePress(id)}
          className={`flex flex-row items-center gap-2 p-2 rounded-lg ${selectedValue === id ? 'bg-black-100/10' : ''}`}
        >
            <View className="w-5 h-5 rounded-full border border-black flex items-center justify-center">
                {selectedValue === id && (
                    <View className="w-3 h-3 rounded-full bg-black"></View>
                )}
            </View>
            <Text className="text-lg">{name}</Text>
        </TouchableOpacity>
    </View>
  );


}
