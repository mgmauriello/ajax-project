var $searchForm = document.querySelector('#search-form');
var $searchAnchor = document.querySelector('.search-page');
var $loadSpinner = document.querySelector('#load-spinner')
var $search = document.querySelector('#search');
var $results = document.querySelector('#results');
var $view = document.querySelectorAll('.view');
var $resultSearchText = document.querySelector('.result-search-text');
var $container = document.querySelectorAll('.container');
var $objectListing = document.querySelector('#object-listing');
var $display = document.querySelector('#display-page');
var $goBack = document.querySelector('#go-back');
var $resultImg = document.querySelector('.result-img');
var $collectionAnchor = document.querySelector('.collection-page')
var $modalPopUp = document.querySelector('.modal-popup');
var $confirmButton = document.querySelector('.confirm-btn');
var $cancelButton = document.querySelector('.cancel-btn');
var $personalCollection = document.querySelector('#personal-collection');
var $noEntry = document.querySelector('.no-entries-text');
var $navBar = document.querySelector('header');

// search collection
$searchForm.addEventListener('submit', searchCollection);
function searchCollection(event) {
  event.preventDefault();

  $loadSpinner.className = 'lds-ripple';

  var query = $search.value
  var apiKey = 'eKwvPndHvOjlYmpwQv1wixCkIa0a8fXgLbaSEFnIBTJeDReQj7u8vDwh8Ccon29F'
  var urlSearch = 'http://api.thewalters.org/v1/objects?&apikey=' + apiKey + '&keyword=' + query

  var $resultList = document.querySelectorAll('.results');
  for (var i = 0; i < $resultList.length; i++) {
    $resultList[i].remove();
  }
  data.results = [];

  var xhrSearch = new XMLHttpRequest();

  xhrSearch.open('GET', urlSearch);
  xhrSearch.responseType = 'json';
  xhrSearch.addEventListener('load', function () {
    if (!this.response.Items) {
      var $noResults = document.createElement('div');
      $noResults.className = 'no-results';
      $results.appendChild($noResults);

      var $noResultsText = document.createElement('h3');
      $noResults.appendChild($noResultsText);
      $noResultsText.textContent = 'No results were found. Try again.';
      $loadSpinner.className = 'lds-ripple hidden';

      return $noResults;
    } else if (this.response.Items) {
      for (var r = 0; r < xhrSearch.response.Items.length; r++) {
        data.results.push(xhrSearch.response.Items[r]);
        var render = renderResults(xhrSearch.response.Items[r]);
        $results.appendChild(render);
        $loadSpinner.className = 'lds-ripple hidden';
      }
    } else {
        var $error = document.createElement('div');
        $error.className = 'no-results';
        $results.appendChild($error);

        var $errorText = document.createElement('h3');
        $error.appendChild($errorText);
        $errorText.textContent = 'Trouble connecting to the network. Please try again later.';
        $loadSpinner.className = 'lds-ripple hidden';

        return $error;
      }

  });

  $resultSearchText.textContent = 'Search results for ' + '"' + $search.value + '"';
  data.search = $search.value

  $searchForm.reset();
  xhrSearch.send();
  viewSwap('search-results');
}

// user can view search

function renderResults(result) {
  var $grid = document.createElement('div');
  $grid.className = 'grid';
  $grid.setAttribute('data-entry-id', result.ObjectID);
  $objectListing.appendChild($grid);

  var $cardWrapper = document.createElement('div');
  $cardWrapper.className = 'card-wrapper grid';
  $grid.appendChild($cardWrapper);

  var $card = document.createElement('div');
  $card.className = 'card result-description';
  $card.setAttribute('data-entry-id', result.ObjectID);
  $cardWrapper.appendChild($card);

  var $img = document.createElement('img');
  $img.className = 'result-img';
  $img.setAttribute('src', result.PrimaryImage.Raw);
  $card.appendChild($img);

  var $resultName = document.createElement('p');
  $resultName.className = 'result-description';
  $resultName.textContent = result.Creator;
  $card.appendChild($resultName);

  var $resultTitle = document.createElement('p');
  $resultTitle.className = 'result-description';
  $resultTitle.textContent = result.Title;
  $card.appendChild($resultTitle);

  return $objectListing;
}

// user can view display card

$results.addEventListener('click', function (event) {
  if (event.target.className === 'result-img') {
    showDisplayDetails(event);
  }
  var $previousDisplay = document.querySelectorAll('#detail-page-render');

  for (var i = 0; i < $previousDisplay.length; i++) {
    $previousDisplay[i].remove();
  }

}, false);

var $displaySpinner = document.querySelector('#display-spinner');

function showDisplayDetails(event) {
  $displaySpinner.className = 'lds-ripple';

  var $objectID = event.target.closest('div').getAttribute('data-entry-id');
  var xhr = new XMLHttpRequest();
  var baseAPIEndpoint = 'http://api.thewalters.org/v1/objects?&apikey=eKwvPndHvOjlYmpwQv1wixCkIa0a8fXgLbaSEFnIBTJeDReQj7u8vDwh8Ccon29F'
  var apiEndpoint = baseAPIEndpoint + '&ObjectID=' + $objectID;
  xhr.open('GET', apiEndpoint);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var $displayDetails = renderDisplay(xhr.response.Items[0]);
    $display.appendChild($displayDetails);
    $displaySpinner.className = 'lds-ripple hidden';
  });
  xhr.send();
  viewSwap('result-display');
}

