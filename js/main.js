var $searchForm = document.querySelector('#search-form');
var searchAnchor = document.querySelector('.search-page')
var $search = document.querySelector('#search');
var $results = document.querySelector('#results');
var $view = document.querySelectorAll('.view');
var $resultSearchText = document.querySelector('.result-search-text')
var $container = document.querySelectorAll('.container');
var $objectListing = document.querySelector('#object-listing');
var $display = document.querySelector('#display');

$searchForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var query = $search.value
  var apiKey = 'eKwvPndHvOjlYmpwQv1wixCkIa0a8fXgLbaSEFnIBTJeDReQj7u8vDwh8Ccon29F'
  var urlSearch = 'http://api.thewalters.org/v1/objects?&apikey=' + apiKey + '&keyword=' + query
  console.log(urlSearch);

  var $resultList = document.querySelectorAll('.results')
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
      var render = renderResults(xhrSearch.response.Items[r])
      $results.appendChild(render)
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
  $objectListing.appendChild($grid);

  var $cardWrapper = document.createElement('div');
  $cardWrapper.className = 'card-wrapper grid';
  $grid.appendChild($cardWrapper);

  var $card = document.createElement('div');
  $card.className = 'card result-description';
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

function renderDisplay(result) {
  var $displayCard = document.createElement('div');
  $displayCard.className = 'display-card';
  $display.appendChild($displayCard);

  var $columnForty = document.createElement('div');
  $columnForty.className = 'column-forty';
  $displayCard.appendChild($columnForty);

  var $img = document.createElement('img');
  $img.className = 'result-img';
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
  $displayCreator.className = 'result-description';
  $displayCreator.textContent = result.Title;
  $pieceDescription.appendChild($displayCreator);

  var $displayMedium = document.createElement('p');
  $displayMedium.className = 'display-medium';
  $displayMedium.textContent = result.Medium;
  $pieceDescription.appendChild($displayMedium);

  var $displayDesc = document.createElement('p');
  $displayDesc.className = 'result-description';
  $displayDesc.textContent = result.Description;
  $pieceDescription.appendChild($displayDesc);

  var $heartIcon = document.createElement('i');
  $heartIcon.className = 'fa-regular fa-heart'
  $pieceDescription.appendChild($heartIcon);

  return $displayCard;
}


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
searchAnchor.addEventListener('click', function (event) {
  viewSwap('search-page');
});
