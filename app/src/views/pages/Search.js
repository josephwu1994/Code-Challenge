//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import styled from 'styled-components/native'

const SearchContainer = styled.View`
  margin-top: 50px;
  width: 100%;
  height: 100%;
`
const CancelText = styled.Text`
  color: #007AFF;
  font-size: 17px;
  text-align: center;
  align-self: center;
`

class Search extends Component {

  render() {
    return (
      <SearchContainer>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2}
          autoFocus={true}
          returnKeyType={'search'}
          keyboardAppearance={'light'}
          listViewDisplayed={true}
          fetchDetails={true}
          onPress={(data, details=null) => {
            console.log(data)
          }}
          query={{
            key: 'AIzaSyCqd-Or6zWTMpKvVVW-WF45oFRZknBGU8o',
            language: 'en',
            types: '(cities)'
          }}
          styles={{
            container: {
              width: '100%'
            },
            textInputContainer: {
              width: '95%',
              backgroundColor: 'white',
              borderTopColor: 'transparent'
            },
            textInput: {
              backgroundColor: 'rgb(235, 235, 235)',
              color: 'black'
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          currentLocation={true}
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch'
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            type: 'restaurant'
          }}
          renderRightButton={() => <CancelText onPress={() => { this.props.toggleSearchModal() }}>Cancel</CancelText>}
        /> 
      </SearchContainer>
    );
  }
}

// define your styles

//make this component available to the app
export default withNavigation(Search);
