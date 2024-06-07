document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".grid-container-sb");
    const legendItems = document.querySelectorAll(".legend-item-sb");

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
        "AA": "limp", "AKs": "raise", "AQs": "raise", "AJs": "raise", "ATs": "raise", "A9s": "limp", "A8s": "limp", "A7s": "limp", "A6s": "limp", "A5s": "limp", "A4s": "limp", "A3s": "limp", "A2s": "limp",
        "AKo": "limp", "KK": "limp", "KQs": "raise", "KJs": "raise", "KTs": "limp", "K9s": "limp", "K8s": "limp", "K7s": "limp", "K6s": "limp", "K5s": "limp", "K4s": "limp", "K3s": "limp", "K2s": "limp",
        "AQo": "raise", "KQo": "raise", "QQ": "raise", "QJs": "raise", "QTs": "limp", "Q9s": "limp", "Q8s": "limp", "Q7s": "limp", "Q6s": "limp", "Q5s": "limp", "Q4s": "limp", "Q3s": "limp", "Q2s": "limp",
        "AJo": "raise", "KJo": "raise", "QJo": "limp", "JJ": "raise", "JTs": "limp", "J9s": "limp", "J8s": "limp", "J7s": "limp", "J6s": "limp", "J5s": "limp", "J4s": "raiseFold", "J3s": "raiseFold", "J2s": "raiseFold",
        "ATo": "raise", "KTo": "limp", "QTo": "limp", "JTo": "limp", "TT": "raise", "T9s": "limp", "T8s": "limp", "T7s": "limp", "T6s": "limp", "T5s": "raiseFold", "T4s": "raiseFold", "T3s": "neu", "T2s": "neu",
        "A9o": "limp", "K9o": "limp", "Q9o": "limp", "J9o": "limp", "T9o": "limp", "99": "raise", "98s": "limp", "97s": "limp", "96s": "limp", "95s": "raiseFold", "94s": "raiseFold", "93s": "neu", "92s": "neu",
        "A8o": "limp", "K8o": "limp", "Q8o": "limp", "J8o": "limp", "T8o": "limp", "98o": "limp", "88": "raise", "87s": "limp", "86s": "limp", "85s": "raiseFold", "84s": "raiseFold", "83s": "neu", "82s": "neu",
        "A7o": "limp", "K7o": "limp", "Q7o": "limp", "J7o": "limp", "T7o": "limp", "97o": "limp", "87o": "limp", "77": "limp", "76s": "limp", "75s": "limp", "74s": "raiseFold", "73s": "neu", "72s": "neu",
        "A6o": "limp", "K6o": "limp", "Q6o": "limp", "J6o": "raiseFold", "T6o": "raiseFold", "96o": "raiseFold", "86o": "raiseFold", "76o": "limp", "66": "limp", "65s": "limp", "64s": "limp", "63s": "raiseFold", "62s": "neu",
        "A5o": "limp", "K5o": "limp", "Q5o": "raiseFold", "J5o": "neu", "T5o": "neu", "95o": "neu", "85o": "neu", "75o": "neu", "65o": "limp", "55": "limp", "54s": "limp", "53s": "raiseFold", "52s": "neu",
        "A4o": "limp", "K4o": "limp", "Q4o": "raiseFold", "J4o": "neu", "T4o": "neu", "94o": "neu", "84o": "neu", "74o": "neu", "64o": "neu", "54o": "neu", "44": "limp", "43s": "raiseFold", "42s": "neu",
        "A3o": "limp", "K3o": "raiseFold", "Q3o": "raiseFold", "J3o": "neu", "T3o": "neu", "93o": "neu", "83o": "neu", "73o": "neu", "63o": "neu", "53o": "neu", "43o": "neu", "33": "limp", "32s": "limp",
        "A2o": "limp", "K2o": "raiseFold", "Q2o": "raiseFold", "J2o": "neu", "T2o": "neu", "92o": "neu", "82o": "neu", "72o": "neu", "62o": "neu", "52o": "neu", "42o": "neu", "32o": "neu", "22": "limp"
    };

    hands.forEach(row => {
        row.forEach(hand => {
            const div = document.createElement("div");
            div.classList.add("grid-item", colors[hand] || "");
            div.textContent = hand;
            gridContainer.appendChild(div);
        });
    });

    const rangeOrder = ["raise", "limp", "raiseFold"];

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
});
