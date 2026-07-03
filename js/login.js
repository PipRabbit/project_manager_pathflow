const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    // 🔥 IMPORTANT: force write BEFORE redirect
    localStorage.setItem("username", JSON.stringify(username));

    console.log("LOGIN SET:", localStorage.getItem("username"));

    window.location.href = "dashboard.html";
});