import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TagSwich from "../components/TagSwich";
import RadioButton from "../components/RadioButton";
import { ScrollView } from "react-native";
import { Button } from "@react-navigation/elements";



export default function preferenceForm() {

    const [selected, setSelected] = useState(false);
    const [ratioValue, setRatioValue] = useState(1);
    const [ratioValue2, setRatioValue2] = useState(1);
    const [ratioValue3, setRatioValue3] = useState(1);
    const [ratioValue4, setRatioValue4] = useState(1);
    const [ratioValue5, setRatioValue5] = useState(1);
    const tagList = [
        { id: 1, name: "Teatros", category: "Cultural" },
        { id: 2, name: "Trilhas", category: "Natureza" },
        { id: 3, name: "Viniculas", category: "Gastronômico" },
        { id: 4, name: "Veleiros", category: "Náutico" },
        { id: 5, name: "Shoppings", category: "Urbano" }
    ];
    const [isModalVisible, setIsModalVisible] = useState(true);
    return (
        <View className="flex-1 bg-black-100">
            <Modal animationType="slide" transparent={true} visible={isModalVisible}>
                <ScrollView className="flex-1 rounded-t-[40px] bg-white pb-20">
                    <Text className="text-2xl pt-10 px-5 font-bold text-center mb-5">Me conte um pouco sobre você e seus companheiros</Text>
                    <View className="flex flex-col gap-5 pb-3">
                        <View className="py-4">
                            <Text className="text-lg pt-8 px-5">Quais desses lugares vocês se interessam?</Text>

                            <View className="flex gap-2 flex-row flex-wrap mt-2 px-4">
                                {tagList.map((tag) => (
                                    <TagSwich key={tag.id} category={tag.category} name={tag.name}/>

                                ))}
                            </View>
                        </View>
                        <View className="bg-secondary/50 rounded-3xl p-6 mx-2">
                            <Text className="text-lg px-5">Qual o nivel de preparo físico?</Text>
                            <View className="flex gap-2 flex-col flex-wrap mt-2 px-4">
                                <RadioButton name="Baixo" id={1} selectedValue={ratioValue} setSelectedValue={setRatioValue} />
                                <RadioButton name="Médio" id={2} selectedValue={ratioValue} setSelectedValue={setRatioValue} />
                                <RadioButton name="Alto" id={3} selectedValue={ratioValue} setSelectedValue={setRatioValue} />
                            </View>
                        </View>
                        <View className="bg-tertiary/55 rounded-3xl p-6 mx-2">
                            <Text className="text-lg px-5">Qual a média entre as faixas etárias?</Text>
                            <View className="flex gap-2 flex-col flex-wrap mt-2 px-4">
                                <RadioButton name="0 a 17 anos" id={4} selectedValue={ratioValue2} setSelectedValue={setRatioValue2} />
                                <RadioButton name="18 a 30 anos" id={5} selectedValue={ratioValue2} setSelectedValue={setRatioValue2} />
                                <RadioButton name="31 a 59 anos" id={6} selectedValue={ratioValue2} setSelectedValue={setRatioValue2} />
                                <RadioButton name="60+" id={7} selectedValue={ratioValue2} setSelectedValue={setRatioValue2} />
                            </View>
                        </View>
                        <View className="bg-primary/55 rounded-3xl p-6 mx-2">
                            <View>
                                <Text className="text-lg px-5">Iram crianças?</Text>
                                <View className="flex gap-2 flex-col flex-wrap mt-2 px-4">
                                    <RadioButton name="Sim" id={8} selectedValue={ratioValue3} setSelectedValue={setRatioValue3} />
                                    <RadioButton name="Não" id={9} selectedValue={ratioValue3} setSelectedValue={setRatioValue3} />
                                </View>
                            </View>
                        </View>
                        <View className="bg-secondary/50 rounded-3xl p-6 mx-2">
                            <View>
                                <Text className="text-lg px-5">Preferem uma viagem fechada ou em grupo?</Text>
                                <View className="flex gap-2 flex-col flex-wrap mt-2 px-4">
                                    <RadioButton name="Em grupo" id={10} selectedValue={ratioValue4} setSelectedValue={setRatioValue4} />
                                    <RadioButton name="Priavada" id={11} selectedValue={ratioValue4} setSelectedValue={setRatioValue4} />
                                </View>
                            </View>
                        </View>
                        <View className="bg-tertiary/50 rounded-3xl p-6 mx-2">
                            <View>
                                <Text className="text-lg px-5">Preferem experiências ao ar livre ou em ambientes fechados?</Text>
                                <View className="flex gap-2 flex-col flex-wrap mt-2 px-4">
                                    <RadioButton name="ar livre" id={12} selectedValue={ratioValue5} setSelectedValue={setRatioValue5} />
                                    <RadioButton name="ambientes fechados" id={13} selectedValue={ratioValue5} setSelectedValue={setRatioValue5} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <TouchableHighlight
                    onPress={() => {
                        setIsModalVisible(false);
                    }}>
                    <Text className="bg-black/30 rounded-2xl text-white text-center p-2 px-4 absolute bottom-7 right-0 transform -translate-x-1/2 ">
                        Pular
                    </Text>
                </TouchableHighlight>

            </Modal>
        </View>
    );
}

