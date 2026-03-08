const Base_URL = "http://127.0.0.1:8000";

// Handle Add Drive
const driveForm = document.getElementById("driveForm");
if (driveForm) {
    driveForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const location = document.getElementById("location").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const dataObject = {
            title: title,
            location: location,
            drive_date: date,
            drive_time_raw: time
        };

        try {
            const response = await fetch(`${Base_URL}/vaccination-drives/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObject),
            });

            if (!response.ok) throw new Error("Failed to add drive");

            alert("Vaccination drive added successfully!");
            window.location.href = "../pages/vaccidrive.html";
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding drive: " + error.message);
        }
    });
}

// Handle Edit Drive
const editForm = document.getElementById("editForm");
if (editForm) {
    // Note: In a real app, you'd fetch existing data first. 
    // For this simple version, we assume the user knows the ID or it's passed somehow.
    // Here we'll just handle the submission.
    editForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // For simplicity, we might needs a way to get the ID. 
        // Let's assume we use a prompt or a hidden field if it existed.
        const driveId = prompt("Enter the ID of the drive you want to edit:");
        if (!driveId) return;

        const title = document.getElementById("title").value;
        const location = document.getElementById("location").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const dataObject = {
            title: title,
            location: location,
            drive_date: date,
            drive_time_raw: time
        };

        try {
            const response = await fetch(`${Base_URL}/vaccination-drives/${driveId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObject),
            });

            if (!response.ok) throw new Error("Failed to update drive");

            alert("Vaccination drive updated successfully!");
            window.location.href = "../pages/vaccidrive.html";
        } catch (error) {
            console.error("Error:", error);
            alert("Error updating drive: " + error.message);
        }
    });
}
