import React, { useState } from 'react';

interface PostTabsProps {
  activeTab: 'trending' | 'recent' | 'friends' | 'search';
  setActiveTab: (tab: 'trending' | 'recent' | 'friends' | 'search') => void;
  onSearch: (keyword: string) => void;
  currentSearchKeyword?: string;
}

const tabStyle = (isActive: boolean) => ({
  padding: '1px',
  cursor: 'pointer',
  fontWeight: isActive ? 'bold' : 'normal',
  color: isActive ? 'black' : '#555',
  borderBottom: isActive ? '2px solid black' : '2px solid transparent',
  marginRight: '15px',
  fontSize: '15px',
});

const searchFormStyle = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
};

const searchInputStyle = {
  padding: '8px 12px',
  fontSize: '14px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  outline: 'none',
  width: '250px',
};

const searchButtonStyle = {
  padding: '8px 16px',
  fontSize: '14px',
  fontWeight: '600',
  color: 'white',
  backgroundColor: '#0070f3',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const searchInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 14px',
  backgroundColor: '#f5f5f5',
  borderRadius: '6px',
  fontSize: '13px',
  marginTop: '10px',
  marginBottom: '10px',
};

const clearButtonStyle = {
  padding: '6px 14px',
  fontSize: '13px',
  color: '#666',
  backgroundColor: 'white',
  border: '1px solid #ddd',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default function PostTabs({ activeTab, setActiveTab, onSearch, currentSearchKeyword }: PostTabsProps) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
      setActiveTab('search');
    }
  };

  const handleTabClick = (tab: 'trending' | 'recent' | 'friends') => {
    setActiveTab(tab);
    setSearchInput('');
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setActiveTab('trending');
  };

  return (
      <div>
        {/* 탭 버튼 + 검색바를 같은 줄에 배치 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #eee',
          marginBottom: '10px'
        }}>
          {/* 왼쪽: 탭 버튼들 */}
          <div style={{ display: 'flex' }}>
            <h2 style={tabStyle(activeTab === 'trending')} onClick={() => handleTabClick('trending')}>
              인기
            </h2>
            <h2 style={tabStyle(activeTab === 'recent')} onClick={() => handleTabClick('recent')}>
              최신
            </h2>
            <h2 style={tabStyle(activeTab === 'friends')} onClick={() => handleTabClick('friends')}>
              친구
            </h2>
          </div>

          {/* 오른쪽: 검색바 */}
          <form onSubmit={handleSearchSubmit} style={searchFormStyle}>
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="제목 또는 내용으로 검색..."
                style={searchInputStyle}
            />
            <button type="submit" style={searchButtonStyle}>
              검색
            </button>
          </form>
        </div>

        {/* 검색 정보 표시 */}
        {activeTab === 'search' && currentSearchKeyword && (
            <div style={searchInfoStyle}>
          <span>
            검색어: <strong style={{ color: '#0070f3' }}>{currentSearchKeyword}</strong>
          </span>
              <button onClick={handleClearSearch} style={clearButtonStyle}>
                검색 초기화
              </button>
            </div>
        )}
      </div>
  );
}