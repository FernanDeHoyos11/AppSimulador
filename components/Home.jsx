import { Badge, Button } from "@react-native-material/core"
import { StatusBar, Text, View } from "react-native"


export const Home = ({navigation}) => {
  return (
    <><StatusBar
    backgroundColor='#01989F' />
   
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Button
        title="Simulador"
        onPress={() => navigation.navigate('Simulador')}
        style={{backgroundColor: '#1DD1CB'}}
      />
    </View>
    <Text
          variant="bottom"
          title="by fernan | Marlon"
          color="#F8F8F8"
          style={{
             height: 20,
             fontSize: 13,
             color: 'gray',
             textAlign: 'center',
             justifyContent: "center",
             alignContent: "center" }} > by fernan | Marlon </Text>
    </>
  )
}
