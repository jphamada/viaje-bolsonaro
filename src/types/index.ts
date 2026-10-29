export interface MapState {
  center: [number, number]; // [longitude, latitude]
  zoom: number;
  pitch?: number;
  bearing?: number;
}

export interface StoryStep {
  id: number;
  title: string;
  time: string;
  kicker: string;
  locationName: string;
  text: string;
  quote?: {
    text: string;
    author: string;
  };
  mapState: MapState;
  highlightFeature: string;
}

export interface RouteFeature {
  stepId: number;
  coordinates: [number, number];
  name: string;
  description: string;
}
