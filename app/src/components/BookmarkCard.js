//import liraries
import React, { Component } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { withNavigation } from 'react-navigation'
import styled from 'styled-components/native'

import heart from '../../design/assets/smallHeartIcon.png'
import arrow from '../../design/assets/goIcon.png'

const EmptyContainer = styled.View`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const First = styled.Text`
  color: #808080;
  font-size: 18px;
`
const Second = styled.Text`
  color: #ACB7B9;
  font-size: 13px;
`
const Bookmark = styled.View`
  height: 90%;
  width: 100%;
  background-color: transparent;
  shadow-color: #000;
  shadow-offset: 0px 3px;
  shadow-opacity: 0.8;
  shadow-radius: 2;
`
const Picture = styled.ImageBackground`
  width: 100%;
  height: 100%;
  border-radius: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-left: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
`
const Caption = styled.Text`
  font-size: 18px;
  color: white;
`
const LocationContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const Location = styled.Text`
  font-size: 10px;
  font-weight: 800;
  color: rgba(0,0,0,0.9);
  text-shadow-color: #fff;
  text-shadow-radius: 1;
  text-shadow-offset: 0px 1px;
  margin-right: 5px;
`
const Heart = styled.Image`
`
const ArrowButton = styled.TouchableOpacity`
`
const Arrow = styled.Image`
`
const RatingText = styled.Text`
  color: #51BCF9;
  font-size: 9px;
  font-weight: 600;
  text-shadow-color: #fff;
  text-shadow-radius: 0;
  text-shadow-offset: 0px 0px;
  margin-left: 2px;
`
// create a component
class BookmarkCard extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.navigation.navigate('Place', {
      index: this.props.index
    })
  }

  render() {
    console.log(this.props.item)
    if(!this.props.item.photo) {
      return (
        <EmptyContainer>
          <First>This trip is empty</First>
          <Second>Click the blue plus to pin a place</Second>
        </EmptyContainer>
      )
    } else {
      const data = this.props.item
      return (
        <Bookmark>
          <Picture source={{uri:data.photo}} imageStyle={{borderRadius: 20, opacity: 0.7}} overflow="hidden" resizeMethod="resize">
            <View>
              <LocationContainer>
                <Location>{data.city+', '+data.state+' '}</Location>
                <Heart source={heart}/>
                <RatingText>{data.rating}</RatingText>
              </LocationContainer>
              <Caption>{data.name}</Caption>
            </View>
            <ArrowButton onPress={() => { this.handleClick()}}><Arrow source={arrow}/></ArrowButton>
          </Picture>
        </Bookmark>
      );
    }
  }
}

export default withNavigation(BookmarkCard);
