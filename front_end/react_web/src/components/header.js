/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from'react';
import { Link } from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
         
        <nav class="bg-blue-500 flex items-center justify-between flex-wrap bg-teal p-8">
  <div class="flex items-center flex-no-shrink text-white mr-6">
  <i className="fas fa-film fa-2x mr-5 " style={{width:30, height:30}}></i>
    <span class="font-semibold text-xl tracking-tight text-4xl ">CINE YAVIRAC</span>
  </div>
  
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"   >
    <div class="text-lg lg:flex-grow" >
      <a href="/report" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
      Reporte de Compras  /
      </a>
      <a href="/add_movie" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
      Crear Película  /
      </a>
      <a href="/movies" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
      Catálogo  /
      </a>
      <a href="/rooms" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
      Crear Salas  /
      </a>
      <a href="/schedules" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
      Crear Horarios  /
      </a>

      <a href="/films_room" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
      Asignar Peliculas  /
      </a>
    </div>
   
    <div>
    
        <a href="#responsive-header" class="font-mono text-lg text-gray-800 text-center text-4xl hover:text-white ">
        <i className="fas fa-user fa-ms mr-5 " style={{width:30, height:30}}></i>
        { localStorage.getItem('nombre') }
        </a>
      
    </div>
  </div>
</nav>
        )
    }
}
