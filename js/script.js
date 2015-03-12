
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    //load values of streee and city
    var streetValue=$('#street').val();
    var cityValue=$('#city').val();
    $greeting.text('So you want to live at '+streetValue+' , '+cityValue+'?');
    console.log(streetValue +'--> '+cityValue);
    //load values of windows width and height
    var sizeValue=$(window).width()+'x'+$( window ).height();
   //var sizeValue='600x400';
    //create tag img
    var source='<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size='+sizeValue+'&location= '+streetValue+' , '+cityValue+'">';
    //append image to body
    $body.append(source);
    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

