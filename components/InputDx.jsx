import { TextInput } from "@react-native-material/core";
import { styles } from "../src/styles";

export const InputDx = ({binariVerificar, BinariDCRCChange}) => {


  return (
    <>
      <TextInput
            label="Verificar"
            color="#1DD1CB"
            editable
            variant="standard"
            style={styles.input}
            onChangeText={BinariDCRCChange}
            name="crc"
            value={binariVerificar}
            keyboardType="numeric"
          />
    </>
  );
};
