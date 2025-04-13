$(document).ready(function(){

  $(".collapsive").collapse({
    query: 'div h2'
  });

  $('nav').slicknav({
  	label: 'Menu',
  	duration: 300,
  	prependTo:'.menuSlickNav'
  });

  $('nav li').hover(
    function () {
      $('ul', this).stop().slideDown(100);
    },
    function () {
      $('ul', this).stop().slideUp(100);
    }
  );

    $("#wbslider").owlCarousel({
      autoPlay: true,
      stopOnHover: true,
      pagination: true,
      // paginationNumbers: true,
      singleItem: true

    });

});
