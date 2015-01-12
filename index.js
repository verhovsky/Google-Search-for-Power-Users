// googleLogo, homepageLink, extraActionsDropDown, secondaryWebpageLinks,
// webpagePathElements, videoThumbnails, imageThumbnails.
// not sure if homepageLink is still necessary
var queries = ['[aria-label="Google Search"]', '[title="Go to Google Home"]',
               'a.ab_button', 'a.fl', 'cite._Rm.bc > a', 'div.th._lyb._YQd > a',
               'div.bicc > a'];
for (var i=0; i<queries.length; i++) {
    var elems = document.querySelectorAll(queries[i]);
    for (var j=0; j<elems.length; j++) {
        elems[j].tabIndex = -1; // pressing tab won't select these links
    }
}

var searchBarId = 'gbqfq';
var searchBar = document.getElementById(searchBarId);

searchBar.tabIndex = -1;

var googleLinksSelector = '.r > a'
var links = document.querySelectorAll(googleLinksSelector)

var currentLinkIndex = 0;
if (links.length) {
    links[currentLinkIndex].focus();
}


document.onkeypress = function (e) {
    e = e || window.event;

    var jKey = 106; // move up in list of links
    var kKey = 107; // move down in list of links

    var forwardSlash = 47; // focus on search box

    var nKey = 110; // go to next page of results
    // no p key because you should press backspace

    //console.log(e.keyCode);


    if (e.keyCode === jKey && currentLinkIndex < links.length-1 &&  document.activeElement !== searchBar) {
        e.preventDefault();
        currentLinkIndex += 1;
        links[currentLinkIndex].focus()

    } else if (e.keyCode === kKey && currentLinkIndex > 0 &&  document.activeElement !== searchBar) {
        e.preventDefault();
        currentLinkIndex += -1;
        links[currentLinkIndex].focus()

    } else if (e.keyCode === forwardSlash  &&  document.activeElement !== searchBar) {
        e.preventDefault();
        searchBar.focus();

        // reseting the text puts the cursor at the end of the text field,
        // which I've found to the the desired behaviour more often than
        // the default behavior of .focus(), which puts it at the beginning
        var temp = searchBar.value;
        searchBar.value = '';
        searchBar.value = temp;

    } else if (e.keyCode === nKey  &&  document.activeElement !== searchBar) {
        var nextPage = document.querySelector('span[style="display:block;margin-left:53px"]');
        if (nextPage) {
            nextPage.click();
        }

    }
};
