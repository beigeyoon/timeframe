import { create } from 'zustand';
import { Item, Group } from '@/types/item';

interface TimeState {
  items: Item[];
  groups: Group[];
  addItem: (item: Item) => void;
  updateItem: (id: string, updatedItem: Partial<Item>) => void;
  deleteItem: (id: string) => void;
  addGroup: (group: Group) => void;
  updateGroup: (id: string, updatedGroup: Partial<Group>) => void;
  deleteGroup: (id: string) => void;
  load: () => void;
}

export const useTimeStore = create<TimeState>((set, get) => ({
  items: [],
  groups: [],

  addItem: item => {
    const updated = [...get().items, item];
    saveToStorage({ ...get(), items: updated });
    set({ items: updated });
  },

  updateItem: (id, update) => {
    const updated = get().items.map(item =>
      item.id === id ? ({ ...item, ...update } as Item) : item
    );
    saveToStorage({ ...get(), items: updated });
    set({ items: updated });
  },

  deleteItem: id => {
    const updated = get().items.filter(item => item.id !== id);
    saveToStorage({ ...get(), items: updated });
    set({ items: updated });
  },

  addGroup: group => {
    const updated = [...get().groups, group];
    saveToStorage({ ...get(), groups: updated });
    set({ groups: updated });
  },

  updateGroup: (id, update) => {
    const updated = get().groups.map(group =>
      group.id === id ? { ...group, ...update } : group
    );
    saveToStorage({ ...get(), groups: updated });
    set({ groups: updated });
  },

  deleteGroup: id => {
    const updatedGroups = get().groups.filter(group => group.id !== id);
    const updatedItems = get().items.map(item => ({
      ...item,
      groups: item.groups?.filter(group => group.groupId !== id)
    }));
    saveToStorage({ items: updatedItems, groups: updatedGroups });
    set({ groups: updatedGroups, items: updatedItems });
  },

  load: () => {
    try {
      const raw = localStorage.getItem('timeframe_store');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      set(parsed);
    } catch (e) {
      console.error('불러오기 실패', e);
    }
  }
}));

function saveToStorage(state: Pick<TimeState, 'items' | 'groups'>) {
  localStorage.setItem(
    'timeframe_store',
    JSON.stringify({
      items: state.items,
      groups: state.groups
    })
  );
}
