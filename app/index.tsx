import { Redirect } from "expo-router";
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <Redirect href="/home" />
  );
}