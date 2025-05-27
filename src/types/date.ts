import { Item } from './item';

export interface DateContent {
  date: string;
  items: Item[];
  note?: string;
}
