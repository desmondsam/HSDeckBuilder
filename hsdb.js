var urlParams = new URLSearchParams(window.location.search);
var keys = urlParams.keys();
var classNameSpan = document.getElementById("hsclassname");
var className = urlParams.get('hsclassname');
classNameSpan.innerText =  className[0].toUpperCase() + className.substring(1);