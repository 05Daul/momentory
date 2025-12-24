'use client';

import { useState, FormEvent } from 'react';
import styles from '@/styles/blogService/search.module.css';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "제목 또는 내용으로 검색..." }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword.trim());
    }
  };

  return (
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={placeholder}
            className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          검색
        </button>
      </form>
  );
}