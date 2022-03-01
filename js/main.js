var $searchForm = document.querySelector('#search-form');
$searchForm.addEventListener('submit', handleSubmit);


function handleSubmit(event) {
  event.preventDefault();
  // var keywords = [];
  // var searchOutput = '';

  // for (var i = 0; i < $searchForm.elements.search.value.length; i++) {
  //   if ($searchForm.elements.search.value[i] === ' ') {
  //     keywords.push(searchOutput);
  //     searchOutput = '';
  //   } else {
  //     searchOutput += $searchForm.elements.search.value[i];
  //   }
  // }
  // keywords.push(searchOutput);

  // var urlSearch = 'http://api.thewalters.org/v1/objects?&apikey=eKwvPndHvOjlYmpwQv1wixCkIa0a8fXgLbaSEFnIBTJeDReQj7u8vDwh8Ccon29F';
  // for (var k = 0; k < keywords.length; k++) {
  //   urlSearch += '&keyword=' + keywords[k];
  // }

  var xhrSearch = new XMLHttpRequest();

  xhrSearch.open('GET', 'http://api.thewalters.org/v1/objects?&apikey=eKwvPndHvOjlYmpwQv1wixCkIa0a8fXgLbaSEFnIBTJeDReQj7u8vDwh8Ccon29F&keyword=sword');
  xhrSearch.responseType = 'json';
  xhrSearch.addEventListener('load', function () {
    console.log(xhrSearch.response);

    for (var r = 0; r < xhrSearch.response.Items.length; r++) {
      data.results.push(this.response.Items[r]);
    }
  });
  $searchForm.reset();
  xhrSearch.send();
}
