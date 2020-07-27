import * as actionTypes from "./action";

const initialState = {
  ingredients: {
    salad: 1,
    bacon: 1,
    cheese: 1,
    meat: 1,
  },
  totalPrice: 4,
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.5,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1},
          totalPrice:
            state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1},
          totalPrice:
            state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
        
      };
    default:
      return state;
  }
};

export default reducer;
