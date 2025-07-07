import { Stack } from "expo-router";
import { Tabs } from "expo-router";
import { Text, View, Image, StatusBar } from "react-native";
import { icons } from "../../constants";
import { ImageSourcePropType } from "react-native";

interface TabIconProps {
  icon: ImageSourcePropType;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, name, focused }: TabIconProps) => {
  return (
    <>
      {focused ? (
        <View className="items-center justify-center gap-1 pt-5">
          <Image source={icon} resizeMode="contain" className="w-7 h-7" />
          <View className="w-full bg-secondary px-2 py-1 rounded-full">
            <Text className={`font-semibold text-xs h-[14px] w-full`}>
              {name}
            </Text>
          </View>
        </View>
      ) : (
        <View className="items-center justify-center gap-1 pt-5">
          <Image source={icon} resizeMode="contain" className="w-7 h-7" />
          <View className="w-full px-2 py-1">
            <Text className={`font-semibold text-xs h-[14px] w-full`}>
              {name}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FEFEFE",
            borderTopWidth: 1,
            borderTopColor: "#C4C4C4",
            height: 65,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.home} name="Home" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explorar",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.explore} name="Explorar" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Criar",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.route} name="Criar" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon={icons.user} name="Perfil" focused={focused} />
            ),
          }}
        />
      </Tabs>
      <StatusBar barStyle="light-content" backgroundColor="#054C48" />
    </>
  );
};

export default TabsLayout;
