const formElement = document.getElementById("myForm");
const Base_URL = "http://localhost:8000";
formElement.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameValue = document.getElementById("name").value;
  const phoneValue = document.getElementById("phone").value;
  const emailValue = document.getElementById("email").value;
  const addressValue = document.getElementById("address").value;
  const cityValue = document.getElementById("city").value;
  const pincodeValue = document.getElementById("pincode").value;
  const dogsValue = document.getElementById("dogs").value;
  const urgentValue = document.getElementById("urgent").value;
  const descriptionValue = document.getElementById("description").value;
  const timeValue = document.getElementById("time").value;
  if (
    !nameValue ||
    !phoneValue ||
    !emailValue ||
    !addressValue ||
    !cityValue ||
    !pincodeValue ||
    !dogsValue ||
    !urgentValue ||
    !descriptionValue ||
    !timeValue
  ) {
    alert("username required");
  }
  const dataObject = {
    name: nameValue,
    phone: phoneValue,
    email: emailValue,
    address: addressValue,
    city: cityValue,
    pincode: pincodeValue,
    number_of_dogs: dogsValue,
    urgency_level: urgentValue,
    description: descriptionValue,
    best_time_to_visit: timeValue,
  };
  console.log(dataObject);
  async function postData(Base_URL, dataObject) {
    try {
      const response = await fetch(
        `${Base_URL}/case-reports/casereport?volunt_id=1`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataObject),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Success:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  postData(Base_URL, dataObject);
});
