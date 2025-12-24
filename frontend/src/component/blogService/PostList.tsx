'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import PostCard from './PostCard';
import styles from "@/styles/blogService/post.module.css";
import { getTrendingPosts, getRecentPosts, getFriendsPosts, searchPosts } from "@/api/blogService/blog";
import { getUserProfiles } from "@/api/userService/user";
import { PostEntity } from "@/types/blogService/blogType";

const PAGE_SIZE = 10;

interface PostListProps {
  postType: 'trending' | 'recent' | 'friends' | 'search';
  searchKeyword?: string;
}

// 프로필 이미지가 포함된 Post 타입
interface PostWithProfile extends PostEntity {
  // PostEntity를 그대로 사용 (profileImg는 이미 정의되어 있음)
}

export default function PostList({ postType, searchKeyword = '' }: PostListProps) {
  const [posts, setPosts] = useState<PostWithProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);
  loadingRef.current = loading;

  const hasMoreRef = useRef(true);
  hasMoreRef.current = hasMore;

  // 최초 마운트 시 사용자 ID 로드
  useEffect(() => {
    const id = localStorage.getItem('userSignId');
    if (id) {
      setCurrentUserId(id);
    } else {
      console.error("User ID not found in localStorage. Cannot load friend posts.");
    }
  }, []);

  // 프로필 이미지 추가 함수
  const enrichPostsWithProfiles = async (posts: PostEntity[]): Promise<PostWithProfile[]> => {
    if (posts.length === 0) return [];

    try {
      // 모든 작성자 ID 추출
      const authorIds = posts.map(post => post.authorId);

      console.log('🔍 프로필 조회 시작:', authorIds);

      // 프로필 정보 일괄 조회
      const profileMap = await getUserProfiles(authorIds);

      console.log('✅ 프로필 조회 완료:', profileMap.size, '명');

      // Post에 프로필 이미지 추가
      return posts.map(post => ({
        ...post,
        profileImg: profileMap.get(post.authorId)?.profileImg || undefined
      }));
    } catch (error) {
      console.error('❌ 프로필 이미지 로드 실패:', error);
      // 실패해도 게시물은 표시
      return posts.map(post => ({...post, profileImg: undefined}));
    }
  };

  const loadPosts = useCallback(async (
      pageToLoad: number,
      currentPostType: 'trending' | 'recent' | 'friends' | 'search',
      keyword?: string
  ) => {
    if (currentPostType === 'friends' && !currentUserId) return;
    if (currentPostType === 'search' && !keyword?.trim()) return;
    if (loadingRef.current) return;

    setLoading(true);

    try {
      let res;
      if (currentPostType === 'trending') {
        res = await getTrendingPosts(pageToLoad, PAGE_SIZE);
      } else if (currentPostType === 'recent') {
        res = await getRecentPosts(pageToLoad, PAGE_SIZE);
      } else if (currentPostType === 'friends') {
        res = await getFriendsPosts(currentUserId, pageToLoad, PAGE_SIZE);
      } else if (currentPostType === 'search' && keyword?.trim()) {
        res = await searchPosts(keyword.trim(), pageToLoad, PAGE_SIZE);
      } else {
        setLoading(false);
        return;
      }

      if (res?.content) {
        // 프로필 이미지 추가
        const enrichedPosts = await enrichPostsWithProfiles(res.content);

        setPosts(prevPosts =>
            pageToLoad === 0 ? enrichedPosts : [...prevPosts, ...enrichedPosts]
        );
        setHasMore(!res.last);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(`Failed to fetch ${currentPostType} posts:`, error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  // postType 또는 currentUserId가 변경될 때 초기화 및 첫 페이지 로드
  useEffect(() => {
    if (postType === 'friends' && !currentUserId) {
      setPosts([]);
      setPage(0);
      setHasMore(true);
      setLoading(false);
      return;
    }

    if (postType === 'search' && !searchKeyword?.trim()) {
      setPosts([]);
      setPage(0);
      setHasMore(false);
      setLoading(false);
      return;
    }

    setPosts([]);
    setPage(0);
    setHasMore(true);
    loadPosts(0, postType, searchKeyword);
  }, [postType, currentUserId, searchKeyword, loadPosts]);

  // Intersection Observer 설정
  useEffect(() => {
    if (!loaderRef.current || !hasMoreRef.current) return;

    const observer = new IntersectionObserver(
        (entries) => {
          const target = entries[0];

          console.log(`[Observer Status] isIntersecting: ${target.isIntersecting}, loading: ${loadingRef.current}, hasMore: ${hasMoreRef.current}`);

          if (target.isIntersecting && !loadingRef.current && hasMoreRef.current) {
            console.log("✅ Intersection Observer: New page requested.");
            setPage(prevPage => prevPage + 1);
          }
        },
        {
          root: null,
          rootMargin: '20px',
          threshold: 1.0,
        }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loaderRef.current, hasMore]);

  // page 상태 변화 감지 및 추가 로딩
  useEffect(() => {
    if (page > 0) {
      loadPosts(page, postType, searchKeyword);
    }
  }, [page, postType, searchKeyword, loadPosts]);

  return (
      <div className={styles.mainContentWrapper}>
        <div className={styles.postListContainer}>
          {posts.map(post => (
              <PostCard key={post.postId} post={post} />
          ))}
        </div>

        {hasMore && (
            <div ref={loaderRef} className={styles.loader}>
              {loading && <p>로딩 중...</p>}
            </div>
        )}

        {!hasMore && posts.length === 0 && !loading && (
            <p className={styles.noPosts}>
              {postType === 'search'
                  ? '검색 결과가 없습니다.'
                  : postType === 'friends'
                      ? '친구의 게시물이 없습니다.'
                      : '표시할 게시물이 없습니다.'}
            </p>
        )}
      </div>
  );
}