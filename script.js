const codes = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
]

showCode = false;
  
let pixeles = []
for (let i = 1; i <= 25; i++) {
    let temp = document.querySelector("#pixel" + i);
    pixeles.push(temp); 
}

let bgHexCodeSpanElements = []
for (let i = 1; i <= 25; i++) {
    let temp = document.querySelector("#bg-hex-code" + i);
    bgHexCodeSpanElements.push(temp);
    bgHexCodeSpanElements[i - 1].style.display = "none";
}



function getRandomIndex() {
    const randomIndex = Math.floor(codes.length * Math.random());
    return randomIndex;
}
  
function changeBackgroundColor() {
    for (let i = 0; i < 25; i++) {
        let color = "#";
        for (let j = 1; j <= 6 ; j++){
            let indice = getRandomIndex();
            color += codes[indice];
        }
        bgHexCodeSpanElements[i].innerText = color;
        pixeles[i].style.backgroundColor = color;
}
}

function mostrarCodigo(){
    if (showCode){
        for (let i = 0; i < 25; i++) {
            bgHexCodeSpanElements[i].style.display = "none";
            showCode = false;
            document.querySelector("#btnCode").innerText = "Mostrar Código";
            }
    }
    else{
        for (let i = 0; i < 25; i++) {
        bgHexCodeSpanElements[i].style.display = "inline";
        showCode = true;
        document.querySelector("#btnCode").innerText = "Ocultar Código";
    }
    }

}
const btn = document.querySelector("#btn");
btn.onclick = changeBackgroundColor;

const btn2 = document.querySelector("#btnCode");
btn2.onclick = mostrarCodigo;


