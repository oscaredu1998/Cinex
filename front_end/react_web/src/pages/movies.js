/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';

import Header from '../components/header';
import axios from 'axios';

const API = "http://localhost:5000/film/pelicula";

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculasDisponible: [],
            peliculas: [],
        }
    }

    componentDidMount() {
        axios.get(API+"?estado=1")
        .then(response => {
            this.setState({ peliculasDisponible: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })

        axios.get(API)
        .then(response => {
            this.setState({ peliculas: response.data.datos })
        })
        .catch(error => {
            console.log(error)
        })
    }

    logicDelete = (item) => {
        axios.put(`${API}?id=${item}`, {
            datos: {
                id: item,
                estado: 0
            },
        })
        .then(response => {
            window.location.assign("http://localhost:3000/movies");
        })
        .catch(error => {
            console.log(error);
        });
    }

    updateMovie = (p_id, p_titulo, p_resumen, p_imagen, p_categoria, p_valorBoleto) => {
        localStorage.setItem('id', p_id);
        localStorage.setItem('titulo', p_titulo);
        localStorage.setItem('resumen', p_resumen);
        localStorage.setItem('imagen', p_imagen);
        localStorage.setItem('categoria', p_categoria);
        localStorage.setItem('valorBoleto', p_valorBoleto);
        window.location.assign("http://localhost:3000/update_movie");
    }

    render() {
        const { peliculasDisponible, peliculas } = this.state
        const image_categorie = require('../assets/category.png');

        return(
            <div>
                
                <Header />,
                <div className="">
                    <hr />
                    <main className="my-8">
                        <p className="text-center my-5 text-2xl font-bold font-mono">Cartelera Disponible</p>
                        <div className="flex flex-wrap items-center justify-center">
                        { peliculasDisponible.map(element => 
                            <div className="max-w-md rounded w-full lg:flex"  key={ element.id }>
                                <img className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" src={ element.imagen } alt="imagen" />
                                <div  style={{backgroundColor: '#E4FBF5'}} className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                    <div className="mb-8">
                                        <div className="text-black font-bold text-xl mb-2">Título: { element.titulo }</div>
                                        <p className="text-grey-darker text-base">Resumen: { element.resumen }</p>
                                    </div>
                                    <div className="flex items-center">
                                       
                                        <div className="text-mb">
                                            <p className="text-black font-bold leading-none text-lg">{ element.categoria }</p>
                                            <p className="text-grey-dark">Valor: $ { element.valorBoleto }</p>
                                        </div>
                                    </div>
                                    <div className="m-3">
                                        <button className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                                            onClick={ () => this.updateMovie(element.id, element.titulo, element.resumen, element.imagen, element.categoria, element.valorBoleto) }>
                                           <i class="far fa-edit fa-lg mr-3 "></i>
                                           Editar
                                        </button>
                                    </div>
                                    <div className="m-3">
                                        <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                                            onClick={ () => this.logicDelete(element.id) }>
                                            <i class="far fa-trash-alt fa-lg mr-3 "></i>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        ) }
                        </div>

                        <br />
                        <hr />
                        <br />

                      
                    </main>
                </div>
            </div>
        )
    }
}

export default Movies;