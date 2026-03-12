const formElement = document.getElementById("myForm");
const Base_URL = "http://127.0.0.1:8000";

formElement.addEventListener("submit", async function (event) {
  event.preventDefault();

  const dataObject = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    pincode: document.getElementById("pincode").value,
    number_of_dogs: document.getElementById("dogs").value,
    urgency_level: document.getElementById("urgent").value,
    description: document.getElementById("description").value,
    best_time_to_visit: document.getElementById("time").value,
  };

  for (const key in dataObject) {
    if (!dataObject[key]) {
      alert(`Please fill in the ${key.replace(/_/g, " ")} field.`);
      return;
    }
  }

  const volunt_id = localStorage.getItem("volunt_id");
  console.log(volunt_id);

  try {
    const response = await fetch(
      `${Base_URL}/case-reports/casereport?volunt_id=${volunt_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Server error:", text);
      alert("Error reporting case. Please check server.");
      return;
    }

    const result = await response.json();
    alert("Case reported successfully! NGOs will be notified.");
    window.location.href = "volunt_dashboard.html";

  } catch (error) {
    console.error("Error:", error);
    alert("Network error. Please try again later.");
  }
});