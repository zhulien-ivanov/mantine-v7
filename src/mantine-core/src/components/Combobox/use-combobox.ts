import { useRef } from 'react';
import { useUncontrolled } from '@mantine/hooks';

export interface ComboboxStore {
  dropdownOpened: boolean;
  openDropdown(): void;
  closeDropdown(): void;
  toggleDropdown(): void;

  selectedOptionIndex: number;
  selectOption(index: number): void;
  selectActiveOption(): string | null;
  selectNextOption(): string | null;
  selectPreviousOption(): string | null;
  resetSelectedOption(): void;
  clickSelectedOption(): void;

  listId: string | null;
  setListId(id: string): void;
}

interface UseComboboxOptions {
  /** Default value for `dropdownOpened`, `false` by default */
  defaultOpened?: boolean;

  /** Controlled `dropdownOpened` state */
  opened?: boolean;

  /** Called when `dropdownOpened` state changes */
  onOpenedChange?(opened: boolean): void;
}

export function useCombobox({
  defaultOpened,
  opened,
  onOpenedChange,
}: UseComboboxOptions = {}): ComboboxStore {
  const [dropdownOpened, setDropdownOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange: onOpenedChange,
  });

  const listId = useRef<string | null>(null);
  const selectedOptionIndex = useRef<number>(-1);

  const openDropdown = () => setDropdownOpened(true);
  const closeDropdown = () => setDropdownOpened(false);
  const toggleDropdown = () => setDropdownOpened(!dropdownOpened);

  const clearSelectedItem = () => {
    const selected = document.querySelector(`#${listId.current} [data-combobox-selected]`);
    selected?.removeAttribute('data-combobox-selected');
    selected?.removeAttribute('aria-selected');
  };

  const selectOption = (index: number) => {
    const list = document.getElementById(listId.current!);
    const items = list?.querySelectorAll('[data-combobox-option]');
    const nextIndex = index >= items!.length ? 0 : index < 0 ? items!.length - 1 : index;
    selectedOptionIndex.current = nextIndex;

    if (items?.[nextIndex] && !items[nextIndex].hasAttribute('data-combobox-disabled')) {
      clearSelectedItem();
      items[nextIndex].setAttribute('data-combobox-selected', 'true');
      items[nextIndex].setAttribute('aria-selected', 'true');
      items[nextIndex].scrollIntoView({ block: 'nearest' });
      return items[nextIndex].id;
    }

    return null;
  };

  const selectActiveOption = () => {
    const activeOption = document.querySelector<HTMLDivElement>(
      `#${listId.current} [data-combobox-active]`
    );

    if (activeOption) {
      const items = document.querySelectorAll<HTMLDivElement>(
        `#${listId.current} [data-combobox-option]`
      );
      const index = Array.from(items).findIndex((option) => option === activeOption);
      return selectOption(index);
    }

    return selectOption(0);
  };

  const selectNextOption = () => selectOption(selectedOptionIndex.current + 1);
  const selectPreviousOption = () => selectOption(selectedOptionIndex.current - 1);

  const resetSelectedOption = () => {
    selectedOptionIndex.current = -1;
    clearSelectedItem();
  };

  const clickSelectedOption = () => {
    const items = document.querySelectorAll<HTMLDivElement>(
      `#${listId.current} [data-combobox-option]`
    );
    const item = items?.[selectedOptionIndex.current];
    item?.click();
  };

  const setListId = (id: string) => {
    listId.current = id;
  };

  return {
    dropdownOpened,
    openDropdown,
    closeDropdown,
    toggleDropdown,

    selectedOptionIndex: selectedOptionIndex.current,
    selectOption,
    selectActiveOption,
    selectNextOption,
    selectPreviousOption,
    resetSelectedOption,

    listId: listId.current,
    setListId,
    clickSelectedOption,
  };
}
