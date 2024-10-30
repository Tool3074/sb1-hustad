import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useClientStore } from '../store/clientStore';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

// Fix for default marker icon
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function Maps() {
  const clients = useClientStore((state) => state.clients);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Client Locations</h1>
        <p className="mt-2 text-sm text-gray-700">
          Interactive map showing the geographical distribution of clients.
        </p>
      </div>

      <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[40.7128, -74.006]} // New York City coordinates
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {clients.map((client) => (
            <Marker
              key={client.id}
              position={[client.location.lat, client.location.lng]}
              icon={defaultIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{client.name}</h3>
                  <p className="text-sm text-gray-600">{client.company}</p>
                  <p className="text-sm text-gray-600">{client.location.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}