import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "./features/toolSlice";
import rotateReducer from "./features/rotateSlice";
import sizePosReducer from "./features/sizePos";
import textReducer from "./features/textSlice";
import alignReducer from "./features/align";
import rvnReducer from "./features/rvnSlice";
import apiReducer from "./features/api";
import configReducer from "./features/conifg"
export const store=configureStore({
    reducer:{
        tool:toolReducer,
        rotate:rotateReducer,
        sizePos:sizePosReducer,
        text:textReducer,
        align:alignReducer,
        rvn:rvnReducer,
        api:apiReducer,
        config:configReducer,
    }
})