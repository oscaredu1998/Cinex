/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';

import Header from '../components/header';
import axios from 'axios';

const API = "http://localhost:5000/film/";

class FilmsRoomAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salas: [],
            peliculas: [],
            horarios: [],
            idsala: '',
            idpelicula: '',
            idhorario: '',
        }
    }
    
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        axios.get(API+"sala")
        .then(response => {
            this.setState({ salas: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(API+"pelicula")
        .then(response => {
            this.setState({ peliculas: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(API+"horario")
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
                idsala: this.state.idsala,
                idpelicula: this.state.idpelicula,
                idhorario: this.state.idhorario,
            }
        }

        if (this.post.datos.idsala === "" ||
            this.post.datos.idpelicula === "" ||
            this.post.datos.idhorario === ""
            ) {
          alert("Complete todos los datos para continuar...");
        } else {
          axios.post(API+"sala_pelicula", this.post)
          .then(response => {
            if ( response.data.ok === true ) {
                window.location.assign("http://localhost:3000/films_room");
            }
          })
          .catch(error => {
            alert(error)
          })
        }
    };

    render() {
        const { salas, peliculas, horarios, idsala, idpelicula, idhorario } = this.state
        return(
            <div>
                
                <Header />,
                <div className="">
                    
                    <main className="my-8">
                        <p className="text-center my-5 text-2xl">Asignar Peliculas</p>
                        <div class="flex justify-center ">
                                <div class="px-4 py-2 m-2"></div>
                                <div class=" text-center px-4 py-2 m-2">
                                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mx-8" style={{ backgroundColor: '#F9FBE3'}} onSubmit={ this.saveData }>
                            <div className="-mx-3 md:flex mb-6 ">
                                <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="idsala">
                                        Sala
                                    </label>
                                    <select className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                        name="idsala"
                                        value={ idsala }
                                        onChange={this.changeHandler}>
                                            <option className="text-sm text-gray-600">
                                                Seleccione sala....
                                            </option>
                                            { salas.map(element => (<option key={ element.id } value={ element.id }> { element.nombre } </option>))}
                                    </select>
                                </div>
                                <div className="md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="idpelicula">
                                        Pelicula
                                    </label>
                                    <select className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                        name="idpelicula"
                                        value={ idpelicula }
                                        onChange={this.changeHandler}>
                                            <option className="text-sm text-gray-600">
                                                Seleccione pelicula....
                                            </option>
                                            { peliculas.map(element => (<option key={ element.id } value={ element.id }> { element.titulo } </option>))}
                                    </select>
                                </div>
                                <div className="md:w-1/3 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="idhorario">
                                        Horario
                                    </label>
                                    <select className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                                        name="idhorario"
                                        value={ idhorario }
                                        onChange={this.changeHandler}>
                                            <option className="text-sm text-gray-600">
                                                Seleccione horario....
                                            </option>
                                            { horarios.map(element => (<option key={ element.id } value={ element.id }> { element.hora } </option>))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button type="submit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                <i className="fas fa-save fa-lg mr-5 " style={{width:10, height:10}}></i> Guardar</button>
                            </div>
                        </form>
                                </div>
                                <div class="px-4 py-2 m-2"></div>
                        </div>
                        
                    </main>
                </div>
            </div>
        )
    }
}

export default FilmsRoomAdd;