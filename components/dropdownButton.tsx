import { useState } from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export const DropdownButton = ({ data }: any) => {
  const [isSelected, setIsSelected] = useState(false);
  const [showMap, setShowMap] = useState(false);

  return (
    <View className="w-full bg-white relative">
      <View className="relative w-[80%] mx-auto">
        <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
          <Text className="text-2xl font-semibold text-white p-3 px-5 w-full rounded-full bg-secondary">
            {data.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowMap(!showMap);
          }}
          className=" p-3 px-5 rounded-full bg-primary mx-auto absolute bottom-0 right-0"
        >
          <Text className="text-2xl font-semibold text-white">Ver Mapa</Text>
        </TouchableOpacity>
      </View>

      {showMap && (
        <View
          className="m-8 mt-12 rounded-lg overflow-hidden"
          style={{ height: 300 }}
        >
          <MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: -23.621222,
              longitude: -45.383078,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            minZoomLevel={12}
          >
            {data.data.map((item: any, i: number) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: item.ponto.lat,
                  longitude: item.ponto.long,
                }}
              />
            ))}
          </MapView>
        </View>
      )}

      {isSelected && (
        <>
          <View className="flex flex-col my-3">
            {data.data.map((parada: any, i: number) => (
              <View className="flex flex-row" key={i}>
                <View className="flex w-[30%] h-[150px] items-center justify-center relative">
                  <View
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      bottom: 0,
                      width: 4,
                      backgroundColor: "#054C48",
                      transform: [{ translateX: -0.5 }],
                    }}
                  />
                  <View className="bg-white flex items-center justify-center w-8 h-8 border-4 border-primary rounded-full absolute">
                    <Text className="font-bold text-primary">{parada.id}</Text>
                  </View>
                </View>
                <View className="flex flex-col justify-center rounded-lg">
                  <Image
                    source={{ uri: parada.ponto.foto }}
                    resizeMode="contain"
                    className="h-[90px] w-[200px] rounded-lg"
                    style={{ borderRadius: 20 }}
                  />
                  <Text className="w-[100%] text-center text-primary font-bold">
                    {parada.place}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};
