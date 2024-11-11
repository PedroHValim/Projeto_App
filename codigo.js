import * as React from 'react';
import { TextInput, Text, View ,StyleSheet, Image,ScrollView,TouchableOpacity,Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Animatable from 'react-native-animatable';
import { Vibration } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class Principal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      usuario: undefined,
      senha: undefined
    }
  }

  render(){
    return(
      <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
            animation = "flipInY"
            source={{ uri: 'https://i.pinimg.com/736x/14/ce/7d/14ce7dafbca2f29a339f1c19da60bbd1.jpg' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style = {styles.title}>Sport Chic </Text>
      </View>
      <Animatable.View delay={600} style={styles.containerForm} animation = "fadeInUp">
        <Text style = {styles.label}>{"Usuário:"}</Text>
        <TextInput style = {styles.input} onChangeText={(texto)=>this.setState({usuario: texto})}></TextInput>
          <Text style = {styles.label}>{"Senha:"}</Text>
          <TextInput style = {styles.input} secureTextEntry={true} onChangeText={(texto)=>this.setState({senha: texto})}></TextInput>
        <TouchableOpacity  style = {styles.button} title="Login" onPress={()=>this.ler()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity >
        <TouchableOpacity style={styles.buttonRegistrar} onPress={()=> this.props.navigation.navigate('Cadastro')}>
          <Text style={styles.textRegistrar}>Não possui uma conta? Cadastre-se </Text>
        </TouchableOpacity >
        </Animatable.View>
      </View>
    )
  }

  async ler(){
    try{
      let senha = await AsyncStorage.getItem(this.state.usuario);
      if(senha != null){
        if(senha == this.state.senha){
          this.props.navigation.navigate("Central");
        }else{
          alert("Senha Incorreta!");
          Vibration.vibrate(1000);
        }
      }else{
        alert("Usuário não foi encontrado!");
      }
    }catch(erro){
      console.log(erro);
    }
  }
}

class Cadastro extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user: undefined,
      password: undefined,
    }
  }

  async gravar(){
    try{
      await AsyncStorage.setItem(this.state.user, this.state.password);
      alert("Salvo com sucesso!!!");
      this.props.navigation.navigate("Central");
    }catch(erro){
      alert("Erro!");
    }
  }

  render(){
    return(
    <View style={styles.container}>
    <View style={styles.containerLogo}>
        <Animatable.Image
            animation = "flipInY"
            source={{ uri: 'https://i.pinimg.com/736x/14/ce/7d/14ce7dafbca2f29a339f1c19da60bbd1.jpg' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style = {styles.title}>Sport Chic </Text>
      </View>
    <Animatable.View delay={600} style={styles.containerForm} animation = "fadeInUp">
      <Text style = {styles.label}>{"Cadastrar Usuário:"}</Text>
      <TextInput style = {styles.input} onChangeText={(texto)=>this.setState({user: texto})}></TextInput>
      <Text style = {styles.label}>{"Cadastrar Senha:"}</Text>
      <TextInput style = {styles.input} onChangeText={(texto)=>this.setState({password: texto})}></TextInput>
      <TouchableOpacity style = {styles.button} title="Cadastrar" onPress={()=>this.gravar()}>
          <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRegistrar} onPress={()=> this.props.navigation.navigate('Login')}>
          <Text style={styles.textRegistrar}>Voltar para o login! </Text>
        </TouchableOpacity >
      </Animatable.View>
    </View>
    )
  }
}

class App extends React.Component {

    render() {
      return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name = "Login" component={Stack2}
            options ={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      )
    }
  }

  export default App;