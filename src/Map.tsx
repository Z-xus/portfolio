import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapComponentProps {
  height?: string;
  width?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  height = '240px',
  width = '100%'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const BHIWANDI_COORDINATES = {
      lng: 73.0483,
      lat: 19.3115,
      zoom: 7
    };


    map.current = new maplibregl.Map({
      container: mapContainer.current,
      attributionControl: false, // Disable attribution control
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
          },
          textSource: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [72.9777, 19.2183], // Example coordinates
                  },
                  properties: {
                    name: 'Bhiwandi, Maharashtra', // Example text
                  },
                },
              ],
            },
          },
        },
        glyphs: 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf',
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            paint: {
              'raster-opacity': 0.9,
              'raster-contrast': -0.1,    // More negative contrast for darker appearance
              'raster-brightness-min': 1,
              'raster-brightness-max': 0,  // Lower max brightness for darker theme
              'raster-saturation': -1
            }
          },
          {
            id: 'text-layer',
            type: 'symbol',
            source: 'textSource',
            layout: {
              'text-field': '{name}',
              'text-size': 14,
              'text-anchor': 'center',
            },
            paint: {
              'text-color': '#FFFFFF',
              'text-halo-color': '#000000',
              'text-halo-width': 1,
            },
          },
        ],
      },
      center: [72.9777, 19.2183],
      zoom: 8,
    });

    new maplibregl.Marker({ color: 'red' })
      .setLngLat([BHIWANDI_COORDINATES.lng, BHIWANDI_COORDINATES.lat])
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={mapContainer}
        style={{ width, height }}
        className="map-container rounded-lg"
      />
      <div className="absolute top-2 left-2 text-sm text-zinc-200">
        <TimeDisplay />
      </div>
    </div>
  );
};

// Separate component for time display
const TimeDisplay: React.FC = () => {
  const [time, setTime] = React.useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center">
      <MoonIcon className="mr-2" />
      {time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      })} IST
    </div>
  );
};

// Simple moon icon component
const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    width="1.2em"
    height="1.2em"
    className={className}
  >
    <path
      fill="currentColor"
      d="M7 6C7 12.08 11.92 17 18 17C18.53 17 19.05 16.96 19.56 16.89C17.95 19.36 15.17 21 12 21C7.03 21 3 16.97 3 12C3 8.83 4.64 6.05 7.11 4.44C7.04 4.95 7 5.47 7 6Z"
    />
  </svg>
);

export default MapComponent;
