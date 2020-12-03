import { createReducer, on } from '@ngrx/store';
import { User } from '../user';
import { UserPageActions } from './actions';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserPageActions.maskUserName, (state) => ({
    ...state,
    maskUserName: !state.maskUserName,
  }))
);
