window.onload = function(){
let kolOSI, errorPoint, maxPSI, classPSI, point, numDelOSI, maxOSI, allInput,status;
let delRes = [];
let go = document.querySelector(".go");
let windowResult = document.querySelector(".result");
let cont_res = document.querySelector(".cont_res");
let viewEl = document.querySelector(".viewEl");
let windowHello = document.querySelector(".winHello");
let all = document.querySelector(".all");
let close = document.querySelector(".close");
go.addEventListener("click", clickHeandlerGo);
close.addEventListener("click", clickHeandlerClose);
window.addEventListener("keydown", keyHandlerClose);

function clickHeandlerGo() {
  maxPSI = document.querySelector("#maxPSI").value;
  classPSI = Number(document.querySelector("#classPSI").value);
  point = document.querySelector("#point").value;
  numDelOSI = Number(document.querySelector("#numDelOSI").value);
  maxOSI = Number(document.querySelector("#maxOSI").value);
  allInput = document.getElementsByTagName("input");

   //Разделение ПСИ
  let maxPsiDelNumber = maxPsiDel(maxPSI);
  let maxPsiDelNumber2 = 0;

  if (typeof maxPsiDelNumber != "number") {
    maxPsiDelNumber2 = Number(maxPsiDelNumber[1]);
    maxPsiDelNumber = Number(maxPsiDelNumber[0]);
  } else {
    maxPsiDelNumber2 = maxPsiDelNumber;
  }

  //Рассчет используемых делений
  kolOSI = (maxPsiDelNumber2 * numDelOSI) / maxOSI;
  //Преобразование рассчетных точек в числа
  let arPoint = stringInNumber(point);
  //Рассчет точек
  delRes = calculationPoint(arPoint, kolOSI, maxPsiDelNumber);
  
   //Рассчет погрешности
  errorPoint = (classPSI * kolOSI) / 100;
    //Валидация
    status = validation(allInput,delRes);
    
  //Вывод в окно результата
  view(arPoint, delRes, errorPoint, kolOSI, status);
  windowResult.style.transform = "translateX(0%)";
 
}


//Массив точек
function stringInNumber(st) {
  let symb = ",";
  return st.split(symb);
}

//Опредение предела ПСИ
function maxPsiDel(st) {
  let symb = "/";
  let check = st.indexOf(symb);

  if (check > -1) {
    return st.split(symb);
  } else {
    return Number(st);
  }
}

//Рассчет точек
function calculationPoint(ar, a, b) {
  let per;
  let array =[];
  for (let i = 0; i < ar.length; i++) {
    ar[i] = Number(ar[i]);
    per = (a * ar[i]) / b;
    array.push(per);
   }
   return array;
}

//Создание элементов и вывод на экран
function view(arString, arResult, er, kolDel, stat) {
  if (stat === "true" || stat === true) {
    viewEl.style.display = "block";
    for (let i = 0; i < arString.length; i++) {
      let createEl = document.createElement("p");
      cont_res.appendChild(createEl);
      createEl.innerHTML =
        arString[i] + "                 " + arResult[i] + "</br>";
    }

    let createEl = document.createElement("p");
    cont_res.appendChild(createEl);
    createEl.innerHTML = "Максимальная погрешность состовляет : " + er + " дел";
    let createEl2 = document.createElement("p");
    cont_res.appendChild(createEl2);
    createEl2.innerHTML = "Рабочее колличество делений ОСИ : " + kolDel;
 
  } 
  else {
    let createEl3 = document.createElement("p");
    cont_res.appendChild(createEl3);
    viewEl.style.display = "none";
    createEl3.innerHTML = "Поля не заполнены или заполнены некорректно!";
   
  }
}

//валидация форм
function validation(list,fCalc) {
  let stat = true;
for(let i =0; i < fCalc.length;i++){
  if(isNaN(fCalc[i])){
        return stat = false;
      }
}

  for (let i = 0; i < list.length-1; i++) {
    let val = list[i].value;
       if (val.length < 1) {
      stat = false;
    } 
  }
 return  stat;
}
//Очистка всего после закрытия результатов
function clearAllClose(ar){
   return ar.length =0;
}

//Зыкрытие окна результатов
 function clickHeandlerClose(e){
   forEventClose();
   return false;
} 

function keyHandlerClose(e){
  if(e.keyCode == 27 ){
      forEventClose();
  }
 return false;
}

function forEventClose(){
  windowResult.style.transform = "translateX(-150%)";
  let collectionChildren = cont_res.children;
    let arrayChildren = Array.prototype.slice.call(collectionChildren);
   setTimeout(()=>{
     clearAllClose(delRes);
     let i = 1;
   while(arrayChildren.length > 1){
     arrayChildren[i].remove();
     i++;
   }
   },500);
}

//анимации
function showDelete(el,el2){
  el.classList.add("showH2");
  el2.classList.add("allShow");
  setTimeout(()=>{
    windowHello.remove();
  },500)
}
 
function show(el){
  el.classList.add("showH1");
}

setTimeout(show, 10, windowHello); 
 setTimeout(showDelete, 3000,windowHello,all); 




}