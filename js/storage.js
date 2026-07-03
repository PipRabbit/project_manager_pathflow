function getBoards() {
    return JSON.parse(localStorage.getItem("boards")) || [];
}

function saveBoards(boards) {
    localStorage.setItem("boards", JSON.stringify(boards));
}