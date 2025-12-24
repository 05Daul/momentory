// index.tsx
import Layout from "../component/layout/MainLayout";
import React, { useState } from "react";
import PostList from "../component/blogService/PostList";
import PostTabs from "../component/blogService/PostTabs";


function MiniBlogContent() {
  const [activeTab, setActiveTab] = useState<'trending' | 'recent' | 'friends' | 'search'>('trending');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
      <main>
        <Layout>
          <div style={{ padding: '0 10%', maxWidth: '1400px', margin: '0 auto' }}>

            {/* 탭 메뉴 + 검색바 */}
            <PostTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onSearch={handleSearch}
                currentSearchKeyword={searchKeyword}
            />

            {/* 게시물 목록 */}
            <PostList
                postType={activeTab}
                searchKeyword={searchKeyword}
            />

          </div>
        </Layout>
      </main>
  );
}

export default function Home() {
  return <MiniBlogContent/>;
}