import configureMockStore from "redux-mock-store"

export default (state: Object, middlewares = []) => {
  return configureMockStore(middlewares)(state);
};
