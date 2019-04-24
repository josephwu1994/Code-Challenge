import React, { Component }from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';

import styled from 'styled-components/native'
import { fonts, colors } from '../../styles';
const headerBackground = require('../../../design/assets/weatherHeader.png');
import button from '../../../design/assets/addBookmarkButton.png';
import Search from './Search'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
`
const Background = styled.ImageBackground`
  flex: 1;
  width: 100%;
  background-color: #fff;
`
const GreetingBackground = styled.ImageBackground`
  display: flex;
  flex-shrink: 1;
  flex-direction: row;
  width: 100%;
  height: 20%;
  padding-bottom: 30px;
  align-items: flex-end;
  justify-content: space-around;
  font-family: 'SFProText-Medium';
`
const GreetingText = styled.Text`
  font-size: 32px;
  margin: 1px;
  color: #0A0A0A;
`
const WeatherText = styled.Text`
  margin: 1px;
  font-size: 13px;
  color: #383838;
`
const Button = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
`
const ButtonImage = styled.Image`
  height: 100%;
  width: 100%;
`

export default class Bookmarks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.toggleSearchModal = this.toggleSearchModal.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((locationData) => {
      console.log(locationData);
    })
  }

  toggleSearchModal() {
    console.log('hi')
    this.setState({ showModal: !this.state.showModal})
  }

  render() {

    return (
      <Container>
        <Background resizeMode="cover">
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showModal}
            presentationStyle="fullScreen"
          >
            <Search toggleSearchModal={this.toggleSearchModal}/> 
          </Modal>
          <GreetingBackground source={headerBackground}>
            <View>
              <GreetingText>Good morning</GreetingText>
              <WeatherText>Today is 72° and Sunny</WeatherText>
            </View>
            <Button onPress={()=>this.toggleSearchModal()}>
              <ButtonImage source={button}/>
            </Button>
          </GreetingBackground>
        </Background>
      </Container>
    );
  }
}