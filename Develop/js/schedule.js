/* ----------------------------- page selectors ----------------------------- */
const currentDayText = $('#currentDay');
// TextAreaSelectors
const textAreas = document.querySelectorAll(`[name="event"]`);
// SaveBtns
const saveBtns = document.querySelectorAll('.saveBtn');

/* --------------------------- display current day -------------------------- */
// Grab current date and format it
const currentDayJS = dayjs().format('dddd, MMMM, DD');
// Update the currentDayText with the currentDayJS
currentDayText.text(currentDayJS);

/* -------------------- update styling of event text ares ------------------- */
function eventColorize() {
    // getting the currentHour
    const currentHour = parseInt(dayjs().format('HH'));
    // Style the event text areas depending on the currentHour
    textAreas.forEach((txtArea) => {
        // get the current the selected data-hour attribute
        const dataHour = parseInt(txtArea.getAttribute('data-hour'));

        if (currentHour > dataHour) {
            txtArea.classList.remove('present');
            txtArea.classList.remove('future');
            txtArea.classList.add('past');
        } else if (currentHour === dataHour) {
            txtArea.classList.remove('past');
            txtArea.classList.remove('future');
            txtArea.classList.add('present');
        } else {
            txtArea.classList.remove('present');
            txtArea.classList.remove('past');
            txtArea.classList.add('future');
        }
    });
}

const eventIntervalState = setInterval(eventColorize, 1000);

/* ------------------------- save the current event ------------------------- */

saveBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e.currentTarget);
    });
});

// Save the event to the local storage for that day
