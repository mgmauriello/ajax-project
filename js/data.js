/* exported data */
let data = {
  collections: [],
  results: [],
  view: '',
};

let previousDataJSON = localStorage.getItem('youseum-local-storage');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
window.addEventListener('beforeunload', (event) => {
  let dataJSON = JSON.stringify(data);

  localStorage.setItem('youseum-local-storage', dataJSON);
});
