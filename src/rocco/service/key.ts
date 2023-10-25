export function makeKeyPassRandom(length:number) {
    var result = "";
    var characters = '0123456789';
    for (var i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    result = result.match(/\d{1,4}/g).join("-");
    return result;
  }
  