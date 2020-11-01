import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from '../product';
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions';

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export interface State extends AppState.State {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

// export const getCurrentProductId = createSelector(
//   getProductFeatureState,
//   (state) => state.currentProductId
// );

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  // getCurrentProductId,
  // (state, currentProductId) =>
  //   state.products.find((product) => product.id === currentProductId)
  (state) => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const productReducer = createReducer<ProductState>(
  initialState,
  on(
    ProductActions.toggleProductCode,
    (state): ProductState => ({
      ...state,
      showProductCode: !state.showProductCode,
    })
  ),
  on(
    ProductActions.setCurrentProduct,
    (state, action): ProductState => ({
      ...state,
      currentProduct: action.product,
    })
  ),
  on(ProductActions.clearCurrentProduct, (state) => ({
    ...state,
    currentProduct: null,
  })),
  on(ProductActions.initializeCurrentProduct, (state) => ({
    ...state,
    currentProduct: {
      id: 0,
      productName: '',
      productCode: 'New',
      description: '',
      starRating: 0,
    },
  }))
);
