import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import { ProductApiActions, ProductPageActions } from './actions';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(
    ProductPageActions.toggleProductCode,
    (state): ProductState => ({
      ...state,
      showProductCode: !state.showProductCode,
    })
  ),
  on(
    ProductPageActions.setCurrentProduct,
    (state, action): ProductState => ({
      ...state,
      currentProductId: action.currentProductId,
    })
  ),
  on(
    ProductPageActions.clearCurrentProduct,
    (state): ProductState => ({
      ...state,
      currentProductId: null,
    })
  ),
  on(
    ProductPageActions.initializeCurrentProduct,
    (state): ProductState => ({
      ...state,
      currentProductId: 0,
    })
  ),
  on(
    ProductApiActions.loadProductsSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: action.products,
        error: '',
      };
    }
  ),
  on(
    ProductApiActions.loadProductsFailure,
    (state, action): ProductState => {
      return {
        ...state,
        products: [],
        error: action.error,
      };
    }
  ),
  on(
    ProductApiActions.updateProductSuccess,
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
    ProductApiActions.updateProductFailure,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    ProductApiActions.deleteProductSuccess,
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
    ProductApiActions.deleteProductFailure,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),
  on(
    ProductApiActions.createProductSuccess,
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
    ProductApiActions.createProductFailure,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
