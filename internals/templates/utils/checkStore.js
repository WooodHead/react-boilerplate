import is from 'ramda/src/is';
import where from 'ramda/src/where';
import invariant from 'invariant';

/**
 * Validate the shape of redux store
 */
export default function checkStore(store) {
  const shape = where({
    dispatch: is(Function),
    subscribe: is(Function),
    getState: is(Function),
    replaceReducer: is(Function),
    runSaga: is(Function),
    injectedReducers: is(Object),
    injectedSagas: is(Object)
  });
  invariant(
    shape(store),
    '(app/utils...) injectors: Expected a valid redux store'
  );
}
