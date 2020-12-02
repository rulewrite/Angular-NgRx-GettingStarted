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
  currentProductId: number;
  products: Product[];
  error: string;
}

export interface State extends AppState.State {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    // new
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    }

    return (
      state.products.find((product) => product.id === currentProductId) || null
    );
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
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
      currentProductId: action.currentProductId,
    })
  ),
  on(
    ProductActions.clearCurrentProduct,
    (state): ProductState => ({
      ...state,
      currentProductId: null,
    })
  ),
  on(
    ProductActions.initializeCurrentProduct,
    (state): ProductState => ({
      ...state,
      currentProductId: 0,
    })
  ),
  on(
    ProductActions.loadProductsSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: action.products,
        error: '',
      };
    }
  ),
  on(
    ProductActions.loadProductsFailure,
    (state, action): ProductState => {
      return {
        ...state,
        products: [],
        error: action.error,
      };
    }
  ),
  on(
    ProductActions.updateProductSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id !== action.product.id) {
            return product;
          }

          return action.product;
        }),
        currentProductId: action.product.id,
        error: '',
      };
    }
  ),
  on(
    ProductActions.updateProductFailure,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    ProductActions.deleteProductSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.productId
        ),
        currentProductId: null,
        error: '',
      };
    }
  ),
  on(
    ProductActions.deleteProductFailure,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    ProductActions.createProductSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: state.products.concat(action.product),
        currentProductId: action.product.id,
        error: '',
      };
    }
  ),
  on(
    ProductActions.createProductFailure,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
