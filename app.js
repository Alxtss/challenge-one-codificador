let inputText = '';
let outputText = '';

const keys = ["enter", "imes", "ai", "ober", "ufat"];
const vowels = ["e", "i", "a", "o", "u"];

const btnEncriptar = document.getElementById('encrypt');
const btnDesencriptar = document.getElementById('decrypt');
const btnCopiar = document.getElementById('copy');

btnEncriptar.addEventListener('click', () => {
    inputText = document.getElementById("inputText").value;
    outputText = encrypt(inputText);

    if (inputText.trim() === '') {
        alert('Escriba un mensaje para encriptar');
    } else if(validateInputText(outputText) == '-1' || validateInputText(outputText) == '1' || validateInputText(outputText) == '2' || validateInputText(outputText) == '3' ||validateInputText(outputText) == '4' || validateInputText(outputText) == '5') {
        alert("Escriba un mensaje solo con letras minusculas, ¡NO USE MAYUSCULAS, NUMEROS NI SIMBOLOS!");
    }
    
    if(validateInputText(outputText) == '0') {
        showText(outputText);
        //btnCopiar.removeAttribute('disabled');
    }
});

btnDesencriptar.addEventListener('click', () => {
    inputText = document.getElementById("inputText").value;
    outputText = decrypt(inputText);

    if (inputText.trim() === '') {
        alert('Escriba un mensaje para descifrar');
    } else if(validateInputText(outputText) == '-1' || validateInputText(outputText) == '1' || validateInputText(outputText) == '2' || validateInputText(outputText) == '3' ||validateInputText(outputText) == '4' || validateInputText(outputText) == '5') {
        alert("Escriba un mensaje solo con letras minusculas, ¡NO USE MAYUSCULAS, NUMEROS NI SIMBOLOS!");
    }
    
    if(validateInputText(outputText) == '0') showText(outputText);
});

btnCopiar.addEventListener('click', () => {    
    outputText = document.getElementById("outputText").textContent;
    // Creating a tranfer area
    const clipboard = navigator.clipboard;
    // copying to clipboard
    clipboard.writeText(outputText).then(() => {
        document.getElementById("inputText").value = '';
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('No se pudo copiar al portapapeles: ', err);
    });
});

//encrypting input text
function encrypt(txt){
    for(const obj in keys){
        outputText = txt.replaceAll(vowels[obj], keys[obj]);
        txt = outputText;
    }
    return outputText;
}

//decripting input text
function decrypt(txt){
    for(const obj in keys){
        outputText = txt.replaceAll(keys[obj],vowels[obj]);
        txt = outputText;
    }
    return outputText;
}

//adding input text to textarea
function showText(txt){
    document.getElementById("no-msg").style.visibility = 'hidden';
    document.getElementById("show-msg").style.visibility = 'visible';
    return document.getElementById("outputText").textContent = txt;  
}

//validating input text before encrypting or decrypting
function validateInputText(txt){
    txt = String(txt).trim();
    //regular expressions for every condition
    const regxs = {"lower":/^[a-z ]+$/, "upper": /^[A-Z ]+$/, "upperLower": /^[A-Za-z ]+$/, "numbers": /^[0-9 ]+$/, "accents": /^[áéíóúü ]+$/, "special_characteres": /^[`@#$%^&*()_+-={};':",<>/?~ ]+$/};

    /* validation through the array by number
    return:
    0: lower case
    1: upper case
    2: combination of upper and lower case
    3: numbers
    4: accents
    5: special characteres
    -1: no condition is met */

    if(regxs.lower.test(txt)) return 0;
    if(regxs.upper.test(txt)) return 1;
    if(regxs.upperLower.test(txt)) return 2;
    if(regxs.numbers.test(txt)) return 3;
    if(regxs.accents.test(txt)) return 4;
    if(regxs.special_characteres.test(txt))return 5;

    return -1;
}
