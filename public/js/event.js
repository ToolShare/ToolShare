var deleteEl = document.getElementById('method-delete');
deleteEl.onclick = function(e) {
  e.preventDefault();
  var del = new XMLHttpRequest();
  del.open('DELETE', e.target);
  del.send();
  location.href = '/dashboard';
};
