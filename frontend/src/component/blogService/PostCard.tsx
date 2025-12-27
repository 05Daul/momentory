// src/component/blogService/PostCard.tsx
'use client';

import React from "react";
import styles from "@/styles/blogService/post.module.css";
import { PostEntity } from "@/types/blogService/blogType";
import { getImageUrl, getInitial } from '@/utils/imageUtils';
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: PostEntity;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();

  // ✅ [수정] 유틸리티 함수를 사용하여 URL 보정
  const fullProfileImgUrl = getImageUrl(post.profileImg);

  const stripHtml = (html: string): string => {
    if (!html) return "";

    if (typeof window !== 'undefined') {
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const text = temp.textContent || temp.innerText || '';
      return text.replace(/\s+/g, ' ').trim();
    }

    return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  };

  const plainText = stripHtml(post.content);
  const previewText = plainText.length > 120 ? plainText.substring(0, 120) + "..." : plainText;

  const dateStr = new Date(post.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
      <article
          className={styles.card}
          onClick={() => router.push(`/post/${post.postId}`)}
          style={{ cursor: "pointer" }}
      >
        <div className={styles.thumbnailWrapper}>
          {post.thumbnail ? (
              <>
                <img
                    src={post.thumbnail}
                    alt={post.title}
                    className={styles.thumbnail}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className={styles.overlay}>
                </div>
              </>
          ) : (
              <div className={styles.noThumbnailPlaceholder}>
              </div>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.preview}>{previewText}</p>

          <div className={styles.meta}>
            {/* 프로필 이미지 + 작성자 정보 */}
            <div className={styles.authorInfo}>
              {/* ✅ [수정] 보정된 URL 사용 및 onError 핸들링 */}
              {post.profileImg ? (
                  <img
                      src={fullProfileImgUrl || ''}
                      alt={post.authorId}
                      className={styles.authorAvatar}
                      onError={(e) => {
                        // 이미지 로드 실패 시 placeholder로 전환하기 위해 스타일 조정
                        e.currentTarget.style.display = 'none';
                        // 부모 요소에 placeholder를 띄우기 위해 클래스를 추가하거나 처리 가능
                      }}
                  />
              ) : (
                  <div className={styles.authorAvatarPlaceholder}>
                    {/* 🟢 [수정] 댓글과 일관성을 위해 getInitial 유틸 사용 */}
                    {getInitial(post.authorId)}
                  </div>
              )}
              <span className={styles.author}>by {post.authorId}</span>
            </div>

            <div className={styles.metaRight}>
              <span className={styles.date}>{dateStr}</span>
              <span className={styles.views}>조회 {post.viewCount.toLocaleString()}</span>
            </div>
          </div>

          {(post.tags ?? []).length > 0 && (
              <div className={styles.tags}>
                {(post.tags ?? []).map((tag, i) => (
                    <span
                        key={i}
                        className={styles.tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/tag/${encodeURIComponent(tag)}`);
                        }}
                    >
                        #{tag}
                    </span>
                ))}
              </div>
          )}
        </div>
      </article>
  );
}