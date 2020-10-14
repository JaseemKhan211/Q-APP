import React, { useState } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    const [ coordinates, setCoords ] = useState({ lat: 24.903016, lng: 67.1140284 })
    const [ isMarkerShown, setMarkerShown ] = useState(true)

    const setMarker = (event) => {
        setMarkerShown(false)
        setCoords({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        })
        setTimeout(() => {
            console.log('marker***')
            setMarkerShown(true)
        }, 2000)
    }
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=EVWZI2F0V3FFEDK3N2NW0WRL00LILM5PN1T4S41D1B1FPO2R&client_secret=3BMBMZBR4OLTHEEWWGQRENPMU5E0PICM53BC00ZNTXU1AIJD&v=20180323&1&ll=${coordinates.lat},${coordinates.lng}`)
    .then(res => res.json())
    .then(res => console.log(res))
    return <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: 24.903016, lng: 67.1140284 }}
  >
    {isMarkerShown 
    && <Marker position={coordinates}
    draggable={true} onDragEnd={setMarker}/>
    } 
    
  </GoogleMap>
}
))

export default MyMapComponent