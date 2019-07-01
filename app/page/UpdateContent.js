import React, { Component } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native'
import {
  Button,
  Content,
  Container,
  Item,
  Textarea,
  Text
} from 'native-base';
import axios from 'axios'

export default class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      url: ''
    };
  };

  componentDidMount() {
    this.setState({
      caption: global.caption,
      url: global.urlContent
    })
  }

  patchData(id) {
    AsyncStorage.getItem('token')
      .then(res => {
        axios.patch(`${global.url}/content/${id}`,
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
            alert('Data updated!')
            this.props.navigation.navigate('pageHandle')
          })
      })
  }

  handleCaption = (caption) => {
    this.setState({ caption })
  }

  handleUrl = (url) => {
    this.setState({ url })
  }

  handleSubmit = () => {
    this.patchData(global.id)
  }
  render() {
    return (
      <Container>
        <Content padder>
          <Item regular style={styles.contentTextArea}>
            <Textarea regular rowSpan={3}
              onChangeText={this.handleCaption}
              value={this.state.caption}
              placeholder='Here your caption' />
          </Item>
          <Item regular style={styles.contentTextArea}>
            <Textarea regular rowSpan={5}
              onChangeText={this.handleUrl}
              value={this.state.url}
              placeholder='Here your url' />
          </Item>
          <Button style={styles.contentButton} onPress={this.handleSubmit} block>
            <Text>
              Update
            </Text>
          </Button>
        </Content>
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