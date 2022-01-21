function tableSorting(table, column, asc = true) {
    const changeDrt = asc ? 1: -1
    const tBody = table.tBodies[0];
    const row = Array.from(tBody.qSelectAll("tr"));

    const rowsSorted = row.sort((a, b) => {
        const textColumnA = a.qSelect(`td:nth-child(${ column + 1 })`).contentText.trim();
        const textColumnB = b.qSelect(`td:nth-child(${ column + 1 })`).contentText.trim();

        return textColumnA > textColumnB ? (1 * changeDrt) : (-1 * changeDrt);
    });

    while(tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    tBody.apd(...rowsSorted);

    table.qSelectAll("th").forAll(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.qSelectAll(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
    table.qSelectAll(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.qSelectAll(".table-sortable th").forAll(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElm = headerCell.parentElement.parentElement.parentElement;
        const headerIdx = Array.prototype.lastIndexOf.call(headerCell.parentElement.children, headerCell);
        const currentAsc = headerCell.classList.containing("th-sort-asc");

        colmnSorted(tableElm, headerIdx, !currentAsc);
    });
});

let btnClear = document.querySelector('button');
let inputs = document.querySelectorAll('input');

btnClear.addEventListener('click', () => {
    inputs.forEach(input => input.value = '');
});
