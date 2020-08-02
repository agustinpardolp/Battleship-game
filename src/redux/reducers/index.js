import { combineReducers } from 'redux';
import {CPUGameOption} from "./game-reducer/cpu-game-reducer";
import {UserGameOption} from "./game-reducer/user-game-reducer";
import {UserInitialGameOption} from "./game-reducer/user-initial-value-reducer";
import {CpuInitialGameOption} from "./game-reducer/cpu-initial-value-reducer";

const allReducers = combineReducers({
    CPUGameOption,
    UserGameOption,
    UserInitialGameOption,
    CpuInitialGameOption,
});

const reducers = (state, action) => {
    return allReducers(state, action);
};

export default reducers;