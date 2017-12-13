let searchBar = document.getElementById('lst-ib');
searchBar.tabIndex = -1;

let elementsToIgonre = [
    // logo
    '[aria-label="Google Search"]',
    // homepage link, not sure if still necessary
    '[title="Go to Google Home"]',
    // extra actions drop down
    'a.ab_button',
    // secondary webpage links
    'a.fl',
    // webpage path elements
    'cite._Rm.bc > a',
    // video thumbnails
    'div.th._lyb._YQd > a',
    // image thumbnails
    'div.bicc > a'
];
for (let selector of elementsToIgonre) {
    for (let elem of document.querySelectorAll(selector)) {
        elem.tabIndex = -1;
    }
}

// select only search results, not suggested answers or suggested questions
// personal blocklist adds the "blocked" class
let searchResultSelector = '._NId > .srg > .g:not(.blocked) > div > .rc > .r > a';
let searchResults = document.querySelectorAll(searchResultSelector);
let focusedSearchIndex = 0;
searchResults[focusedSearchIndex].focus();

// wait for Personal Blacklist extension to do its work
// https://chrome.google.com/webstore/detail/personal-blocklist-by-goo/nolijncfnkgaikbjbdaogikpmpbdcdef
// TODO: detect that personal blocklist extension ran programmatically
setTimeout(() => {
    searchResults = document.querySelectorAll(searchResultSelector);
    // while we were waiting for the blacklist extension, the user could've started editing the
    // search query.
    if (!document.activeElement.isSameNode(searchBar)) {
        searchResults[focusedSearchIndex].focus();
    }

    // automatically click the first result, unless you got to the results page by pressing back
    if (window.performance.navigation.type !== window.performance.navigation.TYPE_BACK_FORWARD) {
        searchResults[focusedSearchIndex].click();
    }
}, 600);

document.onkeypress = (e) => {
    if (document.activeElement.isSameNode(searchBar)) {
        return;
    }

    if (e.key === 'j' && focusedSearchIndex < searchResults.length-1) {
        focusedSearchIndex++;

        searchResults[focusedSearchIndex].focus();
        e.preventDefault();
    } else if (e.key === 'k' && focusedSearchIndex > 0) {
        focusedSearchIndex--;

        searchResults[focusedSearchIndex].focus();
        e.preventDefault();
    }

    if (e.key === '/') {
        searchBar.focus();
        // put the cursor at the end of the input field instead of the beginning
        searchBar.setSelectionRange(searchBar.value.length, searchBar.value.length);
        e.preventDefault();
    }
};
