import { Action, Reducer } from 'redux';
import * as Api from './api';

export interface User {
    id: string;
    login: string;
    name: string;
}

export interface State {
    user: User | null
}

const defaultState: State = {
    user: null
}

export const SET_USER = 1;
export const LOGOUT = 0;

export interface SetUserAction extends Action {
    type: number;
    user: User | null;
}

export interface Actions {
    login: (login: string, password: string) => void,
    setUser: (user: User) => SetUserAction
    logout: () => Action
}

export const actions: Actions = {
    login: (login: string, password: string) => (dispatch: Function, getState: Function) => {
        console.log(getState());

        Api.login(login, password).then((response) => {
            console.log(response);
            if (response.status == 200) {
                dispatch({
                    type: SET_USER,
                    user: response.data
                } as SetUserAction);
            }
        });
    },
    setUser: (user: User) => ({
        type: SET_USER,
        user: user
    } as SetUserAction),
    logout: () => ({
        type: LOGOUT
    } as Action)
} as Actions


export const reducer: Reducer<State> = (state: State = defaultState, action: Action): State => {
    console.log(action);
    switch (action.type) {
        case SET_USER:
            let setUserAction: SetUserAction = action as SetUserAction;
            return {
                user: setUserAction.user
            };
        case LOGOUT:
            return {
                user: null
            };
        default:
            return state
    }
}