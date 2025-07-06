import React from "react";
import { Image, ImageSourcePropType, TextInput, View } from "react-native";

function InputWithIcon({
  value,
  secure = false,
  onChangeText,
  placeholder,
  keyboardType,
  className,
  icon,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad"
    | "url"
    | "ascii-capable"
    | "visible-password";
  className?: string;
  icon: ImageSourcePropType;
  secure?: boolean;
}) {
  return (
    <View className="relative w-full flex justify-center">
      <View className="absolute z-10 -translate-y-[25%] left-2 border-r-2 border-black pr-1">
        <Image source={icon} className="w-8 h-8" resizeMode="contain" />
      </View>
      <TextInput
        className={
          "rounded-full font-bold mb-4 bg-secondary w-full text-xl p-4 pl-14" +
          (className || "")
        }
        placeholderTextColor={"black"}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
        keyboardType={keyboardType || "default"}
      />
    </View>
  );
}

export default InputWithIcon;
