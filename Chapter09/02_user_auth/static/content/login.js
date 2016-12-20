$(function(){
 
    var tmpl,   // Main template HTML
    tdata = {};  // JSON data object that feeds the template
 
    // Initialise page
    var initPage = function() {
 
        // Load the HTML template
        $.get("/templates/login.html", function(d){
            tmpl = d;
        });

        // When AJAX calls are complete parse the template 
        // replacing mustache tags with vars
        $(document).ajaxStop(function () {
            var renderedPage = Mustache.to_html( tmpl, tdata );
            $("body").html( renderedPage );
        });
    }();
});
