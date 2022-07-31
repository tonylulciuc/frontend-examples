angular.module(modules.POKE_LIST, [])
  .controller('PokeListController', ['$scope', services.POKE_API_SERVICE, ($scope, pokeApiService) => {
    $scope.species = [];
    $scope.selected = -1;

    pokeApiService.getPokeSpecies($scope.limit).then(({ results }) => {
      $scope.species.push(...results);
      $scope.$apply();
    });
    $scope.onListItemClick = ($index) => {
      $scope.selected = $index;
      $scope.$$postDigest(() => $scope.$apply(() => $scope.onPokeSelected({ selected: $scope.species[$index] })));
    };
  }])
  .directive('pokeList', () => ({
    restrict: 'E',
    transclusion: true,
    scope: {
      limit: '=',
      onPokeSelected: '&',
    },
    templateUrl: './components/PokeList/PokeList.html',
  }));
