// setting game Name
let gameName="Guess Word";
document.title=gameName;
document.querySelector("h1").textContent=gameName;
document.querySelector("footer").textContent=`${gameName} Create by Youcef <3`;

// setting Game options
let numOfTries=4;
let numOfLitters=6;
let currentTry=1;
let numOfHint=3;
//Mange word
let wordToGeuse="Youcef";
const word=["Youcef","haajer","Ayaaid","adnane","ishaak","mohamd"];
wordToGeuse=word[Math.floor(Math.random() * word.length)].toLowerCase();
let messageArray=document.querySelector(".message");

console.log(wordToGeuse);
//Mange Hint
document.querySelector(".hint span").innerHTML=numOfHint;
const  getHintButton=document.querySelector(".hint");
getHintButton.addEventListener("click",getHint)

//Creat inputs
function genreteInpute(){
    const inputeContainer=document.querySelector(".inpute");
    for(let i=1 ;i<=numOfTries;i++){
        const tryDiv=document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try-${i}</span>`;

        if(i!==1)  tryDiv.classList.add("disabled-inputs");
        
        for(let j=1 ;j<=numOfLitters;j++){
            const input=document.createElement("input");
            input.type="text";
            input.id=`guess-${i}-letter-${j}`;
            input.setAttribute("maxlength","1");
            tryDiv.appendChild(input);
        }
        inputeContainer.appendChild(tryDiv);
    }
    inputeContainer.children[0].children[1].focus();


    const inputesDesaible =document.querySelectorAll(".disabled-inputs input");
    inputesDesaible.forEach((input)=> (input.disabled=true));


    const inputs=document.querySelectorAll("input");
    inputs.forEach((input,idx) => {
        input.addEventListener("input",function(){
            this.value=this.value.toUpperCase();
            const nextTrget=inputs[idx+1];
            if(nextTrget) nextTrget.focus();
        });

        input.addEventListener("keydown" ,function(eve){
            const currentIdx=Array.from(inputs).indexOf(this);
            if(eve.key === "ArrowRight"){
                const nextInpt=currentIdx + 1;
                if(nextInpt < inputs.length) inputs[nextInpt].focus();
            }
            if(eve.key === "ArrowLeft"){
                const prvInpt=currentIdx-1;
                if(prvInpt >=0) inputs[prvInpt].focus();
            }
        });
    });
}

const guessButoon=document.querySelector(".check");
guessButoon.addEventListener("click",handleGeusse);

//Game Logic
function handleGeusse(){
    let successGuess=true;

    for(let i = 1; i <= numOfLitters; i++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
            const valueOfLitter = inputField.value.toLowerCase();
            const accutleLatter=wordToGeuse[i-1];

            if(valueOfLitter === accutleLatter){
                inputField.classList.add("in-place");
            }
            else if(wordToGeuse.includes(valueOfLitter) && valueOfLitter !==""){
                inputField.classList.add("Not-in-place");
                successGuess=false;
            }
            else{
                inputField.classList.add('not-existe')
                successGuess=false;
                inputField.classList.remove()
            }
}

if(successGuess){
    messageArray.innerHTML=`You win after ${currentTry} Tries`;
    if(numOfHint === 3){
        messageArray.innerHTML=`<p>Congratz You Didn't Use hints</p>`;
    }

    let allTries=document.querySelectorAll('.inpute > div');
    allTries.forEach((tryDiv)=>tryDiv.classList.add("disabled-inputs"));
    guessButoon.disabled=true;
    getHintButton.disabled=true;
}   
else{
    document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
    const currentTryInputs=document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach((input)=>(input.disabled=true));
    currentTry++;

    const nextTryInputs=document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input)=>(input.disabled=false));

    let ele=document.querySelector(`.try-${currentTry}`);
    if(ele){
        document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
        ele.children[1].focus();
    }
    else{
        guessButoon.disabled=true;
        getHintButton.disabled=true;
        messageArray.innerHTML=`You Lose And Word is <span>${wordToGeuse}</span> `;
       
    }
}
}
//Of Hint
function getHint(){
    if(numOfHint > 0){
        numOfHint--;
        document.querySelector(".hint span").innerHTML = numOfHint;
    }
    if(numOfHint === 0){
        getHintButton.disabled = true;
    }

    const enbaledInput = document.querySelectorAll("input:not([disabled])");
    const emptyEnbaleInput = Array.from(enbaledInput).filter((input) => input.value === "");

    if(emptyEnbaleInput.length > 0){
        const randomIdx = Math.floor(Math.random() * emptyEnbaleInput.length);
        const randomInput = emptyEnbaleInput[randomIdx];
        const indexOfFill = Array.from(enbaledInput).indexOf(randomInput);

        if(indexOfFill !== -1 && indexOfFill < wordToGeuse.length){
            randomInput.value = wordToGeuse[indexOfFill].toUpperCase();
        }
    }
}

function handleBackSpace(eve){
    if(eve.key==="Backspace"){
        const inputs=document.querySelectorAll("input:not([disabled])");
        const currentIdx=Array.from(inputs).indexOf(document.activeElement);

        if(currentIdx>0){
            const currentInput=inputs[currentIdx];
            const currentPrev=inputs[currentIdx - 1];
            currentInput.value="";
            currentPrev.value="";
            currentPrev.focus()
        }
    }
}

document.addEventListener("keydown",handleBackSpace);



window.onload=function(){
    genreteInpute();
}
