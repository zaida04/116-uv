export function formatDateTime(dateObj: Date) {
    const month = `0${dateObj.getMonth() + 1}`.slice(-2); // months are 0-based in JS
    const day = `0${dateObj.getDate()}`.slice(-2);
    const year = dateObj.getFullYear();

    let hours = dateObj.getHours();
    const minutes = `0${dateObj.getMinutes()}`.slice(-2);

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}