//import liraries
import React, { Component } from 'react';
import { 
  View, 
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import backButton from '../../../design/assets/goIcon.png'
import heart from '../../../design/assets/heartIcon.png'
import pin from '../../../design/assets/townPinIcon.png'
import check from '../../../design/assets/checkmarkIcon.png'
import { removeBookmark } from './pagesReducer'
import { ActivityIndicator } from 'react-native-paper';

const LocationBackground = styled.ImageBackground`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`
const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 15px;
`
const BackImage = styled.Image`
  transform: rotate(180deg);
  height: 35px;
  width: 35px;
`
const LocationNameContainer = styled.View`
  display: flex;
  width: 100%;
  height: 10%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 20px 20px 20px;
`
const DetailContainer = styled.View`
  display:flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
`
const City = styled.Text`
  font-size: 13px;
  color: #fff;
  font-weight: 600;
  text-shadow: 0 5px 10px rgba(0,0,0,0.15);
`
const LocationName = styled.Text`
  font-size: 24px;
  color: #fff;
`
const Rating = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 15px;
  width: 58px;
  height: 24px;
`
const Heart = styled.Image`
  margin-right: 5px;
`
const RatingText = styled.Text`
  font-weight: 800;
  font-size: 13px;
  color: #1313AF;
  letter-spacing: 0.33px;
`
const MapContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 45%;
  border-radius: 30;
  background-color: #fff;
  padding: 10px 20px 10px 20px;
`
const PinButton = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  border-radius: 22.5px;
  shadow-color: #0404CE;
  shadow-offset: 2px 2px;
  shadow-opacity: .35;
  shadow-radius: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`
const ButtonText = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 500;
  margin-left: 10px;
`
const AddressContainer = styled.View`
  width: 100%;
  margin-bottom: 10px;
`
const Pin = styled.Image`
`
const AreaText = styled.Text`
  color: #030303;
  font-weight: 600;
  font-size: 10px;
  line-height: 15px;
  margin-left: 5px;
`
const Address = styled.Text`
  color: #030303;
  font-size: 10px;
`
const Map = styled.Image`
  width: 100%;
  height: 180px;
`

// create a component
class Place extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false,
      loading: true,
      index: -1,
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleBackClick = this.handleBackClick.bind(this)
  }

  componentDidMount() {
    if(this.props.navigation.state.params) {
      this.setState({
        isClicked: true, 
        index: this.props.navigation.state.params.index, 
        loading: false
      })
    }
  }

  componentWillReceiveProps(props) {
    if(props.bookmarks.length > 0) {
      if(props.bookmarks.slice(-1)[0].photo) {
        this.setState({loading: false})
      }
    } else {
      this.setState({loading: true})
    }
  }
  
  handleClick() {
    this.setState({isClicked: !this.state.isClicked})
  }

  handleBackClick() {
    if(!this.state.isClicked) this.props.removeBookmark(this.state.index) 
    this.props.navigation.goBack()
  }

  _backButton(data) {
    return (
      <BackButton onPress={() => { this.handleBackClick() }}><BackImage source={backButton}/></BackButton>
    )
  }

  _locationDetail(data) {
    return (
      <LocationNameContainer>
        <DetailContainer>
          <City>{data.city+', '+data.state}</City>
          <LocationName>{data.name}</LocationName>
        </DetailContainer>
        <Rating>
          <Heart source={heart}/>
          <RatingText>{data.rating}</RatingText>
        </Rating>
      </LocationNameContainer>
      )
  }

  _mapContainer(data) {
    return (
      <MapContainer>
        <PinButton style={{ backgroundColor: this.state.isClicked ? '#00FF1C' : '#1313AF'}} onPress={() => { this.handleClick() }} >
          {this.state.isClicked ? <Image source={check} />  : null }
          <ButtonText style={{ color: this.state.isClicked ? 'black': 'white'}} >
            { this.state.isClicked ? 'Pinned To Trip': 'Pin To Trip' }
          </ButtonText>
        </PinButton>
        <AddressContainer>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}><Pin source={pin}/><AreaText>{data.region}</AreaText></View>
          <Address>{data.address}</Address>
        </AddressContainer>
        <Map source={{uri: data.map}} />
      </MapContainer>
    )
  }
  render() {
    if(this.state.loading) {
      return <ActivityIndicator style={{height:'40%', width: '100%'}} size="large" color="#0000ff"/>
    } else {
      const data = this.state.index === -1 ? this.props.bookmarks.slice(-1)[0] : this.props.bookmarks[this.state.index]
      return (
        <LocationBackground source={{uri: data.photo}} imageStyle={{height:'70%', width: '100%'}}>
          {this._backButton(data)}
          {this._locationDetail(data)}
          {this._mapContainer(data)}
        </LocationBackground>
      );
    }
  }
}

const mapStateToProps = (store) => ({
  bookmarks: store.pagesReducer.bookmarks
})

const mapDispatchToProps = (dispatch) => ({
  removeBookmark: (index) => { dispatch(removeBookmark(index)) }
})
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Place);
