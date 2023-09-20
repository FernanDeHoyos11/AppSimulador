import {  SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Ciclica } from "./src/helpers/Ciclica";
import { InputDx } from "./components/InputDx";
import { InputGx } from "./components/InputGx";
import { AppBar, Button, IconButton, TextInput } from "@react-native-material/core";
import { PolinomioBinario } from "./src/helpers/PolinomioBinario";
import { Octicons } from '@expo/vector-icons';

export default function App() {
  const [resultado, setResultado] = useState('');
  const [Dividendo, setDividendo] = useState('')
  const [Divisor, setDivisor] = useState('')
  const [inputCharge, setInputCharge] = useState(false);
  const [inputChargeV, setInputChargeV] = useState(false);
  const [CRC, setCrc] = useState(""); 
  const [resultVerificar, setResultVerificar] = useState('');
  const [resultRecorrerVer, setResultRecorrerVer] = useState(""); 
   
  const handleDividendoChange = (text) => {
    setDividendo(text);
  }

  const handleDivisorChange = (text) => {
    setDivisor(text);
  }

  // Función para mostrar el texto al hacer clic en el botón
  const mostrarTextoClick = () => {
    setInputCharge(true)
  }
  

  const Dx = PolinomioBinario.convertirAPolinomioBinario(Dividendo)
  const Gx = PolinomioBinario.convertirAPolinomioBinario(Divisor)

    const calcularCRC = () => {

      let digitosDespuesDelPrimerUno = 0;
        let primerUnoEncontrado = false;
        var longitud = Gx.length;

        for (let i = 0; i < longitud; i++) {
            const digito = Gx.charAt(i);
            if (digito === '1') {
                if (!primerUnoEncontrado) {
                    primerUnoEncontrado = true;
                } else {
                    digitosDespuesDelPrimerUno++;
                }
            } else if (primerUnoEncontrado) {
                digitosDespuesDelPrimerUno++;
            }
        }
        var longitud = Gx.length;
        const agregado = '0'.repeat(digitosDespuesDelPrimerUno);
        const crc = agregado
        const ciclica = new Ciclica(Dx, Gx, crc);
        const resultadoCalculo = ciclica.imprime() + ciclica.recorrer(0, longitud);
        setResultado(resultadoCalculo);
        setInputChargeV(true)

        const residuo = ciclica.getResiduo();
        setCrc(residuo)
        
    }

    const onResultSucces = () => {
      var longitud = Gx.length;
      const ciclica = new Ciclica(Dx, Gx, CRC);
      const resultadoImprime = ciclica.imprime();
      setResultVerificar(resultadoImprime);
      const resultadoRecorrer = ciclica.recorrer(0, longitud);
      setResultRecorrerVer(resultadoRecorrer);
  }

    return (

      <>
     
      <StatusBar
      backgroundColor='#01989F'/>
      <AppBar 
      color="#01989F" 
      title="Simulador CRC"
      leading={<Octicons name="file-binary" size={24} color="white" style={{paddingLeft: 5}} /> }
      tintColor="white"
      />
      
      <ScrollView style={styles.scrollView}>
      <View contentContainerStyle={styles.view}>
          
                <TextInput
                    label="Dx"
                    color="#1DD1CB"
                    placeholder="x^7+ x^6 + x^5 + x +1"
                    editable
                    variant="standard"
                    style={styles.input}
                    onChangeText={handleDividendoChange}
                    name="D"
                    value={Dividendo}
                />
                <TextInput
                    label="Gx"
                    color="#1DD1CB"
                    editable
                    variant="standard"
                    style={styles.input}
                    onChangeText={handleDivisorChange}
                    name="V"
                    value={Divisor}
                    placeholder="x^7+ x^6 + x^5 + x +1"
                />

                <Button style={styles.button}  title="Convertir" onPress={mostrarTextoClick}  />

                <InputDx polynomial={inputCharge ? Dividendo : 'x'} ></InputDx>
                <InputGx polynomial={inputCharge ? Divisor : 'x'} ></InputGx>

                 
                <Button style={styles.button} title="Dividir" onPress={calcularCRC} />
                <Text>Resultados:</Text>
                <Text>{resultado}</Text>
                

                <Button style={styles.button}  title="Verificar" onPress={onResultSucces} />
                <Text>Resultados:</Text>
                <Text>{resultRecorrerVer}</Text>
                    
           
          </View>
          </ScrollView>
          <AppBar 
          variant="bottom"
          title="by fernan | Marlon"
          color="#F8F8F8" 
          centerTitle={true}
          titleStyle="" />
          </>
    )
}

const styles = StyleSheet.create({


  scrollView: {
    alignContent: "center",
    padding: 16,
    backgroundColor: '#F8F8F8'
   
  },
  view:{
    alignItems: 'center',
    padding: 16,
    width: '100%',
    
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
  },
  button:{
    width: '100%',
    backgroundColor: "#1DD1CB",
    
  }

});

