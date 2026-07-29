const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "./login.html";

}

const username = document.getElementById("username");
const email = document.getElementById("email");
const joined = document.getElementById("joined");

const logoutBtn = document.getElementById("logoutBtn");

async function loadUser() {

    try {

        const response = await fetch(`${BASE_URL}/me`, {

            headers: {

                Authorization: `Bearer ${token}`

            }

        });

        const data = await response.json();

        if (!data.success) {

            localStorage.clear();

            window.location.href = "./login.html";

            return;

        }

        username.textContent = data.user.username;

        email.textContent = data.user.email;

        joined.textContent = new Date(
            data.user.created_at
        ).toLocaleDateString();

    }

    catch (error) {

        console.log(error);

    }

}

loadUser();

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "./login.html";

});