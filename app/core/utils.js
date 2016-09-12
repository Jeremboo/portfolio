/**
*
* app/core/utils.js
* Util generic functions.
*
**/

export const createReducer = (initialState, handlers) => (state = initialState, action) => {
  if ({}.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};


export const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => {
    action[argNames[index]] = args[index];
  });
  return action;
};
