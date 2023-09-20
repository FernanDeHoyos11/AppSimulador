export class PolinomioBinario {
    static convertirAPolinomioBinario(polinomio) {
      const terminos = polinomio.split(/\s*\+\s*/); // Divide el polinomio en términos
      let maxExponente = 0;
  
      // Encuentra el exponente máximo en el polinomio
      for (const termino of terminos) {
        const exponente = this.obtenerExponente(termino);
        if (exponente > maxExponente) {
          maxExponente = exponente;
        }
      }
  
      // Inicializa un arreglo de bits para representar el polinomio en binario
      const binarioArray = new Array(maxExponente + 1).fill(0);
  
      // Establece los bits correspondientes en 1
      for (const termino of terminos) {
        const exponente = this.obtenerExponente(termino);
        binarioArray[exponente] = 1;
      }
  
      // Convierte el arreglo de bits a una cadena binaria
      const binarioBuilder = [];
      for (let i = maxExponente; i >= 0; i--) {
        binarioBuilder.push(binarioArray[i]);
      }
  
      return binarioBuilder.join('');
    }
  
    static obtenerExponente(termino) {
      let exponente = 0;
      if (termino.includes("^")) {
        const indice = termino.indexOf("^");
        exponente = parseInt(termino.substring(indice + 1));
      } else if (termino.includes("X") || termino.includes("x")) {
        // Si no hay un exponente explícito, asumimos que X tiene exponente 1
        exponente = 1;
      }
      return exponente;
    }
  }

  