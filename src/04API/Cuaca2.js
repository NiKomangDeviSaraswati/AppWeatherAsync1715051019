import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight,ActivityIndicator, Image} from 'react-native';
import Header from "./Header";
import Footer from "./Footer";

const wind = require('./img/wind.png');
const temp = require('./img/temp.png');
const main = require('./img/main.png');
const humidity = require('./img/humidity.png');
const sunrise = require('./img/sunrise.png');
const sunset = require('./img/sunset.png');
const pressure = require('./img/pressure.png');
const sea = require('./img/sea.png');
const ground = require('./img/ground.png');
const description = require('./img/main_desc.png');

export default class Cuaca1 extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      city: '',
        loading: false,
        forecast: {
           main: '',
           description: '',
            temp: 0,
            sunrise: 0,
            sunset: 0,
            pressure: 0,
            humidity: 0,
            sea_level: 0,
            grnd_level: 0,
            speed: 0,

      }
    };
  }
  async getWeather() {
    this.setState({loading: true });
    try {
        let response = await fetch(
            'http://api.openweathermap.org/data/2.5/weather?q=' + 
            this.state.city + '&appid=d569c0b5743a2739a2bd8fad901cbfad&units=metric'
        );

        let responseJson = await response.json();
        return this.setState({
            loading: false,
            forecast: {
                main: responseJson.weather[0].main,
                description: responseJson.weather[0].description,
                temp: responseJson.main.temp,
                sunrise: responseJson.sys.sunrise,
                sunset: responseJson.sys.sunset,
                pressure: responseJson.main.pressure,
                humidity: responseJson.main.humidity,
                sea_level: responseJson.main.sea_level,
                grnd_level: responseJson.main.grnd_level,
                speed: responseJson.wind.speed
            }
        });
    } catch (error) {
        this.setState({loading: false });
    }
}

  render() {
    return (
    <View style={styles.container}>
       <Header judul={"Prakiraan Cuaca"}/>
       <View style={styles.box1}>
         <Text style={styles.textKota}> Masukan Nama Kota</Text>
         <TextInput
                style={styles.textInput}
              onChangeText={(city) => this.setState({ city })}
            />
            <TouchableHighlight
            underlayColor={'#fff'}

             style={styles.buttonStyle}
                 onPress={() => this.getWeather()}
            >
            {
               this.state.loading ? <ActivityIndicator color="black" size="large" style={styles.loadingStyle} />
                : <Text style={{ color: 'black' }}>Cari</Text>
            }
            </TouchableHighlight>
       </View>
       <View style={styles.box2}>
        <View style={styles.boxHasil}>
        <View style={styles.boxImage}>
          <Image source={temp} style={styles.image} />
        </View>
          <Text> Temp : { this.state.forecast.temp} </Text>
        </View>
        <View style={styles.boxHasil}>
        <View style={styles.boxImage}>
          <Image source={wind} style={styles.image} />
        </View>
          <Text> Wind Speed: { this.state.forecast.speed} </Text>
      </View>
      </View>

      <View style={styles.box2}>
        <View style={styles.boxHasil}>
        <View style={styles.boxImage}>
          <Image source={main} style={styles.image} />
        </View>
          <Text> Main : { this.state.forecast.main} </Text>
        </View>
        <View style={styles.boxHasil}>
        <View style={styles.boxImage}>
          <Image source={description} style={styles.image} />
        </View>
          <Text> Main Desc : { this.state.forecast.description} </Text>
        </View>
      </View>
      
      <View style={styles.box2}>
        <View style={styles.boxHasil}>
        <View style={styles.boxImage}>
          <Image source={sunrise} style={styles.image} />
        </View>
          <Text> Sunrise : { this.state.forecast.sunrise} </Text>
        </View>
        <View style={styles.boxHasil}>
        <View style={styles.boxImage}>
          <Image source={sunset} style={styles.image} />
        </View>
          <Text> Sunset : { this.state.forecast.sunset} </Text>
        </View>
      </View>

      <View style={styles.box2}>
        <View style={styles.boxHasil}>
        <View style={styles.boxImage}>
          <Image source={pressure} style={styles.image} />
        </View>
          <Text> Presure : { this.state.forecast.pressure} </Text>
        </View>
        <View style={styles.boxHasil}>
        <View style={styles.boxImage}>
          <Image source={humidity} style={styles.image} />
        </View>
          <Text> Humadity : { this.state.forecast.humidity} </Text>
        </View>
      </View>

      <View style={styles.box2}>
       <View style={styles.boxHasil}>
       <View style={styles.boxImage}>
          <Image source={sea} style={styles.image} />
        </View>
          <Text> Sea Level : { this.state.forecast.sea_level} </Text>
        </View>
        <View style={styles.boxHasil}>
        <View style={styles.boxImage}>
          <Image source={ground} style={styles.image} />
        </View>
          <Text> Ground Level : { this.state.forecast.grnd_level} </Text>
        </View>
      </View>

            <Footer judul={"Copyright @deviSaraswati"} />
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor: '#FFCCCC',
      flexDirection: 'column'
  },
  buttonStyle:{
      width: 150,
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#FFCCCC',
      height: 40,
  },
  box1:{
      flex:0.7,
      padding: 20,
      backgroundColor: '#FF0066',
      margin : 20,
      flexDirection :"column",
      alignItems: 'center',
  },
  box2: {
    flex:0.3,
    backgroundColor: '#FF0066',
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  textInput: {
    borderWidth: 1,
    margin: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  boxHasil: {
    width: 135,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 30,
    backgroundColor :'#FFCCCC',
  },
  boxImage: {
    alignItems: 'center',
    backgroundColor: '#FFB6C1',
    //borderColor: 'black',
    //borderWidth: 1,
    justifyContent: 'center',
    height: 40,
    width: 30,
  },
  image: {
    tintColor: 'black',
    height: 25,
    width: 25,
  }
});