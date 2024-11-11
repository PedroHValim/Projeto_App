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

  class Central extends React.Component{
    render() {
      return (
        <View style={styles.container}>
        <View style={styles.containerTitle}>
            <Text style = {styles.title2}>{"Marca patrocinadora da Sport Chic"} </Text>
            <View style={styles.containerLogo}>
          <Animatable.Image
              animation = "flipInY"
              source={{ uri: 'https://i.pinimg.com/564x/58/d3/84/58d38444ae1561c113ee9ac60f8887a3.jpg' }}
              style={styles.logo}
              resizeMode="contain"
            />
        </View>
        </View>
        <Animatable.View animation="fadeInUp" style={styles.containerForm2}>
          <TouchableOpacity style = {styles.button}onPress={()=> this.props.navigation.navigate('Loja')}>
              <Text style={styles.buttonText}>Loja</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.button} onPress={()=> this.props.navigation.navigate('Carrinho')}>
              <Text style={styles.buttonText}>Carrinho</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.button} onPress={()=> this.props.navigation.navigate('Sobre')}>
              <Text style={styles.buttonText}>Sobre</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.button} onPress={()=> this.props.navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Sair</Text>
          </TouchableOpacity>
          </Animatable.View>
        </View>
      );
    }
  }
  
  class Home extends React.Component {
    render() {
      return (
        <ScrollView style={styles.containerHome}>
  
          <View style={styles.banner}>
            <Image 
              source={{ uri: 'https://i.pinimg.com/736x/16/08/eb/1608eb1814515949c6f1216ec8f12551.jpg' }} 
              style={styles.bannerCorinthians} 
            />
            <Text style={styles.textoCorinthians}>Sócio Torcedor: Até 50% OFF!</Text>
          </View>
  
          <View style={{marginBottom: '10%',height: '19%'}}>
            <Text style={styles.titulosDaHome}>Categorias</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} //a tela scrolla pro lado e o 'false' é para não mostrar a barrinha de scroll
             style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.cardCategoria} onPress={()=> this.props.navigation.navigate('Calçados')}>
                <Image source={{ uri: 'https://i.pinimg.com/236x/40/35/f3/4035f3663a8169e9a46e4dc7452717c0.jpg' }} style={styles.tamanhoImagemCategoria} />
                <Text style={styles.textoCategoria}>Chinelos</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardCategoria} onPress={()=> this.props.navigation.navigate('Acessórios')}>
                <Image source={{ uri: 'https://i.pinimg.com/236x/ca/1f/82/ca1f82c5f036589fec3679bd8e73b4b1.jpg' }} style={styles.tamanhoImagemCategoria} />
                <Text style={styles.textoCategoria}>Bonés</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardCategoria} onPress={()=> this.props.navigation.navigate('Camisas')}>
                <Image source={{ uri: 'https://i.pinimg.com/236x/c0/7b/6c/c07b6c15c755c42d60dc33b65701b5bc.jpg' }} style={styles.tamanhoImagemCategoria} />
                <Text style={styles.textoCategoria}>Camisas de Time</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
  
          <View style={{marginBottom:'10%'}}>
            <Text style={styles.titulosDaHome}>Produtos em Destaque</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Calçados')}>
              <View style={styles.cardProduto}>
                <Image source={{ uri: 'https://i.pinimg.com/564x/1a/db/7f/1adb7f1f03e63b4883aeeeff7946fc4d.jpg' }} style={styles.tamanhoImagemProduto} />
                <Text style={styles.descricaoProduto}>Tênis de Corrida X100</Text>
                <Text>R$ 299,99</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Camisas')}>
              <View style={styles.cardProduto}>
                <Image source={{ uri: 'https://i.pinimg.com/236x/9f/5f/0a/9f5f0a0b5c3abc16743da629d3543fa7.jpg' }} style={styles.tamanhoImagemProduto} />
                <Text style={styles.descricaoProduto}>Camiseta de Futebol</Text>
                <Text>R$ 79,99</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Calças e Bermudas')}>
              <View style={styles.cardProduto}>
                <Image source={{ uri: 'https://i.pinimg.com/236x/32/3b/ca/323bcab82da4c818a53e7e8d41536633.jpg' }} style={styles.tamanhoImagemProduto} />
                <Text style={styles.descricaoProduto}>Short Corinthians</Text>
                <Text>R$ 129,99</Text>
              </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
          <Text style={styles.titulosDaHome}>Ofertas</Text>
          <View style={styles.containerOferta}>
            <Text style={styles.textoOferta}>Até 70% de desconto na Faixa do Memphis Depay!</Text>
            <TouchableOpacity style={styles.botaoVer} onPress={() => this.props.navigation.navigate('Acessórios')}>
              <Text style={styles.textoBotaoVer}>Ver Acessórios</Text>
            </TouchableOpacity>
          </View>
  
          <View style={styles.redesSociais}>
            <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/corinthians/").catch(err => console.error('Erro ao abrir o link: ', err))}>
              <Text style={styles.textoRedesSociais}>Redes Sociais</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
  }
  
  class Camisas extends React.Component {
    handlePress = async (id, name) => {
      try {
        const item = { id, name };
        let cartItems = await AsyncStorage.getItem('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        cartItems.push(item);
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(`${name} foi adicionado ao carrinho!`);
        Vibration.vibrate(500);
      } catch (error) {
        console.error("Erro ao adicionar item ao carrinho", error);
      }
    };
  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title3}>{"UNISEX"}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.containerHud}>
            <TouchableOpacity onPress={() => this.handlePress(11,"Camisa Cinza Fit")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/63/98/da/6398daa069b3c17f000f4721ac4c61f7.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Camisa Cinza Fit</Text>
                <Text>R$ 99,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(12,"Camisa Corinthians Bege")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/80/8f/f3/808ff3b6bae037bc498710b8733eab29.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Camisa Corinthians Bege</Text>
                <Text>R$ 109,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(13,"Camisa Preta Casual")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/1b/d1/6b/1bd16bd61b000c5c3450e06f9668c024.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Camisa Preta Casual</Text>
                <Text>R$ 89,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(14,"Camisa Preta Básica")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/e9/a9/d2/e9a9d2e68beba15a93f2aab3b920a8d9.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Camisa Preta Básica</Text>
                <Text>R$ 79,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(15,"Camisa Arsenal Vermelha")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/df/f3/10/dff310101ebce0580e2a1b62ed0c42dd.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Camisa Arsenal Vermelha</Text>
                <Text>R$ 109,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(16,"Camisa Japão Branca")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/c0/7b/6c/c07b6c15c755c42d60dc33b65701b5bc.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Camisa Japão Branca</Text>
                <Text>R$ 99,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(17,"Camisa Alemanha Preta")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/5f/37/ae/5f37ae6f69893798edc291798dabb966.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Camisa Alemanha Preta</Text>
                <Text>R$ 119,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(18,"Camisa Itália Branca")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/15/a1/dd/15a1dd40360bddd356abdb570f0d3af3.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Camisa Itália Branca</Text>
                <Text>R$ 89,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(19, "Camisa Alemanha Rosa")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/41/fc/6e/41fc6e02d93855a83e44806940076caa.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Camisa Alemanha Rosa</Text>
                <Text>R$ 79,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(20,"Camisa Holanda")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/ff/cb/ea/ffcbea2f8fb4d8e7d57d62350b971755.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Camisa Holanda</Text>
                <Text>R$ 129,99</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
  }
  
  
  class CalcaseBermudas extends React.Component {
  
    handlePress = async (id, name) => {
      try {
        const item = { id, name };
        let cartItems = await AsyncStorage.getItem('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        cartItems.push(item);
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(`${name} foi adicionado ao carrinho!`);
        Vibration.vibrate(500);
      } catch (error) {
        console.error("Erro ao adicionar item ao carrinho", error);
      }
    };
  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title3}>{"UNISEX"}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.containerHud}>
            
            <TouchableOpacity onPress={() => this.handlePress(21,"Shorts Academia")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/f8/ba/c8/f8bac8fe692855eac07324ebb7a8d4c0.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Shorts Academia</Text>
                <Text>R$ 29,99</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.handlePress(22,"Shorts Academia")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/af/da/2e/afda2ec8fd8edadf23a96a75458bab4e.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Shorts Academia</Text>
                <Text>R$ 34,99</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.handlePress(23,"Shorts Academia Nike")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/474x/26/3e/32/263e32426eeb5653b5a8d234023524cf.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Shorts Academia Nike</Text>
                <Text>R$ 59,99</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.handlePress(24,"Shorts Corinthians")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/32/3b/ca/323bcab82da4c818a53e7e8d41536633.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Shorts Corinthians</Text>
                <Text>R$ 129,90</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.handlePress(25,"Shorts Brasil Verde")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/474x/d9/5b/6a/d95b6a9eea7a34b2eed41892492be58b.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Shorts Brasil Verde</Text>
                <Text>R$ 109,99</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.handlePress(26,"Shorts Nike Preto")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/13/ed/d2/13edd21eb63e43000fb9b71088d0482c.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Shorts Nike Preto</Text>
                <Text>R$ 109,99</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.handlePress(27,"Shorts Nike Básico")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/df/bb/10/dfbb102ae45adc7105867fa315dab3e7.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Shorts Nike Básico</Text>
                <Text>R$ 99,99</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.handlePress(28, "Calça Nike Básica")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/6e/09/2f/6e092f2b8b6b28c3caf07f9e131b98de.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Calça Nike Básica</Text>
                <Text>R$ 159,99</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.handlePress(29,"Legging Nike Preta")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/9c/71/15/9c7115063f4ebfaa38ea8e28a72c0bc6.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Legging Nike Preta</Text>
                <Text>R$ 99,99</Text>
              </View>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={() => this.handlePress(221,"Calça Nike Moletom")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/d4/af/84/d4af8483b219670e6d53ac77e729e0ee.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Calça Nike Moletom</Text>
                <Text>R$ 179,90</Text>
              </View>
            </TouchableOpacity>
            
          </ScrollView>
        </View>
      );
    }
  }
  
  
  
  class Calcados extends React.Component {
    handlePress = async (id, name) => {
      try {
        const item = { id, name };
        let cartItems = await AsyncStorage.getItem('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        cartItems.push(item);
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(`${name} foi adicionado ao carrinho!`);
        Vibration.vibrate(500);
      } catch (error) {
        console.error("Erro ao adicionar item ao carrinho", error);
      }
    };
  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title3}>{"UNISEX"}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.containerHud}>
            
            {/* Meias */}
            <TouchableOpacity onPress={() => this.handlePress(31,"Meia Cano Curto")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/db/36/d4/db36d468d33bc4b8ff3844ed56d30ac4.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Meia Cano Curto</Text>
                <Text>R$ 19,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(32,"Meia Canela")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/474x/66/dd/ee/66ddee4467964cec4ce87d0775788dd3.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Meia Canela</Text>
                <Text>R$ 24,99</Text>
              </View>
            </TouchableOpacity>
  
            {/* Chinelos */}
            <TouchableOpacity onPress={() => this.handlePress(33,"Chinelo Esportivo")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/f6/ec/26/f6ec26bea32350067869d5b610e9f9bf.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Chinelo Esportivo</Text>
                <Text>R$ 39,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(34,"Chinelo Conforto")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/40/35/f3/4035f3663a8169e9a46e4dc7452717c0.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Chinelo Conforto</Text>
                <Text>R$ 45,99</Text>
              </View>
            </TouchableOpacity>
  
            {/* Chuteiras */}
            <TouchableOpacity onPress={() => this.handlePress(35,"Chuteira Nike")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/30/ec/f3/30ecf3a7e4ae471c90f73381d182817c.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Chuteira Nike</Text>
                <Text>R$ 149,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(36,"Chuteira Nike")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/736x/14/ce/7d/14ce7dafbca2f29a339f1c19da60bbd1.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Chuteira Nike</Text>
                <Text>R$ 169,99</Text>
              </View>
            </TouchableOpacity>
  
            {/* Tênis de Basquete */}
            <TouchableOpacity onPress={() => this.handlePress(37,"Tênis Basquete Preto")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/59/fb/de/59fbdebaee1f6d517c017335cb6dc353.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Tênis Basquete Preto</Text>
                <Text>R$ 299,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(38,"Tênis Basquete Branco11")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/5a/3b/33/5a3b333a902e79caf730556f9dbaeb21.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Tênis Basquete Branco</Text>
                <Text>R$ 319,99</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
  }
  
  class Acessorios extends React.Component {
    handlePress = async (id, name) => {
      try {
        const item = { id, name };
        let cartItems = await AsyncStorage.getItem('cartItems');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        cartItems.push(item);
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert(`${name} foi adicionado ao carrinho!`);
        Vibration.vibrate(500);
      } catch (error) {
        console.error("Erro ao adicionar item ao carrinho", error);
      }
    };
  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title3}>{"UNISEX"}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.containerHud}>
            <TouchableOpacity onPress={() => this.handlePress(1, "Boné Esportivo")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/ca/1f/82/ca1f82c5f036589fec3679bd8e73b4b1.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Boné Esportivo</Text>
                <Text>R$ 59,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(2, "Munhequeira Preta")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/d2/5b/3e/d25b3e0f0b799aa2c8cf39fc43b94ec7.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Munhequeira Preta</Text>
                <Text>R$ 34,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(3, "Faixa Nike")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/e7/2a/a8/e72aa8accdb2487d60cc8a66a8c3856f.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Faixa Nike</Text>
                <Text>R$ 79,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(4, "Pulseira Nike Preta")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/1c/c7/8d/1cc78d94e299d948b80012587f603e07.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Pulseira Nike Preta</Text>
                <Text>R$ 89,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(5, "Mochila Nike Preta")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/37/8c/2f/378c2f1f70ff60031da4c1dc6fe0159c.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Mochila Nike Preta</Text>
                <Text>R$ 69,99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handlePress(6, "Toca Nike Preta")}>
              <View style={styles.cardProduto}>
                <Image
                  source={{ uri: 'https://i.pinimg.com/236x/4d/46/4e/4d464e889eee7fb46bcdb02f3fc0089e.jpg' }}
                  style={styles.tamanhoImagemProduto}
                />
                <Text style={styles.descricaoProduto}>Toca Nike Preta</Text>
                <Text>R$ 49,99</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
    }
  }

  class Carrinho extends React.Component {
    state = {
    selectedItems: [],
  };

  async componentDidMount() {
    try {
      const cartItems = await AsyncStorage.getItem('cartItems');
      const selectedItems = cartItems ? JSON.parse(cartItems) : [];
      this.setState({ selectedItems });
    } catch (error) {
      console.error("Erro ao carregar itens do carrinho", error);
    }
  }

  removeItem = async (id) => {
    try {
      let { selectedItems } = this.state;
      selectedItems = selectedItems.filter(item => item.id !== id);
      this.setState({ selectedItems });
      await AsyncStorage.setItem('cartItems', JSON.stringify(selectedItems));
    } catch (error) {
      console.error("Erro ao remover item do carrinho", error);
    }
  };

  render() {
    const { selectedItems } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.headerCarrinho}>
          <Text style={styles.title3}>Meu Carrinho!</Text>
        </View>
        <ScrollView style={{marginBottom: '10%'}}>
          <Text style={styles.title}>Itens</Text>
          {selectedItems.length > 0 ? (
            selectedItems.map((item, index) => (
              <View key={index} style={styles.itemCarrinho}>
                <Text style={styles.textoItem}>Item: {item.name}</Text>
                <TouchableOpacity
                  style={styles.botaoRemover}
                  onPress={() => this.removeItem(item.id)}
                >
                  <Text style={styles.textoBotaoRemover}>Remover</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.textoCarrinhoVazio}>Seu carrinho está vazio.</Text>
          )}
        </ScrollView>
        <View style={{posiiton:'absolute',bottom:0}}>
          <TouchableOpacity
            style={styles.botaoSair}
            onPress={() =>this.props.navigation.navigate('Central')}
          >
            <MaterialCommunityIcons name="logout" size={30} color="#2C1B18" />
            <Text style={{ color: '#2C1B18', marginLeft: 10, fontWeight: 'bold' }}>
              Voltar às compras
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class Sobre extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.headerCarrinho}>
          <Text style={styles.title3}>{"Desenvolvedor"}</Text>
        </View>
        <ScrollView style={{alignItems:'center',flex: 0.8}}>
            <Text style={styles.labelSobre}>{"Nome:"}</Text>
            <Text style={styles.textSobre}>{"Pedro Henrique Ferreira Valim"}</Text>
            <Text style={styles.labelSobre}>{"Faculdade:"}</Text>
            <Text style={styles.textSobre}>{"FEI: Faculdade de Engenharia Industrial"}</Text>
            <Text style={styles.labelSobre}>{"Curso:"}</Text>
            <Text style={styles.textSobre}>{"Ciência da Computação"}</Text>
            <Text style={styles.labelSobre}>{"Ciclo:"}</Text>
            <Text style={styles.textSobre}>{"4º Semestre"}</Text>
            <Text style={styles.labelSobre}>{"Matéria:"}</Text>
            <Text style={styles.textSobre}>{"Computação Móvel"}</Text>
            <Text style={styles.labelSobre}>{"Docentes:"}</Text>
            <Text style={styles.textSobre}>{"Prof. Rafael Gomes Alves"}</Text>
            <Text style={styles.textSobre}>{"Prof. Isaac Jesus Silva "}</Text>
            <Text style={styles.labelSobre}>{"Experiência:"}</Text>
            <Text style={styles.textSobre}>{'"Fazer este código foi além de muito divertido, muito prático e me deu uma noção muito maior de tudo sobre Computação Móvel, indico todos a tentarem um dia explorarem este mundo, espero que tenham gostado da "Sport Chic"!"'}</Text>
            <Text style={styles.labelSobre}>{}</Text>
        </ScrollView>
        <View style={{height:'10%', backgroundColor:'#6D4C41',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity
              style={styles.botaoSair}
              onPress={() => this.props.navigation.navigate("Central")}>
              <MaterialCommunityIcons name="logout" size={30} color="#2C1B18" />
              <Text style={{ color: '#2C1B18', marginLeft: 10,fontWeight: 'bold' }}>Voltar</Text>
            </TouchableOpacity>
        </View>    
      </View>
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