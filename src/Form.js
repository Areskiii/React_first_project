
import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Form extends Component {
    render() {
        var paperStyle = {
            width: '96%',
            marginBottom: '20px',
            padding: '7px'
        };
        var textFiledStyle = {
            margin: '16px 3px 8px 3px'
        };
        var textFiledNumberStyle = {
            margin: '16px 3px 8px 3px',
            maxWidth: '10%'
        };
        var formStyle = {
            textAlign: 'left',
            paddingLeft: '11px'
        };
        var buttonStyle = {
            float: 'right',
            marginTop: '30px'
        };
        return (
            <Paper style={paperStyle}>
                <form noValidate autoComplete="off" style={formStyle}>
                    <TextField
                        label="ID"
                        name="id"
                        placeholder="ID"
                        margin="normal"
                        style={textFiledNumberStyle}
                        value={this.props.customer.id}
                        onChange={this.props.changeEvent}
                    />
                    <TextField
                        label="FirstName"
                        name="nom"
                        placeholder="FirstName"
                        margin="normal"
                        style={textFiledStyle}
                        value={this.props.customer.nom}
                        onChange={this.props.changeEvent}
                    />
                    <TextField
                        label="LastName"
                        name="prenom"
                        placeholder="LastName"
                        margin="normal"
                        style={textFiledStyle}
                        value={this.props.customer.prenom}
                        onChange={this.props.changeEvent}
                    />
                    <TextField
                        label="Age"
                        name="age"
                        placeholder="Age"
                        margin="normal"
                        style={textFiledNumberStyle}
                        value={this.props.customer.age}
                        onChange={this.props.changeEvent}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        placeholder="Email"
                        margin="normal"
                        style={textFiledNumberStyle}
                        value={this.props.customer.email}
                        onChange={this.props.changeEvent}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={buttonStyle}
                        onClick={this.props.addCustomer}>
                        {(this.props.action === -1) ? 'Ajouter' : 'Modifier'}
                    </Button>
                </form>
            </Paper>
        );
    }
}

export default Form;