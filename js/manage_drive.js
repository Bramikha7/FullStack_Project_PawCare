const Base_URL = "http://127.0.0.1:8000";


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
            window.location.href = "admin.html#eventssection"; 
        } catch (error) {
            console.error("Error:", error);
            alert("Error adding drive: " + error.message);
        }
    });
}


const editForm = document.getElementById("editForm");
if (editForm) {
    
    const urlParams = new URLSearchParams(window.location.search);
    const driveId = urlParams.get('id');

    if (driveId) {
        
        async function fetchExistingDrive() {
            try {
                const response = await fetch(`${Base_URL}/vaccination-drives/${driveId}`);
                if (!response.ok) throw new Error("Failed to fetch drive data");
                const drive = await response.json();
                
                document.getElementById("title").value = drive.title;
                document.getElementById("location").value = drive.location;
                document.getElementById("date").value = drive.drive_date;
                document.getElementById("time").value = drive.drive_time; 
            } catch (error) {
                console.error("Error:", error);
                alert("Error loading drive: " + error.message);
            }
        }
        fetchExistingDrive();
    }

    editForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!driveId) {
            alert("No drive ID found in URL.");
            return;
        }

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
            window.location.href = "admin.html#eventssection";
        } catch (error) {
            console.error("Error:", error);
            alert("Error updating drive: " + error.message);
        }
    });
}
