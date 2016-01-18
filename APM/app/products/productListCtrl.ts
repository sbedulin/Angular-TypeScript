module app.productList {
    import IProduct = app.domain.IProduct;
    import Product = app.domain.Product;
    import DataAccessService = app.common.DataAccessService;

    interface IProductListModel {
        title: string;
        showImage: boolean;
        products: IProduct[];
        toggleImage(): void;
    }

    class ProductListCtrl implements IProductListModel {
        title: string;
        showImage: boolean;
        products: IProduct[];

        static $inject = ["dataAccessService"];
        constructor(private dataAccessService: DataAccessService) {
            this.title = 'Product List';
            this.showImage = false;
            this.products = [];

            let productResource = dataAccessService.getProductResource();
            productResource.query((data: IProduct[]) => {
                this.products = data;
            });
        }
        
        toggleImage(): void {
            this.showImage = !this.showImage;
        }
    }

    angular
        .module('productManagement')
        .controller('ProductListCtrl', ProductListCtrl);
}