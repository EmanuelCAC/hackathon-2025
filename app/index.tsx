import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    // <Redirect href="/home" />
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Welcome to the App!</Text>
      <Text className="mt-4 text-lg">This is the main screen.</Text>
      <Redirect href="/signIn" />
    </View>
  );
}
