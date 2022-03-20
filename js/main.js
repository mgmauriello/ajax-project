let $searchForm = document.querySelector('#search-form');
let $searchAnchor = document.querySelector('.search-page');
let $loadSpinner = document.querySelector('#load-spinner')
let $search = document.querySelector('#search');
let $results = document.querySelector('#results');
let $view = document.querySelectorAll('.view');
let $resultSearchText = document.querySelector('.result-search-text');
let $container = document.querySelectorAll('.container');
let $objectListing = document.querySelector('#object-listing');
let $display = document.querySelector('#display-page');
let $goBack = document.querySelector('#go-back');
let $resultImg = document.querySelector('.result-img');
let $collectionAnchor = document.querySelector('.collection-page')
let $modalPopUp = document.querySelector('.modal-popup');
let $confirmButton = document.querySelector('.confirm-btn');
let $cancelButton = document.querySelector('.cancel-btn');
let $personalCollection = document.querySelector('#personal-collection');
let $noEntry = document.querySelector('.no-entries-text');
let $navBar = document.querySelector('header');

// search collection
$searchForm.addEventListener('submit', searchCollection);
function searchCollection(event) {
  event.preventDefault();

  $loadSpinner.className = 'lds-ripple';

  const query = $search.value
  const apiKey = 'eKwvPndHvOjlYmpwQv1wixCkIa0a8fXgLbaSEFnIBTJeDReQj7u8vDwh8Ccon29F'
  const urlSearch = 'https://api.thewalters.org/v1/objects?&apikey=' + apiKey + '&pageSize=200&keyword=' + query

  var $resultList = document.querySelectorAll('.results');
  for (var i = 0; i < $resultList.length; i++) {
    $resultList[i].remove();
  }
  data.results = [];

  const xhrSearch = new XMLHttpRequest();
  xhrSearch.response

  xhrSearch.open('GET', urlSearch);
  xhrSearch.responseType = 'json';
  xhrSearch.addEventListener('load', function () {
    if (!this.response.Items) {
      let $noResults = document.createElement('div');
      $noResults.className = 'no-results';
      $results.appendChild($noResults);

      let $noResultsText = document.createElement('h3');
      $noResults.appendChild($noResultsText);
      $noResultsText.textContent = 'No results were found. Try again.';
      $loadSpinner.className = 'lds-ripple hidden';

      return $noResults;
    } else if (this.response.Items) {
      for (let r = 0; r < xhrSearch.response.Items.length; r++) {
        data.results.push(xhrSearch.response.Items[r]);
        let render = renderResults(xhrSearch.response.Items[r]);
        $results.appendChild(render);
        $loadSpinner.className = 'lds-ripple hidden';
      }
    } else {
        let $error = document.createElement('div');
        $error.className = 'no-results';
        $results.appendChild($error);

        let $errorText = document.createElement('h3');
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

const renderResults = (result) => {
  let $grid = document.createElement('div');
  $grid.className = 'grid';
  $grid.setAttribute('data-entry-id', result.ObjectID);
  $objectListing.appendChild($grid);

  let $cardWrapper = document.createElement('div');
  $cardWrapper.className = 'card-wrapper grid';
  $grid.appendChild($cardWrapper);

  let $card = document.createElement('div');
  $card.className = 'card result-description';
  $card.setAttribute('data-entry-id', result.ObjectID);
  $cardWrapper.appendChild($card);

  let $img = document.createElement('img');
  $img.className = 'result-img';
  $img.setAttribute('src', result.PrimaryImage.Raw);
  if (result.PrimaryImage.Raw === null) {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
  $card.appendChild($img);

  let $resultName = document.createElement('p');
  $resultName.className = 'result-description';
  $resultName.textContent = result.Creator;
  $card.appendChild($resultName);

  let $resultTitle = document.createElement('p');
  $resultTitle.className = 'result-description';
  $resultTitle.textContent = result.Title;
  $card.appendChild($resultTitle);

  return $objectListing;
}

// user can view display card

$results.addEventListener('click', (event) => {
  if (event.target.className === 'result-img') {
    showDisplayDetails(event);
  }
  let $previousDisplay = document.querySelectorAll('#detail-page-render');

  for (let i = 0; i < $previousDisplay.length; i++) {
    $previousDisplay[i].remove();
  }

}, false);

let $displaySpinner = document.querySelector('#display-spinner');

const showDisplayDetails = (event) =>{
  $displaySpinner.className = 'lds-ripple';

  let $objectID = event.target.closest('div').getAttribute('data-entry-id');
  let xhr = new XMLHttpRequest();
  let baseAPIEndpoint = 'https://api.thewalters.org/v1/objects?&apikey=eKwvPndHvOjlYmpwQv1wixCkIa0a8fXgLbaSEFnIBTJeDReQj7u8vDwh8Ccon29F'
  let apiEndpoint = baseAPIEndpoint + '&ObjectID=' + $objectID;
  xhr.open('GET', apiEndpoint);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    let $displayDetails = renderDisplay(xhr.response.Items[0]);
    $display.appendChild($displayDetails);
    $displaySpinner.className = 'lds-ripple hidden';
  });
  xhr.send();
  viewSwap('result-display');
}

const renderDisplay = (result) => {
  let $displayCard = document.createElement('div');
  $displayCard.className = 'display-card';
  $displayCard.setAttribute('id', 'detail-page-render');

  let $columnDisplayImg = document.createElement('div');
  $columnDisplayImg.className = 'column-display-img';
  $displayCard.appendChild($columnDisplayImg);

  let $img = document.createElement('img');
  $img.className = 'display-img';
  $img.setAttribute('src', result.PrimaryImage.Raw);
  if (result.PrimaryImage.Raw === null) {
    $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
  $columnDisplayImg.appendChild($img);

  let $pieceDescription = document.createElement('div');
  $pieceDescription.className = 'column-display-text piece-description';
  $displayCard.appendChild($pieceDescription);

  let $heartIcon = document.createElement('i');
  $heartIcon.setAttribute('id', 'heart-icon');
  $heartIcon.setAttribute('data-entry-id', result.ObjectID)
  if (data.collections.length === 0) {
    $heartIcon.className = 'fa-regular fa-heart';
  } else {
    for (let h = 0; h < data.collections.length; h++) {
      if (result.ObjectID === data.collections[h].ObjectID) {
        $heartIcon.className = 'fa-solid fa-heart red-heart';
        break;
      } else {
        $heartIcon.className = 'fa-regular fa-heart';
      }
    }
  }
  $pieceDescription.appendChild($heartIcon);

  let $displayTitle = document.createElement('p');
  $displayTitle.className = 'display-title';
  $displayTitle.textContent = result.Title;
  $pieceDescription.appendChild($displayTitle);

  let $displayCreator = document.createElement('p');
  $displayCreator.className = 'display-creator';
  $displayCreator.textContent = result.Creator;
  $pieceDescription.appendChild($displayCreator);

  let $displayMedium = document.createElement('p');
  $displayMedium.className = 'display-medium';
  $displayMedium.textContent = result.Medium;
  $pieceDescription.appendChild($displayMedium);

  let $displayDesc = document.createElement('p');
  $displayDesc.className = 'display-desc';
  $displayDesc.textContent = result.Description;
  $pieceDescription.appendChild($displayDesc);

  return $displayCard;
}

// add to collection
$collectionAnchor.addEventListener('click', (event) => {
  if (data.collections !== 0) {
    for (let c = 0; c < data.collections.length; c++) {
      let renderCollections = renderResults(data.collections[c]);
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
  let $collectionId = event.target.getAttribute('data-entry-id');
  $collectionId = parseInt($collectionId);
  let $heart = document.querySelectorAll('i');
  if ((event.target.className === 'fa-regular fa-heart')) {
    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].ObjectID === $collectionId) {
        data.collections.push(data.results[i]);
      }
    }
  }
  if (event.target.className === 'fa-regular fa-heart') {
    event.target.className = 'fa-solid fa-heart red-heart';
  }
};

$personalCollection.addEventListener('click', (event) => {
  if (event.target.className === 'result-img') {
    showDisplayDetails(event);
  }
  let $previousDisplay = document.querySelectorAll('#detail-page-render');

  for (let i = 0; i < $previousDisplay.length; i++) {
    $previousDisplay[i].remove();
  }
}, false);

$cancelButton.addEventListener('click', (event) => {
  if (event.target.matches('.cancel-btn')) {
    $modalPopUp.className = 'modal-popup hidden';
  } else {
    $modalPopUp.className = 'modal-popup show-modal';
  }
});

$confirmButton.addEventListener('click', function (event) {
  event.preventDefault();
  $modalPopUp.className = 'modal-popup hidden';

  for (let i = 0; i < data.collections.length; i++) {
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
  for (let i = 0; i < $view.length; i++) {
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
  let $dataView = event.target.getAttribute('data-view');
  if ($dataView !== '') {
    viewSwap($dataView);
  }
}

$searchAnchor.addEventListener('click', (event) => {
  viewSwap('search-page');
});

$goBack.addEventListener('click', (event) => {
  viewSwap('search-results');
});
