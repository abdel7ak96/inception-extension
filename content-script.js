createAndInsertButton();

function createAndInsertButton() {
    let createdButton = document.createElement('a');
    createdButton.className = 'btn ml-2 d-none d-md-block';
    createdButton.innerText = 'First commit';
    createdButton.onclick = generateLink;

    let elementToInsertIn = document.querySelector('div .file-navigation');
    let elementToInsertBefore = document.querySelector('.file-navigation a.btn.ml-2');

    if(elementToInsertIn && elementToInsertBefore) elementToInsertIn.insertBefore(createdButton, elementToInsertBefore);
}

function generateLink() {
    (b => fetch('https://api.github.com/repos/' + b[1] + '/commits?sha=' + (b[2] || '')).then(c => Promise.all([c.headers.get('link'), c.json()])).then(c => {
        if (c[0]) {
            var d = c[0].split(',')[1].split(';')[0].slice(2, -1);
            return fetch(d).then(e => e.json())
        }
        return c[1]
    }).then(c => c.pop().html_url).then(c => window.location = c))(window.location.pathname.match(/\/([^\/]+\/[^\/]+)(?:\/tree\/([^\/]+))?/));
}