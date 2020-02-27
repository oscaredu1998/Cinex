/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';

import Header from '../components/header';
import axios from 'axios';

const API = "http://localhost:5000/film/raw3";

class FilmsRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            table_header: {
                sala: 'Nombre de la Sala',
                pelicula: 'Película',
                horario: 'Horario',
            },
            sala_peliculas: [],
        }
    }
    
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        axios.get(API)
        .then(response => {
            this.setState({ sala_peliculas: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    deleteData = (value) => {
        axios.delete(`${ API }?id=${ value }`, {
            data: { id: value }
        })
        window.location.assign("http://localhost:3000/films_room");
    }

    render() {
        const { sala_peliculas } = this.state
        return(
            <div>
                
                <Header />,
                <div className="">
                    <hr />
                    <main className="my-8">
                        <div className="justify-center my-5 select-none flex">
                            <p className="mt-5 text-center mr-10 text-2xl">Asignar Películas</p>
                            <button onClick={() => window.location.assign("http://localhost:3000/films_room_add")} type="button" className="mr-8 shadow-md no-underline font-black text-2xl rounded-full h-12 w-12 flex items-center justify-center bg-blue-400 text-white text-sm border-blue btn-primary hover:text-white hover:bg-pink-500 focus:outline-none active:shadow-none">
                                <i className="fas fa-plus-square"></i>
                            </button>
                        </div>  
                        <div className="px-3 py-4 flex justify-center">
                        <div class="flex justify-center ">
                            <       div class="px-4 py-2 m-2"></div>
                                    <div class=" text-center px-4 py-2 m-2">
                                    <table className="w-full text-md bg-white shadow-md rounded mb-4">
                                <thead className="border-b">
                                    <tr>
                                        <th className="text-left p-3 px-5">{ this.state.table_header.sala }</th>
                                        <th className="text-left p-3 px-5">{ this.state.table_header.pelicula }</th>
                                        <th className="text-left p-3 px-5">{ this.state.table_header.horario }</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="border-b hover:bg-orange-100 bg-gray-100">
                                        <td>
                                            { sala_peliculas.map(element => <p className="p-2 px-5" key={ element.id }> {element.idsala_nombre} </p>) }
                                        </td>
                                        <td>
                                            { sala_peliculas.map(element => <p className="p-2 px-5" key={ element.id }> {element.idpelicula_titulo} </p>) }
                                        </td>
                                        <td>
                                            { sala_peliculas.map(element => <p className="p-2 px-5" key={ element.id }> {element.idhorario_hora} </p>) }
                                        </td>
                                       
                                    </tr>
                                </tbody>
                            </table>
                                    </div>
                                    <div class=" px-4 py-2 m-2"></div>
                            </div>
                            
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default FilmsRoom;