function addName() {
    const nameInput = document.getElementById('nameInput');
    const nameList = document.getElementById('nameList');

    const name = nameInput.value;
    if (name) {
        fetch('http://localhost:5000/names', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name}),
        })
        .then(response => response.json())
        .then(data => {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            nameList.appendChild(listItem);
            document.getElementById('counter').textContent = data.counter;
            nameInput.value = '';
        });
    }
}

function updateNames() {
    fetch('http://localhost:5000/names')
    .then(response => response.json())
    .then(data => {
        const nameList = document.getElementById('nameList');
        nameList.innerHTML = '';
        for (const name of data.names) {
            const listItem = document.createElement('li');
            listItem.textContent = name;
            nameList.appendChild(listItem);
        }
        document.getElementById('counter').textContent = data.counter;
    });
}

updateNames();
