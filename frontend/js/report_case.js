const Base_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:") ? "http://127.0.0.1:8000" : "";
const cases = document.getElementById("main");

fetch(`${Base_URL}/case-reports/`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    function myFunction(item) {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <p><b>Phone:</b> ${item.phone}</p>
        <p><b>Address:</b> ${item.address}</p>
        <p><b>Email:</b> ${item.email}</p>
        <p><b>Pincode:</b> ${item.pincode}</p>
        <p><b>Urgency_level:</b> ${item.urgency_level}</p>
        <p><b>Best time to visit:</b> ${item.best_time_to_visit}</p>
        <p><b>Name:</b> ${item.name}</p>
        <p><b>City:</b> ${item.city}</p>
        <p><b>Number of dogs:</b> ${item.number_of_dogs}</p>
        <p><b>Description:</b> ${item.description}</p>
        <p>
          <b>Status:</b>
          <select class="statusDropdown">
            <option value="Pending" ${item.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="In Progress" ${item.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Completed" ${item.status === "Completed" ? "selected" : ""}>Completed</option>
          </select>
        </p>
      `;

      cases.appendChild(card);
      const dropdown = card.querySelector(".statusDropdown");

      dropdown.addEventListener("change", async function (event) {
        const selectedValue = event.target.value;
        const caseId = item.case_id;
        const ngoId = localStorage.getItem("ngo_id");

        if (!ngoId) {
          alert("Please sign in as an NGO to update status");
          return;
        }

        try {
          let response;
          if (selectedValue === "In Progress" || selectedValue === "Completed") {

            response = await fetch(`${Base_URL}/case-reports/${caseId}/accept`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ngo_id: parseInt(ngoId) })
            });


            if (response.ok && selectedValue === "Completed") {
              response = await fetch(`${Base_URL}/case-reports/${caseId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Completed" })
              });
            }
          } else {

            response = await fetch(`${Base_URL}/case-reports/${caseId}/status`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ status: selectedValue })
            });
          }

          if (response.ok) {
            alert(`Status updated to ${selectedValue}`);
            if (selectedValue === "Completed") {

              card.remove();
            }
          } else {
            const error = await response.json();
            alert("Error: " + (error.detail || "Failed to update status"));
          }
        } catch (error) {
          console.error("Error updating status:", error);
          alert("Network error occurred");
        }
      });
    }

    data.filter(item => item.status !== "Completed").forEach(myFunction);
  })
  .catch((error) => console.log(error));

