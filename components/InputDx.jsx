import { Text, View } from "react-native";
import { PolinomioBinario } from "../src/helpers/PolinomioBinario";

export const InputDx = ({polynomial}) => {
  
    //const polinomio = "x^7+ x^6 + x^5 + x +1 ";
    const polinomioBinario = PolinomioBinario.convertirAPolinomioBinario(polynomial);
  

  return (
    <View>
      <Text>D(x): {polynomial}</Text>
      <Text>Binario: {polinomioBinario}</Text>
    </View>
  );
};
