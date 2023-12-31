const inputBtn = document.getElementById("inputBtn");
const inputBtnDelete = document.getElementById("inputBtnDelete");
const inputName = document.getElementById("inputName");
const inputNum = document.getElementById("inputNum");
const contactList = document.getElementById("contactList");
const errorBox = document.createElement("div");
let counterLi = 0;

// Eventlisterners:
inputBtn.addEventListener("click", btnClick);
inputBtnDelete.addEventListener("click", function(){
    document.body.append(errorBox);
    document.getElementById("mainContent").style.display="none";
    errorBox.style.cssText=`
    position: absolute;
    background-color: antiquewhite;
    border: 5px solid lightgrey;
    top:100px;
    width: 25%;
    height: 200px;
    left: 0; 
    right: 0; 
    margin-left: auto; 
    margin-right: auto;
    z-index:99;
    text-align:center;
    `
    // Skapar innehållet i diven
    errorBox.innerHTML="<div id=errorbox3><p>Kunskapskontroll2.exe</p></div><div id=errorbox2></div><p style=margin-top:80px>Bekräfta Radering Av Kontaktlistan</p> <button id=btnOk style=margin-right:10px >OK</button><button id=btnAvbryt style=margin-left:10px>AVBRYT</button"
    
    // Ränsar listan från alla kontakter om OK är tryckt
    btnOk.addEventListener("click", function(e){
        document.getElementById("mainContent").style.display="block";
        contactList.innerHTML="";
        e.target.parentNode.remove();
    })
    
    btnAvbryt.addEventListener("click", function(e){
        document.getElementById("mainContent").style.display="block";
        e.target.parentNode.remove();
    })

});

