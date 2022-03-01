var $view = document.querySelectorAll('.view');
var $enterButton = document.querySelector('.enter-button');

$enterButton.addEventListener('click', function (event) {
  if (!event.target.matches('.search-button')) {
    return;
  }
  var dataView = event.target.getAttribute('data-view');
  for (i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === dataView) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
});
