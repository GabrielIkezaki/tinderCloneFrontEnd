import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Animated, PanResponder } from 'react-native';

//Podemos importar da biblioteca do react native uma funcao que armazena a largura e altura da tela do dispositivo
//Assim, esses valores serao constantes ao dispositivo usado
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const  Profile = [
  {id: "1", name: "Cant Handle these lips", uri: require('./assets/ahungrydoor.jpg')},
  {id: "2", name: "Ariel", uri: require('./assets/aquaman.jpg')},
  {id: "3", name: "Larry L. Legs", uri: require('./assets/asianspiderman.jpg'),},
  {id: "4", name: "Sheila", uri: require('./assets/myex.png')}
]

export default class App extends React.Component{
  
  constructor(){
    super();
    this.position = new Animated.ValueXY();
    //garantindo q apenas a primeira imagem da pilha tera sua posicao alterada 
    this.state = {
      currentIndex: 0
    }
  }

  //Esse metodo sera responsavel por criar um objeto, que sera atribuido ao componente antes de renderizar a lista de imagens
  componentWillMount(){
    this.PanResponder = PanResponder.create({
     
     //se esse evento ocorrer, os valores x e y da imagens serao mudados no setValue
      onStartShouldSetPanResponder:(evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
          this.position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (evt, gestureState) => {
        
      }
    })
  }


  //essa funcao vai renderizar todas as imagens na array Profile
  //Essa funcao sera chamada na funcao render (onde usamos o flex para ajustar o tamanho das imagens)
  //Enquanto a funcao renderprofile renderiza as imagens em si, a funcao render vaiajustar o tamanho de cada imagem
  renderProfile = () =>{
    return Profile.map((item, i) => {

      if(i < this.state.currentIndex)
      {
        return null;
      }
      else if(i == this.state.currentIndex)
      {
        return(
          <Animated.View
          {...this.PanResponder.panHandlers}
          key={item.id}
          style={[
            {transform: this.position.getTranslateTransform()},
            {
              height: SCREEN_HEIGHT - 120,
              width: SCREEN_WIDTH,
              padding: 10,
              position:'absolute'
            }
          ]}
      >
        <Image
          style={{
            flex: 1,
            height: null,
            width: null,
            resizeMode: "cover",
            borderRadius: 20
          }}
          source={item.uri}
          />
        
        </Animated.View>
      )
    }
    else
    {
      alert ("else");
      return(
        <Animated.View
          key={item.id}
          style={[
            {
              height: SCREEN_HEIGHT -120,
              width: SCREEN_WIDTH,
              padding: 10,
              position: 'absolute'
            }
          ]}
        >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
                source={item.uri}
              />
          </Animated.View>
         
      )
    }
  }).reverse();
}


  //O codigo abaixo, sendo uma classe, vai renderizar as dimensões das imagens
  //Por isso, vamos usar o flex para ajustar esses valores 
  render(){
    return (
       <View style = {{flex:1}}>
          <View style ={{height: 60}}>
        </View>
        <View style ={{flex:1}}>
          {this.renderProfile()}
        </View>
         <View style = {{height:60}}>
          </View>
        </View>
      //<Text>banana</Text>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
