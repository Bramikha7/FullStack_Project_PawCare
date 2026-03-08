const Base_URL = "http://127.0.0.1:8000";

// Handle Contact Form
const contactForm = document.getElementById("contact_form");
if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = contactForm.querySelector('input[name="user_name"]').value;
        const email = contactForm.querySelector('input[name="user_email"]').value;
        const subject = contactForm.querySelector('textarea[name="subject"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        const dataObject = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        try {
            const response = await fetch(`${Base_URL}/contact-messages/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataObject),
            });

            if (!response.ok) throw new Error("Failed to send message");

            alert("Message sent successfully!");
            contactForm.reset();
        } catch (error) {
            console.error("Error:", error);
            alert("Error sending message: " + error.message);
        }
    });
}

// Handle Donation Form
const donationForm = document.getElementById("donationForm");
if (donationForm) {
    donationForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = donationForm.querySelector('input[name="donor_name"]').value;
        const email = donationForm.querySelector('input[name="donor_email"]').value;
        const amount = donationForm.querySelector('input[name="amount"]').value;
        const paymentMethod = donationForm.querySelector('input[name="payment"]:checked').value;

        // Note: For donations, the backend expects a volunt_id.
        // We'll try to get it from localStorage, default to 1 if not found.
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
