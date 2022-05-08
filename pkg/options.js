function saveOptions() {
    const copyFormat = document.getElementById('copy-format').value;
    const copyFormatAnchor = document.getElementById('copy-format-anchor').value;
    const langDefault = document.getElementById('lang-default').value;

    chrome.storage.sync.set({
        copyFormat: copyFormat,
        copyFormatAnchor: copyFormatAnchor,
        langDefault: langDefault
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
            status.textContent = '';
        }, 750);
    });
}

function restoreOptions() {
    chrome.storage.sync.get({
        copyFormat: "- {{h1}}\n{{url}}",
        copyFormatAnchor: "- {{h1}} - {{anchor}}\n{{url}}",
        langDefault: 'ja-jp'
    }, (items) => {
        document.getElementById('copy-format').value = items.copyFormat;
        document.getElementById('copy-format-anchor').value = items.copyFormatAnchor;
        document.getElementById('lang-default').value = items.langDefault;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('button-save').addEventListener('click', saveOptions);
