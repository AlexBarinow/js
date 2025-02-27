const navigationDIV = document.getElementById('navigation');
navigationDIV.style.backgroundColor = 'lightblue';

const line = document.getElementById('line');
line.style.backgroundColor = 'black';
line.style.height = "3px"
line.style.marginTop = "1px"
const contentDIV = document.getElementById('content');
const navigation = document.createElement('nav');

new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://93.127.125.13:10001/apiNC/storage`);
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            for (element of data) {
                let link = document.createElement('a');
                link.href = `http://93.127.125.13:10001/apiNC/html/${element}`
                link.textContent = element.replace(/\.html$/, "");
                link.style.marginLeft = "10px";
                navigation.appendChild(link);

            }

            const links = navigationDIV.getElementsByTagName('a');

            resolve(links);

            navigationDIV.appendChild(navigation);

        }
    }
}).then(function (links) {

    for (let link of links) {

        link.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();

            {
                //loading animation here
                contentDIV.innerHTML = '';

                const loadingAnimation = document.createElement('img');
                loadingAnimation.src = 'loading.png';  // Path to your loading image
                loadingAnimation.alt = 'Loading...';
                loadingAnimation.style.width = '50px';  // You can adjust the size as needed
                loadingAnimation.style.height = '50px'; // You can adjust the size as needed
                loadingAnimation.style.display = 'block'; // Ensures the image is a block element
                loadingAnimation.style.margin = 'auto'; // Center the image
                loadingAnimation.style.animation = 'spin 1s linear infinite'; // Add the rotation animation
                contentDIV.appendChild(loadingAnimation);

            }

            new Promise((resolve) => {

                let ixhr = new XMLHttpRequest();
                ixhr.responseType = 'document';
                url = `http://93.127.125.13:10001/apiNC/html/${link.textContent}.html`
                console.log(url);
                ixhr.open('GET', url);
                ixhr.setRequestHeader('Accept', 'text/html');
                ixhr.send();

                ixhr.onreadystatechange = () => {
                    if (ixhr.readyState === 4 && ixhr.status === 200) {
                        document.title = ixhr.responseXML.title;
                        contentDIV.innerHTML = '';
                        contentDIV.appendChild(ixhr.responseXML.body);
                    }
                }


            })


        })
    }
})



