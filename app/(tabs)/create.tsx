import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DropdownComponent from "../../components/DropdownList";
import { icons } from "../../constants";
import { getPontos, getTags, saveRoteiro } from "../../lib/firebase";
import { MultiSelectButton } from "../../components/Multiselect";
import { firebase, getAuth } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import Header from "../../components/Header";

const auth = getAuth();
const router = useRouter();

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
      if (auth?.currentUser == null) {
        router.push('/signIn')
      } else {
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
      
    }

    const newPlace = (id: number) => {
      if (auth?.currentUser == null) {
        router.push('/signIn')
      } else {
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
      if (auth?.currentUser == null) {
        router.push('/signIn')
      } else {
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
    }

    const addTag = (newTags: Array<string>) => {
      if (auth?.currentUser == null) {
        router.push('/signIn')
      } else {
        setTags(newTags)
      }
    }

    // const removeTag = (tagName: string) => {
    //   const index = tags.indexOf(tagName)
    //   const newTags = tags.splice(index, 1)
    //   setTags(newTags)
    // }

    const handelSave = async () => {
      if (auth?.currentUser == null) {
        router.push('/signIn')
      } else {
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
        <Header />
        <ScrollView className="flex-1"
          contentContainerClassName="flex flex-col px-3"
        >
          <Text className="text-3xl text-primary font-semibold my-5">Novo Roteiro</Text>
          <View className="flex flex-col items-start w-full px-4">
            <Text className="text-xl font-medium text-primary">Nome do roteiro:</Text>
            <TextInput
              className="rounded-2xl mb-4 pl-4 bg-white border border-black/25 w-full text-xl" 
              placeholderTextColor={"#054C48"}
              placeholder={"Digite"}
              value={name}
              onChangeText={(e) => setName(e)}
            />
          </View>

          <View className="flex flex-col items-start w-full px-4">
            <Text className="text-xl font-medium text-primary">Descrição: (opicional)</Text>
            <TextInput
              className="rounded-2xl mb-4 pl-4 bg-white border border-black/25 w-full text-xl"
              placeholderTextColor={"#054C48"}
              placeholder={"De uma descrição..."}
              value={description}
              onChangeText={(e) => setDescription(e)}
              multiline={true}
            />
          </View>

          <View className="w-full">
            <Text className="text-xl font-medium text-primary pl-4">Etiquetas:</Text>
            <MultiSelectButton data={tagsData} addTag={addTag} tags={tags} />
          </View>

          <View className="flex flex-col w-full pb-20">
            {roteiroData.map((item, i) => (
              <View key={i} className="flex flex-row w-full">
                <View className="flex flex-col w-full">
                  <Text className="text-4xl text-center text-white font-bold my-4 bg-secondary w-[90%] mx-auto py-5 rounded-full">
                    {item.title}
                  </Text>
                  {item.data.map((place, j) => (
                    <View key={j} className="flex flex-row w-[90%]">
                      <View className="flex flex-row w-[15%] min-h-[150px] items-center justify-center relative">
                        <View style={{
                          position: 'absolute',
                          left: '50%', 
                          top: 0,
                          bottom: 0,
                          width: 4,
                          backgroundColor: '#054C48',
                          transform: [{ translateX: -0.5 }],
                        }} />
                        <View className="bg-white flex items-center justify-center w-10 h-10 border-4 border-primary rounded-full">
                          <Text className="text-primary text-lg font-bold">{j+1}</Text>
                        </View>
                      </View>
                      <View className="flex flex-row w-[87%] items-center">
                        <DropdownComponent data={pontos} addToData={editPlace} id1={i} id2={j} />
                      </View>
                    </View>
                  ))}
                  <View className="flex flex-row w-[90%]">
                    <View className="flex w-[15%] h-[150px] items-center justify-center relative">
                      <View style={{
                          position: 'absolute',
                          left: '50%', 
                          top: 0,
                          bottom: 0,
                          width: 4,
                          backgroundColor: '#054C48',
                          transform: [{ translateX: -0.5 }],
                        }} />
                      <TouchableOpacity
                        className="bg-white flex items-center justify-center w-10 h-10 border-4 border-primary rounded-full absolute"
                        onPress={() => newPlace(i)}
                      >
                        <Text className="text-primary text-lg font-bold">+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
            <View className="flex flex-row w-full">
                <TouchableOpacity className="w-[90%] mx-auto bg-secondary py-5 rounded-full my-4"
                  onPress={newDay}
                >
                  <Text className="text-4xl text-center text-white font-bold">
                    +
                  </Text>
                </TouchableOpacity>
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
