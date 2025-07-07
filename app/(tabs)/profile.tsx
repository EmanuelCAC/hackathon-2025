import { useState } from "react";
import { Text, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {

  const [name, setName] = useState("")

  return (
    <SafeAreaView>
      <TextInput
        className="rounded-full font-bold mb-4 bg-secondary w-full text-xl p-4 pl-14" 
        placeholderTextColor={"black"}
        placeholder={"Aguas calmas"}
        value={name}
        onChangeText={(e) => setName(e)}
      />
    </SafeAreaView>
  )
}