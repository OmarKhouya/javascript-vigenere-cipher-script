var textArea = document.querySelector("#TextToCrypte");
var Choix1 = document.querySelectorAll("input[name='Choix1']");
var Choix1Value;
Choix1.forEach((mode) => {
  if (!mode.checked) {
    mode.addEventListener("change", () => {
      Choix1Value = document.querySelector(
        'input[name="Choix1"]:checked'
      ).value;
      showText.innerHTML = "";
      textArea.value = "";
    });
  } else {
    Choix1Value = document.querySelector('input[name="Choix1"]:checked').value;
  }
});

textArea.addEventListener("keydown", function () {
  textArea.addEventListener("keyup", function () {
    var divChoix1 = document.querySelector(".divChoix1");
    if (!Choix1Value == "") {
      divChoix1.classList.remove("border", "border-danger", "rounded-4");
    } else divChoix1.classList.add("border", "border-danger", "rounded-4");
    text = textArea.value;
    function vigenereCipher(plaintext, keyword) {
      plaintext = plaintext.toUpperCase();
      keyword = keyword.toUpperCase();
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let ciphertext = "";
      let keywordIndex = 0;
      for (let i = 0; i < plaintext.length; i++) {
        const plaintextChar = plaintext[i];
        if (!alphabet.includes(plaintextChar)) {
          ciphertext += plaintextChar;
          continue;
        }
        const keywordChar = keyword[keywordIndex];
        const plaintextIndex = alphabet.indexOf(plaintextChar);
        keywordIndex = alphabet.indexOf(keywordChar);
        const ciphertextIndex =
          (plaintextIndex + keywordIndex) % alphabet.length;
        ciphertext += alphabet[ciphertextIndex];
        keywordIndex = (keywordIndex + 1) % keyword.length;
      }
      return ciphertext;
    }

    function vigenereDecipher(ciphertext, keyword) {
      ciphertext = ciphertext.toUpperCase();
      keyword = keyword.toUpperCase();
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      let plaintext = "";
      let keywordIndex = 0;
      for (let i = 0; i < ciphertext.length; i++) {
        const ciphertextChar = ciphertext[i];
        if (!alphabet.includes(ciphertextChar)) {
          plaintext += ciphertextChar;
          continue;
        }
        const keywordChar = keyword[keywordIndex];
        const ciphertextIndex = alphabet.indexOf(ciphertextChar);
        keywordIndex = alphabet.indexOf(keywordChar);
        let plaintextIndex = ciphertextIndex - keywordIndex;
        if (plaintextIndex < 0) {
          plaintextIndex += alphabet.length;
        }
        plaintext += alphabet[plaintextIndex];
        keywordIndex = (keywordIndex + 1) % keyword.length;
      }
      return plaintext;
    }
    var crypted;
    var KeyWord1 = document.querySelector("#KeyWordvigenere1");
    kw1Val = KeyWord1.value;

    if (kw1Val != "") {
      KeyWord1.classList.remove("border", "border-danger");
      if (Choix1Value == "crypter") {
        crypted = vigenereCipher(text, kw1Val);
      }
      if (Choix1Value == "decrypter") {
        crypted = vigenereDecipher(text, kw1Val);
      }
    } else {
      KeyWord1.classList.add("border", "border-danger");
    }

    var showText = document.querySelector("#showText");
    showText.innerHTML = crypted;
  });
});
