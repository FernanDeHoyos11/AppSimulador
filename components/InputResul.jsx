
import { Badge, TextInput } from '@react-native-material/core';
import { styles } from '../src/styles';


const BinaryInputs = ({ binaryResult, binaryResultDivisor }) => {
  return (
    <>
    <Badge style={{ margin: 10 }} label={`binario D: ${binaryResult}`}  />
    <Badge style={{ margin: 10 }} label={`binario G: ${binaryResultDivisor}`}  />
     
    </>
  );
};

export default BinaryInputs;

