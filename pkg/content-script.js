injectEn();

function injectEn() {
    const urlEn = location.href.replace(/\/[a-z]{2}-[a-z]{2}\//i, '/en-us/');

    const domEn = fetch(urlEn)
        .then(response => response.text())
        .then(text => new DOMParser().parseFromString(text, 'text/html'))
        .then((domEn) => {
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
                '<button id="ms-doc-lang-switcher" class="ms-doc-lang-switcher">switch</button>'
            );

            document.getElementById('ms-doc-lang-switcher').addEventListener(
                'click',
                () => {
                    langOrig.hidden = !langOrig.hidden;
                    langEn.hidden = !langEn.hidden;
                }
            );

            document.body.insertAdjacentHTML(
                'beforeend',
                '<button id="ms-doc-url-copy" class="ms-doc-url-copy">copy URL</button>'
            );

            document.getElementById('ms-doc-url-copy').addEventListener(
                'click',
                () => {
                    try {
                        navigator.clipboard.writeText(location.href);
                        console.log(`Copied to clipboard!`);
                    } catch (err) {
                        console.error('Failed to copy: ', err);
                    }
                }
            );
        });
}
