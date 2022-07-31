const pokeApiServiceModule = angular.module(modules.POKE_API_SERVICE, []);

pokeApiServiceModule.factory(
  services.POKE_API_SERVICE,
  ['$http', services.USE_MEMO_SERVICE, ($http, useMemoService) => {
    const api = 'https://pokeapi.co/api/v2';
    const unwrap = ({ data }) => data;

    const getPokeSpecies = (limit = 20) => useMemoService(
      async () => ($http.get(`${api}/pokemon-species/?offset=20&limit=${limit}`).then(unwrap)),
      [limit],
    );

    const getPokemon = (name) => useMemoService(
      (async () => $http.get(`${api}/pokemon/${name}`).then(unwrap)),
      [name],
    );

    return {
      getPokeSpecies,
      getPokemon,
    };
  }],
);
