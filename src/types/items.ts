export interface Item {
  id: string;
  name: string;
  description: string | null;
  category_id: string | null;
  group_id: string | null;
  source_id: string | null;
  operation_id: string | null;
  department_id: string | null;
}

export interface ItemWithCategory extends Item {
  category?: string;
  group?: string;
  source?: string;
  operation?: string;
  department?: string;
}

export interface ItemCreate {
  name: string;
  description?: string;
  category_id?: string;
  group_id?: string;
  source_id?: string;
  operation_id?: string;
  department_id?: string;
}

export interface ItemUpdate {
  name?: string;
  description?: string | null;
  category_id?: string | null;
  group_id?: string | null;
  source_id?: string | null;
  operation_id?: string | null;
  department_id?: string | null;
}
