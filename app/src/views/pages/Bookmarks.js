import React, { Component }from 'react';
import { connect } from 'react-redux'
import { getLocation, searchLocation } from './pagesReducer'
import styled from 'styled-components/native'
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Modal,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel'
import RNGooglePlaces from 'react-native-google-places'

import button from '../../../design/assets/addBookmarkButton.png'
import headerBackground from '../../../design/assets/weatherHeader.png'
import BookmarkCard from '../../components/BookmarkCard';

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
  font-family: 'SF-Pro-Text-Medium';
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
const CarouselContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 100%;
`
const CurrentLocation = styled.ImageBackground`
  height: 40%;
  width: 100%;
  padding: 40px 0 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`
const Caption = styled.Text`
  font-size: 23px;
  color: #000;
`
const SubCaption = styled.Text`
  font-size: 16px;
  color: rgba(0,0,0,0.8);
`

class Bookmarks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      loading: true,
    }
    this.toggleSearchModal = this.toggleSearchModal.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((place) => console.log(place))
    RNGooglePlaces.getCurrentPlace()
    .then(result => {
      this.props.getLocation(result[0])
    })
  }

  componentWillReceiveProps(props) {
    console.log(props.current.photo)
    if(props.current.photo) this.setState({loading: false})
  }

  toggleSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
    .then((place) => {
      const locationData = {}
      locationData.rating = Number.parseFloat(place.rating).toFixed(1)
      locationData.region = place.addressComponents.administrative_area_level_2
      locationData.address = place.address.split(',').slice(0,-1).join(',')
      locationData.name = place.name
      locationData.placeID = place.placeID
      locationData.city = place.addressComponents.locality
      locationData.state = place.addressComponents.administrative_area_level_1
      this.props.searchLocation(locationData)
      this.props.navigation.navigate('Place')
    })
    .catch(error => console.log(error.message))
  }

  _renderItem({item, index}) {
    return (
      <BookmarkCard
        item={item}
        index={index}
      />
    )
  }

  _header() {
    return (
      <GreetingBackground source={headerBackground}>
        <View>
          <GreetingText>Good morning</GreetingText>
          <WeatherText>Today is 72° and Sunny</WeatherText>
        </View>
        <Button onPress={()=>this.toggleSearchModal()}>
          <ButtonImage source={button}/>
        </Button>
      </GreetingBackground>
    )    
  }

  _bookmarkCarousel() {
    return (
    <CarouselContainer>
      <Carousel
        ref={(c) => {this._carousel = c;}}
        data={this.props.bookmarks.length === 0 ? [{}] : this.props.bookmarks}
        renderItem={this._renderItem}
        sliderWidth={500}
        itemWidth={260}
        itemHeight={130}
        sliderHeight={150}
      />
    </CarouselContainer>)
  }

  _currentLocation() {
    return (
    <CurrentLocation source={{uri: this.props.current.photo}} imageStyle={{opacity: 0.5}}>
      <Caption>
        Exploring {this.props.current.name}
      </Caption>
      <SubCaption>
        {this.props.current.city}, {this.props.current.state}
      </SubCaption>
    </CurrentLocation>)
  }

  render() {
    if(this.state.loading) {
      return <ActivityIndicator style={{height:'40%', width: '100%'}} size="large" color="#0000ff"/>
    } else {
      return (
        <Container>
          <Background resizeMode="cover">
            {this._header()}
            {this._bookmarkCarousel()}
            {this._currentLocation()}
          </Background>
        </Container>
      );
    }
  }
}

const mapStateToProps = (store) => {
  return { 
    current: store.pagesReducer.current,
    bookmarks: store.pagesReducer.bookmarks
  }
}

const mapDispatchToProps = (dispatch) => ({
  getLocation: (locationData) => { dispatch(getLocation(locationData)) },
  searchLocation: (locationData) => { dispatch(searchLocation(locationData))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)