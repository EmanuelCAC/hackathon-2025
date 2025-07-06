import { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";

interface TagSwitchProps {
    name: string;
    category?: string;

}


export default function TagSwich({ name, category }: TagSwitchProps) {
    const [selected, setSelected] = useState(false);
    console.log('Category:', category);
    switch (category) {
        case 'Cultural':
            return (
                <View className="flex gap-2 flex-row flex-wrap mt-2 ">
                    <TouchableOpacity onPress={() => setSelected(!selected)}
                        className={`px-4 py-2 rounded-full border ${selected ? 'bg-primary border-black' : 'border-0 bg-primary/20'}`}>
                        <Text className={`text-lg px-2 py-1 ${selected ? "text-white": ""}`}>{name}</Text>
                    </TouchableOpacity>
                </View>
            );
        case 'Natureza':
            return (
                <View className="flex gap-2 flex-row flex-wrap mt-2 ">
                    <TouchableOpacity onPress={() => setSelected(!selected)}
                        className={`px-4 py-2 rounded-full border ${selected ? 'bg-green-600 border-black' : 'border-0 bg-green-600/20'}`}>
                        <Text className={`text-lg px-2 py-1 ${selected ? "text-white": ""}`}>{name}</Text>
                    </TouchableOpacity>
                </View>
            );
        case 'Gastronômico':
            return (
                <View className="flex gap-2 flex-row flex-wrap mt-2 ">
                    <TouchableOpacity onPress={() => setSelected(!selected)}
                        className={`px-4 py-2 rounded-full border ${selected ? 'bg-yellow-500 border-black' : 'border-0 bg-yellow-500/20'}`}>
                        <Text className={`text-lg px-2 py-1 ${selected ? "text-white": ""}`}>{name}</Text>
                    </TouchableOpacity>
                </View>
            );
        case 'Náutico':
            return (
                <View className="flex gap-2 flex-row flex-wrap mt-2 ">
                    <TouchableOpacity onPress={() => setSelected(!selected)}
                       className={`px-4 py-2 rounded-full border ${selected ? 'bg-blue-600/95 border-black' : 'border-0 bg-blue-600/20'}`}>
                        <Text className={`text-lg px-2 py-1 ${selected ? "text-white": ""}`}>{name}</Text>
                    </TouchableOpacity>
                </View>
            );
        case 'Urbano':
            return (
                <View className="flex gap-2 flex-row flex-wrap mt-2 ">
                    <TouchableOpacity onPress={() => setSelected(!selected)}
                        className={`px-4 py-2 rounded-full border ${selected ? 'bg-purple-500 border-black' : 'border-0 bg-purple-500/20'}`}>
                        <Text className={`text-lg px-2 py-1 ${selected ? "text-white": ""}`}>{name}</Text>
                    </TouchableOpacity>
                </View>
            );


    }
}