(function ($) {
  'use strict'

  // Preloader js    
  $(window).on('load', function () {
    $('.preloader').fadeOut(100)
  })

  // navigation
  $(window).scroll(function () {
    if ($('.navigation').offset().top > 1) {
      $('.navigation').addClass('nav-bg')
    } else {
      $('.navigation').removeClass('nav-bg')
    }
  })


  // video modal popup
  var $videoSrc
  $('.video-modal').click(function () {
    $videoSrc = $(this).data('src')
  })
  $('#videoModal').on('shown.bs.modal', function (e) {
    $('#video').attr('src', $videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0')
  })
  $('#videoModal').on('hide.bs.modal', function (e) {
    $('#video').attr('src', $videoSrc)
  })
  $('#videoModal2').on('shown.bs.modal', function (e) {
    $('#video2').attr('src', $videoSrc + '?autoplay=1&amp;modestbranding=1&amp;showinfo=0')
  })
  $('#videoModal2').on('hide.bs.modal', function (e) {
    $('#video2').attr('src', $videoSrc)
  })


  // testimonial slider
  $('.testimonial-slider').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-arrow-left\'></i></button>',
    nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-arrow-right\'></i></button>',
    autoplay: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 401,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  })


  // product Slider
  $('.product-slider').slick({
    autoplay: false,
    infinite: true,
    arrows: false,
    dots: true,
    customPaging: function (slider, i) {
      var image = $(slider.$slides[i]).data('image')
      return '<img class="img-fluid" src="' + image + '" alt="product-img">'
    }
  })


  // Accordions
  $('.collapse').on('shown.bs.collapse', function () {
    $(this).parent().find('.ti-plus').removeClass('ti-plus').addClass('ti-minus')
  }).on('hidden.bs.collapse', function () {
    $(this).parent().find('.ti-minus').removeClass('ti-minus').addClass('ti-plus')
  })

  // Form
  $('#form').submit(function (e) {
    e.preventDefault()
    let name = $('#name').val()
    let email = $('#email').val()
    let message = $('#message').val()
    let button = document.querySelector(".btn-submit-ticket")
    let form = $('#form')

    button.innerHTML = "Sending"
    button.classList.add("spinning")

    $.ajax({
      url: 'https://api.airtable.com/v0/appbY26WWMl5CJvf7/PPE%20MASK%20CLUB',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer keyBrV7Up0lvhGR2y',
      },
      contentType: 'application/json',
      data: JSON.stringify({
        'records': [
          {
            'fields': {
              'Email': email,
              'Name': name,
              'Message': message
            }
          }
        ]
      })
    })
        .done(function (data, textStatus, jqXHR) {
          console.log('HTTP Request Succeeded: ' + jqXHR.status)
          console.log(data)
          $('#reset').trigger('click')
          window.location.reload()
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log('HTTP Request Failed')
        })
        .always(function () {
          button.classList.remove('spinning');
          button.innerHTML = "Send Now";
        })
    return false
  })
})(jQuery)

if ('serviceWorker' in navigator) {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      location.reload()
    })
  }

  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
  })
}