// Skapar li med värde från användaren
function btnClick(){
    if(inputName.value==="" || inputNum.value==="" ){
        document.getElementById("errorText").innerHTML="<p style=color:red>Fälten kan inte vara tomma</p>"
        inputName.setAttribute("style","border-color: red");
        inputNum.setAttribute("style","border-color: red");
        setTimeout(function(){
            inputName.setAttribute("style","border-color: black");  
            inputNum.setAttribute("style","border-color: black");  
        }, 1000)

        // Kollar om input nummer är bara siffror
    } else if (isNaN(inputNum.value)===true){
        document.getElementById("errorText").innerHTML="<p style=color:red>Nummer får inte ha bokstäver</p>"
        inputNum.setAttribute("style","border-color: red");
        setTimeout(function(){
            inputNum.setAttribute("style","border-color: black");  
        }, 1000)

        // Kollar om input namn är bara bokstäver
    } else if (isNaN(inputName.value)===false){
        document.getElementById("errorText").innerHTML="<p style=color:red>Namn får inte ha siffror</p>"
        inputName.setAttribute("style","border-color: red");
        setTimeout(function(){
            inputName.setAttribute("style","border-color: black");  
        }, 1000)

        // Skapar användaren
    } else {
        document.getElementById("errorText").innerHTML="";
        counterLi+=1;
        const createLi = document.createElement("li");
        contactList.append(createLi);
        createLi.setAttribute("id", "li"+counterLi);
        createLi.innerHTML="<input disabled=true value="+inputName.value+" "+"style=margin-right:5px><input disabled=disable value="+inputNum.value+" margin-left:10px><button style=margin:5px id=inputChange"+counterLi+">Ändra</button><button id=inputDelete"+counterLi+">Radera</button>";
        console.log(createLi, counterLi);

        // Rensar input value för användaren att lägga till ny kontakt
        inputName.value="";
        inputNum.value="";
        // Tar bort en specifik kontakt
        const inputDelete = document.getElementById("inputDelete"+counterLi)
        inputDelete.addEventListener("click", function(e){
            document.body.append(errorBox);
            errorBox.style.cssText=`
            position: absolute;
            background-color: antiquewhite;
            border: 5px solid lightgrey;
            top:100px;
            width: 25%;
            height: 200px;
            left: 0; 
            right: 0; 
            margin-left: auto; 
            margin-right: auto;
            z-index:99;
            text-align:center;
            `

            document.getElementById("mainContent").style.display="none";
            // Skapar innehållet i diven
            errorBox.innerHTML="<div id=errorbox3><p>Kunskapskontroll2.exe</p></div><div id=errorbox2></div><p style=margin-top:80px>Bekräfta Radering Av "+inputChange.parentElement.children[0].value+" "+inputChange.parentElement.children[1].value+"</p> <button id=btnOk style=margin-right:10px >OK</button><button id=btnAvbryt style=margin-left:10px>AVBRYT</button"
            // Ränsar listan från alla kontakter om OK är tryckt
            btnOk.addEventListener("click", function(e){
                inputChange.parentElement.remove();
                e.target.parentNode.remove();
                document.getElementById("mainContent").style.display="block";
            })
            
            btnAvbryt.addEventListener("click", function(e){
                e.target.parentNode.remove();
                document.getElementById("mainContent").style.display="block"
            })
        
            });
    
        
        //En switch som ändrar eller sparar en specifik kontakt
        const inputChange = document.getElementById("inputChange"+counterLi)
            inputChange.addEventListener("click", function (){
                
                // Checkar om knappen man tryckt på är ändra eller spara
                // Checkar så fälten inte är tomma
                if(inputChange.parentElement.children[1].value==="" || inputChange.parentElement.children[0].value===""|| Number.isNaN(inputChange.parentElement.children[1].value)|| Number.isNaN(inputChange.parentElement.children[0].value)){
                    document.getElementById("errorText").innerHTML="<p style=color:red>Fälten kan inte vara tomma</p>"
                    inputChange.parentElement.children[1].setAttribute("style","border-color: red");
                    inputChange.parentElement.children[0].setAttribute("style","border-color: red");
                    setTimeout(function(){
                        inputChange.parentElement.children[1].setAttribute("style","border-color: black");
                        inputChange.parentElement.children[0].setAttribute("style","border-color: black");
                    }, 1000)

                }else if(inputChange.innerText==="Ändra"){
                        inputChange.parentElement.children[1].disabled=false;
                        inputChange.parentElement.children[0].disabled=false;
                        inputChange.parentElement.children[1].setAttribute("style","background-color: white");
                        inputChange.parentElement.children[0].setAttribute("style","background-color: white");
                        inputChange.innerText="Spara";
                        return;

                        // Checkar om namn har siffror
                }else if (isNaN(inputChange.parentElement.children[0].value)===false){
                        document.getElementById("errorText").innerHTML="<p style=color:red>Namn får inte ha siffror</p>"
                        inputChange.parentElement.children[0].setAttribute("style","border-color: red");
                        setTimeout(function(){
                            inputChange.parentElement.children[0].setAttribute("style","border-color: black");
                        }, 1000)

                        // Checkar om nummer har bokstäver
                }else if (isNaN(inputChange.parentElement.children[1].value)===true){
                        document.getElementById("errorText").innerHTML="<p style=color:red>Nummer får inte ha bokstäver</p>"
                        inputChange.parentElement.children[1].setAttribute("style","border-color: red");
                        setTimeout(function(){
                            inputChange.parentElement.children[1].setAttribute("style","border-color: black");  
                        }, 1000)

                        // Släpper genom ändringarna om kraven är uppfyllda
                }else{
                    inputChange.parentElement.children[1].setAttribute("style","background-color: lightblue");
                    inputChange.parentElement.children[0].setAttribute("style","background-color: lightblue");
                    inputChange.parentElement.children[1].disabled=true;
                    inputChange.parentElement.children[0].disabled=true;
                    inputChange.innerText="Ändra";
                    return;
                };
        });   
    }
};



// !!Testversion. Inte i bruk!!

// const inputChange = document.getElementById("inputChange"+counterLi)
// inputChange.addEventListener("click", function (){
//     this.parentElement.children[1].disabled=false;
//     this.parentElement.children[0].disabled=false;
//     inputChange.innerText="Spara";
//     inputChange.setAttribute("id", "inputSave"+counterLi);
//     inputSave = document.getElementById("inputSave"+counterLi)
// });  

// const inputSave = document.getElementById("inputSave"+counterLi)
// inputSave.addEventListener("click", function(){
//     this.parentElement.children[1].setAttribute("value",this.parentElement.children[1].value);
//     this.parentElement.children[1].disabled=true;
//     this.parentElement.children[0].disabled=true;
//     inputSave.innerText="Ändra";
//     inputSave.setAttribute("id", "inputChange"+counterLi);
// });