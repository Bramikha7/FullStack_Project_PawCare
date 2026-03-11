// Backend URL (FastAPI)
const Base_URL = "http://localhost:8000";


// ================= SIGNUP =================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;

        if (!role) {
            alert("Please select a role");
            return;
        }

        let dataObject = {};
        let endpoint = "";

        // Volunteer signup
        if (role === "volunteer") {

            dataObject = {
                name: name,
                email: email,
                phone_number: phone,
                password: password
            };

            endpoint = "/volunteers/";

        } 
        // NGO signup
        else if (role === "ngo") {

            const ngoName = document.getElementById("ngoName").value;
            const aboutNgo = document.getElementById("aboutNgo").value;
            const serviceArea = document.getElementById("serviceArea").value;
            const city = document.getElementById("city").value;

            dataObject = {
                ngo_name: ngoName,
                email: email,
                phone_number: phone,
                password: password,
                about_ngo: aboutNgo,
                service_area: serviceArea,
                city: city
            };

            endpoint = "/ngo-partners/";
        }

        try {

            const response = await fetch(`${Base_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataObject)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Signup failed");
            }

            const responseData = await response.json();
            console.log("Signup Success:", responseData);

            alert("Registration successful! Please Sign In.");

            window.location.href = "../pages/sign in.html";

        } catch (error) {
            console.error("Error:", error);
            alert("Error during registration: " + error.message);
        }
    });
}



// ================= SIGNIN =================
const signinForm = document.getElementById("signinForm");

if (signinForm) {

    signinForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("roleSelect").value;

        if (!role) {
            alert("Please select your role to login");
            return;
        }

        const dataObject = {
            email: email,
            password: password
        };

        const endpoint =
            role === "volunteer"
                ? "/volunteers/signin"
                : "/ngo-partners/signin";

        try {

            const response = await fetch(`${Base_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataObject)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Invalid email or password");
            }

            const responseData = await response.json();
            console.log("Login Success:", responseData);

            if (role === "volunteer") {

                localStorage.setItem("volunt_id", responseData.volunt_id);
                localStorage.setItem("userRole", "volunteer");

                window.location.href = "../pages/volunt_dashboard.html";

            } else {

                localStorage.setItem("ngo_id", responseData.ngo_id);
                localStorage.setItem("userRole", "ngo");

                window.location.href = "../pages/ngodashboard.html";
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Login failed: " + error.message);
        }

    });
}