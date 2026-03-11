// Backend URL (FastAPI)
const Base_URL = "http://127.0.0.1:8000";

// Get contact form
const contactForm = document.getElementById("contact_form");

// Check if form exists
if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[name="user_name"]').value;
        const email = contactForm.querySelector('input[name="user_email"]').value;
        const phone=contactForm.querySelector('input[name="user_phone"]').value;
        const city=contactForm.querySelector('input[name="user_city"]').value;
        const subject = contactForm.querySelector('textarea[name="subject"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        // Create request object
        const dataObject = {
            full_name: name,
            email: email,
            phone_num:phone,
            city:city,
            subject: subject,
            message_content: message
        };

        try {

            // Send POST request to FastAPI
            const response = await fetch(`${Base_URL}/contact-messages/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataObject)
            });

            // Check response
            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            // Convert response to JSON
            const responseData = await response.json();
            console.log("Message sent:", responseData);

            // Success alert
            alert("Message sent successfully!");

            // Reset form
            contactForm.reset();

        } catch (error) {

            console.error("Error:", error);
            alert("Error sending message: " + error.message);

        }

    });

}