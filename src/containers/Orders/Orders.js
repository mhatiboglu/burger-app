import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fethedOrders = [];
        for (let key in res.data) {
          fethedOrders.push({...res.data[key],id:key});
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    return (
      <>
        <Order /> <Order />
      </>
    );
  }
}

export default withErrorHandler(Orders, axios);
