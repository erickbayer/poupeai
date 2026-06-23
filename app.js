let data = JSON.parse(localStorage.getItem("app") || "{}");

if(!data.trans) data.trans = [];
if(!data.cartao) data.cartao = [];

/* LOGIN */
function login(){
const email = document.getElementById("email").value;
const pass = document.getElementById("password").value;

if(!email || !pass){
alert("Preencha email e senha");
return;
}

localStorage.setItem("user", email);

document.getElementById("loginScreen").style.display = "none";
document.getElementById("app").style.display = "block";

render();
}

/* LOGOUT */
function logout(){
location.reload();
}

/* NAV */
function show(id){
document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
document.getElementById(id).classList.add("active");
}

/* SALVAR */
function save(){
localStorage.setItem("app", JSON.stringify(data));
}

/* ADD TRANS */
function add(){
data.trans.push({
desc:desc.value,
val:Number(val.value),
type:type.value
});

save();
render();
}

/* ADD CARTAO */
function addCard(){
data.cartao.push({
desc:cdesc.value,
val:Number(cval.value),
parc:Number(cparc.value),
month:new Date().getMonth()
});

save();
render();
}

/* CARTAO */
function calcCartao(m){
let total = 0;

data.cartao.forEach(c=>{
let p = c.val / c.parc;

for(let i=0;i<c.parc;i++){
if((c.month + i) % 12 === m){
total += p;
}
}
});

return total;
}

/* RENDER */
function render(){

let m = new Date().getMonth();

let r = 0;
let d = 0;

data.trans.forEach(t=>{
if(t.type === "r") r += t.val;
else d += t.val;
});

let c = calcCartao(m);

document.getElementById("r").innerText = "R$ " + r;
document.getElementById("d").innerText = "R$ " + d;
document.getElementById("c").innerText = "R$ " + c;
document.getElementById("s").innerText = "R$ " + (r - d - c);

/* LISTA TRANS */
list.innerHTML = data.trans.map(t =>
`<tr><td>${t.desc}</td><td>${t.val}</td></tr>`
).join("");

/* CARTAO */
clist.innerHTML = data.cartao.map(c =>
`<tr><td>${c.desc}</td><td>${c.val}</td><td>${c.parc}x</td></tr>`
).join("");

/* FATURAS */
fat.innerHTML = Array.from({length:12}).map((_,i)=>
`<tr><td>Mês ${i+1}</td><td>R$ ${calcCartao(i).toFixed(2)}</td></tr>`
).join("");

save();
}

/* CHART */
let chart = new Chart(document.getElementById("chart"),{
type:"doughnut",
data:{
labels:["Receitas","Despesas","Cartão"],
datasets:[{
data:[0,0,0],
backgroundColor:["#10B981","#EF4444","#7C3AED"]
}]
}
});