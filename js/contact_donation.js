const Base_URL = "http://127.0.0.1:8000";

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

