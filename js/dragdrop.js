let dragged = null;

document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("task")) {
        dragged = e.target;
    }
});

document.addEventListener("dragover", (e) => {
    if (e.target.classList.contains("task-list")) {
        e.preventDefault();
    }
});

document.addEventListener("drop", (e) => {

    if (!e.target.classList.contains("task-list")) return;

    e.preventDefault();

    const fromCol = dragged.dataset.column;
    const fromIndex = dragged.dataset.index;

    const toCol = e.target.dataset.column;

    const boards = getBoards();
    const currentBoard = boards[localStorage.getItem("currentBoard")];

    const task = currentBoard.columns[fromCol][fromIndex];

    currentBoard.columns[fromCol].splice(fromIndex, 1);
    currentBoard.columns[toCol].push(task);

    saveBoards(boards);

    location.reload();
});