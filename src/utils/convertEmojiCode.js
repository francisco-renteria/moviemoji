function convertCodeToEmoji(code) {
  // dividie la cadena de codigos por "-"
  const codes = code.split("-");

  let result = "";
  let list = [];

  codes.forEach((hexString) => {
    if (hexString.length >= 4) {
      // numero hexadecimal a entero
      const integer = parseInt("0x" + hexString, 16);
      // emoji correspondiente al código entero
      list.push(integer);
    } else {
      console.log(hexString);
    }
  });

  const emoji = String.fromCodePoint(...list);
  // concatena el emoji al resultado
  result = emoji;

  return result;
}

export default convertCodeToEmoji;
