import {combineReducers} from "redux";

import playerReducer from './playerReducer';
import metaReducer from "./metaReducer";


export default combineReducers({
    player: playerReducer,
    meta: metaReducer
});
