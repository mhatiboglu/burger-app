import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actionTypes from "../../store/action";

class BurgerBuilder extends Component {
  // constructor(props){
  //     super(props);
  //     this.state ={...}
  // }

  state = {
    //ingredients: null,
    //totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  //https://cors-anywhere.herokuapp.com/
  componentDidMount() {
    // axios
    //   .get("https://react-my-burger-f1e27.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     console.log("response");
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const uptatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   uptatedIngredients[type] = updatedCount;
  //   const priceAddition = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ ingredients: uptatedIngredients, totalPrice: newPrice });
  //   this.updatePurchaseState(uptatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) return;
  //   const updatedCount = oldCount - 1;
  //   const uptatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   uptatedIngredients[type] = updatedCount;
  //   const priceDeduction = INGREDIENTS_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ ingredients: uptatedIngredients, totalPrice: newPrice });
  //   this.updatePurchaseState(uptatedIngredients);
  // };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHAndler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHAndler = () => {
    //alert("You continued");

    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "john",
    //     adress: {
    //       street: "crofton",
    //       zipCode: "se18 23",
    //     },
    //     email: "john@john.com",
    //     deliveryMethod: "freedelivery",
    //   },
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((res) => this.setState({ loading: false, purchasing: false }))
    //   .catch((err) => this.setState({ loading: false, purchasing: false }));
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.props.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };
  clearHandler = () => {
    this.setState({
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state ? (
      <p style={{ textAlign: "center" }}> Ingredients can't be loaded !</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            cleared={this.clearHandler}
          />{" "}
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHAndler}
          purchaseContinued={this.purchaseContinueHAndler}
          price={this.props.price}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHAndler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
