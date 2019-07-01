import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Card,
  Thumbnail,
  Text,
  View,
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddStory extends Component {
  render() {
    return (
      <Card transparent style={styles.bodyCardScrollView}>
        <View style={styles.bodyCardViewScrollView}>
          <Thumbnail source={{ uri: 'https://assets.jalantikus.com/assets/cache/650/450/userfiles/2018/11/15/gambar-anime-keren-8-890e8.jpg' }} />
          <Icon name='plus-circle' style={styles.bodyIconScrollView} />
          <Text numberOfLines={1} style={styles.bodyTextScrollView}>
            Cerita Anda
          </Text>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  bodyCardScrollView: {
    maxWidth: 95
  },
  bodyIconScrollView: {
    backgroundColor: 'white',
    color: 'blue',
    fontSize: 22,
    position: 'absolute',
    top: 35,
    left: 60,
    borderRadius: 10
  },
  bodyTextScrollView: {
    textAlign: 'center',
    marginLeft: 10
  },
  bodyCardViewScrollView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
})