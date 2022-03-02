var $searchForm = document.querySelector('#search-form');
var $search = document.querySelector('#search')
var $results = document.querySelector('#results')
var $resultSearchText = document.querySelector('.result-search-text')
var $container = document.querySelectorAll('.container');

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
  $resultSearchText.innerText = 'Search results for ' + '"' + $search.value + '"';
  data.search = $search.value

  $searchForm.reset();
  xhrSearch.send();
}
// user can view search

function renderResults(result) {
  var $div = document.createElement('div');

  var $grid = document.createElement('div');
  $grid.className = 'grid';
  $div.appendChild($grid);

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
  $resultName.innerText = result.Creator;
  $card.appendChild($resultName);

  var $resultTitle = document.createElement('p');
  $resultTitle.className = 'result-description';
  $resultTitle.innerText = result.Title;
  $card.appendChild($resultTitle);

  return $div;
}

// document.addEventListener('DOMContentLoaded', function (event) {
//   // if (data.view === '') {
//   //   viewSwap('search-page')
//   // } else {
//   //   viewSwap(data.view)
//   // }

//   for (var i = 0; i < data.results.length; i++) {
//     var resultsData = renderResults(data.results[i]);
//     $results.appendChild(resultsData);
//   }
//   // swapViews(data.view);
// });

function dataView(event) {
  var $dataView = event.target.getAttribute('data-view');

  if ($dataView !== '') {
    viewSwap($dataView);
  }
}

function viewSwap(string) {
  for (var i = 0; i < $container.length; i++) {
    if ($container[i].dataset.view === string) {
      $container[i].className = 'container';
      var currentView = $container[i].dataset.view;
      data.view = currentView;
    } else {
      $container[i].className = 'container hidden';
    }
  }
}
