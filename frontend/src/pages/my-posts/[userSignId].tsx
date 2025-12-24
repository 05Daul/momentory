// pages/my-posts/[userSignId].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getMyPosts } from '@/api/blogService/blog';
import { PostEntity } from '@/types/blogService/blogType';
import styles from '@/styles/blogService/MyPosts.module.css';
import Layout from "@/component/layout/MainLayout";

// 🟢 [추가] HTML 태그를 제거하고 순수 텍스트만 추출하는 함수를 유틸리티로 정의
const stripHtml = (html: string): string => {
  if (!html) return "";

  if (typeof window !== 'undefined') {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const text = temp.textContent || temp.innerText || '';
    return text.replace(/\s+/g, ' ').trim();
  }

  // 서버 환경 대응 (간단한 태그 제거)
  return html
  .replace(/<[^>]*>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
};


// 게시글 미리보기 컴포넌트 (PostPreview) 수정
const PostPreview: React.FC<{ post: PostEntity }> = ({ post }) => {
  const router = useRouter();
  const handlePostClick = () => {
    router.push(`/post/${post.postId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  // 🟢 [수정] stripHtml 함수를 사용하여 미리보기 텍스트 생성
  const plainText = stripHtml(post.content);
  const previewText = plainText.length > 100 ? plainText.substring(0, 100) + "..." : plainText;


  return (
      <div className={styles.postPreview} onClick={handlePostClick}>
        {post.thumbnail && (
            <img
                src={post.thumbnail}
                alt={post.title}
                className={styles.thumbnail}
            />
        )}
        <div className={styles.postContent}>
          <h3 className={styles.postTitle}>{post.title}</h3>
          {/* 🟢 [수정] 미리보기 텍스트 렌더링 */}
          <p className={styles.postSnippet}>{previewText}</p>
          <div className={styles.postMeta}>
            <span>작성일: {formatDate(post.createdAt)}</span>
            <span>조회수: {post.viewCount}</span>
          </div>
        </div>
      </div>
  );
};


// 💡 MyPostsContent 함수 (메인 로직)
function MyPostsContent({ authorId }: { authorId: string | string[] | undefined }) {
  const router = useRouter();

  const finalAuthorId = Array.isArray(authorId) ? authorId[0] : authorId;

  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const currentUserId = typeof window !== "undefined" ? localStorage.getItem("userSignId") : null;

  useEffect(() => {
    if (!finalAuthorId || !router.isReady) {
      return;
    }

    const fetchPosts = async (page: number) => {
      if (page === 0) setIsLoading(true);
      setError(null);

      try {
        const response = await getMyPosts(finalAuthorId as string, page);
        setPosts(prev => page === 0 ? response.content : [...prev, ...response.content]);
        setIsLastPage(response.last);
      } catch (err) {
        setError("게시글 목록을 불러오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts(currentPage);
  }, [finalAuthorId, router.isReady, currentPage]);

  const handleLoadMore = () => {
    if (!isLastPage && !isLoading) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (!finalAuthorId) {
    return <div className={styles.loading}>정보를 불러오는 중...</div>;
  }

  if (isLoading && currentPage === 0) {
    return <div className={styles.loading}>게시글 목록 로딩 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (posts.length === 0) {
    return (
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>{finalAuthorId}님의 게시물</h1>
          <p className={styles.noContent}>작성된 게시글이 없습니다.</p>
        </div>
    );
  }

  return (
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>
          {finalAuthorId}님의 게시물
        </h1>

        <div className={styles.postList}>
          {posts.map(post => (
              <PostPreview key={post.postId} post={post} />
          ))}
        </div>

        {!isLastPage && (
            <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className={styles.loadMoreButton}
            >
              {isLoading ? '로딩 중...' : '더 보기'}
            </button>
        )}
      </div>
  );
}


export default function MyPostsPage() {
  const router = useRouter();
  const { userSignId } = router.query;


  return (
      <Layout>
        <MyPostsContent authorId={userSignId} />
      </Layout>
  );
}