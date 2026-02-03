/**
 * ps_script.js file
 */
 var ui = {
    /**
     * comment  : 怨듯넻蹂���
     * param    : 
     * @author  : 
     * @date    : 
     */
    window: {
      $this: $(window),
      height: null,
      scrollTop: null
    },
    document: {
      $this: $(document),
      height: null,
    },
    $html: $('html'),
    $body: null,
    $wrap: null,
  
    /**
     * comment  : 珥덇린��
     * param    : 
     * @author  : 
     * @date    : 
     */
    fxInit: function () {
      // Detectizr.detect({
      //   detectScreen: false
      // });
      ui.fxEventWindow();
      ui.fxUserAgent();
      ui.fxCheckScroll();
      ui.fxTab();
      ui.fxLayer();
      ui.fxSelect();
      ui.fxPrdDetailScroll();
      ui.fxCateMenu();
      ui.fileInput();
      ui.filterClose();
  
      $('.selectric-ps-select > span').remove();
    },
    /**
     * comment  : �덈룄�� �대깽��
     * param    : 
     * @author  : 
     * @date    : 
     */
    fxEventWindow: function () {
      $(function () {
        ui.$body = $('body');
        ui.$wrap = $('body > .content-wrap');
        // ui.fxSticky();
        ui.fxGnb();
      });
      ui.window.$this.on({
        'load': function () {
          ui.window.scrollTop = ui.window.$this.scrollTop();
          ui.window.height = ui.window.$this.height();
          ui.document.height = ui.document.$this.height();
        },
        'scroll': function () {
          ui.window.scrollTop = ui.window.$this.scrollTop();
          ui.document.height = ui.document.$this.height();
        },
        'resize': function () {
          ui.window.height = ui.window.$this.height();
        }
      })
    },
    /**
     * comment  : 釉뚮씪�곗� �뺣낫 �뺤씤 
     * param    : 
     * @author  : 
     * @date    : 
     */
    fxUserAgent: function () {
      /* mobile */
      if (navigator.userAgent.match(/Android/i) !== null) {
        $('html').addClass('android');
      } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null) {
        $('html').addClass('ios');
      } else if (navigator.userAgent.match(/IEMobile/i) !== null) {
        $('html').addClass('iemobile');
      } else if (navigator.userAgent.match(/BlackBerry/i) !== null) {
        $('html').addClass('blackberry');
      } else if (navigator.userAgent.match(/Opera Mini/i) !== null) {
        $('html').addClass('operamini');
      }
      /* pc */
      if (navigator.userAgent.match(/MSIE/i) !== null || !!navigator.userAgent.match(/Trident.*rv:11./)) {
        /* ie ~ 10 源뚯� || window8 edge */
        $('html').addClass('msie');
      } else if (navigator.userAgent.match(/Edge\//i) !== null) {
        $('html').addClass('edge');
      } else if (navigator.userAgent.match(/Edg\//i) !== null) {
        $('html').addClass('chromiumedge');
      } else if (navigator.userAgent.match(/Chrome/i) !== null) {
        $('html').addClass('chrome');
      } else if (navigator.userAgent.match(/Safari/i) !== null) {
        $('html').addClass('safari');
      } else if (navigator.userAgent.match(/Firefox/i)) {
        $('html').addClass('firefox');
      }
    },
    /**
     * comment  : �꾩옱 �ㅽ겕濡� 諛⑺뼢 & top,bottom �щ�瑜� html�쒓렇�� �섑��� top, bottom & up, down
     * param    : 
     * @author  : 
     * @date    : 
     */
    fxCheckScroll: function () {
      var beforePositon = 0;
      ui.window.$this.on({
        'load': function () {
          (ui.window.scrollTop <= 5) ? ui.$html.removeClass('ps-header--white').addClass('top'): ui.$html.removeClass('top');
          (ui.window.scrollTop > 0) ? $('#psHeader').addClass('ps-header--white'): $('#psHeader').removeClass('ps-header--white');
          (ui.window.scrollTop <= 5) ? $('#psHeader').removeClass('ps-header--white').addClass('top'): $('#psHeader').removeClass('top');
          (ui.window.scrollTop > 0) ? $('#psHeader').addClass('up'): $('#psHeader').removeClass('down');
          (ui.window.height + ui.window.scrollTop >= ui.document.height) ? ui.$html.addClass('bottom'): ui.$html.removeClass('bottom');
          (ui.window.height + ui.window.scrollTop >= ui.document.height) ? $('#psHeader').addClass('bottom'): $('#psHeader').removeClass('bottom');
        },
        'scroll': function () {
          if (beforePositon > ui.window.scrollTop) {
            ui.$html.removeClass('down').addClass('up');
            $('#psHeader').removeClass('down').addClass('up');
          } else if (beforePositon < ui.window.scrollTop) {
            ui.$html.removeClass('up').addClass('down');
            $('#psHeader').removeClass('up').addClass('down');
          }
          (ui.window.scrollTop <= 0) ? ui.$html.removeClass('ps-header--white').addClass('top'): ui.$html.removeClass('top');
            (ui.window.scrollTop > 0) ? $('#psHeader').addClass('ps-header--white'): $('#psHeader').removeClass('ps-header--white');
            (ui.window.scrollTop <= 5) ? $('#psHeader').removeClass('ps-header--white').addClass('top'): $('#psHeader').removeClass('top');
          (ui.window.height + ui.window.scrollTop >= ui.document.height) ? ui.$html.addClass('bottom'): ui.$html.removeClass('bottom');
          (ui.window.height + ui.window.scrollTop >= ui.document.height) ? $('#psHeader').addClass('bottom'): $('#psHeader').removeClass('bottom');
          beforePositon = ui.window.scrollTop;
        }
      })
    },
    /**
     * comment  : �ㅽ떚��
     * param    : 
     * @author  : 
     * @date    : 
     */
    // fxSticky: function () {
    //   $('.ui.ps-sticky').each(function () {
    //     var obj = $(this);
    //     if (obj.data('state') == undefined) {
    //       obj.data('state', 'ready');
    //       if (obj.data('top') == undefined) obj.data('top', 0);
    //       obj.data('start', obj.offset().top - obj.data('top'));
    //       $(window).scroll(function () {
    //         if (!obj.hasClass('fixed')) obj.data('start', obj.offset().top - obj.data('top'));
    //         if (ui.window.scrollTop > obj.data('start')) {
    //           if (!obj.next().hasClass('ego')) {
    //             $('<div>').addClass('ego').css('height', obj.outerHeight() + parseInt(obj.css('margin-bottom'), 10)).insertAfter(obj);
    //             if (obj.data('before')) new Function(obj.data('before'))()
    //           }
    //           obj.addClass('fixed').css({
    //             'position': 'fixed',
    //             'top': obj.data('top')
    //           });
    //         } else {
    //           if (obj.next().hasClass('ego')) {
    //             obj.next().remove();
    //             if (obj.data('before')) new Function(obj.data('restore'))()
    //           }
    //           obj.removeClass('fixed').css({
    //             'position': '',
    //             'top': ''
    //           });
    //         }
    //       })
    //     }
    //   })
    // },
    /**
     * comment  : GNB
     * param    : 
     * @author  : 
     * @date    : 
     */
    fxGnb: function () {
      $('#psHeader .gnb__item').on({
        mouseenter: function () {
          $(this).find('.gnb__dropdown').stop().slideDown(300);
          $(this).find('a').addClass('on'); /* 2024 추가 */
        },
        mouseleave: function () {
          $(this).find('.gnb__dropdown').stop().slideUp(300);
          $(this).find('a').removeClass('on'); /* 2024 추가 */
        }
      });
      $('.ps-header--gnb .gnb__item .gnb__link').on({
        mouseenter: function () {
          $('#psHeader').addClass('hover');
        }
      });
      $('#psHeader').on({
        mouseenter: function () {
          $('#psHeader').addClass('hover');
        },
        mouseleave: function () {
          setTimeout(function () {
            $('#psHeader').removeClass('hover');
          }, 200);
        }
      });
      $('#psHeader .ps-btn.ps-icon--search').on({
        click: function () {
          $('#psHeader .ps-header--search').slideToggle(300)
          $('#psHeader').toggleClass('ps-header--on');
        }
      })
       /*[s] 2024new 추가 */
      $('.btn-close-searchBox').on({
        click: function(){
          $('#psHeader .ps-header--search').fadeOut(100);
          $('#psHeader').removeClass('ps-header--on');
        }
      })
      $('.ps-search--header .ps-input-wrap input').on({
        keyup:function(){
          $(this).val() == '' ? $('.search-close--btn').hide() : $('.search-close--btn').show();
        }
      })
      $('.search-close--btn').on({
        click:function(){
          $('.ps-search--header .ps-input-wrap input').val('');
          $('.search-close--btn').hide()
        }
      });
      /*[e] 2024new 추가 */
    },
  
    /**
     * comment  : ��
     * param    : 
     * @author  : 
     * @date    :
     */
    fxTab: function () {
      $('.ui.ps-tab').each(function () {
        var obj = $(this);
        if (obj.data('state') == undefined) {
          obj.data('state', 'ready');
          if (obj.find('[role=tab][aria-selected="true"]').length == 1) {
            obj.find('[role=tab]').bind('click', function () {
              if ($(this).attr('aria-selected') !== 'true') {
                $(this).attr('aria-selected', true).siblings().attr('aria-selected', false);
                $($(this).attr('href')).show().attr('hidden', false);
                $($(this).attr('href')).removeClass('hidden');
                $(this).siblings().each(function () {
                  $($(this).attr('href')).hide().attr('hidden', true);
                  $($(this).attr('href')).addClass('hidden');
                })
              }
              return false;
            })
          } else {
            console.log('ui error : aria-selected length')
          }
        }
      })
    },
    /**
     * comment  : �앹뾽
     * param    : 
     * @author  : 
     * @date    :
     */
  
    // 紐⑤떖�앹뾽 �ㅽ뵂 踰꾪듉 - data-open-layer="�앹뾽 �대옒��", .open-layer
    // 紐⑤떖�앹뾽 - data-layer-target="�앹뾽 �대옒��"
    // 紐⑤떖�앹뾽 �リ린 踰꾪듉 - .trigger"
    fxLayer: function() {
      $('[data-open-layer]').on('click', function(){
        var data =$(this).data('open-layer');
        $('[data-layer-target="'+ data +'"]').addClass('open');
      });
  
      $('.ps-layer-popup--close').on('click', function(){
        var data = $(this).data('close-layer');
        $('[data-layer-target="'+ data +'"]').removeClass('open');
      });
      
      ui.fxSelect();
    },
    /**
     * comment  : Selectbox
     * param    : 
     * @author  : 
     * @date    :
     */
    fxSelect: function() {
      $('.ps-select').selectric();
      $('.selectric-input').remove();
    
      //$('.selectric-scroll ul li')
  
    },
    fxPrdDetailScroll: function () {
      // �곹뭹�곸꽭 ��
      var $prdDetailTab = $('.ps-prd-detail--tab');
  
      if ($prdDetailTab.length > 0) {
        ui.window.$this.on({
          'scroll': function () {
            if ($prdDetailTab.offset().top < ui.window.scrollTop) {
              $('.ps-prd-detail--tab-inner').addClass('on');
            } else {
              $('.ps-prd-detail--tab-inner').removeClass('on');
            }
  
            var $itp = $('.ps-prd-detail--content');
            var $itpHeight = 0;
            var $itpIndex = 0;
            var $itpTop = 0;
            var $itpBottom = 0;
            for (var i = 0; i < $itp.length; i++)
            {
              $itpHeight = $itp.eq(i).outerHeight();
              $itpTop = $itp.eq(i).offset().top - 120;
              $itpBottom = $itpTop + $itpHeight;
  
              if ($itpTop <= ui.window.scrollTop && ui.window.scrollTop <= $itpBottom)
              {
                $itpIndex = i;
              }
            }
            $(".ps-tab--wrap a").removeClass("active");
            $(".ps-tab--wrap a:eq(" + $itpIndex + ")").addClass("active");          
          }
        });
      }
  
      $('.anchor').on('click', function(){
        var $this = $(this);
        var $index = $this.index();
  
        $('.anchor').removeClass('active');
        $this.addClass('active');
  
        var $target = $('.ps-prd-detail--content');
        var $top = $target.eq($index).offset().top;
        $('html, body').animate({
          scrollTop: $top - 100
        }, 500);
        return false;
      })
  
      // �곹뭹�곸꽭 異붽��듭뀡
      var $bottomOption = $('.ps-bottom-options');
      var $content = $('.ps-prd-detail');
      
      if ($bottomOption.length > 0) {
        ui.window.$this.on({
          'scroll': function () {
            if ($content.offset().top < ui.window.scrollTop && $content.offset().top + $content.outerHeight() > ui.window.scrollTop + ui.window.height) {
              $bottomOption.addClass('active');
            } else {
              $bottomOption.removeClass('active');
              $('.ps-bottom-options--item-btn').removeClass('active');
              $('.ps-bottom-options--item-btn').next('.ps-bottom-options--wrap').slideUp();
            }
          }
        });
      }
  
    },
      /**
     * comment  : �ㅽ떚��
     * param    : 
     * @author  : 
     * @date    : 
     */
      fxStickyRight: function() {
          ui.window.$this.on({
        'scroll': function () {
                  var $orderLayout = $('.order-layout');
                  var $orderLayoutR = $('.order-layout--r');
                  if ($orderLayoutR.length > 0) {					
                      var $end = $orderLayout.offset().top + $orderLayout.outerHeight();
                      if (ui.window.scrollTop > $orderLayout.offset().top && ui.window.scrollTop < $end - $orderLayoutR.outerHeight()) {
                          $orderLayoutR.removeClass('bottom');
                          $orderLayoutR.addClass('top');
                      } else if (ui.window.scrollTop < $orderLayout.offset().top - 120) {
                          $orderLayoutR.removeClass('top');
                      }
                      if (ui.window.scrollTop > $end - $orderLayoutR.outerHeight()) {
                          $orderLayoutR.removeClass('top');
                          $orderLayoutR.addClass('bottom');
                      }
                  }
        }
      })
    },
    /**
     * comment  : �ㅽ떚�� 
     * param    : 
     * @author  : 
     * @date    : 
     */
    fxCateMenu: function() {
      const $cateMenu = $('.category-sticky');
      const $cateMenuInner = $('.category-sticky--inner');
  
      ui.window.$this.on({
        'scroll': function () {
          if($cateMenu.length > 0) {
            var $end = $cateMenu.offset().top + $cateMenu.outerHeight();
           
            if(ui.window.scrollTop > $cateMenu.offset().top) {
              $cateMenuInner.addClass('on');
            } else {
              $cateMenuInner.removeClass('on');
            }
          }
        }
      })
    },
    fileInput: function() {
      const $file = $('.ps-file');
  
      $file.find('input[type="file"]').on({
        'change': function () {
          let filename = $(this)[0].files[0].name;
         
          $(this).siblings('.upload-name').text(filename);
  
        }
      })
    },
     /**
     * comment  : �꾪꽣寃��� �곸뿭 諛� �대┃�� �リ린
     * param    : 
     * @author  : 
     * @date    : 
     */
    filterClose: function() {
      const $filter = $('.ps-filter');
      
      $(document).mouseup(function(e){   
        if($filter.has(e.target).length == 0 && $('.ps-list-filter').has(e.target).length == 0) {
          $filter.removeClass('open');
        }
      }); 
    }
  }
  
  // 怨듭쑀�섍린 url 蹂듭궗
  function CopyUrlToClipboard(){
    var ct;
    $('.ps-btn-clipboard').on('click', function () {
      end();
      var dummy = document.createElement("input");
      var text = location.href;      
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      $('.ps-toast-msg').addClass('on');
      start();
    });
  
    function start() {
      ct = setTimeout(function(){
        $('.ps-toast-msg').removeClass('on');
      }, 1000);
    }
    function end() {
      clearTimeout(ct);
    }
  }
  
  // �곹뭹�곸꽭 �대�吏� 援먯껜
  function thumbnail() {
    $('.ps-item--viewer-list a, .ps-item--viewer-list video').on('click', function () {
      //�쒓렇 �대쫫 諛쏆븘�ㅺ린
      const name = $(this).children()[0].tagName;
  
      $(this).closest('.ps-item--viewer-list').find('.item').removeClass('on');
      $(this).closest('.item').addClass('on');
      
      //硫붿씤�곹뭹 �대�吏� or 鍮꾨뵒�� ��젣
      $('.ps-view-main').find("img,video").remove();
  
      let path, html;
  
      //img/video �ｊ린
      if(name === 'IMG') {
        path = $(this).find('img').attr('src');
        html = `<img src=${path} onerror="this.src='<%=ImageUtil.getNoImage('90')%>'" class="ps-item--viewer-img">`;
      } else if(name === 'VIDEO' || name === 'SOURCE') {
        path = $(this).find('source').attr('src');
        html = `<video autoplay="autoplay" muted="muted" loop="loop" preload="auto" style="width:100%;">
            <source type="video/mp4" src=${path} onerror="this.src='<%=ImageUtil.getNoImage("90")%>'">
          </video>`;
      }
  
      $('.ps-view-main').append(html);
    });
  }
  
  // slider
  function slide() {
    $('.ps-slide-item a').on('click', function () {
      var $this = $(this);
      if ( $this.next().css('display') == 'none' ) {
        $this.closest('.ps-slide').find('.ps-slide-item').removeClass('on');
        $this.closest('.ps-slide').find('.ps-slide-content').slideUp(300);
        $this.closest('.ps-slide-item').addClass('on');
        $this.next().slideDown(300);
      } else {
        $this.closest('.ps-slide').find('.ps-slide-item').removeClass('on');
        $this.closest('.ps-slide').find('.ps-slide-content').slideUp(300);
      }
    });
  }
  
  //search btn
  function searchBtn(_this) {
    let len = _this.val().length;
    const $sch_btn =  _this.closest('.ps-search--box').find('.search-close--btn'); 
  
    if(len > 0) {
      $sch_btn.show();
    } else {
      $sch_btn.hide();
    }
  }
  
  $(function () {
    ui.fxInit();
  
    // 怨듭쑀�섍린 url 蹂듭궗
    CopyUrlToClipboard();
  
    // �곹뭹�곸꽭 �대�吏� 援먯껜
    // thumbnail();
  
    // slider
    slide();
  
      $(".datepicker").datepicker({
          closeText: '�リ린',
          prevText: '�댁쟾 ��',
          nextText: '�ㅼ쓬 ��',
          currentText: '�ㅻ뒛蹂닿린',			
          monthNames: ['1','2','3','4','5','6','7','8','9','10','11','12'],
          monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
          dayNames: ['��','��','��','��','紐�','湲�','��'],
          dayNamesShort: ['��','��','��','��','紐�','湲�','��'],
          dayNamesMin: ['��','��','��','��','紐�','湲�','��'],
          dateFormat: 'yy.mm.dd',
          showMonthAfterYear: true,
          changeMonth: false,
          changeYear: false,
          yearSuffix: '��',
          showButtonPanel : true,
      });
  
  
    //search cloase btn
    $('.ps-search--box input[type="text"]').keyup(function(){
      searchBtn($(this));
    });
  
    $('.search-close--btn').click(function(){
        $(this).siblings('input').val('');
        $(this).hide();
    });
    //search
  
    //wishlist
    $('.ps-btn.wishlist').click(function(){
      $(this).toggleClass('on');
      // $('.basket-popup').addClass('open');
    });
  
    // �ㅻ뒛蹂몄긽�� �꾩껜 泥댄겕
    let allCount = $('.sel-chk').length;
  
    $(".all-chk").on('change',function(){
      if($(this).prop('checked')=== true){
        $('.sel-chk').prop('checked',true);
      }else{
        $('.sel-chk').prop('checked',false);
      }
    });
  
    //媛쒕퀎 泥댄겕
    $('.sel-chk').on('change',function(){
      let selectChk = $('.sel-chk:checked').length;
  
      if(allCount == selectChk ){
          $('.all-chk').prop('checked',true);
      }else{
        $('.all-chk').prop('checked',false);
      }
    });
  
      // faq 寃��됱갹 �쒖꽦��
      $('.search-input').on('keyup',function(){
          if($(this).val().length > 0){
              $(this).next('.search').removeClass('gray');
          }else{
              $(this).next('.search').addClass('gray');
          }
      })
  });
  
  jQuery(document).ready(function($) {
  
    $(".faq-text").focus(function(){
      $(this).parent().removeClass("off");
      $(this).parent().addClass("on");
   
     }).blur(function(){
      $(this).parent().removeClass("on");
      $(this).parent().addClass("off");
     })
   
   }); 
   
  //  $( document ).ready(function() {
  //    $('.trigger-login').on('click', function() {
  //       $('.modal-wrapper').toggleClass('open');
  //      $('.page-wrapper').toggleClass('blur-it');
  //       return false;
  //    });
     
  //  });
   
  // modal �リ린
   
   $( document ).ready(function() {
     $(document).on('click', '.trigger', function() {
      //   $('.modal-wrapper').toggleClass('open');
      //  $('.page-wrapper').toggleClass('blur-it');
      //   return false;
        $(this).closest('.modal-wrapper').removeClass('open');
     });
   });
   
   // 二쇰Ц寃곗젣 �곗륫李� �믪씠媛믪씠 �덈Т �믪븘�� �ㅽ겕由쏀듃 �곸슜�� �대젮��
   // $(document).ready(function(){
   //   var currentPosition = parseInt($(".order-layout--r").css("top"));
   //   $(window).scroll(function() {
   //     var fixed = $(window).scrollTop(); 
   //     $(".order-layout--r").stop().animate({"top":fixed+currentPosition+"px"},500);
   //   });
   // });
   
   // radio--tab
   
   function openRadioTab(evt, cityName) {
     var i, tabcontent, tablinks;
     tabcontent = document.getElementsByClassName("tabcontent");
     for (i = 0; i < tabcontent.length; i++) {
       tabcontent[i].style.display = "none";
     }
     tablinks = document.getElementsByClassName("tablinks");
     for (i = 0; i < tablinks.length; i++) {
       tablinks[i].className = tablinks[i].className.replace(" active", "");
     }
     document.getElementById(cityName).style.display = "block";
     evt.currentTarget.className += " active";
   }
   
    /*[s] 2024new 20240314추가 */
    $(function(){
      $('.ps-search--header .ps-input-wrap input').on({
        keyup:function(){
          $(this).val() == '' ? $('.search-close--btn').hide() : $('.search-close--btn').show();
        }
      })
      $('.search-close--btn').on({
        click:function(){
          $('.ps-search--header .ps-input-wrap input').val('');
          $('.search-close--btn').hide()
        }
      });
    })
    /*[e] 2024new 추가 */