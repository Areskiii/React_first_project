import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import FormComponentMUI from './Form';
import CustomerTableMUI from './Grid';
import API from './api';
import {  Route } from 'react-router';
import { Router, Link } from 'react-router-dom';
import history from './history';

class App extends Component {
  //

  constructor() {
    super();
    library.add(faEye);
    library.add(faPencilAlt);
    library.add(faTrash);
    this.state = {
      newcustomer: {
        'id': 1,
        'nom': '',
        'prenom': '',
        'age': 15,
        'email': ''
      },
      customerSelectedIndex: -1,
      customers: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectedIndex = this.handleSelectedIndex.bind(this);
    this.handleEditCustomer = this.handleEditCustomer.bind(this);
    this.handleDeleteCustomer = this.handleDeleteCustomer.bind(this);
    this.updateCustomerState = this.updateCustomerState.bind(this);
  }

  componentWillMount() {
    API.get('listUsers')
      .then(res => {
        const custs = res.data;
        this.setState({
          customers: custs
        })
      });
  }

  updateTextState(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleDeleteCustomer(index) {
    if (index >= 0 && index < this.state.customers.length) {
      var cust = this.state.customers;
      console.log(cust[index].id);
      API.delete('deleteUser/' + cust[index].id)
        .then(res => {
          cust.splice(index, 1);
          this.setState({
            customers: cust
          });
        });
    }
  }

  handleEditCustomer(index) {
    if (index >= 0 && index < this.state.customers.length) {
      this.setState({
        newcustomer: {
          id: this.state.customers[index].id,
          nom: this.state.customers[index].nom,
          prenom: this.state.customers[index].prenom,
          age: this.state.customers[index].age,
          email: this.state.customers[index].email,
        },
        customerSelectedIndex: index
      });
    }
  }

  handleSelectedIndex(index) {
    if (index >= 0 && index < this.state.customers.length) {
      this.setState({
        newcustomer: {
          id: this.state.customers[index].id,
          nom: this.state.customers[index].nom,
          prenom: this.state.customers[index].prenom,
          age: this.state.customers[index].age,
          email: this.state.customers[index].email,
        }
      });
    }
  }

  handleInputChange(e) {
    if ((e.target.name === 'id' || e.target.name === 'age')) {
      if (!isNaN(parseInt(e.target.value))) {
        e.target.value = parseInt(e.target.value);
      } else {
        if (e.target.name === 'id' && e.target.name === 'age') {
          alert('L\'identifiant et l\'age doit etre un entier');
        } else if (e.target.name === 'id') {
          alert('L\'identifiant doit etre un entier');
        } else if (e.target.name === 'age') {
          alert('L\'age doit etre un entier');
        }
      }
    }
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newcustomer: {
        ...prevState.newcustomer,
        [name]: value
      }
    }));
  }

  updateCustomerState() {
    var cust = this.state.customers;
    var found = false;
    var i = 0;
    if (this.state.customerSelectedIndex > -1) {
      while (!found && i < cust.length) {
        if (i !== this.state.customerSelectedIndex && this.state.newcustomer.id === cust[i].id) {
          found = true;
        }
        i++;
      }
      if (!found) {
        API.put('updateUser/' + this.state.newcustomer.id, this.state.newcustomer).then(res => {
          cust[this.state.customerSelectedIndex] = this.state.newcustomer;
          this.setState({
            customers: cust,
            newcustomer: {
              id: cust.length + 1,
              nom: '',
              prenom: '',
              age: 15,
              email: ''
            },
            customerSelectedIndex: -1
          });
        });
      } else {
        alert('L\'identifiant `' + this.state.newcustomer.id + '` exist deja !');
      }
    } else {
      while (!found && i < cust.length) {
        if (this.state.newcustomer.id === cust[i].id) {
          found = true;
        }
        i++;
      }
      if (!found) {
        API.post('addUser', this.state.newcustomer).then(res => {
          cust.push(this.state.newcustomer);
          this.setState({
            customers: cust,
            newcustomer: {
              id: cust.length + 1,
              nom: '',
              prenom: '',
              age: 15,
              email: ''
            },
            customerSelectedIndex: -1
          });
        });

      } else {
        alert('L\'identifiant `' + this.state.newcustomer.id + '` exist deja !');
      }
    }
  }

  goList(e) {
    history.push('/list');
  }

  render() {
    var appStyle = {
      backgroundColor: '#eeeeee'
    };
    return (
      <div className="App" >
        <header className="App-header" style={appStyle} >
        <Router history={history}>
          <ul>
             <li><Link to="/">Home</Link></li>
            <li><Link to="/list">List</Link></li>
            <li><Link to="/ajout">Add</Link></li>
          </ul>
          {this.props.children}
        
         
            <Route path="/" >

              <Route
                path="/list"
                render={() => (
                  <CustomerTableMUI 
                  show={this.handleSelectedIndex}
                  edit={this.handleEditCustomer}
                  delete={this.handleDeleteCustomer}
                  list={this.state.customers} 
                  />
                )}
              />

              <Route
                path="/ajout"
                render={() => (
                  <FormComponentMUI
                  action={this.state.customerSelectedIndex}
                  customer={this.state.newcustomer}
                  changeEvent={this.handleInputChange}
                  addCustomer={this.updateCustomerState}
                  />
                )}
              />
          </Route>
          <button onClick={this.goList}>GO LIST</button>         
          </Router>


        </header>
      </div>
    );
  }
}
export default App;