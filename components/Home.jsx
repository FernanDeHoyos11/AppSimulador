import { Button } from "@react-native-material/core"
import { Text, View } from "react-native"


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
    </>
  )
}
