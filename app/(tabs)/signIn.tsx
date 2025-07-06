import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { images } from "../../constants";
import InputWithIcon from "../../components/InputWithIcon";
import icons from "../../constants/icons";

function signIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Lógica de autenticação aqui

    console.log("Login clicked");
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

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-primary rounded-3xl py-4 px-12 w-fit max-w-xs mb-4"
        >
          <Text className="text-white font-bold text-center text-lg">
            Entrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => /*navigation.navigate("Register")*/ null}
        >
          <Text>
            Não tem uma conta?{" "}
            <Text className="text-blue-500">Cadastre-se</Text>
          </Text>
          <View className="flex flex-row my-3 items-center px-1">
            <View className="border border-black w-full h-0"></View>
            <Text className="text-center text-gray-500 absolute left-1/2 -translate-x-1/2 bg-[#ebebeb] px-2">
              Ou
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-600 rounded-3xl py-4 px-12 w-full mb-4"
        >
          <Image
            source={icons.facebook}
            className="absolute left-4 top-1/2 -translate-y-1/6 w-8 h-8"
            resizeMode="contain"
          />
          <Text className="text-white font-bold text-center text-lg">
            Entre com o Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          className="rounded-3xl py-4 px-12 w-full mb-4 border-2 relative flex items-center"
        >
          <Image
            source={icons.google}
            className="absolute left-4 top-1/2 -translate-y-1/6 w-8 h-8"
            resizeMode="contain"
          />
          <Text className="text-black font-bold text-center text-lg">
            Entre com o Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default signIn;
