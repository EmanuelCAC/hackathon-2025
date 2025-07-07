import { useState } from "react";
import { Pressable, Text, View, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

 
export const DropdownButton = ({data}: any) => {
  const [isSelected, setIsSelected] = useState(false)
  const [showMap, setShowMap] = useState(false)

  return (
    <View className="w-full bg-white relative">
      <TouchableOpacity
        onPress={() => setIsSelected(!isSelected)}
      >
        <Text className="text-2xl font-semibold text-white p-3 px-5 w-[80%] rounded-full bg-secondary mx-auto">
          {data.title}
        </Text>
      </TouchableOpacity>
      
      {showMap && (
        <View className="m-8 mt-12 rounded-lg overflow-hidden" style={{ height: 300 }}> 
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
            {data.data.map((item: any) => (
              <Marker
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
          <TouchableOpacity className="p-1 px-3 bg-tertiary rounded-full absolute right-12 top-14"
            onPress={() => setShowMap(!showMap)}
          >
            <Text className="text-white">
              Ver mapa
            </Text>
          </TouchableOpacity>
          <View className="flex flex-col my-3 mt-10">
            {data.data.map((parada: any) => (
              <View className="flex flex-row">
                <View className="flex w-[30%] h-[150px] items-center justify-center relative">
                  <View className="h-[100%] w-0 border-r border-black" />
                  <View className="bg-white flex items-center justify-center w-6 h-6 border border-black rounded-full absolute">
                    <Text>{parada.id}</Text>
                  </View>
                </View>
                <View className="flex flex-col justify-center">
                  <Image
                    source={{ uri: parada.ponto.foto}}
                    resizeMode="contain"
                    className="h-[90px] w-[200px]"
                  />
                  <Text className="w-[100%] text-center">{parada.place}</Text>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}