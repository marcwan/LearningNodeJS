$(function(){
 
    var tmpl,   // Main template HTML
    tdata = {};  // JSON data object that feeds the template
 
    // Initialise page
    var initPage = function() {
 
        // get our album name.
        parts = window.location.href.split("/");
        var album_name = parts[5];
 
        // Load the HTML template
        $.get("/templates/album.html", function(d){
            tmpl = d;
        });

        // Retrieve the server data and then initialise the page  
        $.getJSON("/albums/" + album_name + ".json", function (d) {
            var photo_d = massage_album(d);
            $.extend(tdata, photo_d);
        });

        // When AJAX calls are complete parse the template 
        // replacing mustache tags with vars
        $(document).ajaxStop(function () {
            var renderedPage = Mustache.to_html( tmpl, tdata );
            $("body").html( renderedPage );
        })    
    }();
});



function massage_album(d) {
    if (d.error != null) return d;
    var obj = { photos: [] };

    var af = d.data.album_data;

    for (var i = 0; i < af.photos.length; i++) {
        var url = "/albums/" + af.short_name + "/" + af.photos[i].filename;
        obj.photos.push({ url: url, desc: af.photos[i].filename });
    }
    return obj;
}
