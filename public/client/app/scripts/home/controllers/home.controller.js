( function() {
    'use strict';
    
    angular
        .module('app.home')
        .controller('HomeController', HomeController);


    /**
     * @ngdoc HomeController
     * @name HomeController
     * @module app.home
     * @description
     * Home controller contains all the models related to home module
     * @author Tungstn Developers
     */
    function HomeController($scope, HomeService, OrderService, ProductService, toastr, $stateParams) {
        var vm = this;
        vm.designerContent = '';
        vm.designerName = '';
        vm.designerImage = ''
        
        $(document).ready(function(){
             $('.home-slider-section').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay:true,
                dots: true,
                arrows:false,
                focusOnSelect: false,
                prevArrow: '<i class="fa fa-chevron-circle-left slick-prev" aria-hidden="true"></i>',
                nextArrow: '<i class="fa fa-chevron-circle-right slick-next" aria-hidden="true"></i>'
            });
        });
        $(document).ready(function(){
            $('.slider-studio-section').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay:true,
                dots: true,
                autoplaySpeed:6000,
                arrows:true,
                focusOnSelect: false,
                prevArrow: '<i class="fa fa-chevron-circle-left slick-prev" aria-hidden="true"></i>',
                nextArrow: '<i class="fa fa-chevron-circle-right slick-next" aria-hidden="true"></i>'
            });
        });
        $(document).ready(function(){
             $('.slider-carousel').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay:true,
                dots: true,
                autoplaySpeed:6000,
                arrows:true,
                focusOnSelect: false,
                prevArrow: '<i class="fa fa-chevron-circle-left slick-prev" aria-hidden="true"></i>',
                nextArrow: '<i class="fa fa-chevron-circle-right slick-next" aria-hidden="true"></i>'
            });
        });
        $(document).ready(function(){
            $('.slider-section').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay:true,
                dots: true,
                autoplaySpeed:6000,
                arrows:true,
                focusOnSelect: false,
                prevArrow: '<i class="fa fa-chevron-circle-left slick-prev" aria-hidden="true"></i>',
                nextArrow: '<i class="fa fa-chevron-circle-right slick-next" aria-hidden="true"></i>'
            });
        });

        $('#appointmentModal').on('hidden.bs.modal', function (e) {
            $(this)
            .find("input,textarea,select")
            .val('')
            .end();
        });

        $('#designerModal').on('hidden.bs.modal', function (e) {
            vm.designerName = '';
            vm.designerContent = '';
            vm.designerImage = '';
        });

        vm.sendEnquiryDetails = function(userInfo) {
            userInfo.purpose = 'Schedule Appointment';
            userInfo.purposeType = 1;
            $('#appointmentModal').modal('hide');
            var promise = OrderService.sendEnquiryDetails(userInfo);
            promise.then(function(response) {
                if(response.data) {
                    toastr.success('You will be contacted by one of our representative shortly');
                    console.log('success-------');
                } else {
                    console.log('failure------');
                }
            });
        }

      vm.getSelectedProducts = function() {
          var productIds = [54, 22, 23, 24, 25];
          var data = {
              productIds: productIds
          }
          var promise = ProductService.getSelectedProducts(data);
          promise.then(function(response) {
              if(response.data) {
                  vm.carouselProducts = [];
                  vm.products = response.data.products;
                  console.log('before modification------', vm.products);
                  angular.forEach(vm.products, function(product) {
                     var productImages = product.product_detail.image.split(',');
                     product.productImages = productImages;
                  });
                    console.log('studio exclusive-------', vm.products[4].productImages[0]);
                  console.log('Home Products--------', vm.products);
                  vm.carouselProducts = vm.products.slice(0, 4);
                  console.log('Carousel Products--------', vm.carouselProducts);
              } else {
                  console.log('Sorry no products found');
              }
          });
      }

      vm.openDesignerInfoModal = function(designerName) {
        if(designerName == 'swathi') {
          vm.designerName = 'Swathi Purushothaman';
          vm.designerImage = 'swathi-circle.jpeg';
          vm.designerContent = 'I have always been a jack of all trades, but king of none. This made me realize that probably that is my strength. I never isolate the things that i do from each other - be it design, architecture, dance , relationships with people, places and things. I have a strange way of bringing them all together and this has made me enjoy my work process and drives me to do better.'+ 
            ' The love for well-made clothes that are unique and reflect one"s"' + 'personality is what got me making clothes for friends and family initially. With appreciation and demand for more, Studio 149 happened very organically and i didnt have any vision for it 3 years back. This is a baby i never planned on having - but have nurtured with all my heart. Moving to the UK post wedding has given me new waters to test and widened my horizons. Looking back today, i feel the journey here has taught me that every downfall makes me get back up stronger, every mistake teaches a new lesson and every relationship i have made contributes to my growth as a person, designer and entrepreneur.'
        } else if(designerName == 'neena') {
          vm.designerName= 'Neena Reddy';
          vm.designerImage = 'neena-circle.jpeg';
          vm.designerContent = 'As a designer, who believes in the power of creation,'+ 
             'I draw my inspiration from almost everything around me.' +
             'Inspiration I believe, is everywhere,"its the eye which seeks it".' +
             ' Sometimes I translate art into my designs and by doing that I consider'+
             'the embroidery frame as a canvas and I let my ideas take shape on it.' +
             ' Having an eye for detail, makes me work on every inch of the fabric to' +
             'precision. The basic fundamental for a good design is getting the colours' +
             'right and I think my sense of picking colours is the biggest advantage to me.'+ 
             ' Most of the time, things happened to me without ever seeking them, Studio149 is one of them and I love being part of its!'
        } else if(designerName == 'jose') {
          vm.designerName= 'Sandra Jose';
          vm.designerImage = 'jose-circle.jpeg';
          vm.designerContent = 'I have always been fascinated by the ability of certain colours and items of clothing to change moods or express emotions.  Growing up, I enjoyed experimenting with styles to create my own unique look, but during my study at Design colleges, I developed a real passion for working with different textures and materials to creating new designs. I am not a strong believer of being perfect, life can be more interesting and worth looking at it, if you just go with the flow.'+
            'Growing up in a place like kerala has influenced my design career so much. I try to incorporate nature in whichever way possible and believe in sustainable fashion. I love to work with environmental friendly textiles and fashion that will bring about a great revolution in the fashion industry.'
        } else if(designerName == 'vino') {
          vm.designerName= 'Vinodhini Surulinathan';
          vm.designerImage = 'vino-circle.jpeg';
          vm.designerContent = 'I believe Fashion is a mix of art with purpose and functionality and has the strength to impart character or add value to the person wearing it. When designing, I always follow my instincts, then take a moment for second opinions. My strengths as a designer are draping and  pattern making to create new styles and sillouhettes.  I really enjoy interacting with people which helps me understand their requirements and design accordingly, overcoming challenges. It gives me great satisfaction when I see happy clients flaunt my designs and express their positive feedback.'+
            ' I don’t allow anyone to dampen my spirits or bring me down and always strive towards becoming a better person both personally & professionally.'
        }
        $('#designerModal').modal('show');
      }

      vm.getProductDetail = function(prodId) {
            var productId = '';
            if($stateParams.id) {
                productId = $stateParams.id;
            } else {
                productId = prodId;
            }
            var productImages = [];
            $state.go('product-detail', {"id" : productId})
            var promise = ProductService.getProductDetailById(productId);
            promise.then(function(response) {
                if(response.data) {
                    vm.product = response.data.product;
                    productImages = vm.product.product_detail.image.split(',');
                    vm.product.productImages = productImages;
                    console.log('Single Product-----', vm.product);
                    options.amount = vm.product.product_detail.price * 100;
                    vm.status = response.data.status;
                } else {
                    console.log('Sorry could not get product details');
                }
            });
      }
    }
    

    /**
     * @ngdoc Injector
     * @name HomeController
     * @module app.home
     * @description
     * All the dependency injections for home module
     * @author Tungstn Developers
     */
    HomeController.$inject = ['$scope', 'HomeService', 'OrderService', 'ProductService', 'toastr', '$stateParams'];
} )();
