import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { View, } from 'native-base'

export default class ContentThreeRow extends Component {
  render() {
    return (
      <View style={styles.contentImage}>
        <Image source={{ uri: this.props.url }}
          style={styles.contentImageSize} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentImage: {
    margin: 3.5
  },
  contentImageSize: {
    height: 125,
    width: 130
  }
})