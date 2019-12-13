$(function  (){

    var $item = $('#item');
    
    $.ajax({
    type: 'GET',
    url: '/notes/Month/Day',
    success: function(data) {
    console.log('success' , item);
    $.each(item, function(i , item) {
        $.item.append('<li> my notes </li>');
    
    
    });
    }
    
        })
    
    
    }); 