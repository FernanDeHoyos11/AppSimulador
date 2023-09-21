
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppMain } from "./AppMain";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./components/Home";



export default function App() {


  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'CRC (Cyclic Redundancy Check)',
            headerStyle: {
              backgroundColor: '#01989F',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Simulador"
          component={AppMain}
          options={{
            title: 'Simulador CRC',
            headerStyle: {
              backgroundColor: '#01989F',
            },
            headerTintColor: '#fff',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

