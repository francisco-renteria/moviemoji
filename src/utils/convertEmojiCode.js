function convertCodeToEmoji(code) {
  // dividie la cadena de codigos por "-"
  const codes = code.split("-");

  let result = "";

  codes.forEach((hexString) => {
    if (hexString.length >= 4) {
      // numero hexadecimal a entero
      const integer = parseInt(hexString, 16);
      // emoji correspondiente al código entero
      const emoji = String.fromCodePoint(integer);
      // concatena el emoji al resultado
      result += emoji;
    } else {
      console.log(hexString);
    }
  });

  return result;
}

export default convertCodeToEmoji;
