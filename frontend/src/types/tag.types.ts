export type TagCategory = 'organ' | 'type' | 'level';

export interface Tag {
  id: string;
  name: string;
  category: TagCategory;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface TagCreate {
  name: string;
  category: TagCategory;
  description?: string;
}

export interface TagUpdate {
  name?: string;
  description?: string;
}
