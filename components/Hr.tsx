import React from "react";
import { View, Text } from "react-native";

function Hr({
  size,
  children,
  color,
  textBg,
  textColor,
  textSize,
  margin,
}: {
  size?: number;
  children?: React.ReactNode;
  color?: string;
  textBg?: string;
  textColor?: string;
  textSize?: number;
  margin?: number;
}) {
  return (
    <View
      style={{margin}}
      className={`flex flex-row items-center px-1`}
    >
      <View
        className={`border border-[${color}] w-full h-0 border-${size}`}
      ></View>
      <Text
        className={`text-center text-gray-500 absolute left-1/2 -translate-x-1/2 bg-[${
          textBg || "#ebebeb"
        }] px-2 text-[${textColor}] text-[${textSize}]`}
      >
        {children}
      </Text>
    </View>
  );
}

export default Hr;
