//main.js file
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
      ui.fxPrdDetailScroll();
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
        ui.fxSticky();
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
            /* �ㅽ겕由쏀듃異붽� 202305[s]  */
            var isTopBanner = $('div').is('.topAreaSwiper');
            if(isTopBanner){
                $('body').addClass('topSlideY');
                $('.topAreaSwiper').slideDown();
              }else{
                $('body').removeClass('topSlideY');
              }
            /* �ㅽ겕由쏀듃異붽� 202305[e]  */ 
          (ui.window.scrollTop <= 0) ? ui.$html.removeClass('ps-header--white').addClass('top'): ui.$html.removeClass('top');
          (ui.window.scrollTop > 0) ? $('#psHeader').addClass('ps-header--white'): $('#psHeader').removeClass('ps-header--white');
          (ui.window.scrollTop <= 5) ? $('#psHeader').removeClass('ps-header--white').addClass('top'): $('#psHeader').removeClass('top');
          (ui.window.height + ui.window.scrollTop >= ui.document.height) ? ui.$html.addClass('bottom'): ui.$html.removeClass('bottom');
          (ui.window.height + ui.window.scrollTop >= ui.document.height) ? $('#psHeader').addClass('bottom'): $('#psHeader').removeClass('bottom');
          beforePositon = ui.window.scrollTop;
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
    fxSticky: function () {
      $('.ui.ps-sticky').each(function () {
        var obj = $(this);
        if (obj.data('state') == undefined) {
          obj.data('state', 'ready');
          if (obj.data('top') == undefined) obj.data('top', 0);
          obj.data('start', obj.offset().top - obj.data('top'));
          $(window).scroll(function () {
            if (!obj.hasClass('fixed')) obj.data('start', obj.offset().top - obj.data('top'));
            if (ui.window.scrollTop > obj.data('start')) {
              if (!obj.next().hasClass('ego')) {
                $('<div>').addClass('ego').css('height', obj.outerHeight() + parseInt(obj.css('margin-bottom'), 10)).insertAfter(obj);
                if (obj.data('before')) new Function(obj.data('before'))()
              }
              obj.addClass('fixed').css({
                'position': 'fixed',
                'top': obj.data('top')
              });
            } else {
              if (obj.next().hasClass('ego')) {
                obj.next().remove();
                if (obj.data('before')) new Function(obj.data('restore'))()
              }
              obj.removeClass('fixed').css({
                'position': '',
                'top': ''
              });
            }
          })
        }
      })
    },
    /**
     * comment  : GNB
     * param    : 
     * @author  : 
     * @date    : 
     */
    fxGnb: function () {
      $('.ps-btn.ps-icon--menu').on('click', function () {
        $('.ps-gnb__wrap').toggleClass('on');
        /*[s] 2024 蹂�寃� */
        // $(this).toggleClass('ps-icon--close');
        ui.$html.addClass('scroll-lock') 
        if ($(this).hasClass('ps-icon--close')) {
          $('.ps-gnb__wrap, .ps-gnb-sub__wrap').removeClass('on');
          ui.$html.removeClass('scroll-lock'); 
        }
        /*[e] 2024 蹂�寃� */
      })
      $('[data-target].ps-btn.ps-btn--gnb').on('click', function () {
        // $(this).siblings('.ps-gnb-sub__wrap').addClass('on');
        let btn = $(this).data('target');
        console.log(btn);
        $('#'+btn).addClass('on');
      })
      $('.ps-btn.ps-btn--back').on('click', function () {
        $(this).closest('.ps-gnb-sub__wrap').removeClass('on');
        $('.ps-gnb-sub__toggle button').removeClass('on'); /* 2024new 異붽� �꾨쾭嫄� 珥덇린�� */
        $('.ps-gnb-sub__toggle .ps-toggle__list').removeAttr('style'); /* 2024new 異붽� �꾨쾭嫄� 珥덇린�� */
      })
      $('[data-href].ps-btn.ps-btn--gnb').on('click', function () {
        //console.log($(this).data('href'))
        location.href = $(this).data('href')
      })
      /* 2024new 異붽� gnb �좉�&�ㅽ겕濡� */
      $('.ps-gnb-sub__toggle .btn-arr').on('click', function() {
        var $toggle = $(this).closest('.ps-gnb-sub__toggle');
        var $list = $(this).next('.ps-toggle__list');
        var $body = $toggle.closest('.ps-gnb-sub__body');
        $(this).toggleClass('on');
        $list.slideToggle(200, function() {
            // �좊땲硫붿씠�섏씠 �꾨즺�� �� �ㅽ뻾�섎뒗 肄쒕갚 �⑥닔
            if ($list.is(':visible')) {
              if ($toggle.is(':not(:first-child)')) {
                // ps-gnb-sub__toggle �붿냼瑜� ps-gnb-sub__body�� �곷떒�쇰줈 �ㅽ겕濡�
                $body.animate({
                    scrollTop: $toggle.position().top + $body.scrollTop() - 55
                }, 300,'swing');
            }
            }
        });
    });
  
    
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
      });
    },
    /**
     * comment  : �ㅽ떚��
     * param    : 
     * @author  : 
     * @date    : 
     */
     fxPrdDetailScroll: function () {
  
      // �곹뭹�곸꽭 ��
      var $prdDetailTab = $('.ps-prd-detail--tab');
  
      if ($prdDetailTab.length > 0) {
        ui.window.$this.on({
          'scroll': function () {
            if ($prdDetailTab.offset().top < ui.window.scrollTop) {
              $('.detail-tab').addClass('on');
            } else {
              $('.detail-tab').removeClass('on');
            }
          }
        });
      }
      
      $('.anchor').on('click', function(){
        var $this = $(this);
        var $target = $('.ps-prd-detail');
        var $top = $target.offset().top;
        $('html, body').animate({
          scrollTop: $top - 56
        }, 500);
        return false;
      })
  
      // �곹뭹�곸꽭 異붽��듭뀡
      var $bottomOption = $('.ps-buy');
      var $content = $('.ps-content'); //.ps-prd-detail
      
      if ($bottomOption.length > 0) {
        $('.ps-footer').addClass("active");
        ui.window.$this.on({
          'scroll': function () {
            if ($content.offset().top + $content.outerHeight() < ui.window.scrollTop + ui.window.height) {
              // $bottomOption.addClass('active');
              $('.ps-bottom-layer').removeClass('active');
            } else {
              $bottomOption.removeClass('active');
            }
          }
        });
      }
  
    },
  }
  
  /**
   * comment  : �앹뾽
   * param    : 
   * @author  : 
   * @date    :
   */
  
  // �앹뾽 �ㅽ뵂 踰꾪듉 - data-open-layer="�앹뾽 �대옒��"
  // �앹뾽 - data-layer-target="�앹뾽 �대옒��"
  // �앹뾽 �リ린 踰꾪듉 - data-close-layer="�앹뾽 �대옒��"
  function layerPopup() {
    $('[data-open-layer]').on('click', function(){
      var data = $(this).data('open-layer');
      $('[data-layer-target="'+ data +'"]').addClass('active');
      $('html,body').addClass('overflow-h ios-scroll-lock');
    });
  
    $('[data-close-layer]').on('click', function(){
      var data = $(this).data('close-layer');
      $('[data-layer-target="'+ data +'"]').removeClass('active');
      $('html,body').removeClass('overflow-h ios-scroll-lock');
    });
  }
  
  function fxLayerOutsideClose () {
    var $modal = $('.ps-bottom-layer');
    $(window).on('click', function(event) {
      for (var i = 0; i < $modal.length; i++) {
        if (event.target == $modal[i]) {
          $modal.removeClass('active');
          $('html,body').removeClass('overflow-h ios-scroll-lock'); //ios-scroll-lock 추가
        }
      }
    });
  }
  
  // �대찓�� �꾨찓�� 泥댄겕
  function changeMailDomain(domain) {
    var $this = domain.value;
    if (!$this == '') {
      $('.inp-domain').attr('disabled', true);
      $('.inp-domain').val($this);
      if ($this == '99' || $this == '999') {
        $('.inp-domain').attr('disabled', false).val('').focus();
      }
    }
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
    
    $('.ps-btn2-clipboard').on('click', function () {
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
  
  //�щ젰
  function calender(){
    $(".datepicker").datepicker({
      showOn: "button",
      buttonImage: "//atcimage.prospecs.com/mobile/images/renewal/icon_calendar.png",
      buttonImageOnly: true,
      buttonText: "Select date",
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
  }
  
  $(function () {
    ui.fxInit();
    layerPopup();
  
    // slider
    slide();
  
    // layer popup close outside
    fxLayerOutsideClose();
  
    // 怨듭쑀�섍린 url 蹂듭궗
    CopyUrlToClipboard();
  
    if($('.datepicker').length > 0){
      calender();
    }
  
    //�� 踰꾪듉
    $(".btn-tip").on("click",function(){
        $(this).find(".tip-box").toggle();
    });
  
    //select ���됲듃 �좏깮 ��,�� �고듃 �됱긽 蹂�寃�
    $('.ps-select').on('change',function(){
      if($(this).val() !== ''){
        $(this).css('color','#222');
      }else{
        $(this).css('color','#999');
      }
    });
  
    //�꾩떆由ъ뒪�� �쒖꽦��
    /*$(".ps-btn.wishlist").on('click',function(){
      $(this).toggleClass('on');
    });*/
  
    //怨듭쑀�섍린踰꾪듉 �쒖꽦��
    $(".ps-btn.share").on('click',function(e){
      $(this).toggleClass('active');
      e.stopPropagation();
    });
  
    $('body').click(function(e) {
      $('.ps-btn.share').removeClass('active');
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
  })