import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WeatherScreen from "../screen/WeatherScreen";
import CitySelectionScreen from "../screen/CitySelectionScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="WeatherScreen"
          component={WeatherScreen}
          initialParams={{ latitude: 0, longitude: 0 }}
        />
        <Stack.Screen
          name="CitySelectionScreen"
          component={CitySelectionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
