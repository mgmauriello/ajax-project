/* exported data */
var data = {
  collections: [],
  results: [],
  view: '',
};

var previousDataJSON = localStorage.getItem('youseum-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);

  localStorage.setItem('youseum-local-storage', dataJSON);
});
