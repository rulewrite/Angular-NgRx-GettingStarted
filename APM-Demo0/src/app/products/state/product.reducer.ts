import { createAction, createReducer, on } from '@ngrx/store';

export const productReducer = createReducer(
  {
    showProductCode: true,
  },
  on(createAction('[Product] Toggle Product Code'), (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  }))
);
