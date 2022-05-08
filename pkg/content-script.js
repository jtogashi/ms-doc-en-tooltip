chrome.storage.sync.get({
    copyFormat: "- {{h1}}\n{{url}}",
    copyFormatAnchor: "- {{h1}} - {{anchor}}\n{{url}}",
    langDefault: 'ja-jp'
}, (options) => {
    if (!location.pathname.toLowerCase().startsWith(`/${options.langDefault}/`)) {
        enableLanguageSwitcher(options.langDefault);
    } else {
        updateDomWithEnglishVersion(
            options.copyFormat,
            options.copyFormatAnchor,
            options.langDefault
        );
    }
});


function updateDomWithEnglishVersion(copyFormat, copyFormatAnchor, langDefault) {
    const urlEn = location.href.replace(/\/[a-z]{2}-[a-z]{2}\//i, '/en-us/');

    const domEn = fetch(urlEn)
        .then(response => response.text())
        .then(text => new DOMParser().parseFromString(text, 'text/html'))
        .then((domEn) => {
            enableCopyButtons(copyFormat, copyFormatAnchor);
            enableLanguageToggler(domEn, langDefault);
        });
}

function enableCopyButtons(copyFormat, copyFormatAnchor) {
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
                const formatted = copyFormat
                    .replace('{{title}}', location.title)
                    .replace('{{h1}}', h1.textContent)
                    .replace('{{url}}', location.href);

                navigator.clipboard.writeText(formatted);
                toastCopyUrl();
                console.log(`Copied to clipboard!`);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    );

    Array.from(document.getElementsByTagName('h2')).forEach((element) => {
        insertCopyButtons(element, copyFormatAnchor);
    });
    Array.from(document.getElementsByTagName('h3')).forEach((element) => {
        insertCopyButtons(element, copyFormatAnchor);
    });
    Array.from(document.getElementsByTagName('h4')).forEach((element) => {
        insertCopyButtons(element, copyFormatAnchor);
    });
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

function insertCopyButtons(element, copyFormatAnchor) {
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
                const formatted = copyFormatAnchor
                    .replace('{{title}}', location.title)
                    .replace('{{h1}}', h1.textContent)
                    .replace('{{anchor}}', element.textContent)
                    .replace('{{url}}', `${location.href}#${element.id}`);

                navigator.clipboard.writeText(formatted);
                toastCopyUrl();
                console.log(`Copied to clipboard!`);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        }
    );
}

function enableLanguageToggler(domEn) {
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
        '<button id="ms-doc-lang-toggler" class="ms-doc-lang-button"><span id="ms-doc-lang-button-icon" /></button>'
    );

    document.getElementById('ms-doc-lang-toggler').addEventListener(
        'click',
        () => {
            langOrig.hidden = !langOrig.hidden;
            langEn.hidden = !langEn.hidden;
        }
    );
}

function enableLanguageSwitcher(langDefault) {
    document.body.insertAdjacentHTML(
        'beforeend',
        '<button id="ms-doc-lang-switcher" class="ms-doc-lang-button"><span id="ms-doc-lang-button-icon" /></button>'
    );

    document.getElementById('ms-doc-lang-switcher').addEventListener(
        'click',
        () => {
            const pathLangDefalut = location.pathname.replace(/\/[a-z]{2}-[a-z]{2}\//i, `/${langDefault}/`);
            location.href = pathLangDefalut;
        }
    );

}
