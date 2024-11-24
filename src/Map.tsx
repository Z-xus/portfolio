import React, { useEffect, useRef, useState } from 'react';
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
      lat: 19.3200,
      zoom: 9
    };


    map.current = new maplibregl.Map({
      container: mapContainer.current,
      attributionControl: false,
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
                    coordinates: [BHIWANDI_COORDINATES.lng, BHIWANDI_COORDINATES.lat],
                  },
                  properties: {
                    name: 'Bhiwandi, Maharashtra',
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
      center: [72.9777, 19.1683],
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
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hour = time.getHours();
  const isDayTime = hour >= 5 && hour < 18;

  return (
    <div className="flex items-center">
      {isDayTime ? <SunIcon className="mr-2 size-8" /> : <MoonIcon className="mr-2" />}
      {time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      })}{' '}
      IST
    </div>
  );
};


const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeMiterlimit: 2,
    }}
    className={className}
  >
    <circle cx="32" cy="32" r="12" style={{ fill: 'currentcolor', stroke: '#222a33', strokeWidth: '1.5px' }} />
    <path
      d="M39.682 35.636A8.483 8.483 0 0 1 34.2 40.21M32 16V8M40.907 16.572l2.186-3.785M48.214 23.546l3.785-2.185M48 32h8M49 41.815 52.785 44M42.269 48.214l2.185 3.785M32 48v8M23.093 47.428l-2.186 3.785M17.358 41.361l-3.785 2.185M16 32H8M18.144 24l-3.785-2.185M24.454 17.358l-2.185-3.785"
      style={{ fill: 'none', stroke: 'currentcolor', strokeWidth: '1.5px' }}
    />
  </svg>
);

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
