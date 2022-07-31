angular.module(modules.POKE_DETAILS, [])
  .controller('PokeDetailsController', ['$scope', services.POKE_API_SERVICE, ($scope, pokeApiService) => {
    $scope.pokemon = undefined;
    $scope.sprite = '';

    $scope.isLoadingPokemon = () => {
      const { pokemon, sprite } = $scope;

      return !sprite || !pokemon;
    };

    const resetPokemonDetails = () => {
      $scope.pokemon = undefined;
      $scope.sprite = '';
    };

    const onNameUpdate = (newName) => {
      if (!newName) {
        return;
      }

      resetPokemonDetails();
      pokeApiService.getPokemon(newName)
        .then((pokemon) => {
          $scope.$apply(() => {
            $scope.isLoadingPokemon = false;
            $scope.pokemon = pokemon;
          });
        });
    };
    $scope.$watch('name', onNameUpdate);

    const onPokemonUpdate = (newPokemon) => {
      if (!newPokemon) {
        return;
      }

      const {
        sprites: {
          front_shiny: fontSprite,
        },
      } = newPokemon;

      $scope.sprite = fontSprite;
    };
    $scope.$watch('pokemon', onPokemonUpdate);
  }])
  .directive('pokeDetails', () => ({
    restrict: 'E',
    transclusion: true,
    scope: {
      name: '=',
    },
    templateUrl: './components/PokeDetails/PokeDetails.html',
  }));
