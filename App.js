import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Animated, PanResponder } from 'react-native';
import { Feather as Icon } from "@expo/vector-icons";


//Podemos importar da biblioteca do react native uma funcao que armazena a largura e altura da tela do dispositivo
//Assim, esses valores serao constantes ao dispositivo usado
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const  Profile = [
  {id: "1", name: "Cant Handle these lips", uri: require('./assets/ahungrydoor.jpg')},
  {id: "2", name: "Ariel", uri: require('./assets/aquaman.jpg')},
  {id: "3", name: "Larry L. Legs", uri: require('./assets/asianspiderman.jpg'),},
  {id: "4", name: "Sheila", uri: require('./assets/myex.png')},
  {id: "5", name: "Minha Sogra", uri: require('./assets/Giygas.jpg')},
  {id: "6", name: "Crunch-time employee", uri: require('./assets/teketeke.jpg')},
  {id: "7", name: "Seu Teixeira", uri: require('./assets/oldman.jpg')}
]

export default class App extends React.Component{
  
  constructor(){
  
    super();
    this.position = new Animated.ValueXY();
    //garantindo q apenas a primeira imagem da pilha tera sua posicao alterada 
    this.state = {
      currentIndex: 0
    }
  
      //Limitando o movimento da imagem para que ela n se mexa livremente
    //Ao inves de mover a imagem, arrasta-la pros lados ira inclina-las pro lado 
    this.rotate = this.position.x.interpolate({
      
      //Definindo que os valores que a area da animacao pode alcancar [VALOR PRA ESQUERDA, valor inicial, VALOR PRA DIREITA]
      inputRange: [-SCREEN_WIDTH/2,0, SCREEN_WIDTH/2],
     
      //Definindo a animacao. [10 graus pra esquerda, valor inicial, 10 graus pra direita]
      outputRange: ['-10deg','0deg','10deg'],
      
      //Garantindo que o valor de saida nao passe do outputRange
      extrapolate: 'clamp'
    })

        //aplicando a rotacao definida acima pras imagens
    this.rotateAndTranslate = {
      transform:[{
        rotate: this.rotate
      },
        ...this.position.getTranslateTransform()
    ]
  }

    //Criando a opacidade do texto de like e dislkike 
    this.likeOpacity = this.position.x.interpolate({

      //Definindo a area de animacao,[esquerda, inicial, direita]
      inputRange: [-SCREEN_WIDTH/2,0, SCREEN_WIDTH/2],
      outputRange: [0,0,1],
      extrapolate: 'clamp'
    })
    //O mesmo eh aplicado para o botao de dislike
    this.rejectOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange:[0,0,1],
      extrapolate: 'clamp'
    })

    //Assim como o codigo acima, a proxima propriedade altera a opacidade da proxima imagem na lista, para que ela consiga ir aparecendo aos poucos, quanto mais o usuario vire a primeira imagem na lista
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2,0, SCREEN_WIDTH/2],
      outputRange: [1,0,1],
      extrapolate: 'clamp'
    })

    //Quanto mais o usuario virar o primeiro item na lista, mais o segundo item cresce em tamanho, indo de 0.8 ate 1
    this.nextcardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange: [1,0.8,1],
      extrapolate: 'clamp'  
    })
}

  //Esse metodo sera responsavel por criar um objeto, que sera atribuido ao componente antes de renderizar a lista de imagens
  componentWillMount(){
    this.PanResponder = PanResponder.create({
     
     //se esse evento ocorrer, os valores x e y da imagens serao mudados no setValue
      onStartShouldSetPanResponder:(evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
          this.position.setValue({x: gestureState.dx, y: gestureState.dy});
      },

      //Quando a imagem for passada
      onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.dx > 120){
          Animated.spring(this.position,{
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy}
          }).start(()=>{
            this.setState({currentIndex: this.state.currentIndex + 1}, ()=> {
              this.position.setValue({x:0,y:0})
            })
          })
        }else if (gestureState.dx< -120){
          Animated.spring(this.position,{
            toValue:{x: -SCREEN_WIDTH - 100, y:gestureState.dy}
          }).start(()=>{
            this.setState({currentIndex: this.state.currentIndex + 1}, ()=> {
              this.position.setValue({x:0,y:0})
            })
          })
        }else{
          Animated.spring(this.position,{
            toValue:{x:0, y:0},
            friction:4
          }).start()
        }
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
            //Aplicando a rotacao de imagens
            this.rotateAndTranslate,
            {
              height: SCREEN_HEIGHT - 120,
              width: SCREEN_WIDTH,
              padding: 10,
              position:'absolute'
            }
          ]}
      >
        {/* as proximas linhas vao estar adicionando e customizando o celo de aprovacao ou rejeicao */}
        <Animated.View
          style ={{
            opacity: this.likeOpacity,
            transform:[{rotate: "-30deg"}],
            position: "absolute",
            top: 50,
            left: 40,
            zIndex: 1000
          }}
        >
          <Text
            style={{
              borderWidth:4,
              borderColor:"green",
              color:"green",
              fontSize: 32,
              fontWeight: "800",
              padding: 10
            }}
          >
              ( ͡° ͜ʖ ͡°)
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: this.rejectOpacity,
                transform: [{rotate: "30deg"}],
                position: "absolute",
                top: 50,
                right: 5,
                zIndex: 1000
              }}
            >
              <Text
                style = {{
                  borderWidth: 4,
                  borderColor: "red",
                  color: "red",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                ( ͡° ͜つ ͡°)╭∩╮
                </Text>
            </Animated.View>
            
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
          <Text style = {styles.name}>{item.name}</Text>
        
        </Animated.View>
      )
    }
    else
    {
      return(
        <Animated.View
          key={item.id}
          style={[
            {
              opacity: this.nextCardOpacity,
              transform: [{scale:this.nextcardScale}],
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
      <View style={{ flex: 1 }}>
      <View style={{ height: 60 }}>

        <View style={styles.header}>
          <Icon name="user" size={32} color="gray" />
          <Icon name="message-circle" size={32} color="gray" />
        </View>

      </View>
      <View style={{ flex: 1 }}>

        {this.renderProfile()}

      </View>
      <View style={{ height: 60 }}>

        <View style={styles.footer}>
          <View style={styles.circle}>
            <Icon name="x" size={32} color="#ec5288" />
          </View>
          <View style={styles.circle}>
            <Icon name="heart" size={32} color="#6ee3b4" />
          </View>
        </View>

      </View>
    </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 0,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
  name: {
    color: "white",
    fontSize: 32,
    position: "absolute",
    padding: 20,
    fontWeight: "bold",
  },
});
