import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import NoteModal from '../NoteModal/NoteModal';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import { fetchNotes } from '../../services/noteService';
import css from './App.module.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data } = useQuery({
    queryKey: ['notes', searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const changeSearchQuery = (newQuery: string) => {
    setCurrentPage(1);
    setSearchQuery(newQuery);
  };

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={changeSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={toggleModal}>
          Create note +
        </button>
      </header>
      {isModalOpen && <NoteModal onClose={toggleModal} />}
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
