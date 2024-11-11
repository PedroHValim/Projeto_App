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

class Stack2 extends React.Component{
    render(){
      return(
        <Stack.Navigator>
          <Stack.Screen  name = "Login" component = {Principal} options = {{headerShown: false}} />
          <Stack.Screen name = "Cadastro" component={Cadastro} options = {{headerShown: false}}/>
          <Stack.Screen name = "Central" component={Central} options = {{headerShown: false}}> </Stack.Screen>
          <Stack.Screen name = "Loja" component={Loja} options = {{headerShown: false}}> </Stack.Screen>
          <Stack.Screen name = "Carrinho" component={Carrinho} options = {{headerShown: false}}> </Stack.Screen>
          <Stack.Screen name = "Sobre" component={Sobre} options = {{headerShown: false}}> </Stack.Screen>
        </Stack.Navigator>
      )
    }
  }
  
  class Loja extends React.Component{
    render(){
      return (
      <Drawer.Navigator
        screenOptions={{
           headerStyle: {
                backgroundColor: '#8D6E63',
              },headerTitleStyle: {
                color: '#2C1B18',
                fontWeight: 'bold',
                fontSize: 22,
              },drawerStyle: {
                backgroundColor: '#8D6E63', 
                width: 220, 
              },
              headerRight: () => (
              <TouchableOpacity 
                style={{ marginRight: 20 }} 
                onPress={() => this.props.navigation.navigate('Central')} >
                <MaterialCommunityIcons name="logout" size={30}  color="#2C1B18" />
              </TouchableOpacity>
            )
        }}
  
        drawerContent={(props) => (
          <View style={{ flex: 1 }}>
          <View style={{ flex: 1, marginTop: '15%'}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Home')}
                  style={styles.drawerItem}
                >
                  <Text style = {styles.drawerItemLetra}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Camisas')}
                  style={styles.drawerItem}
                >
                  <Text style = {styles.drawerItemLetra}>Camisas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Calças e Bermudas')}
                  style={styles.drawerItem}
                >
                  <Text style = {styles.drawerItemLetra}>Calças e Bermudas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Calçados')}
                  style={styles.drawerItem}
                >
                  <Text style = {styles.drawerItemLetra}>Calçados</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Acessórios')}
                  style={styles.drawerItem}
                >
                  <Text style = {styles.drawerItemLetra}>Acessórios</Text>
                </TouchableOpacity>
              </View>
  
              <TouchableOpacity
                style={styles.botaoSair}
                onPress={() => this.props.navigation.navigate("Central")}
              >
                <MaterialCommunityIcons name="logout" size={30} color="#2C1B18" />
                <Text style={{ color: '#2C1B18', marginLeft: 10,fontWeight: 'bold' }}>Sair</Text>
              </TouchableOpacity>
            </View>
        )}              
      >
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Camisas" component={Camisas} />
        <Drawer.Screen name="Calças e Bermudas" component={CalcaseBermudas} />
        <Drawer.Screen name="Calçados" component={Calcados} />
        <Drawer.Screen name="Acessórios" component={Acessorios} />
      </Drawer.Navigator>
    );
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