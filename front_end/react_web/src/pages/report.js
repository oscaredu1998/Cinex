import React, { Component } from "react";

import Header from '../components/header';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import axios from 'axios';

const API = "http://localhost:5000/film/raw4";

charts(FusionCharts);

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table_header: {
        pelicula: 'Película',
        boletos: 'Número de Boletos',
        precio: 'Valor Unitario',
        total: 'Total Recaudado',
      },
      reporte: [],
     
      compras: [],
      pelicula:"",
      boletos:"",
      precio:"",
      total:"",
    };
  }

  
  componentDidMount() {
    axios.get(`${API}raw4`)
    .then(response => {
      this.setState({ reporte: response.data.datos })
    })
    .catch(error => {
      console.log(error)
    })
    axios.get(`${API}raw`)
    .then(response => {
      this.setState({ compras: response.data.datos })
      console.log(response.data.datos)
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    const { reporte } = this.state
    const datos = {
      chart: {
        caption: "Reporte de Compras",
        subcaption: `Películas más aceptadas por los usuario`,
        showpercentvalues: "1",
        aligncaptionwithcanvas: "0",
        captionpadding: "0",
        decimals: "1",
        plottooltext: "<h1>$percentValue</h1> recaudado por <h1>$label</h1>",
        theme: "fusion",
        baseFont: "Verdana",
        baseFontSize: "15",
        baseFontColor: "#0066cc",
      },
      data: this.state.reporte
    };

    
    const chartConfigs = {
      type: 'pie3d',
      dataSource: datos,
      width: "700",
      height: "580",
    };
    // return (<ReactFusioncharts {...chartConfigs} />);
    return(
      <div>
         
          <Header />,
          <div className="">
            <hr />
            <main className="my-8">
              <div className="px-3 py-4 flex justify-center">
                <table className="w-full text-md bg-white shadow-md rounded mb-4">
                    <thead className="border-b">
                        <tr>
                          <th className="text-left p-3 px-5">{ this.state.table_header.pelicula }</th>
                          <th className="text-left p-3 px-5">{ this.state.table_header.precio }</th>
                          <th className="text-left p-3 px-5">{ this.state.table_header.boletos }</th>
                          <th className="text-left p-3 px-5">{ this.state.table_header.total }</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b hover:bg-orange-100 bg-gray-100">
                          <td>
                            { reporte.map(element => <p className="p-2 px-5" key={ element.id }> {element.label} </p>) }
                          </td>
                          <td>
                            { reporte.map(element => <p className="p-2 px-5" key={ element.id }> {element.valorBoleto} </p>) }
                          </td>
                          <td>
                            { reporte.map(element => <p className="p-2 px-5" key={ element.id }> {element.value} </p>) }
                          </td>
                          <td>
                            { reporte.map(element => <p className="p-2 px-5" key={ element.id }> {element.recaudado} </p>) }
                          </td>
                        </tr>
                    </tbody>
                </table>
            </div>

              <div className=" sm:ml-6 sm:mr-6 pb-8 flex flex-wrap">
                <div className="w-full px-4">
                  <div className="bg-white border-t border-b sm:rounded sm:border shadow">
                    <div>
                      <div className="text-center px-6">
                        <div className="">
                          <div className=" flex-grow flex-no-shrink ">
                            <ReactFusioncharts {...chartConfigs} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
      </div>
    )
  }
}