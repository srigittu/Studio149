//HEAD 
(function(app) {
try { app = angular.module("app"); }
catch(err) { app = angular.module("app", []); }
app.run(["$templateCache", function($templateCache) {
"use strict";

$templateCache.put("../app/index.html","<!DOCTYPE html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Studio149</title><link rel=\"shortcut icon\" href=\"/assets/images/favicon.png\"><link rel=\"stylesheet\" type=\"text/css\" href=\"/css/style.css\"></head><body><h1>Studio 149</h1><!-- Render Main View --><ui-view></ui-view><!-- Complied Application Scripts --><script src=\"/js/bower.js\"></script><script src=\"/js/application.js\"></script><script src=\"/js/views.js\"></script></body></html>")
}]);
})();