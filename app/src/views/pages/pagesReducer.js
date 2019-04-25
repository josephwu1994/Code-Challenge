import stateName from '../stateNames'
import google from '../key'

const setCurrent = (locationData) => ({
  type: 'SET_CURRENT',
  locationData
})

const addBookmark = (locationData) => ({
  type: 'ADD_BOOKMARK',
  locationData
})

export const removeBookmark = (index) => ({
  type: 'REMOVE_BOOKMARK',
  index
})

export const getLocation = (locationData) => {
  return (dispatch) => {
    const location = {}
    // Get place details
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${locationData.placeID}&fields=photo,name,formatted_address&key=${google.key}`)
    .then(res => res.json())
    .then(result => {
      location.name = result.result.name;
      location.city = result.result.formatted_address.split(',')[1].trim()
      location.state = stateName[result.result.formatted_address.split(',')[2].trim().split(' ')[0]]
      // Get photo url
      fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${result.result.photos[0].photo_reference}&key=${google.key}`)
      .then(response => {
        location.photo = response.url
        dispatch(setCurrent(location))
      })
      .catch(err => console.log(err))
    })
    .catch(err=> console.log(err))
    
  }
}

export const searchLocation = (locationData) => {
  return (dispatch) => {
    const searchResult = {...locationData}
    // Get place details
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${searchResult.placeID}&fields=photo,name,formatted_address&key=${google.key}`)
    .then(res => res.json())
    .then(result => {
      // Get photo url
      fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&maxheight=800&photoreference=${result.result.photos[0].photo_reference}&key=${google.key}`)
      .then(response => {
        searchResult.photo = response.url
        const addressArr = searchResult.address.split(',').slice(0,-1)
        const addParam = addressArr.map(el => {
          return el.match(/\w+/g).join('+')
        })
        // Static Map URL
        searchResult.map = `https://maps.googleapis.com/maps/api/staticmap?size=400x250&maptype=roadmap&markers=size:mid%7Ccolor:red%7C${addParam}&key=${google.key}`
      })
      .then(() => {
        dispatch(addBookmark(searchResult))
      })
      .catch(err => console.log(err))
    })
    .catch(err=> console.log(err))
    
  }
}

const defaultState = {
  current: {
    name: '',
    photo: '',
    city: '',
    state: '',
  },
  bookmarks: []
}

export default pagesReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Set current location in state
    case 'SET_CURRENT':
      return Object.assign({}, state, { current: action.locationData});
    // Add new bookmark
    case 'ADD_BOOKMARK':
      console.log(action.locationData)
      const newBookmarks = [...state.bookmarks];
      newBookmarks.push(action.locationData);
      return Object.assign({}, state, { bookmarks: newBookmarks });
    // Delete specific bookmark
    case 'REMOVE_BOOKMARK':
      let copy = [...state.bookmarks];
      if(action.index === -1) copy.pop();
      else copy = [...copy.slice(0,action.index),...copy.slice(action.index+1)]
      return Object.assign({}, state, { bookmarks: copy });
    default: 
      return state
  }
}