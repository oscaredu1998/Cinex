/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import ReactModal from 'react-modal';

import Header from '../components/header';
import axios from 'axios';

const API = "http://localhost:5000/film/horario";

class Schedules extends Component {
    handleOpenModal () { this.setState({ showModal: true }) }      
    handleCloseModal () { this.setState({ showModal: false }) }

    constructor(props) {
        super(props);
        this.state = {
            table_header: {
                id: 'N°',
                hora: 'Horas de Proyección',
            },
            horarios: [],
            hora: '',
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        axios.get(API)
        .then(response => {
            this.setState({ horarios: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })
    }

    saveData = e => {
        e.preventDefault()
        this.post = {
            datos: {
                hora: this.state.hora,
            }
        }

        if (this.post.datos.hora === ""
            ) {
          alert("Complete todos los datos para continuar...");
        } else {
          axios.post(API, this.post)
          .then(response => {
            if ( response.data.ok === true ) {
                window.location.assign("http://localhost:3000/schedules");
            }
          })
          .catch(error => {
            alert(error)
          })
        }
    };

    deleteData = (value) => {
        axios.delete(`${ API }?id=${ value }`, {
            data: { id: value }
        })
        window.location.assign("http://localhost:3000/schedules");
    }

    // updateData = () => {
    //     axios.put(API+"?tabla=persona", {
    //         persona_identificacion: this.state.persona_identificacion,
    //         persona_nombre: this.state.persona_nombre,
    //         persona_email: this.state.persona_email,
    //         persona_direccion: this.state.persona_direccion,
    //         persona_telefono: this.state.persona_telefono,
    //         persona_clave: this.state.persona_clave
    //     })
    //     .then(response => {
    //         console.log(response);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
    // }

    render() {
        const { horarios, hora } = this.state
        return(
            <div>
                
                <Header />,
                <div className="">
                    <hr />
                    <main className="my-8">
                        <div className="justify-center my-5 select-none flex">
                            <p className="mt-5 text-center mr-10 text-2xl">Horarios</p>
                            <button onClick={ this.handleOpenModal } type="button" className="mr-8 shadow-md no-underline font-black text-2xl rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white text-sm border-blue btn-primary hover:text-white hover:bg-pink-500 focus:outline-none active:shadow-none">
                                <i className="fas fa-plus-square"></i>
                            </button>
                            {/* MODAL */}
                            <ReactModal isOpen={this.state.showModal} contentLabel="onRequestClose Example" onRequestClose={this.handleCloseModal}
                                className="flex-1 text-white text-center pl-48 py  py-0 my-10 mr-40 ml-64">
                                <div className="leading-loose">
                                    <form className="max-w-xl m-4 p-10 bg-white rounded shadow-xl" onSubmit={ this.saveData }>
                                        <p className="text-gray-800 font-medium">Nuevo Horario</p>
                                            <div className="mt-2">
                                                <label className="block text-sm text-gray-600" htmlFor="hora">Horario</label>
                                                <input className="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded" 
                                                    type="text" 
                                                    placeholder="Ej: 10 a 12 horas" 
                                                    name="hora"
                                                    value={ hora }
                                                    onChange={ this.changeHandler }
                                                    autoComplete="off"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <button  type="submit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                                    <i className="fas fa-save fa-lg mr-5 " style={{width:10, height:10}}></i> Guardar</button>
                                            </div>
                                    </form>

                                </div>
                            </ReactModal>       
                            {/* MODAL */}
                        </div>  
                        <div className="px-3 py-4 flex justify-center">
                        <div class="flex justify-center ">
                            <div class=" px-2 py-1 m-1"></div>
                            <div class="text-center  px-4 py-2 m-2">
                            <table className="w-full text-md bg-white shadow-md rounded mb-4">
                                <thead className="">
                                    <tr>
                                        <th className="text-left p-3 px-5">{ this.state.table_header.id }</th>
                                        <th className="text-left p-3 px-5">{ this.state.table_header.hora }</th>
                                        {/* <th></th> */}
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="border-b hover:bg-orange-100 bg-gray-100">
                                        <td>
                                            { horarios.map(element => <p className="p-2 px-5" key={ element.id }> {element.id} </p>) }
                                        </td>
                                        <td>
                                            { horarios.map(element => <p className="p-2 px-5" key={ element.id }> {element.hora} </p>) }
                                        </td>
                                        {/* <td>
                                            { horarios.map(element => <p className="p-2 px-5" key={ element.id }><button onClick={ this.handleOpenModal } className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Editar</button></p> )}
                                        </td> */}
                                     
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                            <div class=" px-2 py-1 m-1"></div>
                        </div>
                           
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default Schedules;