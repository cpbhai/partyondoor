import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer } from "./reducers/userReducers";
import { partnerReducer } from "./reducers/partnerReducers";
import { designReducer } from "./reducers/designReducers";
import { adminReducer } from "./reducers/adminReducers";
import { clientReducer } from "./reducers/clientReducers";
import { itemReducer } from "./reducers/itemReducers";
import { cartReducer } from "./reducers/cartReducers";
const reducer = combineReducers({
  design: designReducer,
  auth: authReducer,
  partner: partnerReducer,
  admin: adminReducer,
  client: clientReducer,
  itemFetch: itemReducer,
  cartOps: cartReducer,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
