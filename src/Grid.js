import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Grid extends Component {
    render() {
      /* const { classes } = withStyles; */
      var paperStyle = {
        width: '98%'
      };
      var buttonStyle = {
        padding: '7px',
        minWidth: 'initial',
        marginRight: '5px'
      };
      return (
        <Paper style={paperStyle}>
          <Table width="98%">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>FullName</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Majeur</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.list.map((elem, i) =>
                <TableRow key={i}>
                  <TableCell align="left" key={elem.id}>{elem.id}</TableCell>
                  <TableCell align="left" key={elem.nom + ' ' + elem.prenom}>{elem.nom + ' ' + elem.prenom}</TableCell>
                  <TableCell align="left" key={elem.email}>{elem.email}</TableCell>
                  <TableCell align="left" key={(elem.age >= 18) ? 'Oui' : 'Non'}>{(elem.age >= 18) ? 'Oui' : 'Non'}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="default"
                      style={buttonStyle}
                      onClick={() => this.props.show(i)}>
                      <FontAwesomeIcon icon="eye" />
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      style={buttonStyle}
                      onClick={() => this.props.edit(i)}>
                      <FontAwesomeIcon icon="pencil-alt" />
                    </Button>
                    <Button
                      variant="contained"
                      color="default"
                      style={buttonStyle}
                      onClick={() => this.props.delete(i)}>
                      <FontAwesomeIcon icon="trash" />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
  
  export default Grid; 