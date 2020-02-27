/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';

import Header from '../components/header';
import axios from 'axios';

const API = "http://localhost:5000/film/pelicula";

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            resumen: '',
            categoria: '',
            valorBoleto: '',
            imagen: '',
            estado: true,
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    encodeImageFileAsURL = (e) => {
        const reader = new FileReader();
        const file = new Blob([e.target.value], { type: 'img/png' });
        this.setState({ imagen: file });
        reader.onloadend = e => {
            this.setState({ imagen: e.target.result })
        }
        reader.readAsDataURL(file);
    }

    onFileChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({ imagen: reader.result })
            console.log(reader.result)
        }
        reader.readAsDataURL(file);
    }

    saveData = e => {
        e.preventDefault()
        this.post = {
            datos: {
                titulo: this.state.titulo,
                resumen: this.state.resumen,
                categoria: this.state.categoria,
                valorBoleto: this.state.valorBoleto,
                imagen: this.state.imagen,
                estado: this.state.estado,
            }
        }

        if (this.post.datos.titulo === "" ||
            this.post.datos.resumen === "" ||
            this.post.datos.categoria === "" ||
            this.post.datos.valorBoleto === "" ||
            this.post.datos.imagen === ""
            ) {
          alert("Complete todos los datos para continuar...");
        } else {
          axios.post(API, this.post)
          .then(response => {
            if ( response.data.ok === true ) {
                window.location.assign("http://localhost:3000/movies");
            }
          })
          .catch(error => {
            alert(error)
          })
        }
    };


    render() {
        const { 
            titulo, 
            resumen, 
            categoria, 
            valorBoleto, 
            imagen,
        } = this.state
        return(
            <div >
               
                <Header />,
                <div className="">
                   
                    <main className="my-8" >
                        <p className="text-center my-5 text-2xl font-bold font-mono ">Crear Nueva Pelicula</p>
                        <div class="flex justify-center ">
                            <div class=" px-4 py-2 m-2"></div>
                            <div class=" text-center  px-4 py-2 m-2">
                            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 mx-8" style={{ backgroundColor: '#E4FBFB'}} onSubmit={ this.saveData }>
                                <div className="-mx-3 md:flex mb-6">
                                    <div className="md:w-full px-3">
                                        <label className="block uppercase tracking-wide text-grey-darker text-mb font-bold mb-2" htmlFor="titulo">
                                            Título
                                        </label>
                                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" 
                                            type="text" 
                                            placeholder="Ingrese el nombre de la Pelicula"
                                            name="titulo"
                                            value={ titulo }
                                            onChange={ this.changeHandler }
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className="-mx-3 md:flex mb-6 ">
                                    <div className="md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-grey-darker text-mb font-bold mb-2" htmlFor="resumen">
                                            Resumen
                                        </label>
                                        <textarea className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                                            type="text" 
                                            placeholder="Sinopsis"
                                            name="resumen"
                                            value={ resumen }
                                            onChange={ this.changeHandler }
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="md:w-1/3 px-3">
                                        <label className="block uppercase tracking-wide text-grey-darker text-mb font-bold mb-2" htmlFor="categoria">
                                            Categoria
                                        </label>
                                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                                            type="text" 
                                            placeholder="Ingrese Categoria"
                                            name="categoria"
                                            value={ categoria }
                                            onChange={ this.changeHandler }
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="md:w-1/3 px-3">
                                        <label className="block uppercase tracking-wide text-grey-darker text-mb font-bold mb-2" htmlFor="valorBoleto">
                                            Valor del Boleto
                                        </label>
                                        <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                                            type="text"
                                            min="0"
                                            placeholder="Ingrese valor"
                                            name="valorBoleto"
                                            value={ valorBoleto }
                                            onChange={ this.changeHandler }
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="md:w-1/3 px-3">
                                        <label className="block uppercase tracking-wide text-grey-darker text-mb font-bold mb-2" htmlFor="imagen">
                                            Portada de la Película
                                        </label>
                                        <input 
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                                            name="imagen"
                                            type="file"
                                            defaultValue={ imagen }
                                            onChange={ this.onFileChange }
                                        />
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                                <i className="fas fa-save fa-lg mr-5 " style={{width:10, height:10}}></i>
                                    <span>Guardar</span>
                                 </button>
                                </div>
                        </form>
                            </div>
                            <div class=" px-4 py-2 m-2"></div>
                        </div>
                       
                    </main>
                </div>
            </div>
        )
    }
}

export default AddMovie;