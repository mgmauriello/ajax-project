/* exported data */
var data = {
  collections: [],
  results: [],
  detail: null,
  removeId: 0,
  nextResultId: 0,
  view: '',
  searchPageView: ''
};

var previousDataJSON = localStorage.getItem('results-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);

  localStorage.setItem('results-local-storage', dataJSON);
});
