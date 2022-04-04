updateDomWithEnglishVersion();

function updateDomWithEnglishVersion() {
    const urlEn = location.href.replace(/\/[a-z]{2}-[a-z]{2}\//i, '/en-us/');

    const domEn = fetch(urlEn)
        .then(response => response.text())
        .then(text => new DOMParser().parseFromString(text, 'text/html'))
        .then((domEn) => {
            enableCopyButtons();
            enableLanguageSwitch(domEn);
        });
}

function enableCopyButtons() {
    const toastId = "ms-doc-toast-url-copied";
    document.body.insertAdjacentHTML(
        'afterbegin',
        `<p id="${toastId}" class="${toastId}">URL copied!</p>`
    );
    document.getElementById(toastId).hidden = true;

    document.body.insertAdjacentHTML(
        'beforeend',
        '<button id="ms-doc-url-copy" class="ms-doc-url-copy"><span id="button-copy-fixed-icon" /></button>'
    );

    const h1 = document.getElementsByTagName('h1')[0];
    document.getElementById('ms-doc-url-copy').addEventListener(
        'click',
        () => {
            try {
                navigator.clipboard.writeText(`- ${h1.textContent}\n${location.href}`);
                toastCopyUrl();
                console.log(`Copied to clipboard!`);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    );

    Array.from(document.getElementsByTagName('h2')).forEach(insertCopyButtons);
    Array.from(document.getElementsByTagName('h3')).forEach(insertCopyButtons);
    Array.from(document.getElementsByTagName('h4')).forEach(insertCopyButtons);
}

function toastCopyUrl() {
    const toast = document.getElementById("ms-doc-toast-url-copied");
    toast.hidden = false;
    setTimeout(
        () => {
            toast.hidden = true;
        },
        3000
    );
}

function insertCopyButtons(element) {
    const buttonId = `ms-doc-url-copy-${element.tagName}-${element.id}`;
    element.insertAdjacentHTML(
        'beforeend',
        `<button id="${buttonId}" class="button-copy"><span id="button-copy-icon" /></button>`
    );
    document.getElementById(buttonId).addEventListener(
        'click',
        () => {
            const h1 = document.getElementsByTagName('h1')[0];
            try {
                navigator.clipboard.writeText(`- ${h1.textContent} - ${element.textContent}\n${location.href}#${element.id}`);
                toastCopyUrl();
                console.log(`Copied to clipboard!`);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    );
}

function enableLanguageSwitch(domEn) {
    const bodyElementsOrig = Array.from(document.body.children);

    document.body.insertAdjacentHTML(
        'beforeend',
        '<div id="ms-doc-lang-orig"></div>'
    );

    document.body.insertAdjacentHTML(
        'beforeend',
        '<div id="ms-doc-lang-en"></div>'
    );

    const langOrig = document.getElementById('ms-doc-lang-orig');
    bodyElementsOrig.forEach((element) => {
        langOrig.appendChild(element);
    });

    const bodyElementsEn = Array.from(domEn.body.children);

    const langEn = document.getElementById('ms-doc-lang-en');
    langEn.hidden = true;
    bodyElementsEn.forEach((element) => {
        langEn.appendChild(element);
    });

    document.body.insertAdjacentHTML(
        'beforeend',
        '<button id="ms-doc-lang-switcher" class="ms-doc-lang-switcher"><span id="ms-doc-lang-switcher-icon" /></button>'
    );

    document.getElementById('ms-doc-lang-switcher').addEventListener(
        'click',
        () => {
            langOrig.hidden = !langOrig.hidden;
            langEn.hidden = !langEn.hidden;
        }
    );
}
