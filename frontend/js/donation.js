const Base_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.protocol === "file:") ? "http://127.0.0.1:8000" : "";

const donationForm = document.getElementById("donationForm");
if (donationForm) {
    donationForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = donationForm.querySelector('input[name="donor_name"]').value;
        const email = donationForm.querySelector('input[name="donor_email"]').value;
        const amount = donationForm.querySelector('input[name="amount"]').value;
        const paymentMethod = donationForm.querySelector('input[name="payment"]:checked').value;
        
        const voluntId = localStorage.getItem("volunt_id") || 1;

        const dataObject = {
            donor_name: name,
            donor_email: email,
            amount: parseFloat(amount),
            payment_method: paymentMethod
        };

        try {
            const response = await fetch(`${Base_URL}/donations/volunteers/${voluntId}/donations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObject),
            });

            if (!response.ok) throw new Error("Failed to process donation");

            alert("Thank you for your donation interest!");
            donationForm.reset();
        } catch (error) {
            console.error("Error:", error);
            alert("Error processing donation: " + error.message);
        }
    });
}
