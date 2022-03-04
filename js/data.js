/* exported data */
var data = {
  collections: [],
  results: [],
  removeId: 0,
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
