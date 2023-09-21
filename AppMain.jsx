import { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput } from "react-native"
import { View } from "react-native"
import { useForm } from "./src/hooks/useForm";
import { PolinomioBinario } from "./src/helpers/PolinomioBinario";
import { AppBar, Badge, Button, FAB } from "@react-native-material/core";
import { InputDx } from "./components/InputDx";
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { InputGx } from "./components/InputGx";
import { Ciclica } from "./src/helpers/Ciclica";


export const AppMain = () => {
    const [resultado, setResultado] = useState('');
    const [Dividendo, setDividendo] = useState('')
    const [Divisor, setDivisor] = useState('')
    const [inputCharge, setInputCharge] = useState(false);
    const [inputChargeV, setInputChargeV] = useState(false);
    const [CRC, setCrc] = useState("");
    const [resultVerificar, setResultVerificar] = useState('');
    const [resultRecorrerVer, setResultRecorrerVer] = useState("");
    const [isNull, setIsNull] = useState("");
    const [isVerificar, setIsVerificar] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [messageCRC, setMessageCRC] = useState("");
    const [message, setMessage] = useState("");
  
  
    const Dx = PolinomioBinario.convertirAPolinomioBinario(Dividendo)
    const Gx = PolinomioBinario.convertirAPolinomioBinario(Divisor)
  
    const handleDividendoChange = (text) => {
        const validInput = /^[xX^+\d\s]+$/;
        if (validInput.test(text)) {
          setDividendo(text);
        }
    }
  
    const handleDivisorChange = (text) => {
      const validInput = /^[xX^+\d\s]+$/;
      if (validInput.test(text)) {
        setDivisor(text);
      }
    }
  
    const handleResetFields = () => {
      setDividendo('')
      setDivisor('')
      setInputCharge(false)
      setIsVerificar(false)
      setInputChargeV(false)
    }
  
   
    const mostrarTextoClick = () => {
      if (Dividendo.length > 2 && Divisor.length > 2) {
        setInputCharge(true)
      } else {
        false
        setInputCharge(false);
        setIsNull('Agregue los polinomios a convertir')
      }
    }
  
  
  
  
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
      setIsVerificar(true)
      setMessage(`CRC: ${residuo}`)
  
    }
  
    const onResultSucces = () => {
      var longitud = Gx.length;
      const ciclica = new Ciclica(Dx, Gx, CRC);
      const resultadoImprime = ciclica.imprime();
      setResultVerificar(resultadoImprime);
      const resultadoRecorrer = ciclica.imprime() + ciclica.recorrer(0, longitud);
      setResultRecorrerVer(resultadoRecorrer);
      setIsResult(true)
      const residuo = ciclica.getResiduo();
      if (/^0+$/.test(residuo)) {
        setMessageCRC(`${residuo} Recibido con exito`)
      } else {
        setMessageCRC(`${residuo} Error`)
      }
      
      
    }
  
    return (
  
      <>
  
        <StatusBar
          backgroundColor='#01989F' />
  
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
              keyboardType="default"
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
  
            <Button style={styles.button} title="Convertir" onPress={mostrarTextoClick} />
  
            {inputCharge ? (
              <>
                <InputDx polynomial={inputCharge ? Dividendo : 'x'} />
                <InputGx polynomial={inputCharge ? Divisor : 'x'} />
              </>
            ) : (
              (isNull.length > 2) && (
                <Badge style={{ margin: 10 }} label={isNull} color="error" />
              )
            )}
  
  
  
            {inputCharge ? (<>
              <Button style={styles.button} title="Dividir" onPress={calcularCRC} />
              {isVerificar ? (
              <>
              <Text>Resultados:</Text>
              <Text>{resultado}</Text>
              <Badge style={{ margin: 10 }} label={message} color="error" />
              </>) : (<></>)}
              
            </>) : (<></>)}
  
  
            {isVerificar ? (<>
            <Button style={styles.button} title="Verificar" onPress={onResultSucces} />
            {isResult ? (
            <>
            <Text>Resultados:</Text>
            <Text>{resultRecorrerVer}</Text>
            <Badge style={{ margin: 10, bottom: 18 }} label={messageCRC} />
            </>) : <></>}
            </>) : (<></>)}
  
          </View>
        </ScrollView>
  
        <FAB icon={<Ionicons  name="reload-outline" size={24} color="black" />}
             visible={true}
             size="mini"
             style={styles.fab}
             onPress={handleResetFields}
              />
  
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

const styles = StyleSheet.create({


    scrollView: {
      alignContent: "center",
      padding: 16,
      backgroundColor: '#F8F8F8'
  
    },
    view: {
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
    button: {
      width: '100%',
      backgroundColor: "#1DD1CB",
      marginTop: 10,
  
    },
    fab: {
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 4,
      position: 'absolute',
      bottom: 25,
      right: 16,
    },
  
  });
  
