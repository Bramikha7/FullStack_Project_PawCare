
const Base_URL =  "http://127.0.0.1:8000";

const contactForm = document.getElementById("contact_form");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const nameEle = contactForm.querySelector('input[name="user_name"]');
        const emailEle = contactForm.querySelector('input[name="user_email"]');
        const phoneEle = contactForm.querySelector('input[name="user_phone"]');
        const cityEle = contactForm.querySelector('input[name="user_city"]');
        const subjectEle = contactForm.querySelector('textarea[name="subject"]');
        const messageEle = contactForm.querySelector('textarea[name="message"]');

        const dataObject = {
            full_name: nameEle ? nameEle.value : "",
            email: emailEle ? emailEle.value : "",
            phone_num: phoneEle ? phoneEle.value : null,
            city: cityEle ? cityEle.value : null,
            subject: subjectEle ? subjectEle.value : "",
            message_content: messageEle ? messageEle.value : ""
        };

        try {

            const response = await fetch(`${Base_URL}/contact-messages/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataObject)
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const responseData = await response.json();
            console.log("Message sent:", responseData);
            alert("Message sent successfully!");
            contactForm.reset();

        } catch (error) {

            console.error("Error:", error);
            alert("Error sending message: " + error.message);

        }

    });

}