function renderDisplay(result) {
  var $displayCard = document.createElement('div');
  $displayCard.className = 'display-card';
  $displayCard.setAttribute('id', 'detail-page-render');

  var $columnDisplayImg = document.createElement('div');
  $columnDisplayImg.className = 'column-display-img';
  $displayCard.appendChild($columnDisplayImg);

  var $img = document.createElement('img');
  $img.className = 'display-img';
  $img.setAttribute('src', result.PrimaryImage.Raw);
  $columnDisplayImg.appendChild($img);

  var $pieceDescription = document.createElement('div');
  $pieceDescription.className = 'column-display-text piece-description';
  $displayCard.appendChild($pieceDescription);

  var $heartIcon = document.createElement('i');
  $heartIcon.setAttribute('id', 'heart-icon');
  $heartIcon.setAttribute('data-entry-id', result.ObjectID)
  if (data.collections.length === 0) {
    $heartIcon.className = 'fa-regular fa-heart';
  } else {
    for (var h = 0; h < data.collections.length; h++) {
      if (result.ObjectID === data.collections[h].ObjectID) {
        $heartIcon.className = 'fa-solid fa-heart red-heart';
        break;
      } else {
        $heartIcon.className = 'fa-regular fa-heart';
      }
    }
  }
  $pieceDescription.appendChild($heartIcon);

  var $displayTitle = document.createElement('p');
  $displayTitle.className = 'display-title';
  $displayTitle.textContent = result.Title;
  $pieceDescription.appendChild($displayTitle);

  var $displayCreator = document.createElement('p');
  $displayCreator.className = 'display-creator';
  $displayCreator.textContent = result.Creator;
  $pieceDescription.appendChild($displayCreator);

  var $displayMedium = document.createElement('p');
  $displayMedium.className = 'display-medium';
  $displayMedium.textContent = result.Medium;
  $pieceDescription.appendChild($displayMedium);

  var $displayDesc = document.createElement('p');
  $displayDesc.className = 'display-desc';
  $displayDesc.textContent = result.Description;
  $pieceDescription.appendChild($displayDesc);

  return $displayCard;
}

// add to collection
$collectionAnchor.addEventListener('click', function (event) {
  if (data.collections !== 0) {
    for (var c = 0; c < data.collections.length; c++) {
      var renderCollections = renderResults(data.collections[c]);
      $personalCollection.appendChild(renderCollections);
    }
  }
  viewSwap('personal-collection');
});

$display.addEventListener('click', deleteModal)
function deleteModal (event) {
  if (event.target.className === 'fa-solid fa-heart red-heart') {
    $modalPopUp.className = 'modal-popup show-modal';
  } else {
    $modalPopUp.className = 'modal-popup hidden';
  }
};

$display.addEventListener('click', addToCollection);
function addToCollection (event) {
  var $collectionId = event.target.getAttribute('data-entry-id');
  $collectionId = parseInt($collectionId);
  var $heart = document.querySelectorAll('i');
  if ((event.target.className === 'fa-regular fa-heart')) {
    for (var i = 0; i < data.results.length; i++) {
      if (data.results[i].ObjectID === $collectionId) {
        data.collections.push(data.results[i]);
      }
    }
  }
  if (event.target.className === 'fa-regular fa-heart') {
    event.target.className = 'fa-solid fa-heart red-heart';
  }
};

$personalCollection.addEventListener('click', function (event) {
  if (event.target.className === 'result-img') {
    showDisplayDetails(event);
  }
  var $previousDisplay = document.querySelectorAll('#detail-page-render');

  for (var i = 0; i < $previousDisplay.length; i++) {
    $previousDisplay[i].remove();
  }
}, false);

$cancelButton.addEventListener('click', function (event) {
  if (event.target.matches('.cancel-btn')) {
    $modalPopUp.className = 'modal-popup hidden';
  } else {
    $modalPopUp.className = 'modal-popup show-modal';
  }
});

$confirmButton.addEventListener('click', function (event) {
  event.preventDefault();
  $modalPopUp.className = 'modal-popup hidden';

  for (var i = 0; i < data.collections.length; i++) {
    if (data.collections[i].CollectionID === data.collections[i].CollectionID) {
      data.collections.splice(i, 1);
    }
  }
  if (event.target.className = 'fa-solid fa-heart red-heart') {
    event.target.className = 'fa-regular fa-heart';
  }
  viewSwap('search-page');
});

function viewSwap(string) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') !== string) {
      $view[i].className = 'view hidden';
      data.view = $view[i].getAttribute('data-view');
    } else {
      $view[i].className = 'view';
    }
  }
  if (data.collections.length === 0) {
    $noEntry.className = 'no-entries-text';
  } else {
    $noEntry.className = 'view hidden';
  }
}

function dataView(event) {
  var $dataView = event.target.getAttribute('data-view');
  if ($dataView !== '') {
    viewSwap($dataView);
  }
}

$searchAnchor.addEventListener('click', function (event) {
  viewSwap('search-page');
});

$goBack.addEventListener('click', function (event) {
  viewSwap('search-results');
});
