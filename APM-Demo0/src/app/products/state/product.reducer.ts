import { createAction, createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export interface State extends AppState.State {
  products: ProductState;
}

export const productReducer = createReducer<ProductState>(
  {
    showProductCode: true,
  } as ProductState,
  on(
    createAction('[Product] Toggle Product Code'),
    (state): ProductState => ({
      ...state,
      showProductCode: !state.showProductCode,
    })
  )
);
