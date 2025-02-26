let users;

let div = document.getElementById('table');

let loading2 = document.createElement('div');
loading2.setAttribute('class', 'loading-container');
loading2.setAttribute('id', 'loading');
let image = document.createElement('img');
image.setAttribute('src', 'loading.png');
image.setAttribute('alt', 'Loading');
image.setAttribute('class', 'loading-image');

loading2.appendChild(image);

// Assuming `div` is already defined somewhere
div.appendChild(loading2);

new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:10000/api/customers", true);
    request.timeout = 10000000;
    const time = Date.now();
    request.send();

    request.onload = () => {

        const time2 = Date.now();

        const timeToLoad = time2 - time;
        console.log(`The query took ${timeToLoad} milliseconds to execute`);
        users = JSON.parse(request.responseText);
        resolve(users);
        //console.log(JSON.parse(request.responseText));

        if (request.status === 200) resolve(request.responseText);
        else if (request.status === 400) reject(`Resource not found: ${request.status}`);
        else if (request.status >= 500) {
            let results = JSON.parse(request.responseText);

            reject({
                "timestamp": results.timestamp, "status": results.status, "error": results.error, "path": results.path
            });
        } else reject("real shit")

    }

    request.ontimeout = () => {

        const time2 = Date.now();

        const timeToLoad = time2 - time;
        console.warn(`The query took ${timeToLoad} milliseconds to fail`);
        reject("Timeout blyat");
    }

    request.onerror = () => {
        const time2 = Date.now();

        const timeToLoad = time2 - time;
        console.warn(`The query took ${timeToLoad} milliseconds to fail`);
        reject(`The query took ${timeToLoad} milliseconds to fail`);
    }
}).then(response => {
    createTable(response);
}).catch(error => document.write(error));



function createTable(users) {
    let table = document.createElement("table");
    let head = document.createElement("tr");

    let th1 = document.createElement("td");
    th1.textContent = "id";
    head.appendChild(th1);

    let th2 = document.createElement("td");
    th2.textContent = "name";
    head.appendChild(th2);

    let th3 = document.createElement("td");
    th3.textContent = "phone";
    head.appendChild(th3);

    let th4 = document.createElement("td");
    th4.textContent = "email";
    head.appendChild(th4);

    let br = document.createElement("br");
    head.appendChild(br);

    table.appendChild(head);


    for (user of users) {
        let row = document.createElement("tr");

        let th1 = document.createElement("td");
        th1.textContent = user.id;
        row.appendChild(th1);

        let th2 = document.createElement("td");
        th2.textContent = user.name;
        row.appendChild(th2);

        let th3 = document.createElement("td");
        th3.textContent = user.phone;
        row.appendChild(th3);

        let th4 = document.createElement("td");
        th4.textContent = user.email;
        row.appendChild(th4);


        table.appendChild(row);
    }

    div.removeChild(loading2)
    div.appendChild(table);


    //setTimeout(()=>div.removeChild(table), 1000);
}




