(function ($) {
    var Private = {
        init: function() {
            Private.documentReady();
            Private.owlCarousel();
            Private.tabControl();
            Private.controlsDrop();
            Private.cdModal();
            Private.dropSearch();
            Private.itemCardAside();
        },
        documentReady: function () {
            console.log("Document ready!");
        },
        owlCarousel: function(){
            $('.main-slider-block').owlCarousel({
                navigation : true,
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true,
                pagination : false,
                mouseDrag: false
            });
            $('#carousel_reviews').owlCarousel({
                navigation : false, 
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true,
                pagination : true,
                autoPlay : 3000
            });
            $('#carousel_certificates').owlCarousel({ 
                navigation : false, 
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true,
                pagination : true,
                autoPlay : 4500
            });
            $("#carousel_certificates-4").owlCarousel({
                items : 4,
                navigation : true,
                pagination : false,
                slideSpeed : 300,
                paginationSpeed : 400,
                autoPlay : 3000,
                autoPlay : 4500,
            });
        },
        tabControl: function(){
            var tabsControlItem = $('.tabs_control-item'),
                tabsListItem = $('.tabs_list-item'),
                tabsControl = $('.tabs_control');

                tabsControlItem.on('click', function(){
                    var _this = $(this),
                        _thisIndex = _this.index();

                        tabsControl.attr('data-number', _thisIndex)

                        tabsListItem.eq(_thisIndex)
                            .add(_this)
                            .addClass('active')
                            .siblings('')
                            .removeClass('active')
                });
        },
        controlsDrop: function(){
            var listItemFirst = $('.list_item-first'),
                listItemDouble = $('.list_item-double'),
                duration = 300;

            listItemFirst.on('click', function() {
                var _this = $(this),
                    _siblingDouble = _this.siblings('ul.list_item-double[data-drop='+$(this).attr('data-drop')+']');

                if(_siblingDouble.length){
                    if(!_siblingDouble.hasClass('is-visible')){
                        listItemFirst.removeClass('active');
                        listItemDouble.removeClass('is-visible');
                        listItemDouble.slideUp(duration);

                        _this.addClass('active');

                        _siblingDouble.addClass('is-visible');
                        _siblingDouble.slideDown(duration);
                    } else{
                        _siblingDouble.slideUp(duration, function(){
                            _siblingDouble.removeClass('is-visible');
                            _this.removeClass('active');
                        });
                    }
                    return false;
                } else{
                    return true;
                }
            });
        },
        cdModal: function(){
            var cdModal = $('.cd_modal');

            $('.cd-trigger').on('click', function(event){
                event.preventDefault();
                $('.cd_modal-'+$(this).data('modal')).addClass('is-visible');
            });
            // close modal when clicking the ESC keyboard button
            $(document).keyup(function(event) {
                if(event.which == '27'){
                    $('.cd_modal.is-visible').removeClass('is-visible');
                }
            });
            // close when clicking background
            $('.cd_modal').on('click', function(event){
                if($(event.target).is($(this))){
                    $(this).removeClass('is-visible');
                }
                if($(event.target).is($('a.cd_modal-close'))){
                    $(this).removeClass('is-visible');
                }
            });
        },
        dropSearch: function(){
            $('.search-item').on('click', function(event){
                event.preventDefault();
                
                if(!$(event.target).is($('.search-input-form'))){
                    $(this).toggleClass('active');
                }
            });
        },
        itemCardAside: function(){
            var itemCardAside = $('.item_card-aside'),
                firstLevel = itemCardAside.find('ul.first_level').children(),
                secondLevel = itemCardAside.find('ul.second_level'),
                thirdLevel = itemCardAside.find('ul.third_level'),
                secondLevelLi = secondLevel.children(),
                _isVisible = itemCardAside.find('.is-visible'),
                _isVisibleThird = _isVisible.children('ul.third_level'),
                duration = 300;

            // Open active menu when document load
            _isVisible.slideDown(duration);
            _isVisibleThird.slideDown(duration);
        
            // click first level
            firstLevel.on('click', 'a', function(){
               var _thisSecondLevel = $(this).next('ul.second_level');

                if(_thisSecondLevel.length){
                    if(!_thisSecondLevel.hasClass('is-visible')){
                        secondLevel.removeClass('is-visible')
                        .stop().slideUp(duration);

                        _thisSecondLevel.addClass('is-visible')
                        .stop().slideDown(duration);
                    } else{
                        _thisSecondLevel.removeClass('is-visible')
                        .stop().slideUp(duration);
                    }
                    return false; 
                } else{
                    return true;
                } 
            });
            // click second level
            secondLevelLi.on('click', 'a', function(){
                 var _thisThirdLevel = $(this).next('ul.third_level'),
                     _thisSecodLevel = _thisThirdLevel.closest('li');

                 if(_thisThirdLevel.length){
                    if(!_thisSecodLevel.hasClass('is-visible')){

                        secondLevel.children('li').removeClass('is-visible');
                        thirdLevel.stop().slideUp(duration);
                                  

                        _thisSecodLevel.addClass('is-visible');
                        _thisThirdLevel.stop().slideDown(duration);
                        
                    } else{
                        _thisThirdLevel.stop().slideUp(duration);
                        _thisSecodLevel.removeClass('is-visible');
                    }
                    return false;
                 } else{
                    return true;
                 }
            });
        }
    }
    Public = {
        googleMaps: function(){   
            // Maps 
            var office = new google.maps.LatLng(53.909378, 27.556865),
                optionsOffice = {
                    zoom: 16,
                    center: office,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                storage = new google.maps.LatLng(53.935863, 27.591541),
                optionsStorage = {
                    zoom: 16,
                    center: office,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                },
                iconMarker = 'img/marker.png';

            // Marker and connection map
            var mapOffice = new google.maps.Map(document.getElementById("map_office"), optionsOffice),
                marker = new google.maps.Marker({
                    position: office,
                    map: mapOffice,
                    icon: iconMarker
                });
            var mapStorage = new google.maps.Map(document.getElementById("map_storage"), optionsStorage),
                marker = new google.maps.Marker({
                    position: office,
                    map: mapStorage,
                    icon: iconMarker
                });
        }
    }
    $(document).ready(Private.init);
})(jQuery)