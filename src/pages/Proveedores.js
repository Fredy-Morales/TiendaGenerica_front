import React from 'react';
import {Button, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'
import ProveedoresServices from '../services/ProveedoresServices';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

class ProveedoresComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            proveedores:[],
            modalInsertar: false,
            proveedorest: {
                id: null,
                usua_nombre: null,
                usua_correo: null,
                usua_login: null,
                usua_pass: null,
                usua_estado: null
              }
        };

        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount(){
      ProveedoresServices.getProveedores().then((data) => {
            this.setState({ proveedores: data})
        });
    }

    save(){
        ProveedoresServices.save(this.state.proveedorest).then(data => {
            this.setState({ modalInsertar: false });
            ProveedoresServices.getProveedores().then((data) => {
                this.setState({ products: data})
            });
        })
    }

    update(){
        ProveedoresServices.update(this.state.proveedorest, this.state.proveedorest.id).then(data => {
            this.setState({ modalActualizar: false });
            ProveedoresServices.getProveedores().then((data) => {
                this.setState({ proveedores: data})
            });
        })
    }

    delete(id){
        if(window.confirm("¿Realmente desea eliminar el registro?")) {
            ProveedoresServices.delete(id).then(data => {
                ProveedoresServices.getProveedores().then((data) => {
                    this.setState({ proveedores: data})
                });
            })
        }
    }

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
            proveedorest: {
                id: null,
                proc_nombre: null,
                proc_codigo: null,
                nit_prov: null,
                proc_estado: null
            }
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    mostrarModalActualizar = (proveedores) => {
        this.setState({
          modalActualizar: true,
          proveedorest: {
            id: proveedores.id,
            proc_nombre: proveedores.proc_nombre,
            proc_codigo: proveedores.proc_codigo,
            nit_prov: proveedores.nit_prov,
            proc_estado: proveedores.proc_estado
          }
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    render (){
        return (
            <div>
                <h1 className = "text-center"> Lista de Proveedores</h1>
                <div style={{margin: '20px'}}>
                    <button style={{border: '0',background: 'none'}} onClick={()=>this.mostrarModalInsertar()}>Proveedores Nuevo <FaIcons.FaUserPlus /></button>
                </div>
                <table className = "table table-striped">
                    <thead>
                        <tr>

                            <td> Id</td>
                            <td> Nombre</td>
                            <td> Codigo</td>
                            <td> Nit proveedor</td>
                            <td> Estado</td>
                            <td colSpan="2"> Acciones</td>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            this.state.proveedores.map(
                                proveedores => 
                                <tr key = {proveedores.id}>
                                     <td> {proveedores.id}</td>   
                                     <td> {proveedores.proc_nombre}</td>   
                                     <td> {proveedores.proc_codigo}</td>   
                                     <td> {proveedores.nit_prov}</td>
                                     <td> {proveedores.iva_compra}</td>
                                     <td> {proveedores.precio_compra}</td>
                                     <td> {proveedores.precio_venta}</td> 
                                     <td> {proveedores.proc_estado}</td>
                                     <td><button style={{border: '0'}} onClick={()=>this.mostrarModalActualizar(proveedores)}><FaIcons.FaEdit /></button></td> 
                                     <td><button style={{border: '0'}} onClick={()=>this.delete(proveedores.id)}><AiIcons.AiFillDelete /></button></td>     
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar Proveedores</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <form id="user-form">
                            <FormGroup>
                                <label>
                                    Nombre: 
                                </label>
                                <input value={this.state.proveedorest.proc_nombre} className="form-control" id="proc_nombre" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.proc_nombre = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    C&oacute;digo: 
                                </label>
                                <input value={this.state.productt.proc_codigo} className="form-control" id="proc_codigo" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.proc_codigo = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Nit proveedor: 
                                </label>
                                <input value={this.state.productt.nit_prov} className="form-control" id="nit_prov" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.nit_prov = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Iva compra: 
                                </label>
                                <input value={this.state.productt.iva_compra} className="form-control" id="iva_compra" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.iva_compra = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Precio compra: 
                                </label>
                                <input value={this.state.productt.precio_compra} className="form-control" id="precio_compra" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.precio_compra = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Precio venta: 
                                </label>
                                <input value={this.state.productt.precio_venta} className="form-control" id="precio_venta" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.precio_venta = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Estado: 
                                </label>
                                <input value={this.state.productt.proc_estado} className="form-control" id="proc_estado" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.proc_estado = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                        </form>
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

                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Actualizar un Producto</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <form id="user-form">
                            <FormGroup>
                                <input type="hidden" value={this.state.productt.id} className="form-control" id="id" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.id = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Nombre: 
                                </label>
                                <input value={this.state.productt.proc_nombre} className="form-control" id="proc_nombre" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.proc_nombre = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    C&oacute;digo: 
                                </label>
                                <input value={this.state.productt.proc_codigo} className="form-control" id="proc_codigo" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.proc_codigo = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Nit proveedor: 
                                </label>
                                <input value={this.state.productt.nit_prov} className="form-control" id="nit_prov" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.nit_prov = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Iva compra: 
                                </label>
                                <input value={this.state.productt.iva_compra} className="form-control" id="iva_compra" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.iva_compra = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Precio compra: 
                                </label>
                                <input value={this.state.productt.precio_compra} className="form-control" id="precio_compra" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.precio_compra = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Precio venta: 
                                </label>
                                <input value={this.state.productt.precio_venta} className="form-control" id="precio_venta" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.precio_venta = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Estado: 
                                </label>
                                <input value={this.state.productt.proc_estado} className="form-control" id="proc_estado" onChange={(e) => {
                                let val = e.target.value;
                                this.setState(prevState => {
                                let productt = Object.assign({}, prevState.productt);
                                productt.proc_estado = val;

                                return { productt };
                                })}
                                } />
                            </FormGroup>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                        color="primary"
                        type="submit"
                        onClick={() => this.update()}
                        >
                            Actualizar
                        </Button>
                        <Button
                        className="btn btn-danger"
                        onClick={() => this.cerrarModalActualizar()}
                        >
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>

        )
    }
}

export default ProveedoresComponent