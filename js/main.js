var $searchForm = document.querySelector('#search-form');
var $search = document.querySelector('#search')
var $results = document.querySelector('#results')
var $resultSearchText = document.querySelector('.result-search-text')
var $div = document.createElement('div');

$searchForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var query = $search.value
  var apiKey = 'eKwvPndHvOjlYmpwQv1wixCkIa0a8fXgLbaSEFnIBTJeDReQj7u8vDwh8Ccon29F'
  var result = ''
  var urlSearch = 'http://api.thewalters.org/v1/objects?&apikey=' + apiKey + '&keyword=' + query
  console.log(urlSearch);

  data.results = [];

  var xhrSearch = new XMLHttpRequest();

  xhrSearch.open('GET', urlSearch);
  xhrSearch.responseType = 'json';
  xhrSearch.addEventListener('load', function () {
    console.log(xhrSearch.response);
    for (var r = 0; r < xhrSearch.response.Items.length; r++) {
      data.results.push(this.response.Items[r]);
      var render = renderResults(this.response.Items[r])
      $div.appendChild(render)
    }
  });
  $searchForm.reset();
  xhrSearch.send();
}
// user can view search

function renderResults(result) {
  var $div = document.createElement('div');
  $div.setAttribute('data-id', result.id);
  $results.appendChild($div);

  var $grid = document.createElement('div');
  $grid.className = 'grid'
  $div.appendChild($grid);

  var $cardWrapper = document.createElement('div');
  $cardWrapper.className = 'card-wrapper grid';
  $grid.appendChild($cardWrapper);

  var $card = document.createElement('div');
  $card.className = 'card result-description';
  $cardWrapper.appendChild($card);

  // var $img = document.createElement('img');
  // $img.className = 'result-img';
  // for ('PrimaryImage' in result.Items) {
  //   $img.setAttribute('src', result.Items.PrimaryImage.small);
  // } else {
  //   $img.setAttribute('src', 'images/placeholder-image-square.jpg')
  // }
  // $card.appendChild($img);

  // var $resultName = document.createElement('p');
  // $resultName.className = 'result-description';
  // for ('Creator' && 'DateText' in result.Items) {
  //   $resultName.textContext = result.Items.Creator[0] + ', ' + result.Items.DateText[0];
  // }
  // $card.appendChild($resultName);

  // var $resultTitle = document.createElement('p');
  // $resultTitle.className = 'result-description';
  // if ('Title' in result.Items) {
  //   $resultName.textContext = result.Items.Title[0];;
  // }
  // $card.appendChild($resultTitle);

  return $div;
}

document.addEventListener('DOMContentLoaded', function (event) {
  // if (data.view === '') {
  //   viewSwap('search-page')
  // } else {
  //   viewSwap(data.view)
  // }

  for (var i = 0; i < data.results.length; i++) {
    var resultsData = renderResults(data.results[i]);
    $results.appendChild(resultsData);
  }
  $resultSearchText.textContext = 'Search results for ' + '"' + $search.value + '"';
  // swapViews(data.view);
});
