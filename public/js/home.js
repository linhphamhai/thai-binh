
$(document).ready(function(){
    

    // LOAD CARIOUL
    $.ajax({
        url : '/page-api/get-slide-image',
        type : 'get',
        dataType : 'json',
        success : function (result){
            console.log(result);
            var slider1 = '<img src="' + result[0].image + '" alt="" class="image-slider">';
            slider1 = slider1 + ' <div class="carousel-caption"><h3> ' + result[0].description +'</h3></div>';

            var slider2 = '<img src="' + result[1].image + '" alt="" class="image-slider">';
            slider2 = slider2 + ' <div class="carousel-caption"><h3> ' + result[1].description +'</h3></div>';

            var slider3 = '<img src="' + result[2].image + '" alt="" class="image-slider">';
            slider3 = slider3 + ' <div class="carousel-caption"><h3> ' + result[2].description +'</h3></div>';

            $("#slider1").html(slider1);
            $("#slider2").html(slider2);
            $("#slider3").html(slider3);
            console.log(slider3);
        }
    });

    // LOAD LASTEST POSTS
    $.ajax({
        url : '/page-api/get-newest',
        type : 'get',
        dataType : 'json',
        success : function (result){
           var html = '';
           result.forEach(element => {
               html += createPostCart(element);
           });
           console.log(html);
           $("#newest-post").html(html);
        }
    });


    function createPostCart(cart){
        var tomtat = cart.content.substring(0, 65) + '...';
        var html = '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 wow flipInY" style="height: 200px"><div class="card" style="width: 100%;"><img class="card-img-top" src="';
        html = html + cart.imageUrl + '" style="height: 100%; width: 100%">' + '<div class="card-body"><a href="#" class="card-title">' + cart.title;
        html = html + '</a><p class="card-text">' + tomtat;
        html = html + '</p><p class="card-text"><small class="text-muted">' + cart.showTime + '</small></p></p></div></div></div>' ;
        console.log(html);
        return html;
    }
});