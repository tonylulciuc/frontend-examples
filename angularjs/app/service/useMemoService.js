angular.module(modules.USE_MEMO_SERVICE, [])
  .factory(services.USE_MEMO_SERVICE, () => {
    const memoizer = {};
    const computeKey = (fn, deps) => `${fn.toString()},${JSON.stringify(deps)}`;

    return (fn, deps) => {
      const type = typeof fn;

      if (type !== 'function') {
        throw Error(`Memoize call requires function to be passed as first argument was: ${type}`);
      }

      if (!deps) {
        throw Error('Memoize requires dependencies as second argument, if none pass empty array');
      }

      const key = computeKey(fn, deps);

      if (!memoizer[key]) {
        memoizer[key] = fn();
      }

      return memoizer[key];
    };
  });
