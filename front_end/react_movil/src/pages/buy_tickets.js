import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableHighlight, ScrollView, TextInput, AsyncStorage, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { Link } from "react-router-native";
import axios from 'axios';

const API = "http://172.16.11.136:5000/film/";


export default class BuyTickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: [],
      idpelicula: '',
      idsala_peliculas: '',
      numero_boletos: '',
    };
  }

  handleNumeroBoletos = text => {
    this.setState({ numero_boletos: text });
  };

  getData = () => {
    axios.get(`${ API }pelicula?id=${ this.state.idpelicula }`)
    .then(response => {
      this.setState({ pelicula: response.data.datos })
    })
    .catch(error => {
      console.log(error)
    })
  }

  saveData = () => {
    this.post = {
        datos: {
          idsala_peliculas: this.state.idsala_peliculas,
          numero_boletos: this.state.numero_boletos
        }
    }

    if (this.post.datos.idsala_peliculas === "" ||
        this.post.datos.numero_boletos === ""
        ) {
      alert("Complete todos los datos para continuar...");
    } else {
      axios.post(API+"compra", this.post)
      .then(response => {
        if ( response.data.ok === true ) {
          alert("Compra exito, por favor ingrese su correo electrónico para enviar su comprobante")
        }
      })
      .catch(error => {
        alert(error)
      })
    }
  };

  asyncstorageGet = async () => {
    try {
      const idfilm = await AsyncStorage.getItem('idpelicula')
      this.setState({idpelicula: idfilm})
      const idroom_movies = await AsyncStorage.getItem('idsala_peliculas')
      this.setState({idsala_peliculas: idroom_movies})
      this.getData()
    } catch (e) {
      alert(e)
    }
  }

  asyncstorageSave = async (item) => {
    try {
      await AsyncStorage.setItem('numero_boletos', item.toString())
    } catch (err) {
      alert(err)
    }
  }

  asyncstorageClear = async () => {
    try {
      await AsyncStorage.clear()
      this.setState({ idpelicula: '', idsala_peliculas: '' })
    } catch (e) {
      alert(e)
    }
  }

  componentDidMount() {
    this.asyncstorageGet()
  }

  render() {
    const { pelicula } = this.state
    return(
      <ImageBackground style={ styles.container } source={ require('../../assets/bg.jpg') }>
        <View style={ styles.overlayContainer}>
          <View style={ styles.top }>
            <Text style={ styles.header }>COMPRAR</Text>
          </View>

          

          <ScrollView vertical={true}>
            { pelicula.map( element => 
              <Card key={ element.id } title={ element.titulo } image = { {uri: `${element.imagen}` } }>
                <Text style={{marginBottom: 10}}>
                  Resumen: { element.resumen }
                </Text>
                <Text style={{marginBottom: 10}}>
                  Categoría: { element.categoria }
                </Text>
                <Text style={{marginBottom: 10}}>
                  Valor de Boleto: $ { element.valorBoleto }
                </Text>
              </Card>
              )
            }

            <Card title="Número de boletos">
              <TextInput 
                placeholder="Ingrese el número de boletos que desea"  
                underlineColorAndroid='transparent'  
                style={styles.TextInputStyle}  
                keyboardType={'numeric'}
                onChangeText={ this.handleNumeroBoletos }
              />
            </Card>

            <View style={ styles.button }>
              <Button title="Continuar" onPress={ () => {this.asyncstorageSave(this.state.numero_boletos), this.saveData(), this.props.history.push("/send_tickets")} } />
            </View>
          </ScrollView>

        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%', 
    height: '100%',
    justifyContent:'center',
    backgroundColor: 'red',
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(47,163,218, .4)',
  },
  top: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#fff',
    fontSize: 28,
    borderColor: '#fff',
    borderWidth: 2,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'rgba(255,255,255, .1)',
    textAlign: 'center'
  },
  button: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})