import React, { Component } from 'react'
import { AsyncStorage, Image, ScrollView, StyleSheet } from 'react-native'
import {
    Container,
    Header,
    Content,
    Button,
    Left,
    Body,
    Right,
    Grid,
    Row,
    View
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios'
import AddStory from '../contentPage/AddStory';
import ContentOneRow from '../contentPage/ContentOneRow'
import Story from '../contentPage/Story'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            list: [],
        };
    };

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
                    this.setState({ list: res.data })
                    this.hideAlert()
                }).catch(err => console.log(err))
            })
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
                    <Left>
                        <Button transparent>
                            <Icon name='camera' style={styles.headerIcon} />
                        </Button>
                    </Left>
                    <Body>
                        <Image style={styles.headerImage} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png' }} />
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='envelope' style={styles.headerIcon} />
                        </Button>
                        <Button transparent>
                            <Icon name='paper-plane' style={styles.headerIcon} />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Grid>
                        <Row>
                            <ScrollView style={styles.bodyScrollView} horizontal={true} showsHorizontalScrollIndicator={false} >
                                <AddStory />
                                <Story />
                            </ScrollView>
                        </Row>
                        <Row>
                            <View>
                                {(this.state.list).map(data => {
                                    return (
                                        <ContentOneRow key={data.id}
                                            url={data.url}
                                            caption={data.caption}
                                            id={data.id}
                                            page={(data)=>{this.props.navigation.navigate('pageHandleUpdate')}}
                                        />
                                    )
                                })}
                            </View>
                        </Row>
                    </Grid>
                </Content>
                <AwesomeAlert
                    show={showAlert}
                    showProgress={true}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={false}
                    progressSize={80}/>
            </Container >
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fafafa'
    },
    headerIcon: {
        fontSize: 25,
        backgroundColor: 'transparent',
        color: 'black'
    },
    headerTitle: {
        fontFamily: 'Billabong',
        fontSize: 45,
        color: 'black'
    },
    headerImage: {
        marginLeft: -20,
        width: 150,
        height: 50
    },
    bodyScrollView: {
        marginTop: 10,
        marginBottom: 5
    }
})