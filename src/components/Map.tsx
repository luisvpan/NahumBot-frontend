import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useRobotoContext from '../hooks/useRobotoContext';
import { UCAB_GUAYANA_LOCATION } from '../hooks/useRobotoLocation';
import { Socket } from 'socket.io-client';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as unknown as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MarkerType {
  position: L.LatLngExpression;
  id: number;
}

const MapClickHandler: React.FC<{ onMapClick: (event: L.LeafletMouseEvent) => void }> = ({ onMapClick }) => {
  const map = useMap();

  React.useEffect(() => {
    map.on('click', onMapClick);
    return () => {
      map.off('click', onMapClick);
    };
  }, [map, onMapClick]);

  return null;
};

export const MapComponent: React.FC = () => {
  const { coordinates, socket } = useRobotoContext();
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const handleMapClick = (event: L.LeafletMouseEvent) => {
    const newMarker: MarkerType = {
      position: event.latlng,
      id: Date.now(),
    };
    setMarkers([...markers, newMarker]);
    if (!socket) return;
    socket.emit('change-target', newMarker);
    //setMarkers(prevMarkers => [...prevMarkers, newMarker]);
  };

  const removeMarker = (id: number) => {
    setMarkers(markers.filter(marker => marker.id !== id)); // Filtrar el marcador a eliminar
    console.log([markers])
  };

  return (
    <div className="h-[200px] sm:h-[300px] rounded-lg overflow-hidden">
      <MapContainer
        center={[UCAB_GUAYANA_LOCATION.latitude, UCAB_GUAYANA_LOCATION.longitude]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates && (
          <Marker position={[coordinates.latitude, coordinates.longitude]}>
            <Popup>
              Robot Location<br />
              {coordinates.latitude.toFixed(4)}°, {coordinates.longitude.toFixed(4)}°
            </Popup>
          </Marker>
        )}
        {markers.map(marker => (
          <Marker key={marker.id} position={marker.position}>
            <Popup>
              Marker {marker.id}<br />
              {L.latLng(marker.position).lat.toFixed(4)}°, {L.latLng(marker.position).lng.toFixed(4)}°
              <button onClick={(e) => { e.stopPropagation(); removeMarker(marker.id); }}>Eliminar</button>
            </Popup>
          </Marker>
        ))}
        <MapClickHandler onMapClick={handleMapClick} />
      </MapContainer>
    </div>
  );
};