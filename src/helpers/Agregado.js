
export const agregadoCRC = (Gx) => {
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

    return{
        crc,
        longitud
    }
}