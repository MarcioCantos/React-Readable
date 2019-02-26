

/**
 * Logs all actions and states after they are dispatched.
 * Source: Code get from https://redux.js.org/advanced/middleware
 *
 */
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

export default logger;