import { Text, View } from "react-native";
import { PolinomioBinario } from "../src/helpers/PolinomioBinario";
import { Badge } from "@react-native-material/core";


export const InputGx = ({polynomial}) => {
  
  //const polinomio = "x^7+ x^6 + x^5 + x +1 ";
  const polinomioBinario = PolinomioBinario.convertirAPolinomioBinario(polynomial);
  const r = polinomioBinario.length -1;
  return (
    <View>
     {/*  <Text>G(x): {polynomial}</Text>
      <Text>Binario: {polinomioBinario}</Text> */}
       <Badge style={{ margin: 10 }} label={`r: ${r}`}  />
    </View>
  );
};
