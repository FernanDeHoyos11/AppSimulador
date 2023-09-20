export class Ciclica {
    constructor(datos, divisor, crc) {
        this.agregado = crc;
        this.datos = datos;
        this.divisor = divisor;
        this.cadena = datos + crc;
        this.resulParcial = "";
        this.cociente = "";
        this.residuo = "";
        this.staticCrc = "";
        this.tabulador = "";
        this.tabulador2 = " ";
    }
  
    imprime() {
      let resultado = "";
      resultado += "datos: " + this.datos + "\n";
      resultado += "agregado: " + this.agregado + "\n";
      resultado += "               ----------\n";
      resultado += "binario:    " + this.divisor + "|" + this.cadena + "\n";
      
      return resultado;
    }
    
  
    getCrc() {
        return this.staticCrc;
    }
  
    getBinario() {
        return this.cadena;
    }
  
    getResiduo() {
      return this.residuo;
  }
  
  // Modifica el método 'recorrer' para que devuelva una cadena
  recorrer(li, ls) {
    this.tabulador += " ";
    this.tabulador2 += " ";
    let resultadoRecorrer = ""; // Variable para almacenar la salida
  
    if (ls == this.cadena.length + 1) {
      resultadoRecorrer += "cociente total: " + this.cociente + "\n";
      this.staticCrc = this.resulParcial;
      this.residuo = this.resulParcial;
      resultadoRecorrer += "Residuo:  " + this.staticCrc + "\n";
  
      return resultadoRecorrer;
    }
  
    if (li == 0) {
      resultadoRecorrer += "parte a dividir: " + this.cadena.substring(li, ls) + "\n";
      if (this.resulParcial.startsWith("0")) {
        resultadoRecorrer += "divisor:        " + this.tabulador + "0000\n";
      } else {
        resultadoRecorrer += "divisor:        " + this.tabulador + "" + this.divisor + "\n";
      }
      resultadoRecorrer += "               -------\n";
      this.resulParcial = this.resta(this.cadena.substring(li, ls), this.divisor);
      resultadoRecorrer += "                 " + this.resulParcial + "\n";
      resultadoRecorrer += "ccite parcial: " + this.cociente + "\n";
      resultadoRecorrer += this.recorrer(li + 1, ls + 1); // Llama recursivamente y concatena los resultados
      return resultadoRecorrer;
    }
  
    this.resulParcial += this.cadena.charAt(ls - 1);
    resultadoRecorrer += "parte a dividir: " + this.tabulador + "" + this.resulParcial + "\n";
  
    if (this.resulParcial.startsWith("0")) {
      resultadoRecorrer += "divisor:        " + this.tabulador + "0000\n";
    } else {
      resultadoRecorrer += "divisor:        " + this.tabulador + "" + this.divisor + "\n";
    }
  
    resultadoRecorrer += "              " + this.tabulador + "-------\n";
    this.resulParcial = this.resta(this.resulParcial, this.divisor);
    resultadoRecorrer += "               " + this.tabulador2 + "" + this.resulParcial + "\n";
    resultadoRecorrer += "ccite parcial: " + this.cociente + "\n";
    resultadoRecorrer += this.recorrer(li + 1, ls + 1); // Llama recursivamente y concatena los resultados
    return resultadoRecorrer;
  }
  
  // Modifica el método 'resta' para que devuelva una cadena
  resta(div, divisor) {
    let resultado = "";
    let agregado = "0".repeat(div.length);
    let divisorNeutro = agregado;
  
    if (div.startsWith("0")) {
        for (let i = 1; i < div.length; i++) {
            if (div.charAt(i) === divisorNeutro.charAt(i)) {
                resultado += "0";
            } else {
                resultado += "1";
            }
        }
        this.cociente += "0";
    } else {
        for (let i = 1; i < div.length; i++) {
            if (div.charAt(i) === divisor.charAt(i)) {
                resultado += "0";
            } else {
                resultado += "1";
            }
        }
        this.cociente += "1";
    }
    return resultado;
  }
  }
  
  
  
  
  
  
  