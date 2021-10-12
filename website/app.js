/* Global Variables */

// Create a new date instance dynamically with JS
let day = new Date();
let newDate = (day.getMonth() + 1) + '/' + day.getDate() + '/' + day.getFullYear();

const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='
const apiKey = '&appid=2a2ab3d4ac5ce8a6675adef8bf56a7c5&units=imperial';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newZip);
    getWeather(baseURL, newZip, apiKey).then((data) => {
        postData('/alldata', { x: newDate, y: data.list[0].main.temp, z: feelings });
    }).then(() => {
        updateUI();
    });

};



const getWeather = async (baseURL, zip, key) => {

    const res = await fetch(baseURL + zip + key)
    try {

        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = `Date:${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature:${allData.temp}`;
        document.getElementById('content').innerHTML = `My Feeling: ${allData.content}`;

    } catch (error) {
        console.log("error", error);
    }
}