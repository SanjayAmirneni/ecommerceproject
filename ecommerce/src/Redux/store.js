import {createStore, combineReducers,applyMiddleware} from "redux";
import {basketReducer} from "../Reducer/basketReducer"
import logger from "redux-logger"
import { userReducer } from "../Reducer/userReducer";
import { searchReducer } from "../Reducer/searchReducer";
import { productReducer } from "../Reducer/productReducer";
import { sessionReducer } from 'redux-react-session';
import { sessionService } from 'redux-react-session';

const combinedReducers = combineReducers({basketReducer,userReducer,searchReducer,sessionReducer,productReducer});

const store = createStore(combinedReducers,applyMiddleware(logger));

const options = {  redirectPath: '/', driver: 'COOKIES',expires:0.003 }

sessionService.initSessionService(store,options);

export default store;