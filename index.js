let searchBarSelector = '#lst-ib';
let searchBar = document.querySelector(searchBarSelector);
searchBar.tabIndex = -1;

var new_element = searchBar.cloneNode(true);
searchBar.parentNode.replaceChild(new_element, searchBar);

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
        elem.tabIndex = '-1';
    }
}

let resultsSelector = '.r > a';
let links = document.querySelectorAll(resultsSelector);

let currentLinkIndex = 0;
links[currentLinkIndex].focus();

document.onkeypress = (e) => {
    if (document.activeElement === searchBar) { return; }

    e.preventDefault();

    let jKey = 106; // move up in list of links
    let kKey = 107; // move down in list of links

    let forwardSlash = 47; // focus on search box

    let nKey = 110; // go to next page of results
    let pKey = 112; // go to previous page

    switch (e.keyCode) {
        case jKey:
            currentLinkIndex = Math.min(currentLinkIndex+1, links.length-1);
            links[currentLinkIndex].focus();
            break;

        case kKey:
            currentLinkIndex = Math.max(currentLinkIndex-1, 0);
            links[currentLinkIndex].focus();
            break;

        case forwardSlash:
            searchBar.focus();
            // put the cursor at the end of the input field instead of
            // the beginning
            searchBar.setSelectionRange(
                searchBar.value.length, searchBar.value.length);
            break;

        case nKey:
            let nextPage = document.querySelector('span[style="display:block;margin-left:53px"]').click();
            break;

        case pKey:
            window.history.back(); // good enough.
            break;
    }
};
