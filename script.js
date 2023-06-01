var currentPage = 1;

function previousPage(nextPage) {
  if (currentPage > 1) {
    currentPage--;
    updatePageNumber(nextPage);
  }
}

function nextPage(previousPage) {
  currentPage++;
  updatePageNumber(previousPage);
}

function updatePageNumber(relatedPage) {
  var pages = document.getElementsByClassName('page');

  for (var i = 0; i < pages.length; i++) {
    if (i + 1 === currentPage) {
      pages[i].style.display = 'block';
    } else {
      pages[i].style.display = 'none';
    }
  }

  if (relatedPage) {
    var relatedPageElement = document.getElementById(`page${relatedPage}`);
    relatedPageElement.querySelector('a').setAttribute('onclick', `nextPage(${currentPage})`);
    relatedPageElement.querySelector('button').setAttribute('onclick', `previousPage(${currentPage})`);
  }

  updateHistoryState(currentPage);
}

function updateHistoryState(pageNumber) {
  var url = new URL(window.location.href);
  url.searchParams.set('page', pageNumber);
  history.pushState({ page: pageNumber }, '', url);
}

window.addEventListener('popstate', function(event) {
  currentPage = event.state.page || 1;
  updatePageNumber();
});

// Initialize the page based on the current URL
var urlParams = new URLSearchParams(window.location.search);
var pageNumberFromUrl = parseInt(urlParams.get('page')) || 1;
currentPage = pageNumberFromUrl;
updatePageNumber();
