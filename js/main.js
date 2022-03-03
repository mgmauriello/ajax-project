var $searchForm = document.querySelector('#search-form');
var searchAnchor = document.querySelector('.search-page');
var $search = document.querySelector('#search');
var $results = document.querySelector('#results');
var $view = document.querySelectorAll('.view');
var $resultSearchText = document.querySelector('.result-search-text');
var $container = document.querySelectorAll('.container');
var $objectListing = document.querySelector('#object-listing');
var $display = document.querySelector('#display-page');
var $goBack = document.querySelector('#go-back');
var $resultImg = document.querySelector('.result-img');

$searchForm.addEventListener('submit', searchCollection);

function searchCollection(event) {
  event.preventDefault();
  var query = $search.value
  var apiKey = 'eKwvPndHvOjlYmpwQv1wixCkIa0a8fXgLbaSEFnIBTJeDReQj7u8vDwh8Ccon29F'
  var urlSearch = 'http://api.thewalters.org/v1/objects?&apikey=' + apiKey + '&keyword=' + query
  console.log(urlSearch);

  var $resultList = document.querySelectorAll('.results');
  for (var i = 0; i <$resultList.length; i++) {
    $resultList[i].remove();
  }
  data.results = [];

  var xhrSearch = new XMLHttpRequest();

  xhrSearch.open('GET', urlSearch);
  xhrSearch.responseType = 'json';
  xhrSearch.addEventListener('load', function () {
    console.log(xhrSearch.response);
    for (var r = 0; r < xhrSearch.response.Items.length; r++) {
      data.results.push(xhrSearch.response.Items[r]);
      var render = renderResults(xhrSearch.response.Items[r]);
      $results.appendChild(render);
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
  $grid.setAttribute('data-entry-id', result.ObjectID)
  $objectListing.appendChild($grid);

  var $cardWrapper = document.createElement('div');
  $cardWrapper.className = 'card-wrapper grid';
  $grid.appendChild($cardWrapper);

  var $card = document.createElement('div');
  $card.className = 'card result-description';
  $card.setAttribute('data-entry-id', result.ObjectID)
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

  var $iconItem = document.createElement('i');
  $iconItem.className = 'fa-solid fa-asterisk'
  $card.appendChild($iconItem)

  return $objectListing;
}
// user can view display card
$display.addEventListener('click', showDisplayDetails);

function showDisplayDetails(event) {
  if (event.target.className === '.fa-solid fa-asterisk') {
    console.log('hi')
  var $objectID = parseInt(event.target.closest('div').getAttribute('data-entry-id'));
    var xhrSearch = new XMLHttpRequest();
    xhr.open('GET',
    'http://api.thewalters.org/v1/objects?&apikey=eKwvPndHvOjlYmpwQv1wixCkIa0a8fXgLbaSEFnIBTJeDReQj7u8vDwh8Ccon29F'
      + '&ObjectID=' + $objectID);
    xhrSearch.responseType = 'json';
    xhrSearch.addEventListener('load', function () {
      console.log(xhrSearch.response);
      for (var r = 0; r < xhrSearch.response.Items.length; r++) {
        data.results.push(xhrSearch.response.Items[r].ApiObject);
        var displayDetails = renderResults(xhrSearch.response.Items[r].ApiObject);
        $display.appendChild($displayDetails);;
      }
    });
    xhr.send();
    viewSwap('result-display')
  }
}


function renderDisplay(result) {
  var $displayCard = document.createElement('div');
  $displayCard.className = 'display-card';

  var $columnForty = document.createElement('div');
  $columnForty.className = 'column-forty';
  $displayCard.appendChild($columnForty);

  var $img = document.createElement('img');
  $img.className = 'display-img';
  $img.setAttribute('src', result.PrimaryImage.Raw);
  $columnForty.appendChild($img);

  var $pieceDescription = document.createElement('div');
  $pieceDescription.className = 'column-sixty piece-description';
  $displayCard.appendChild($pieceDescription);

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

  var $heartIcon = document.createElement('i');
  $heartIcon.className = 'fa-regular fa-heart'
  $pieceDescription.appendChild($heartIcon);

  return $displayCard;
}

$display.addEventListener('click', function (event) {
  var $previousRender = document.querySelectorAll('#detail-page-render');

  for (var d = 0; d < $previousRender.length; d++) {
    $previousRender[d].remove();
  }

  var $dataView = event.target.getAttribute('data-view');
  if (event.target.nodeName === 'IMG') {
    console.log('hello')
    viewSwap($dataView);
  }

  var $resultId = event.target.getAttribute('result-id');

  var render = renderDisplay(data.results[$resultId]);
  $detailPageContainer.appendChild(render);
  data.detail = data.results[$resultId];

});

// view swapping

function viewSwap(string) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') !== string) {
      $view[i].className = 'view hidden';
      data.view = $view[i].getAttribute('data-view');
    } else {
      $view[i].className = 'view';
    }
  }
}

function dataView(event) {
  var $dataView = event.target.getAttribute('data-view');

  if ($dataView !== '') {
    viewSwap($dataView);
  }
}

searchAnchor.addEventListener('click', function (event) {
  viewSwap('search-page');
});

$goBack.addEventListener('click', function (event) {
  viewSwap('search-results');
});
