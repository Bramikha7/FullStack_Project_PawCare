const Base_URL =  "http://127.0.0.1:8000";

async function updateCounts() {
    try {
        const voluntRes = await fetch(`${Base_URL}/volunteers/count`);
        const ngoRes = await fetch(`${Base_URL}/ngo-partners/count`);

        if (voluntRes.ok && ngoRes.ok) {
            const voluntData = await voluntRes.json();
            const ngoData = await ngoRes.json();

            const voluntCountEl = document.getElementById("voluntCount");
            const ngoCountEl = document.getElementById("ngoCount");

            if (voluntCountEl) voluntCountEl.innerText = voluntData.total_volunteers;
            if (ngoCountEl) ngoCountEl.innerText = ngoData.total_ngo;
        }
    } catch (error) {
        console.error("Error fetching counts:", error);
    }
}

document.addEventListener("DOMContentLoaded", updateCounts);
