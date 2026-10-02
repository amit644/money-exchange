
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const ToCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");
window.addEventListener("load",() =>{updateExchangeRate();})

const dropdown = document.querySelectorAll(".dropdown select");
// for in loop give idx and for of loop give value .
 for(let select of dropdown){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode ;

        if(select.name === "from" && currCode === "USD"){
          newOption.selected = true;
        }
        if(select.name === "To" && currCode === "INR"){
          newOption.selected = true;
        }

        select.append(newOption);
    }

    select.addEventListener("change" , (evt) => {
      updateFlag(evt.target);
    });

 }




 const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
 };
 

 btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
      amtVal = 1;
      amount.value = "1";
    }



 fetch(`https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`)
  .then(response => response.json())
  .then(data => {
    msg.innerText = `${amtVal} ${fromCurr.value} = ${data[fromCurr.value.toLowerCase()][ToCurr.value.toLowerCase()]*amtVal} ${ToCurr.value} `;

  });
}


