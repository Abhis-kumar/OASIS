const loginForm = document.getElementById("loginForm");
const error = document.getElementById("error");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value.trim();

    error.textContent = "";

    // Validation
    if (!login || !password) {
        error.textContent = "Please fill all fields.";
        return;
    }

    try {

        const response = await fetch(`${BASE_URL}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                login,
                password
            })

        });

        const data = await response.json();

        if (!data.success) {

            error.textContent = data.message;
            return;

        }

        // Save JWT Token
        localStorage.setItem("token", data.token);

        // Save User
        localStorage.setItem("user", JSON.stringify(data.user));

        window.location.href = "./dashboard.html";

    } catch (err) {

        error.textContent = "Server Error";

        console.log(err);

    }

});
