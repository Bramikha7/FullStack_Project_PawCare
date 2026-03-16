const Base_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:") ? "http://127.0.0.1:8000" : "";

async function fetchDrives() {
    try {
        const response = await fetch(`${Base_URL}/vaccination-drives`);
        if (!response.ok) throw new Error("Failed to fetch drives");

        const drives = await response.json();
        const tbody = document.querySelector(".drivetable tbody");

        if (tbody) {
            tbody.innerHTML = "";

            drives.forEach(drive => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${drive.title || 'N/A'}</td>
                    <td>${drive.drive_date || 'N/A'}</td>
                    <td>${drive.location || 'N/A'}</td>
                    <td>${drive.drive_time || 'N/A'}</td>
                    <td><span class="status upcoming">${drive.status || 'Upcoming'}</span></td>
                `;
                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error("Error fetching drives:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchDrives);
