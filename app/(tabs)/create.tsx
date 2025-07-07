import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropdownComponent from "../../components/DropdownList";
import { icons } from "../../constants";
import { getPontos, getTags, saveRoteiro } from "../../lib/firebase";
import { MultiSelectButton } from "../../components/Multiselect";

export default function Create() {
  
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState<Array<string>>([])
    const [pontos, setPontos] = useState<any[]>([])
    const [tagsData, setTagsData] = useState<any[]>([])

    const [roteiroData, setRoteiroData] = useState(
      [
        {
          title: "Dia 1",
          data: [
            {
              id: 1,
              place: "",
              placeId: ""
            }
          ]
        }
      ]
    )
  
    const newDay = () => {
      setRoteiroData([...roteiroData,
        {
          title: "Dia " + (roteiroData.length + 1),
          data: [
            {
              id: 1,
              place: "",
              placeId: ""
            }
          ]
        }
      ])
    }

    const newPlace = (id: number) => {
      setRoteiroData(roteiroData.map((dia, i) => {
        if (i == id) {
          return {
            ...dia,
            data: [
              ...dia.data,
              {
                id: dia.data.length + 1,
                place: "",
                placeId: ""
              }
            ]
          }
        }
        return dia;
      }))
    }

    // const removePlace = (dayIndex: number, placeIndex: number) => {
    //   setRoteiroData(roteiroData.map((dia, i) => {
    //     if (i === dayIndex) {
    //       return {
    //         ...dia,
    //         data: dia.data.filter((_, j) => j !== placeIndex)
    //       };
    //     }
        
    //     return dia;
    //   }));
    // }

    const editPlace = (dayIndex: number, placeIndex: number, newPlace: string, newPlaceId: string) => {
      setRoteiroData(roteiroData.map((dia, i) => {
        if (i === dayIndex) {
          return {
            ...dia,
            data: dia.data.map((place, j) =>
              j === placeIndex ? { ...place, place: newPlace, placeId: newPlaceId} : place
            )
          };
        }
        return dia;
      }));
    }

    const addTag = (newTags: Array<string>) => {
      setTags(newTags)
    }

    // const removeTag = (tagName: string) => {
    //   const index = tags.indexOf(tagName)
    //   const newTags = tags.splice(index, 1)
    //   setTags(newTags)
    // }

    const handelSave = async () => {
      await saveRoteiro(name, description, JSON.stringify(roteiroData), tags)
      setName("")
      setDescription("")
      setRoteiroData(
        [
          {
            title: "Dia 1",
            data: []
          }
        ]
      )
      setTags([])
    }

    const fetchPontos = async () => {
      const snapshot = await getPontos()
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setPontos(data)
    }

    const fetchTags = async () => {
      const snapshot = await getTags()
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setTagsData(data)
    }

    useEffect(() => {
      fetchPontos();
      fetchTags();
    }, [])

    return (
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1"
          contentContainerClassName="flex flex-col px-3 items-center"
        >
          <Text className="text-3xl font-semibold text-center my-5">Crie seu Próprio Roterio de Viagem</Text>
          <View className="flex flex-col items-start w-full">
            <Text className="text-2xl font-semibold p-2 pl-4">Nome do Roteiro:</Text>
            <TextInput
              className="rounded-full font-bold mb-4 bg-white border-2 border-secondary w-full text-xl p-4 pl-8" 
              placeholderTextColor={"#d69600"}
              placeholder={"Aguas calmas..."}
              value={name}
              onChangeText={(e) => setName(e)}
            />
          </View>

          <View className="flex flex-col items-start w-full">
            <Text className="text-2xl font-semibold p-2 pl-4">Descrição: <Text className="text-2xl text-gray-400">(opicional)</Text></Text>
            <TextInput
              className="rounded-full font-bold mb-4 bg-white border-2 border-secondary w-full text-xl p-4 pl-8" 
              placeholderTextColor={"#d69600"}
              placeholder={"Descrição..."}
              value={description}
              onChangeText={(e) => setDescription(e)}
              multiline={true}
            />
          </View>

          <View className="w-full">
            <Text className="text-2xl font-semibold p-2 pl-4">Etiquetas:</Text>
            <MultiSelectButton data={tagsData} addTag={addTag} tags={tags} />
          </View>

          <View className="flex flex-col w-full pb-20">
            <Text className="text-3xl font-semibold text-center my-5">Cronograma do Roteiro</Text>
            {roteiroData.map((item, i) => (
              <View key={i} className="flex flex-row">
                <View className="flex w-[10%] min-h-[80px] items-center relative">
                  <View style={{
                    position: 'absolute',
                    left: '50%',
                    top: 0,
                    bottom: 0,
                    width: 1,
                    backgroundColor: 'black',
                    transform: [{ translateX: -0.5 }],
                  }} />
                  <View className="bg-white flex items-center justify-center w-6 h-6 border border-black rounded-full mt-9">
                    <Text>{i+1}</Text>
                  </View>
                </View>
                <View className="flex flex-col">
                  <Text className="text-2xl font-semibold my-9">
                    {item.title}
                  </Text>
                  {item.data.map((place, j) => (
                    <View key={j} className="flex flex-row">
                      <View className="flex flex-row w-[5%] min-h-[80px] items-center justify-center relative">
                        <View style={{
                          position: 'absolute',
                          left: '50%', 
                          top: 0,
                          bottom: 0,
                          width: 1,
                          backgroundColor: 'black',
                          transform: [{ translateX: -0.5 }],
                        }} />
                        <View className="bg-white flex items-center justify-center w-6 h-6 border border-black rounded-full">
                          <Text>{j+1}</Text>
                        </View>
                      </View>
                      <View className="flex flex-row w-[87%] items-center">
                        <DropdownComponent data={pontos} addToData={editPlace} id1={i} id2={j} />
                        {/* <TouchableOpacity
                          onPress={() => removePlace(i, j)}
                        >
                          <Image
                            source={icons.lixo}
                            resizeMode="contain"
                            className="w-8 h-8"
                          />
                        </TouchableOpacity> */}
                      </View>
                    </View>
                  ))}
                  <View className="flex flex-row">
                    <View className="flex w-[5%] h-[80px] items-center justify-center relative">
                      <View style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        width: 1,
                        backgroundColor: 'black',
                        transform: [{ translateX: -0.5 }],
                      }} />
                      <TouchableOpacity
                        className="bg-white flex items-center justify-center w-6 h-6 border border-black rounded-full absolute"
                        onPress={() => newPlace(i)}
                      >
                        <Text>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
            <View className="flex flex-row">
              <View className="flex w-[10%] h-[80px] items-center justify-center relative">
                <View style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: 1,
                  backgroundColor: 'black',
                  transform: [{ translateX: -0.5 }],
                }} />
                <TouchableOpacity
                  className="bg-white flex items-center justify-center w-6 h-6 border border-black rounded-full absolute"
                  onPress={newDay}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex flex-row ml-auto mr-5 mb-10 gap-3">
            <TouchableOpacity
              className="bg-red-800 p-2 px-4 rounded-lg"
              onPress={() => {
                setRoteiroData(
                  [
                    {
                      title: "Dia 1",
                      data: []
                    }
                  ]
                )
              }}
            >
              <Text className="text-2xl text-white font-semibold">
                Limpar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-primary p-2 px-4 rounded-lg"
              onPress={handelSave}
            >
              <Text className="text-2xl text-white font-semibold">
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}