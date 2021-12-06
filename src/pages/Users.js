import React from 'react';
import {Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'
import UserService from '../services/UserServices';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

class UserComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            users:[],
            modalInsertar: false,
            userr: {
                usua_nombre: null,
                usua_correo: null,
                usua_login: null,
                usua_pass: null,
                usua_estado: null
              }
        };

        this.save = this.save.bind(this);
    }

    componentDidMount(){
        UserService.getUsers().then((data) => {
            this.setState({ users: data})
        });
    }

    save(){
        UserService.save(this.state.userr).then(data => {
            this.setState({ modalInsertar: false });
            UserService.getUsers().then((data) => {
                this.setState({ users: data})
            });
        })
    }

    mostrarModalInsertar = () => {
        this.setState({
          modalInsertar: true,
        });
      };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    handleChange = (e) => {
        this.setState({
          form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
          },
        });
      };

    render (){
        return (
            <div>
                <h1 className = "text-center"> Lista de Usuarios</h1>
                <div style={{margin: '20px'}}>
                    <button style={{border: '0',background: 'none'}} onClick={()=>this.mostrarModalInsertar()}>Usuario Nuevo <FaIcons.FaUserPlus /></button>
                    </div>
                <table className = "table table-striped">
                    <thead>
                        <tr>

                            <td> Id</td>
                            <td> Nombre</td>
                            <td> Correo</td>
                            <td> Login</td>
                            <td> Pass</td>
                            <td> Estado</td>
                            <td colSpan="2"> Acciones</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.users.map(
                                user => 
                                <tr key = {user.id}>
                                     <td> {user.id}</td>   
                                     <td> {user.usua_nombre}</td>   
                                     <td> {user.usua_correo}</td>   
                                     <td> {user.usua_login}</td>
                                     <td> {user.usua_pass}</td>
                                     <td> {user.usua_estado}</td>   
                                     <td><button style={{border: '0'}}><FaIcons.FaEdit /></button></td> 
                                     <td><button style={{border: '0'}}><AiIcons.AiFillDelete /></button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar Usuario</h3></div>
                    </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label>
                            Nombre: 
                        </label>
                        <input value={this.state.userr.usua_nombre} className="form-control" id="usua_nombre" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                        let userr = Object.assign({}, prevState.userr);
                        userr.usua_nombre = val;

                        return { userr };
                        })}
                        } />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Correo: 
                        </label>
                        <input value={this.state.userr.usua_correo} className="form-control" id="usua_correo" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                        let userr = Object.assign({}, prevState.userr);
                        userr.usua_correo = val;

                        return { userr };
                        })}
                        } />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Login: 
                        </label>
                        <input value={this.state.userr.usua_login} className="form-control" id="usua_login" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                        let userr = Object.assign({}, prevState.userr);
                        userr.usua_login = val;

                        return { userr };
                        })}
                        } />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Contrase&ntilde;a: 
                        </label>
                        <input value={this.state.userr.usua_pass} className="form-control" id="usua_pass" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                        let userr = Object.assign({}, prevState.userr);
                        userr.usua_pass = val;

                        return { userr };
                        })}
                        } />
                    </FormGroup>
                    <FormGroup>
                        <label>
                            Estado: 
                        </label>
                        <input value={this.state.userr.usua_estado} className="form-control" id="usua_estado" onChange={(e) => {
                        let val = e.target.value;
                        this.setState(prevState => {
                        let userr = Object.assign({}, prevState.userr);
                        userr.usua_estado = val;

                        return { userr };
                        })}
                        } />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button
                    color="primary"
                    type="submit"
                    onClick={() => this.save()}
                    >
                        Insertar
                    </Button>
                    <Button
                    className="btn btn-danger"
                    onClick={() => this.cerrarModalInsertar()}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
            </div>

        )
    }
}

export default UserComponent