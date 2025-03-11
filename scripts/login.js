document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageElement = document.getElementById("message");

    messageElement.innerText = ""; // Clear previous messages

    if (!email || !password) {
        messageElement.innerText = "Please enter both email and password.";
        return;
    }

    try {
        const response = await fetch("https://shipngo-g9cpbhdvfhgca3cb.northcentralus-01.azurewebsites.net/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token); // Store JWT token
            window.location.href = "/dashboard.html"; // Redirect after login
        } else {
            messageElement.innerText = data.message || "Login failed. Please try again.";
        }
    } catch (error) {
        messageElement.innerText = "Network error. Please try again later.";
        console.error("Login error:", error);
    }
});
                                
