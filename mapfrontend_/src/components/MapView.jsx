import { GoogleMap, InfoWindow, LoadScript, Marker, OverlayView } from "@react-google-maps/api";
import axios from "axios"; //for HTTP requests
import { useEffect, useRef, useState } from "react";


const containerStyle = {
  width: "100%",
  height: "100vh",
};


function MapView() { //component
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [newMarker, setNewMarker] = useState(null);
  const [markerName, setMarkerName] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [editName, setEditName] = useState("");


  const mapRef = useRef(null);
  const hasCentered = useRef(false);

  const initialCenter = { lat: 2, lng: 5 };


  const loadMarkers = () => {
    axios.get("http://localhost:8080/marker/getAll")
    .then((res) => {
      console.log("Markers received from the backend:", res.data); // print makers
      setMarkers(res.data);
    })
    .catch((err) => console.error("Error loading markers:", err));
  };

  // Get markers
  useEffect(() => {
    loadMarkers();
  }, []);

  useEffect(() => { //Center only once when the markers arrive
    if (
      markers.length > 0 &&
      mapRef.current &&
      !hasCentered.current
    ) {
      mapRef.current.panTo({
        lat: markers[0].latitude,
        lng: markers[0].longitude,
      });
      mapRef.current.setZoom(5);
      hasCentered.current = true;
    }
  }, [markers]);

  // Save marker
  const saveMarker = () => {
    axios.post("http://localhost:8080/marker/add", {
      name: markerName,
      latitude: newMarker.latitude,
      longitude: newMarker.longitude
    }).then(() => {
      setNewMarker(null);
      loadMarkers(); // load markers
    });
  };

  const handleDeleteMarker = (id) => {
    axios.delete(`http://localhost:8080/marker/delete/${id}`)
      .then(() => {
        setSelectedMarker(null);
        loadMarkers();
      });
  };

  const handleUpdateName = () => {
    axios.put(`http://localhost:8080/marker/update/${selectedMarker.id}`, {
      name: editName,
      latitude: selectedMarker.latitude,
      longitude: selectedMarker.longitude
    }).then(() => {
      setIsEditing(false);
      loadMarkers();
    });
  };

  const handleMapClick = (event) => {
    if (isMoving && selectedMarker) {
      axios.put(`http://localhost:8080/marker/update/${selectedMarker.id}`, {
        name: selectedMarker.name,
        latitude: event.latLng.lat(),
        longitude: event.latLng.lng()
      }).then(() => {
        setIsMoving(false);
        setSelectedMarker(null);
        loadMarkers();
      });
      return;
    }

  setNewMarker({
      latitude: event.latLng.lat(),
      longitude: event.latLng.lng()
    });
    setMarkerName("");
  };


  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap 
        mapContainerStyle={containerStyle} 
        defaultCenter={initialCenter} 
        zoom={5} 
        onClick={handleMapClick}
        onLoad={(map) => {
          mapRef.current = map;
        }}>
        
       {markers.map((m) => (
          //<Marker
           // key={m.id}
           // position={{ lat: m.latitude, lng: m.longitude }}
           //onClick={() => setSelectedMarker(m)}
          ///>
          <div key={m.id}>
          
          <Marker
            position={{ lat: m.latitude, lng: m.longitude }}
            onClick={() => {
              setSelectedMarker(m);
              setEditName(m.name);
              setIsEditing(false);
              setIsMoving(false);
            }}
          />

          
          <OverlayView
            position={{ lat: m.latitude, lng: m.longitude }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              style={{
                background: "white",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "600",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                whiteSpace: "nowrap",
                display: "inline-block",
                transform: "translate(-50%, -300%)",
                pointerEvents: "none"
              }}
            >
              {m.name}
            </div>
          </OverlayView>
        </div>
        ))}

        

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.latitude,
              lng: selectedMarker.longitude,
            }}
            onCloseClick={() => {
              setSelectedMarker(null);
              setIsEditing(false);
              setIsMoving(false);
            }}
          >
            <div style={{ minWidth: "180px" }}>
              {!isEditing && (
                <>
                  <strong>{selectedMarker.name}</strong>
                  <div style={{ fontSize: "12px", marginTop: "4px" }}>
                    <div>
                      <strong>Lat:</strong>{" "}
                      {selectedMarker.latitude.toFixed(6)}
                    </div>
                    <div>
                      <strong>Lng:</strong>{" "}
                      {selectedMarker.longitude.toFixed(6)}
                    </div>
                  </div>

                  <div style={{ marginTop: "8px", display: "flex", gap: "6px" }}>
                    <button onClick={() => setIsEditing(true)}> Edit</button>
                    <button onClick={() => setIsMoving(true)}>Move</button>
                    <button
                      onClick={() => handleDeleteMarker(selectedMarker.id)}
                      style={{ color: "red" }}
                    >
                        Delete
                    </button>
                  </div>
                </>
              )}

              {isEditing && (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    style={{ width: "100%" }}
                  />
                  <div style={{ marginTop: "6px", display: "flex", gap: "6px" }}>
                    <button onClick={handleUpdateName}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
                </>
              )}

              {isMoving && (
                <div style={{ marginTop: "6px", fontSize: "12px" }}>
                  Click on the map to move this marker
                </div>
              )}
            </div>
          </InfoWindow>
        )}


        {newMarker && (
          <InfoWindow
            position={{
              lat: newMarker.latitude,
              lng: newMarker.longitude
            }}
            onCloseClick={() => setNewMarker(null)}
          >
            <div style={{ minWidth: "200px" }}>
              <div style={{ fontSize: "12px", marginBottom: "6px" }}>
                <div><strong>Lat:</strong> {newMarker.latitude.toFixed(6)}</div>
                <div><strong>Lng:</strong> {newMarker.longitude.toFixed(6)}</div>
              </div>

              <input
                type="text"
                placeholder="Marker name"
                value={markerName}
                onChange={(e) => setMarkerName(e.target.value)}
                style={{ width: "100%" }}
              />

              <br /><br />

              <button onClick={saveMarker} disabled={!markerName.trim()}>
                Add
              </button>
            </div>
          </InfoWindow>
        )}

      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;