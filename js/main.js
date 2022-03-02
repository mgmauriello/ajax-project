var $searchForm = document.querySelector('#search-form');
var searchAnchor = document.querySelector('.search-page')
var $search = document.querySelector('#search');
var $results = document.querySelector('#results');
var $view = document.querySelectorAll('.view');
var $resultSearchText = document.querySelector('.result-search-text')
var $container = document.querySelectorAll('.container');
var $objectListing = document.querySelector('#object-listing');

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
