import css from './SearchBox.module.css';

interface SearchProps {
  value: string;
  onSearch: (searchText: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
