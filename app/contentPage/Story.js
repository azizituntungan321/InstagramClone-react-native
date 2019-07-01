import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import {
  Card,
  Text,
  Thumbnail,
  View,
} from 'native-base'

export default class Story extends Component {
  state = { events: [1, 2, 3, 4, 5] }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {(this.state.events).map(event => {
          return (
            <Card transparent key={event} style={styles.bodyCardMapScrollView}>
              <View style={styles.bodyCardViewScrollView}>
                <Thumbnail source={{ uri: 'https://assets.jalantikus.com/assets/cache/650/450/userfiles/2018/11/15/gambar-anime-keren-8-890e8.jpg' }} />
                <Text numberOfLines={1} style={{ textAlign: 'center' }}>
                  Cerita Anda
                </Text>
              </View>
            </Card>
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bodyCardMapScrollView: {
    maxWidth: 95,
    marginLeft: 10
  },
  bodyCardViewScrollView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
})