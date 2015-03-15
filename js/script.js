
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $wikiHeader=$('#wikipedia-header');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
    // YOUR CODE GOES HERE!

    // load streetview
    //load values of streee and city
    var streetValue=$('#street').val();
    var cityValue=$('#city').val();
    $greeting.text('So, you want to live at '+streetValue+' , '+cityValue+'?');
    console.log(streetValue +'--> '+cityValue);
    //load values of windows width and height 
  //  var sizeValue=$(window).width()+'x'+$( window ).height();
  var sizeValue='600x400';
    //create tag img
    var source='<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size='+sizeValue+'&location= '+streetValue+' , '+cityValue+'">';
    //append image to body
    $body.append(source);
//NY articles

var nyURL='http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityValue+'&sort=newest&page=0&api-key=54f39ef6e0fa68ff5f62ce0249a1a637:10:71578692';


$.getJSON( nyURL, function( data ) {
      //  console.log(data);
      var items = [];
      $nytHeaderElem.text('New York articles about '+ cityValue);
     // console.log(data.response);
     $.each( data.response.docs,function(key,value) {
    //console.log(key+'....'+value);
    var refurl=value.web_url;
    var refText=value.headline.main;
    var paraText=value.snippet;
    items.push( '<li class="article"><a href="'+refurl+ '">'+refText+'</a><p>'+paraText +' </p></li>');
});
     var UnList='<ul id="nytimes-articles" class="article-list">'+items.join( "" )+'</ul>';
     $nytElem.append(UnList);

 }).error(function() {
     $nytHeaderElem.text('New York articles could not be loaded');
 });
//wikipedia articles
//error handling 8 secons
var wikiRequestTimeout=setTimeout(function(){ $wikiHeader.text('Wikipedia articles could not be loaded');
},8000);

var wikURL='http://en.wikipedia.org/w/api.php?format=json&action=opensearch&search='+cityValue;//+'&callback=?'//+'&callback=wikiCallback'
$.ajax({
    url:wikURL,
    dataType: "jsonp",
    success: function (data) {
      //  console.log(data);
        var names=data[1];
        var links=data[3];
        for (var i=0;i<names.length;i++){
            var artLin='<li><a href="'+links[i]+'">'+names[i]+' </a></li>';
            $wikiElem.append(artLin);
        }
        //stop timeour if succesfull
        clearTimeout(wikiRequestTimeout);
    }
});

return false;
};

$('#form-container').submit(loadData);

