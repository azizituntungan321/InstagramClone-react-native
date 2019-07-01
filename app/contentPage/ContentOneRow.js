import React, { Component } from 'react'
import { AsyncStorage, Image, StyleSheet, } from 'react-native'
import {
  Button,
  CardItem,
  Col,
  Card,
  Row,
  Thumbnail,
  Text,
  View,
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'
import axios from 'axios'

export default class ContentOneRow extends Component {
  state = {
    visibleModalId: null,
    showAlert: false,
  };

  handleEdit = () => {
    global.id = this.props.id
    global.caption = this.props.caption
    global.urlContent = this.props.url
    this.setState({ visibleModal: null })
    this.props.page()
  }

  handleDelete = (id) => {
    AsyncStorage.getItem('token')
      .then(res => {
        axios.delete(`${global.url}/content/${id}`,
          {
            headers: {
              authorization: `Bearer ${res}`
            }
          }).then(res => {
            this.setState({ visibleModal: null })
            { this.props.getAll }
          })
          .catch(err => {
            this.setState({ visibleModal: null })
          })
      })
  }

  renderModalContent = () => (
    <View style={styles.content}>
      <Button block transparent style={styles.modelButton}
        onPress={() => this.handleEdit()}>
        <Icon name='edit' style={[styles.modelIcon, { color: 'green' }]} />
        <Text style={[styles.contentText, { color: 'black' }]}>
          Update
        </Text>
      </Button>
      <Button block transparent style={styles.modelButton}
        onPress={() => this.handleDelete(this.props.id)}>
        <Icon name='trash' style={[styles.modelIcon, { color: 'red' }]} />
        <Text style={[styles.contentText, { color: 'black' }]}>
          Delete
        </Text>
      </Button>
      <Button block transparent style={styles.modelButton}
        onPress={() => this.setState({ visibleModal: null })}>
        <Icon name='chevron-left' style={[styles.modelIcon, { color: 'blue' }]} />
        <Text style={[styles.contentText, { color: 'black' }]}>
          Cancel
        </Text>
      </Button>
    </View>
  );

  render() {
    return (
      <View>
        <Row style={styles.contentRow}>
          <Card transparent style={styles.contentRowCard}>
            <View style={styles.contentRowCardView}>
              <Thumbnail small source={{ uri: 'https://assets.jalantikus.com/assets/cache/650/450/userfiles/2018/11/15/gambar-anime-keren-8-890e8.jpg' }} />
              <Text style={styles.contentRowCardText}>
                Leodaci pasi eo alves
              </Text>
              <TouchableWithoutFeedback onPress={() => this.setState({ visibleModal: 'default' })}
                title="Default">
                <Button transparent style={styles.contentRowCardIcon}>
                  <Icon name='ellipsis-v' style={styles.headerIcon} />
                </Button>
              </TouchableWithoutFeedback>
              <Modal isVisible={this.state.visibleModal === 'default'}>
                {this.renderModalContent()}
              </Modal>
            </View>
          </Card>
        </Row>
        <Row>
          <Card transparent>
            <CardItem cardBody>
              <Image style={styles.contentImage} source={{ uri: this.props.url }} />
            </CardItem>
          </Card>
        </Row>
        <Row>
          <Col>
            <Card transparent >
              <View style={{ flexDirection: 'row' }}>
                <Button transparent>
                  <Icon name='heart' style={styles.iconLeft} />
                </Button>
                <Button transparent>
                  <Icon name='comment' style={styles.iconLeft} />
                </Button>
                <Button transparent>
                  <Icon name='paper-plane' style={styles.iconLeft} />
                </Button>
              </View>
            </Card>
          </Col>
          <Col>
            <Card transparent >
              <View>
                <Button transparent>
                  <Icon name='bookmark' style={styles.iconRight} />
                </Button>
              </View>
            </Card>
          </Col>
        </Row>
        <Row>
          <Card transparent style={styles.contentFooterLike}>
            <Text>
              18 suka
            </Text>
            <View style={styles.contentFooterView}>
              <Text style={styles.contentFooterName}>
                Leodaci pasi eo alves
              </Text>
              <Text style={styles.contentFooterCaption}>
                {this.props.caption}
              </Text>
            </View>
            <View style={styles.contentFooterThumbnail}>
              <Thumbnail small source={{ uri: 'https://assets.jalantikus.com/assets/cache/650/450/userfiles/2018/11/15/gambar-anime-keren-8-890e8.jpg' }} />
              <TextInput placeholder='Tambahkan komentar' style={styles.contentFooterComment} />
            </View>
            <Text style={styles.contentFooterTime}>
              11 JAM YANG LALU
            </Text>
          </Card>
        </Row>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerIcon: {
    fontSize: 25,
    backgroundColor: 'transparent',
    color: 'black'
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentText: {
    fontSize: 18,
  },
  contentRow: {
    borderTopWidth: 3,
    borderColor: '#fafafa',
    borderBottomWidth: 3
  },
  contentRowCard: {
    marginLeft: 10,
    maxWidth: 300
  },
  contentRowCardView: {
    flexDirection: 'row'
  },
  contentRowCardText: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5
  },
  contentRowCardIcon: {
    marginLeft: 165
  },
  contentImage: {
    height: 400,
    width: 465
  },
  contentFooterLike: {
    marginLeft: 10
  },
  contentFooterView: {
    flexDirection: 'row'
  },
  contentFooterName: {
    fontWeight: 'bold'
  },
  contentFooterCaption: {
    marginLeft: 5
  },
  contentFooterThumbnail: {
    flexDirection: 'row',
    marginTop: 10
  },
  contentFooterComment: {
    color: '#808080',
    marginLeft: 10
  },
  contentFooterTime: {
    color: '#808080',
    fontSize: 11,
    marginTop: 5,
    marginBottom: 10
  },
  modelButton: {
    flexDirection: 'row'
  },
  modelIcon: {
    fontSize: 25,
    marginRight: 5
  },
  iconLeft: {
    fontSize: 25,
    color: 'black',
    marginLeft: 17
  },
  iconRight: {
    fontSize: 25,
    color: 'black',
    marginLeft: 130
  },
  footerIcon: {
    fontSize: 25,
    color: 'black'
  }
})