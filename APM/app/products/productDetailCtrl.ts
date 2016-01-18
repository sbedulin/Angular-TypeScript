module app.productDetail {
    import IProduct = app.domain.IProduct;
    import DataAccessService = app.common.DataAccessService;
    import IRouteParamsService = angular.route.IRouteParamsService;

    interface IProductDetailModel {
        title: string;
        product: IProduct;
    }

    interface IProductParams extends IRouteParamsService {
        productId: number;
    }

    class ProductDetailCtrl implements IProductDetailModel {
        title: string;
        product: IProduct;

        static $inject = ['$routeParams', 'dataAccessService'];
        constructor(
            private $routeParams: IProductParams,
            private dataAccessService: DataAccessService) {
            this.title = 'Product Detail';

            let id = $routeParams.productId;
            let productResource = dataAccessService.getProductResource();
            productResource.get({
                productId: id
            }, (data: IProduct) => {
                this.product = data;
            });
        }
    }

    angular
        .module('productManagement')
        .controller('ProductDetailCtrl', ProductDetailCtrl);
}