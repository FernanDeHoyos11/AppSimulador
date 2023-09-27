import { useState } from "react";
import { View } from "react-native"
import { ScrollView, StatusBar, StyleSheet, Text } from "react-native"
import { Badge, Button, FAB, TextInput } from "@react-native-material/core";
import { Ionicons } from '@expo/vector-icons';
import { PolinomioBinario } from "./src/helpers/PolinomioBinario";
import { InputGx } from "./components/InputGx";
import { Ciclica } from "./src/helpers/Ciclica";
import { agregadoCRC } from "./src/helpers/Agregado";
import BinaryInputs from "./components/InputResul";
import { styles } from "./src/styles";
import { InputDx } from "./components/InputDx";



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
  const [dividirButtonDisabled, setDividirButtonDisabled] = useState(false);
  const [messageCRC, setMessageCRC] = useState("");
  const [message, setMessage] = useState("");
  const [binariVerificar, setBinariVerificar] = useState("");
  const [binaryResult, setBinaryResult] = useState('');
  const [binaryResultDivisor, setBinaryResultDivisor] = useState('');


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


  const BinariDCRCChange = (text) => {
    setBinariVerificar(text);
  };

  const handleResetFields = () => {
    setDividendo('')
    setDivisor('')
    setInputCharge(false)
    setIsVerificar(false)
    setInputChargeV(false)
    setIsResult(false)
  }


  const mostrarTextoClick = () => {
    if (Dividendo.length > 2 && Divisor.length > 2) {
      setInputCharge(true)
    } else {
      false
      setInputCharge(false);
      setIsNull('Agregue los polinomios a convertir')
    }
    setBinaryResult(Dx);
    setBinaryResultDivisor(Gx)
    setDividirButtonDisabled(false)
  }




  const calcularCRC = () => {

    const {crc, longitud} = agregadoCRC(Gx);
    const ciclica = new Ciclica(Dx, Gx, crc);
    const resultadoCalculo = ciclica.imprime() + ciclica.recorrer(0, longitud);
    setResultado(resultadoCalculo);
    setInputChargeV(true)

    const residuo = ciclica.getResiduo();
    setCrc(residuo)
    setIsVerificar(true)
    setMessage(`CRC: ${residuo}`)
    
    setDividirButtonDisabled(true)
    setBinariVerificar(Dx + residuo)

  }

  const onResultSucces = () => {
    var longitud = Gx.length;
    const ciclica = new Ciclica(binariVerificar, binaryResultDivisor, '');
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
              
              <BinaryInputs
            binaryResult={binaryResult}
            binaryResultDivisor={binaryResultDivisor}
          />
             <InputGx polynomial={inputCharge ? Divisor : 'x'} /> 
            </>
          ) : (
            (isNull.length > 2) && (
              <Badge style={{ margin: 10 }} label={isNull} color="error" />
            )
          )}



          {inputCharge ? (<>
            <Button style={styles.button} title="Dividir" onPress={calcularCRC} disabled={dividirButtonDisabled} />
            {isVerificar ? (
              <>
                <Text>Resultados:</Text>
                <Text>{resultado}</Text>
                <Badge style={{ margin: 10 }} label={message} color="error" />
              </>) : (<></>)}

          </>) : (<></>)}

        


          {isVerificar ? (<>
           <InputDx binariVerificar={binariVerificar} BinariDCRCChange={BinariDCRCChange} />
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


      <FAB icon={<Ionicons name="reload-outline" size={24} color="black" />}
        visible={true}
        size="mini"
        style={styles.fab}
        onPress={handleResetFields}
      />


    </>
  )
}



