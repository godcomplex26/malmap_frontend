interface GeoJSONGeometry {
  type: string;
  coordinates: number[][];
}

interface GeoJSONFeature {
  type: string;
  geometry: GeoJSONGeometry;
  properties: {
    [key: string]: never;
  };
}

interface GeoJSONData {
  type: string;
  features: GeoJSONFeature[];
}