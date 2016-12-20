$(function(){
 
    var tmpl,   // Main template HTML
    tdata = {};  // JSON data object that feeds the template
 
    // Initialise page
    var initPage = function() {
 
        // Load the HTML template
        $.get("/templates/register.html", function(d){
            tmpl = d;
        });

        // Retrieve the server data and then initialise the page  
        $.getJSON("/v1/users/logged_in.json", function (d) {
            $.extend(tdata, d);
        });

        // When AJAX calls are complete parse the template 
        // replacing mustache tags with vars
        $(document).ajaxStop(function () {
            if (tdata.data.logged_in)
                window.location = "/pages/admin/home";
            else {
                var renderedPage = Mustache.to_html( tmpl, tdata );
                $("body").html( renderedPage );
            }
        });
    }();
});
