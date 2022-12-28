var setAddress = document.querySelector("#setAddress");
var addressBox = document.querySelector("#addressBox");
var closeBtn = document.querySelector("#closeBtn");

setAddress.addEventListener("click",function(){
    addressBox.style.display = "block";
})

closeBtn.addEventListener("click",function(){
    addressBox.style.display = "none";
})