const registerForm = document.getElementById("registerForm");
const error = document.getElementById("error");

registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    error.textContent = "";

    if (!username || !email || !password) {

        error.textContent = "Please fill all fields.";

        return;

    }

    try {

        const response = await fetch(`${BASE_URL}/register`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                username,
                email,
                password

            })

        });

        const data = await response.json();

        if (!data.success) {

            error.textContent = data.message;

            return;

        }

        alert("Registration Successful");

        window.location.href = "./login.html";

    }

    catch (err) {

        error.textContent = "Server Error";

    }

});