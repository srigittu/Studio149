( function() {
	'use strict';

	angular
		.module( 'app.product' )
		.service( 'ProductDataService', ProductDataService );

	/**
	 * @ngdoc Injector
	 * @name ProductDataService
	 * @description
	 * Dashboard module service injection
	 * @module app.product
	 * @author Tungstn Developers
	 */
	ProductDataService.$inject = [ '$http' ];

	/**
	 * @ngdoc Service
	 * @name ProductDataService
	 * @description  service http request and response handler
	 * @module app.product
	 * @author Tungstn Developers
	 */
	function ProductDataService( $http ) {
		// const products = [
		// 	{ 'id': 1,
		// 	  'name': 'Yellow Lehenga with embroidery', 
		// 	  'image': 'product-1.jpg',
		// 	  'description': 'Try that out to test your elegance'
		// 	},
		// 	{ 'id': 2,
		// 	  'name': 'Pink Lehenga with embroidery',
		// 	  'image': 'product-2.jpg',
		// 	  'description': 'Try that out to test your elegance'
		// 	},
		// 	{ 'id': 3,
		// 	  'name': 'Green Lehenga with embroidery',
		// 	  'image': 'product-3.jpg',
		// 	  'description': 'Try that out to test your elegance'
		// 	},
		// 	{ 'id': 4,
		// 		'name': 'Yellow Lehenga with embroidery',
		// 	  'image': 'product-1.jpg',
		// 	  'description': 'Try that out to test your elegance'
		// 	},
		// 	{ 'id': 5,
		// 		'name': 'Pink Lehenga with embroidery',
		// 	  'image': 'product-2.jpg',
		// 	  'description': 'Try that out to test your elegance'
		// 	},
		// 	{ 'id': 6,
		// 		'name': 'Green Lehenga with embroidery',
		// 	  'image': 'product-3.jpg',
		// 	  'description': 'Try that out to test your elegance'
		// 	}
		// ];
		return {
			getProductsByCategoryType: function(categoryType) {
				var urlPath = '/api/products/' + categoryType;
				return $http( {
					method: 'GET',
					url: '/api/products/' + categoryType
				});
			},
			getProductDetailById: function(productId) {
				var urlPath = '/api/products/' + productId;
				// return products;
				return $http( {
					method: 'GET',
					url: '/api/products/' + productId
				});
			},
			getProductDetailById: function(userInfo) {
                return $http({
					method: 'POST',
					url: 'api/product/payment',
					data: userInfo
				})
			}
		};


	}

} )();