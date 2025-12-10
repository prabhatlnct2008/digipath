export interface Speaker {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  bio?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SpeakerCreate {
  name: string;
  title: string;
  affiliation: string;
  bio?: string;
  image_url?: string;
}

export interface SpeakerUpdate {
  name?: string;
  title?: string;
  affiliation?: string;
  bio?: string;
  image_url?: string;
}
