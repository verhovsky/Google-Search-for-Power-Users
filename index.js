// googleLogo, homepageLink, extraActionsDropDown, secondaryWebpageLinks,
// webpagePathElements, videoThumbnails, imageThumbnails.
// not sure if homepageLink is still necessary
var queries = ['[aria-label="Google Search"]', '[title="Go to Google Home"]',
               'a.ab_button', 'a.fl', 'cite._Rm.bc > a', 'div.th._lyb._YQd > a',
               'div.bicc > a'];
for (var i=0; i<queries.length; i++) {
    var elems = document.querySelectorAll(queries[i]);
    for (var j=0; j<elems.length; j++) {
        elems[j].tabIndex = -1;
    }
}

var searchBarId = 'gbqfq';
var searchBar = document.getElementById(searchBarId);

searchBar.tabIndex = -1;

// press / to focus on the searchbar. Not using .select() because Cmd-L in
// chrome already does that. But, right now .focus() puts you at the beginning
// of search query, might change this to be the front
document.onkeypress = function (e) {
    e = e || window.event;
    var forwardSlash = 47;

    if (e.keyCode === forwardSlash  &&  document.activeElement !== searchBar) {
        e.preventDefault();
        searchBar.focus();
    }
};
