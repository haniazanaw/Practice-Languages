const text=document.querySelector(".title");
const changeColor=document.querySelector(".changeColor");

text.style.color="white";
text.style.backgroundColor="red";

text.classList.remove("change");
changeColor.addEventListener("click", function(){
    text.classList.add("change");
     text.classList.toggle("change");
})


const userList= document.querySelectorAll(".name-list li");
const listInput= document.querySelectorAll(".list-input");
console.log(userList);

for(user of userList){
    user.addEventListener('click',function(){
    console.log(this);
this.style.color="red";
    });
}

console.log(listInput.value);