import React, { Component } from 'react'
import { AsyncStorage, StyleSheet } from 'react-native'
import {
  Button,
  Body,
  Container,
  Card,
  Content,
  Footer,
  Form,
  FooterTab,
  Header,
  Input,
  Item,
  Text,
  View,
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Login extends Component {
  constructor() {
    super();
    global.url = 'http://192.168.0.10:4200/api/v1';
  }
  state = {
    user: [],
    username: '',
    password: '',
    token: '',
    message: '',
    validateUsername: '',
    validatePassword: ''
  }

  componentDidMount(){
    this.authentic()
  }

  async postLogin() {
    const res = await axios({
      method: 'post',
      url: `${global.url}/login`,
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })

    if (res.data.token) {
      AsyncStorage.setItem('token', res.data.token);
      this.setState({
        username: '',
        password: ''
      })
      return this.props.navigation.navigate('pageHome')
    } else {
      alert(res.data.message)
    }
  }

  authentic() {
    this.showAlert()
    AsyncStorage.getItem('token')
      .then(res => {
        axios.get(`${global.url}/authentic`, {
          headers: {
            authorization: `Bearer ${res}`
          }
        }).then(res => {
          this.hideAlert()
          return this.props.navigation.navigate('pageHome')
        }).catch(this.hideAlert())
      })
  }

  handleSubmit = () => {
    if (this.state.validateUsername == '' && this.state.validatePassword == '') {
      this.setState({ message: 'Input username and password correctly!' })
    } else {
      if (this.state.validateUsername == '') {
        this.setState({ message: 'Input username correctly!' })
      } else {
        if (this.state.validatePassword == '') {
          this.setState({ message: 'Input password correctly!' })
        } else {
          this.postLogin()
        }
      }
    }
  }

  handleUsername = (username) => {
    this.setState({ username })
    if (username != '') {
      this.setState({ validateUsername: 'validated' })
    }
  }

  handlePassword = (password) => {
    this.setState({ password })
    if (password != '') {
      this.setState({ validatePassword: 'validated' })
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render() {
    const { showAlert } = this.state;
    return (
      <Container>
        <Header style={styles.header} />
        <Content padder>
          <Card transparent>
            <Text style={styles.logo}>
              Instagram
            </Text>
          </Card>
          <Card transparent style={{ marginTop: -20 }}>
            <Form>
              <Item regular style={styles.formInput}>
                <Input onChangeText={this.handleUsername}
                  value={this.state.username}
                  placeholder='Nomor telepon, email, atau nama pengguna' />
              </Item>
              <Item regular style={styles.formInput}>
                <Input onChangeText={this.handlePassword}
                  value={this.state.password}
                  secureTextEntry={true} placeholder='Kata Sandi' />
              </Item>
              <Text style={styles.errorText}>
                {this.state.message}
              </Text>
              <Text style={styles.formText}>
                Lupa kata sandi?
              </Text>
              <Button block primary style={styles.formButton} onPress={this.handleSubmit}>
                <Text>
                  Masuk
                </Text>
              </Button>
            </Form>
            <View style={styles.formLine}>
              <View style={styles.formLineLeft} />
              <Text style={styles.formTextLine}>
                ATAU
              </Text>
              <View style={styles.formLineRight} />
            </View>
            <View style={styles.fb}>
              <Icon name='facebook-square' style={styles.icon}>
              </Icon>
              <Text style={styles.formTextFb}>
                Masuk dengan Facebook
              </Text>
            </View>
          </Card>
        </Content>
        <Footer>
          <FooterTab style={styles.footerTab}>
            <Body>
              <View style={styles.footerView}>
                <Text style={styles.footerText}>
                  Tidak punya akun?
                </Text>
                <Text style={styles.footerTextLink}>
                  Buat Akun.
                </Text>
              </View>
            </Body>
          </FooterTab>
        </Footer>
        <AwesomeAlert
          show={showAlert}
          showProgress={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          progressSize={80} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 23,
    backgroundColor: 'white',
    color: 'blue'
  },
  formInput: {
    borderRadius: 8,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#fafafa'
  },
  logo: {
    fontSize: 65,
    fontFamily: 'Billabong',
    textAlign: 'center'
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0
  },
  errorText: {
    marginLeft: 30,
    color: 'red'
  },
  formText: {
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
    marginTop:10,
    marginBottom: 10,
    textAlign: 'right',
    color: 'blue'
  },
  formButton: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20
  },
  formLine: {
    flexDirection: 'row',
    marginBottom: 20
  },
  formTextLine: {
    paddingHorizontal: 5,
    alignSelf: 'center',
    color: 'black'
  },
  formLineRight: {
    marginTop: 20,
    marginRight: 20,
    marginBottom: 20,
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignSelf: 'center'
  },
  formLineLeft: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    alignSelf: 'center'
  },
  fb: {
    alignSelf: 'center',
    flexDirection: 'row'
  },
  formTextFb: {
    marginLeft: 4,
    color: 'blue',
    textAlign: 'center'
  },
  footerTab: {
    backgroundColor: 'white',
    borderTopWidth: 1
  },
  footerView: {
    flexDirection: 'row'
  },
  footerTextLink: {
    marginLeft: 4,
    fontWeight: 'bold'
  }
})