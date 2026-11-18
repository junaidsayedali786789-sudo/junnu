// Reminders
function addReminder(){
 let input=document.getElementById("reminderInput");
 let list=document.getElementById("reminderList");
 if(input.value){
  let li=document.createElement("li");
  li.textContent=input.value;
  list.appendChild(li);
  input.value="";
 }
}

// Login
function login(){
 let u=document.getElementById("username").value;
 let p=document.getElementById("password").value;

 if(u=="parent" && p=="1234"){
  alert("Login successful!");
 } else {
  alert("Wrong details");
 }
}

// Prayer API
function loadPrayer(){
 fetch("https://api.aladhan.com/v1/timingsByCity?city=Mumbai&country=India")
 .then(res=>res.json())
 .then(data=>{
  let t=data.data.timings;
  document.getElementById("prayerTimes").innerHTML =
  `Fajr: ${t.Fajr}<br>Dhuhr: ${t.Dhuhr}<br>Asr: ${t.Asr}<br>Maghrib: ${t.Maghrib}<br>Isha: ${t.Isha}`;
 });
}