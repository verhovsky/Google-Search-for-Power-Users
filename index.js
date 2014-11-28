var searchBarId = 'gbqfq';
var searchBar = document.getElementById(searchBarId);

document.getElementById(searchBarId).tabIndex = -1;

document.querySelector('[aria-label="Google Search"]').tabIndex = -1;
document.querySelector('[title="Go to Google Home"]').tabIndex = -1;

// extraActionsDropDown, secondaryWebpageLinks, webpagePathElements, videoThumbnails, imageThumbnails
var queries = ['a.ab_button', 'a.fl', 'cite._Rm.bc > a', 'div.th._lyb._YQd > a', 'div.bicc > a']
for (var i=0; i<queries.length; i++) {
    var elems = document.querySelectorAll(queries[i]);
    for (var j=0; j<elems.length; j++) {
        elems[j].tabIndex = -1;
    }
}


document.onkeypress = function (e) {
    e = e || window.event;
    var forwardSlash = 47;

    if (e.keyCode === forwardSlash  &&  document.activeElement !== searchBar) {
        e.preventDefault();
        searchBar.focus();
    }
};
