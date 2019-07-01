import React, { Component } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native'
import {
  Button,
  Container,
  Content,
  Item,
  Text,
  Textarea,
} from 'native-base';
import axios from 'axios'
import AwesomeAlert from 'react-native-awesome-alerts';

export default class AddContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
      showAlert: false,
      list: [],
      id: null,
      caption: '',
      url: '',
    };
  };

  postData() {
    this.showAlert()
    AsyncStorage.getItem('token')
      .then(res => {
        axios.post(`${global.url}/content`,
          {
            caption: this.state.caption,
            url: this.state.url
          },
          {
            headers: {
              authorization: `Bearer ${res}`
            }
          }).then(res => {
            this.setState({
              caption: '',
              url: ''
            })
            this.hideAlert()
            alert('Data added!')
            this.props.navigation.navigate('pageHome')
          }).catch(err => console.log(err))
      })
  }

  handleCaption = (caption) => {
    this.setState({ caption })
  }

  handleUrl = (url) => {
    this.setState({ url })
  }

  handleSubmit = () => {
    this.postData()
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
        <Content padder>
          <Item regular style={styles.contentTextArea}>
            <Textarea regular rowSpan={3}
              onChangeText={this.handleCaption}
              value={this.state.caption}
              placeholder='Caption' />
          </Item>
          <Item regular style={styles.contentTextArea}>
            <Textarea regular rowSpan={5}
              onChangeText={this.handleUrl}
              value={this.state.url}
              placeholder='Url Image' />
          </Item>
          <Button style={styles.contentButton} onPress={this.handleSubmit} block>
            <Text>
              Submit
            </Text>
          </Button>
        </Content>
        <AwesomeAlert
          show={showAlert}
          showProgress={true}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          progressSize={80}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentTextArea: {
    margin: 5
  },
  contentButton: {
    margin: 2.5,
    marginTop: 10
  }
})