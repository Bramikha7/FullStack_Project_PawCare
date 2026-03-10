const Base_URL = "http://127.0.0.1:8000";

async function fetchVolunteers() {
    const voluntContainer = document.getElementById("one");
    if (!voluntContainer) return;

    try {
        const response = await fetch(`${Base_URL}/volunteers/`);
        if (!response.ok) throw new Error("Failed to fetch volunteers");
        
        const data = await response.json();
        voluntContainer.innerHTML = ""; 

        if (data.length === 0) {
            voluntContainer.innerHTML = "<p>No volunteers registered yet.</p>";
            return;
        }

        data.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <p><b>Name:</b> ${item.name}</p>
                <p><b>Email:</b> ${item.email}</p>
                <p><b>Phone:</b> ${item.phone_number || 'N/A'}</p>
                <p><b>Joined:</b> ${item.applied_at ? new Date(item.applied_at).toLocaleDateString() : 'N/A'}</p>
            `;
            voluntContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        voluntContainer.innerHTML = `<p style="color: red;">Error loading volunteers: ${error.message}</p>`;
    }
}

document.addEventListener("DOMContentLoaded", fetchVolunteers);