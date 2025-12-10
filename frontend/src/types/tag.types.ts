export type TagCategory = 'organ' | 'type' | 'level';

export interface Tag {
  id: string;
  label: string;
  category: TagCategory;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TagCreate {
  label: string;
  category: TagCategory;
  is_active?: boolean;
}

export interface TagUpdate {
  label?: string;
  is_active?: boolean;
}
