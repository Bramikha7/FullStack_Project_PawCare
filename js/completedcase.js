const Base_URL = "http://127.0.0.1:8000";
const completed = document.getElementById("one");

fetch(`${Base_URL}/case-reports/getByStatus?status=Completed`)
.then((res)=>res.json())
.then((data)=>{
  console.log(data);
  if (!completed) return;
  
  completed.innerHTML = ""; 
  
  if (data.length === 0) {
    completed.innerHTML = "<p>No completed cases yet.</p>";
    return;
  }
  
  function myFunction(item){
    const card=document.createElement("div");
    card.classList.add("card");
    console.log(item)
    card.innerHTML=`<p><b>Reported By:</b> ${item.volunteer_name}</p>
            <p><b>Number of Dogs:</b> ${item.number_of_dogs}</p>
            <p><b>Location:</b> ${item.location}</p>
            <p><b>Description:</b> ${item.description}</p>
            <p><b>Completed By:</b> ${item.ngo_name || 'N/A'}</p>`
            completed.appendChild(card);
  }
  data.forEach(myFunction)
})
.catch((error)=> {
  console.log(error);
  if (completed) {
    completed.innerHTML = "<p>Error loading cases. Please try again later.</p>";
  }
});