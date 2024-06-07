document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container");
    const legendItems = document.querySelectorAll(".legend-item");
    const actionSelect = document.getElementById("action-select");
    const positionSelect = document.getElementById("position-select");

    const hands = [
        ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s"],
        ["AKo", "KK", "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s"],
        ["AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s"],
        ["AJo", "KJo", "QJo", "JJ", "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s"],
        ["ATo", "KTo", "QTo", "JTo", "TT", "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s"],
        ["A9o", "K9o", "Q9o", "J9o", "T9o", "99", "98s", "97s", "96s", "95s", "94s", "93s", "92s"],
        ["A8o", "K8o", "Q8o", "J8o", "T8o", "98o", "88", "87s", "86s", "85s", "84s", "83s", "82s"],
        ["A7o", "K7o", "Q7o", "J7o", "T7o", "97o", "87o", "77", "76s", "75s", "74s", "73s", "72s"],
        ["A6o", "K6o", "Q6o", "J6o", "T6o", "96o", "86o", "76o", "66", "65s", "64s", "63s", "62s"],
        ["A5o", "K5o", "Q5o", "J5o", "T5o", "95o", "85o", "75o", "65o", "55", "54s", "53s", "52s"],
        ["A4o", "K4o", "Q4o", "J4o", "T4o", "94o", "84o", "74o", "64o", "54o", "44", "43s", "42s"],
        ["A3o", "K3o", "Q3o", "J3o", "T3o", "93o", "83o", "73o", "63o", "53o", "43o", "33", "32s"],
        ["A2o", "K2o", "Q2o", "J2o", "T2o", "92o", "82o", "72o", "62o", "52o", "42o", "32o", "22"]
    ];

    const colors = {
        "AA": "utg", "AKs": "utg", "AQs": "utg", "AJs": "utg", "ATs": "utg", "A9s": "utg", "A8s": "utg1", "A7s": "utg1", "A6s": "utg1", "A5s": "utg", "A4s": "utg1", "A3s": "utg1", "A2s": "utg1",
        "AKo": "utg", "KK": "utg", "KQs": "utg", "KJs": "utg", "KTs": "utg", "K9s": "utg1", "K8s": "hj", "K7s": "co", "K6s": "btn", "K5s": "btn", "K4s": "btn", "K3s": "btn", "K2s": "btn",
        "AQo": "utg", "KQo": "mp", "QQ": "utg", "QJs": "utg", "QTs": "utg", "Q9s": "utg1", "Q8s": "co", "Q7s": "btn", "Q6s": "btn", "Q5s": "btn", "Q4s": "btn", "Q3s": "btn", "Q2s": "btn",
        "AJo": "mp", "KJo": "mp1", "QJo": "hj", "JJ": "utg", "JTs": "utg", "J9s": "utg1", "J8s": "co", "J7s": "btn", "J6s": "btn", "J5s": "neu", "J4s": "neu", "J3s": "neu", "J2s": "neu",
        "ATo": "mp1", "KTo": "co", "QTo": "co", "JTo": "co", "TT": "utg", "T9s": "utg", "T8s": "hj", "T7s": "btn", "T6s": "btn", "T5s": "neu", "T4s": "neu", "T3s": "neu", "T2s": "neu",
        "A9o": "co", "K9o": "btn", "Q9o": "btn", "J9o": "btn", "T9o": "btn", "99": "utg", "98s": "utg", "97s": "hj", "96s": "btn", "95s": "neu", "94s": "neu", "93s": "neu", "92s": "neu",
        "A8o": "btn", "K8o": "btn", "Q8o": "btn", "J8o": "btn", "T8o": "btn", "98o": "btn", "88": "utg", "87s": "mp", "86s": "co", "85s": "btn", "84s": "neu", "83s": "neu", "82s": "neu",
        "A7o": "btn", "K7o": "btn", "Q7o": "neu", "J7o": "neu", "T7o": "neu", "97o": "btn", "87o": "btn", "77": "utg", "76s": "mp", "75s": "co", "74s": "btn", "73s": "neu", "72s": "neu",
        "A6o": "btn", "K6o": "neu", "Q6o": "neu", "J6o": "neu", "T6o": "neu", "96o": "neu", "86o": "neu", "76o": "btn", "66": "utg", "65s": "mp1", "64s": "co", "63s": "neu", "62s": "neu",
        "A5o": "btn", "K5o": "neu", "Q5o": "neu", "J5o": "neu", "T5o": "neu", "95o": "neu", "85o": "neu", "75o": "neu", "65o": "neu", "55": "mp", "54s": "hj", "53s": "btn", "52s": "neu",
        "A4o": "btn", "K4o": "neu", "Q4o": "neu", "J4o": "neu", "T4o": "neu", "94o": "neu", "84o": "neu", "74o": "neu", "64o": "neu", "54o": "neu", "44": "mp1", "43s": "co", "42s": "neu",
        "A3o": "btn", "K3o": "neu", "Q3o": "neu", "J3o": "neu", "T3o": "neu", "93o": "neu", "83o": "neu", "73o": "neu", "63o": "neu", "53o": "neu", "43o": "neu", "33": "hj", "32s": "btn",
        "A2o": "btn", "K2o": "neu", "Q2o": "neu", "J2o": "neu", "T2o": "neu", "92o": "neu", "82o": "neu", "72o": "neu", "62o": "neu", "52o": "neu", "42o": "neu", "32o": "neu", "22": "hj"
    };

    function displayGrid() {
        gridContainer.innerHTML = ""; // Clear the grid container

        hands.forEach(row => {
            row.forEach(hand => {
                const div = document.createElement("div");
                div.classList.add("grid-item", colors[hand] || "");
                div.textContent = hand;
                gridContainer.appendChild(div);
            });
        });

        const rangeOrder = ["utg", "utg1", "mp", "mp1", "hj", "co", "btn"];

        legendItems.forEach(item => {
            item.addEventListener("mouseover", () => {
                const range = item.getAttribute("data-range");
                const index = rangeOrder.indexOf(range);
                const rangesToShow = rangeOrder.slice(0, index + 1);
                document.querySelectorAll(".grid-item").forEach(cell => {
                    if (rangesToShow.some(r => cell.classList.contains(r))) {
                        cell.classList.remove("dimmed");
                    } else {
                        cell.classList.add("dimmed");
                    }
                });
            });

            item.addEventListener("mouseout", () => {
                document.querySelectorAll(".grid-item").forEach(cell => {
                    cell.classList.remove("dimmed");
                });
            });
        });
    }

    actionSelect.addEventListener("change", (event) => {
        const selectedAction = event.target.value;
        if (selectedAction === "rfi") {
            positionSelect.disabled = false;
        } else {
            positionSelect.disabled = true;
            gridContainer.innerHTML = ""; // Clear the grid container if action is not RFI
        }
    });

    positionSelect.addEventListener("change", (event) => {
        const selectedPosition = event.target.value;
        if (selectedPosition !== "default") {
            displayGrid();
            document.querySelectorAll(".grid-item").forEach(cell => {
                if (!cell.classList.contains(selectedPosition)) {
                    cell.classList.add("dimmed");
                }
            });
        } else {
            gridContainer.innerHTML = ""; // Clear the grid container if position is not selected
        }
    });

    displayGrid();
});
