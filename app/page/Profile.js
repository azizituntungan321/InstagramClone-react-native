import React, { Component } from 'react'
import { AsyncStorage, ScrollView, StyleSheet } from 'react-native'
import {
  Accordion,
  Button,
  Col,
  Content,
  Container,
  Header,
  Grid,
  Left,
  Right,
  Row,
  Text,
  Thumbnail,
  Tabs,
  Tab,
  View,
  TabHeading,
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import Modal from 'react-native-modal'
import AwesomeAlert from 'react-native-awesome-alerts';
import ContentThreeRow from '../contentPage/ContentThreeRow';
import ContentOneRow from '../contentPage/ContentOneRow';
import Story from '../contentPage/Story';

const dataArray = [{ title: 'Sorotan ' }]
export default class Profile extends Component {
  state = {
    list: [],
    visibleModalId: null,
    showAlert: false,
  }

  async componentDidMount() {
    this.getAllData()
  }

  getAllData() {
    this.showAlert()
    AsyncStorage.getItem('token')
      .then(res => {
        axios.get(`${global.url}/contents`, {
          headers: {
            authorization: `Bearer ${res}`
          }
        }).then(res => {
          this.setState(
            { list: res.data })
          this.hideAlert()
        })
          .catch(err => console.log(err))
      })
  }

  renderModalContent = () => (
    <View style={styles.content}>
      <Button block transparent style={styles.modelButton}
        onPress={() => {
          AsyncStorage.removeItem('token')
          this.props.navigation.navigate('pageLogin')
        }}>
        <Text style={[styles.contentText]}>
          Logout
        </Text>
      </Button>
      <Button block transparent style={styles.modelButton}
        onPress={() => this.setState({ visibleModal: null })}>
        <Text style={styles.contentText}>
          Cancel
        </Text>
      </Button>
    </View>
  );

  _renderContent(item) {
    return (
      <Grid>
        <Row>
          <ScrollView style={styles.bodyScrollView} horizontal={true} showsHorizontalScrollIndicator={false} >
            <Story />
          </ScrollView>
        </Row>
      </Grid>

    );
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
        <Header style={styles.header}>
          <Left style={styles.headerLeft}>
            <Text numberOfLines={1} style={styles.headerLeftText}>
              Leodaci pasi eo alves
            </Text>
            <Button transparent onPress={() => this.setState({ visibleModal: 'default' })}
              title="Default">
              <Icon name='angle-down' style={styles.headerIcon} />
            </Button>
            <Modal isVisible={this.state.visibleModal === 'default'}>
              {this.renderModalContent()}
            </Modal>
          </Left>
          <Right>
            <Button transparent>
              <Icon name='history' style={styles.headerIcon} />
            </Button>
            <Button transparent>
              <Icon name='bars' style={styles.headerIcon} />
            </Button>
          </Right>
        </Header>
        <Content>
          <Row style={styles.contentProfile}>
            <Col style={styles.contentProfilePhoto}>
              <View style={styles.contentProfileView}>
                <Thumbnail large source={{ uri: 'https://assets.jalantikus.com/assets/cache/650/450/userfiles/2018/11/15/gambar-anime-keren-8-890e8.jpg' }} />
                <Icon name='plus-circle' style={styles.contentProfileIcon} />
              </View>
            </Col>
            <Col style={styles.contentProfileNumber}>
              <Row>
                <Col>
                  <View style={styles.contentProfileView}>
                    <Text style={styles.contentNumber}>
                      10
                    </Text>
                    <Text style={styles.contentText}>
                      Postingan
                    </Text>
                  </View>
                </Col>
                <Col>
                  <View style={styles.contentProfileView}>
                    <Text style={styles.contentNumber}>
                      964
                    </Text>
                    <Text style={styles.contentText}>
                      Pengikut
                    </Text>
                  </View>
                </Col>
                <Col>
                  <View style={styles.contentProfileView}>
                    <Text style={styles.contentNumber}>
                      878
                    </Text>
                    <Text style={styles.contentText}>
                      Mengikuti
                    </Text>
                  </View>
                </Col>
              </Row>
              <Row style={styles.contentProfileButton}>
                <Col>
                  <Button small block light>
                    <Text>
                      Edit Profil
                  </Text>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={styles.contentProfileBio}>
            <Col>
              <Text style={styles.contentProfileBioName}>
                Leodaci pasi eo alves
              </Text>
              <Text>
                Ketika itu terjadi paling enggak kita harus pintar di satu hal. Kita harus tau itu penasaran atau suka beneran.
              </Text>
            </Col>
          </Row>
          <Row>
            <View>
              <Accordion style={{ marginLeft: 10 }}
                headerStyle='white'
                contentStyle='white'
                dataArray={dataArray}
                renderContent={this._renderContent} />
            </View>
          </Row>
          <Row>
            <View>
              <Tabs tabBarUnderlineStyle={{ backgroundColor: 'blue' }}>
                <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}>
                  <Icon name='th' style={styles.contenIcon} />
                </TabHeading>}>
                  <View style={styles.contentProfileImage}>
                    {(this.state.list).map(data => {
                      return (
                        <ContentThreeRow key={data.id} url={data.url} caption={data.caption} />
                      )
                    })}
                  </View>
                </Tab>
                <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}>
                  <Icon name='tv' style={styles.contenIcon} />
                </TabHeading>}>
                  {(this.state.list).map(data => {
                    return (
                      <ContentOneRow key={data.id} url={data.url} caption={data.caption} />
                    )
                  })}
                </Tab>
                <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}>
                  <Icon name='id-card' style={styles.contenIcon} />
                </TabHeading>}>
                  <View style={styles.contentProfileImage}>
                    {(this.state.list).map(data => {
                      return (
                        <ContentThreeRow key={data.id} url={data.url} caption={data.caption} />
                      )
                    })}
                  </View>
                </Tab>
              </Tabs>
            </View>
          </Row>
        </Content>
        <AwesomeAlert
          show={showAlert}
          showProgress={true}
          closeOnTouchOutside={true}
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
  header: {
    backgroundColor: '#fafafa'
  },
  headerLeft: {
    flexDirection: 'row'
  },
  headerLeftText: {
    maxWidth: 160,
    marginTop: 10
  },
  headerIcon: {
    fontSize: 25,
    color: 'black',
    backgroundColor: 'transparent'
  },
  bodyScrollView: {
    marginTop: 10,
    marginBottom: 5
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentProfile: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  contentProfileImage: {
    justifyContent: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentProfilePhoto: {
    width: 80,
    marginRight: 10
  },
  contentProfileNumber: {
    marginLeft: 10,
    marginBottom: 10
  },
  contentProfileView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentProfileIcon: {
    backgroundColor: 'white',
    color: 'blue',
    fontSize: 20,
    position: 'absolute',
    top: 60,
    left: 60,
    borderRadius: 10
  },
  contentProfileButton: {
    marginTop: 10
  },
  contentProfileBio: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20
  },
  contentProfileBioName: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  contentNumber: {
    fontWeight: 'bold',
    fontSize: 24
  },
  contentText: {
    color: '#808080'
  },
  contenIcon: {
    fontSize: 25,
    color: '#808080'
  },
  contentTab: {
    borderTopWidth: 3,
    borderTopColor: 'grey'
  },
  modelIcon: {
    fontSize: 25,
    marginRight: 5,
    color: 'black'
  },
  modelText: {
    fontSize: 18,
    color: 'black'
  },
})