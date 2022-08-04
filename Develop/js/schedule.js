/* ----------------------------- page selectors ----------------------------- */
// Header selector
const mainHeader = $('.main-header');
// currentDay p selector
const currentDayText = $('#currentDay');
// TextAreaSelectors
const textAreas = document.querySelectorAll(`[name="event"]`);
// SaveBtns
const saveBtns = document.querySelectorAll('.saveBtn');

/* --------------------------- display current day -------------------------- */
// Grab current date and format it
const currentDayJS = dayjs().format('dddd, MMMM, DD, YYYY');
// Update the currentDayText with the currentDayJS
currentDayText.text(currentDayJS);

/* -------------------- update styling of event text areas ------------------ */
function eventColorize() {
    // getting the currentHour
    const currentHour = parseInt(dayjs().format('HH'));
    // Style the event text areas depending on the currentHour
    textAreas.forEach((txtArea) => {
        // get the current the selected data-hour attribute
        const dataHour = parseInt(txtArea.getAttribute('data-hour'));

        // style depending on dataHour relative to currentHour
        if (currentHour > dataHour) {
            txtArea.classList.remove('present');
            txtArea.classList.add('past');
        } else if (currentHour === dataHour) {
            txtArea.classList.remove('future');
            txtArea.classList.add('present');
        } else {
            txtArea.classList.remove('past');
            txtArea.classList.add('future');
        }
    });
}

eventColorize();

/* -------------- update the event text with local storage text ------------- */

function updateEventText() {
    let currentDayEvents = [];
    // Get events from local storage
    const allEvents = JSON.parse(localStorage.getItem('scheduledEvents')) || [];
    // Filter for current day
    if (allEvents.length !== 0) {
        currentDayEvents = allEvents.filter((el) => el.event_date === currentDayText.text());
    } else return;

    currentDayEvents.forEach((eventObj) => {
        // Select text area that matches saved event hour with the correct time block
        const textAreaToBeAdded = $(`[data-hour="${eventObj.event_hour}"]`);
        // Add the saved event description to the correct text area
        textAreaToBeAdded.text(eventObj.event_description);
    });
}

updateEventText();

/* ---------------------- add scheduled event function ---------------------- */

function addScheduledEvent(array, eventDescription, eventHour, eventDate) {
    // get the length of the array
    const { length } = array;
    // increment the id value in the object to be added
    const id = length + 1;
    // check if there's an event happening at the same date and time
    const found = array.some((el) => el.event_hour === eventHour && el.event_date === eventDate);
    // Add the event to the array if there's no event conflict
    if (!found) array.push({ id, event_description: eventDescription, event_hour: eventHour, event_date: eventDate });
    // Add the array of events to the local storage
    localStorage.setItem('scheduledEvents', JSON.stringify(array));
}

/* ------------------------- save the current event ------------------------- */

saveBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // get current event to be added text
        const currentEventText = e.currentTarget.previousElementSibling.value;
        // get current event to be added data hour
        const currentEventHour = e.currentTarget.previousElementSibling.getAttribute('data-hour');

        // get a reference to the events in the local storage
        const allSavedEvents = JSON.parse(localStorage.getItem('scheduledEvents')) || [];

        // if the event text is not empty add the scheduled event
        if (currentEventText !== '') {
            addScheduledEvent(allSavedEvents, currentEventText, currentEventHour, currentDayText.text());
        }
        mainHeader.append('<p class="remove-me">🗓️ Event Saved! 🙌<p>');
        function removeThePopUp() {
            const popUp = $('.remove-me');
            popUp.remove();
        }
        const funTimeout = setTimeout(removeThePopUp, 5000);
    });
});
