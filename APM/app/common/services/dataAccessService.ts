module app.common {
    import Product = app.domain.Product;
    import IResource = angular.resource.IResource;
    import IResourceService = angular.resource.IResourceService;
    import IResourceClass = angular.resource.IResourceClass;

    interface IProductResource extends IResource<Product> {}

    interface IDataAccessService {
        getProductResource(): IResourceClass<IProductResource>;
    }

    export class DataAccessService implements IDataAccessService {
        static $inject = ['$resource'];

        constructor(private $resource: IResourceService) {}

        getProductResource() {
            return this.$resource('/api/products/:productId');
        }
    }

    angular
        .module('common.services')
        .service('dataAccessService', DataAccessService);
}