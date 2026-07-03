document.addEventListener("DOMContentLoaded", () => {

    // 🔥 SAFE READ (prevents null crash + parsing issues)
    const username = JSON.parse(localStorage.getItem("username") || "null");

    console.log("DASHBOARD USER:", username);

    // ❌ ONLY redirect if truly missing
    if (username === null) {
        window.location.replace("index.html");
        return;
    }

    document.getElementById("welcome").innerText = `Welcome, ${username}`;

    const boardsContainer = document.getElementById("boardsContainer");
    const newBoardBtn = document.getElementById("newBoardBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    logoutBtn.onclick = () => {
        localStorage.removeItem("username");
        window.location.replace("index.html");
    };

    function renderBoards() {

        boardsContainer.innerHTML = "";

        const boards = getBoards();

        boards.forEach((board, index) => {

            const card = document.createElement("div");
            card.className = "board-card";

            card.innerHTML = `
                <h2>${board.name}</h2>
                <div class="board-buttons">
                    <button class="openBtn">Open</button>
                    <button class="deleteBtn">Delete</button>
                </div>
            `;

            card.querySelector(".openBtn").onclick = () => {
                localStorage.setItem("currentBoard", index);
                window.location.href = "board.html";
            };

            card.querySelector(".deleteBtn").onclick = () => {
                const boards = getBoards();
                boards.splice(index, 1);
                saveBoards(boards);
                renderBoards();
            };

            boardsContainer.appendChild(card);
        });
    }

    newBoardBtn.onclick = () => {

        const name = prompt("Board name");
        if (!name) return;

        const boards = getBoards();

        boards.push({
            name,
            columns: {
                todo: [],
                doing: [],
                review: [],
                complete: []
            }
        });

        saveBoards(boards);
        renderBoards();
    };

    renderBoards();
});