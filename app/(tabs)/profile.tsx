import { useState } from "react";
import { Pressable, Text, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { firebase, getAuth, signOut } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

const auth = getAuth();
const router = useRouter();

export default function Profile() {

  const [name, setName] = useState("")

  return (
    <SafeAreaView>
      <Header />
      <Text>
        Profile
      </Text>
      <Pressable
        onPress={async () => {
          await signOut(auth)
          router.replace('/signIn')
        }}
      >
        <Text>
          Logout
        </Text>
      </Pressable>
    </SafeAreaView>
  )
}