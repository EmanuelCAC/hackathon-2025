import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { icons, images } from "../../constants";
import InputWithIcon from "../../components/InputWithIcon";
import { signUpAuth } from "../../lib/firebase";

// import  from "../../lib/firebase";

const router = useRouter();

function signUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (confirmPassword !== password) {
      alert("As senhas não coincidem");
      return;
    }
    if (!email || !password || !name) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    const result = await signUpAuth(email, password, name);
    if (!result.success) {
      alert(result.error);
      return;
    }
    router.replace("/home");
  };
  return (
    <View className="p-4 flex-1 justify-center items-center bg-[#ebebeb]">
      <View className="max-w-80 flex items-center justify-center w-full">
        <Image
          source={images.logo}
          resizeMode="contain"
          className="w-40 h-40 mb-8"
        />
        <InputWithIcon
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          icon={icons.user}
        />
        <InputWithIcon
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          icon={icons.user}
        />
        <InputWithIcon
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secure
          icon={icons.lock}
        />
        <InputWithIcon
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secure
          icon={icons.lock}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-primary rounded-3xl py-4 px-12 w-fit max-w-xs mb-4"
        >
          <Text className="text-white font-bold text-center text-lg">
            Cadastre-se
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => /*navigation.navigate("Register")*/ null}
        >
          <Text>
            Já possui uma conta?{" "}
            <Text className="text-blue-500">Entre aqui</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default signUp;
