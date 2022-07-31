angular.module(ROOT_MODULE, Object.values(modules))
  .controller('AngularAppController', ['$scope', ($scope) => {
    $scope.species = {};

    $scope.onPokeSelected = (species) => {
      $scope.species = species;
      $scope.$$postDigest(() => $scope.$apply());
    };
  }]);
