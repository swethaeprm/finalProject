import React, { Component, Fragment } from 'react';
import Product from './Product';
import axios from "axios";
const config = require('../config.json');

export default class ProductAdmin extends Component {

  state = {
    newproduct: {
      "productname": "",
      "id": ""
    }, product: {
      "name": "",
      "id": ""
    },
    products: []
  }
  post = (data,e) => {
    e.preventDefault();
    axios.post('https://20n82o9v09.execute-api.us-east-1.amazonaws.com/postOne', { "firstName": this.state.product.name })
      .then((response) => {
        console.log("response", response);

      }, (error) => { console.log(error); });
  }

  handleAddProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    console.log(this.state.newproduct.productname);
    // axios.post('https://1w3ao3vzxk.execute-api.us-east-1.amazonaws.com/postName', { "firstName": this.state.newproduct.productname, "lastName": 'm', "age": this.state.newproduct.id })
    axios.post('https://20n82o9v09.execute-api.us-east-1.amazonaws.com/postOne', { "firstName": this.state.newproduct.productname })
      .then((response) => {
        console.log(response);
        alert(response.data.greetings + "" + response.data.age)
      }, (error) => { console.log(error); });
    console.log("===========");

    // try {
    //   const params = {
    //     "id": id,
    //     "productname": this.state.newproduct.productname
    //   };
    //   await axios.post(`${config.api.invokeUrl}/products/${id}`, params);
    //   this.setState({ products: [...this.state.products, this.state.newproduct] });
    //   this.setState({ newproduct: { "productname": "", "id": "" }});
    // }catch (err) {
    //   console.log(`An error has occurred: ${err}`);
    // }
  }

  handleUpdateProduct = async (id, name) => {
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "id": id,
        "productname": name
      };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);
      const productToUpdate = [...this.state.products].find(product => product.id === id);
      const updatedProducts = [...this.state.products].filter(product => product.id !== id);
      productToUpdate.productname = name;
      updatedProducts.push(productToUpdate);
      this.setState({ products: updatedProducts });
    } catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }

  handleDeleteProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedProducts = [...this.state.products].filter(product => product.id !== id);
      this.setState({ products: updatedProducts });
    } catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/products`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddProductNameChange = event => this.setState({ newproduct: { ...this.state.newproduct, "productname": event.target.value } });
  onAddProductIdChange = event => this.setState({ newproduct: { ...this.state.newproduct, "id": event.target.value } });

  onAddProduct = (event) => {
    this.setState({ product: { ...this.state.product, "name": event.target.value } })
  }

  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Product Admin</h1>
            <p className="subtitle is-5">Add and remove products using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddProduct(this.state.newproduct.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter name"
                        value={this.state.newproduct.productname}
                        onChange={this.onAddProductNameChange}
                      />
                    </div>
                    
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Submit
                      </button>
                    </div>

                  </div>
                </form>
                {/* <form> */}
                
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    {
                      this.state.products.map((product, index) =>
                        <Product
                          isAdmin={true}
                          handleUpdateProduct={this.handleUpdateProduct}
                          handleDeleteProduct={this.handleDeleteProduct}
                          name={product.productname}
                          id={product.id}
                          key={product.id}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
