document.addEventListener("DOMContentLoaded", () => {

    const backBtn = document.getElementById("backBtn");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "dashboard.html";
        });
    }

    const boards = getBoards();
    const currentBoardIndex = localStorage.getItem("currentBoard");

    const board = boards[currentBoardIndex];

    if (!board) {
        window.location.href = "dashboard.html";
        return;
    }

    document.getElementById("boardTitle").innerText = board.name;

    const searchInput = document.getElementById("searchInput");

    document.getElementById("addTaskBtn").onclick = () => {

        const title = prompt("Task title");
        if (!title) return;

        const description = prompt("Description");
        const dueDate = prompt("Due date");
        const priority = prompt("Priority (High, Medium, Low)");

        board.columns.todo.push({
            title,
            description,
            dueDate,
            priority
        });

        saveBoards(boards);
        renderBoard();
    };

    function badge(priority) {
        return `priority-${priority?.toLowerCase() || "low"}`;
    }

    function renderBoard() {

        ["todo", "doing", "review", "complete"].forEach(col => {

            const container = document.getElementById(col);
            container.innerHTML = "";

            document.getElementById(col + "Count").innerText =
                board.columns[col].length;

            board.columns[col]
                .filter(task => {
                    if (!searchInput.value) return true;
                    return task.title.toLowerCase()
                        .includes(searchInput.value.toLowerCase());
                })
                .forEach((task, index) => {

                    const card = document.createElement("div");
                    card.className = "task";
                    card.draggable = true;

                    card.dataset.column = col;
                    card.dataset.index = index;

                    card.innerHTML = `
                        <span class="${badge(task.priority)}">${task.priority}</span>
                        <h3>${task.title}</h3>
                        <p>${task.description}</p>
                        <small>${task.dueDate}</small>
                        <div class="task-buttons">
                            <button class="delete">Delete</button>
                        </div>
                    `;

                    card.querySelector(".delete").onclick = () => {
                        board.columns[col].splice(index, 1);
                        saveBoards(boards);
                        renderBoard();
                    };

                    container.appendChild(card);
                });
        });
    }

    searchInput.addEventListener("input", renderBoard);

    renderBoard();
});