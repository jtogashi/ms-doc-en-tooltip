tooltip();

function tooltip() {
    const set = getElementsSet(document.body, location.href);
    const urlEn = location.href.replace(/\/[a-z]{2}-[a-z]{2}\//i, '/en-us/');

    const domEn = fetch(urlEn)
        .then(response => response.text())
        .then(text => new DOMParser().parseFromString(text, 'text/html'))
        .then((domEn) => {
            const setEn = getElementsSet(domEn.body, urlEn);

            for (i = 0; i < set.p.length && i < setEn.p.length; i++) {
                set.p[i].title = setEn.p[i].textContent;
            }

            for (i = 0; i < set.li.length && i < setEn.li.length; i++) {
                set.li[i].title = setEn.li[i].textContent;
            }

            for (i = 0; i < set.td.length && i < setEn.td.length; i++) {
                set.td[i].title = setEn.td[i].textContent;
            }

            for (i = 0; i < set.h1.length && i < setEn.h1.length; i++) {
                set.h1[i].title = setEn.h1[i].textContent;
            }

            for (i = 0; i < set.h2.length && i < setEn.h2.length; i++) {
                set.h2[i].title = setEn.h2[i].textContent;
            }

            for (i = 0; i < set.h3.length && i < setEn.h3.length; i++) {
                set.h3[i].title = setEn.h3[i].textContent;
            }

            for (i = 0; i < set.h4.length && i < setEn.h4.length; i++) {
                set.h4[i].title = setEn.h4[i].textContent;
            }
        });
}

function getElementsSet(body, href) {
    const main = body.getElementsByTagName('main')[0];
    const set = {
        p: Array.from(main.getElementsByTagName('p')).reverse(),
        li: Array.from(main.getElementsByTagName('li')).reverse(),
        td: Array.from(main.getElementsByTagName('td')).reverse(),
        h1: Array.from(main.getElementsByTagName('h1')).reverse(),
        h2: Array.from(main.getElementsByTagName('h2')).reverse(),
        h3: Array.from(main.getElementsByTagName('h3')).reverse(),
        h4: Array.from(main.getElementsByTagName('h4')).reverse(),
    };
    console.log(`Tags count found in ${href}:`);
    console.log(`p: ${set.p.length}`);
    console.log(`li: ${set.li.length}`);
    console.log(`td: ${set.td.length}`);
    console.log(`h1: ${set.h1.length}`);
    console.log(`h2: ${set.h2.length}`);
    console.log(`h3: ${set.h3.length}`);
    console.log(`h4: ${set.h4.length}`);
    return set;
}
