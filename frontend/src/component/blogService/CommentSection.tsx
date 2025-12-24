// src/component/blogService/CommentSection.tsx

'use client';

import { useState, useEffect } from 'react';
import styles from '@/styles/blogService/commentSection.module.css';
import {
  createComment,
  updateComment,
  deleteComment,
  getCommentCount,
  getCommentsByPostId,
} from '@/api/blogService/comment';
// 🟢 [수정] 작성하신 user.ts에서 함수 임포트
import { getUserProfiles } from '@/api/userService/user';
import { CommentDTO } from '@/types/blogService/blogType';
import React from 'react';
import { getImageUrl, getInitial } from '@/utils/imageUtils';

interface CommentSectionProps {
  postId: number;
  comments?: CommentDTO[]; // SSR용
}

// 프로필 이미지를 포함하는 확장된 댓글 타입
interface CommentWithProfile extends CommentDTO {
  profileImg?: string | null;
  replies: CommentWithProfile[];
}

// 날짜 포맷팅 유틸리티
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// CommentItem 컴포넌트
const CommentItem = ({
                       comment,
                       currentUserSignId,
                       replyingTo,
                       setReplyingTo,
                       editingCommentId,
                       setEditingCommentId,
                       onReply,
                       onEdit,
                       onDelete,
                       isLoading,
                       depth = 0
                     }: {
  comment: CommentWithProfile;
  currentUserSignId: string;
  replyingTo: number | null;
  setReplyingTo: (id: number | null) => void;
  editingCommentId: number | null;
  setEditingCommentId: (id: number | null) => void;
  onReply: (parentId: number, content: string) => void;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
  depth?: number;
}) => {
  const [localReplyContent, setLocalReplyContent] = useState('');
  const [localEditContent, setLocalEditContent] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isRepliesVisible, setIsRepliesVisible] = useState(depth === 0);

  useEffect(() => {
    if (editingCommentId === comment.commentId) {
      setLocalEditContent(comment.content);
    }
  }, [editingCommentId, comment.commentId, comment.content]);

  // 댓글 ID나 이미지 경로가 바뀌면 에러 상태 초기화
  useEffect(() => {
    setImageLoadError(false);
  }, [comment.commentId, comment.profileImg]);

  const handleDeleteComment = async (id: number) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) return;
    try {
      const res = await deleteComment(id, currentUserSignId);
      if (res.includes('권한')) return alert(res);
      onDelete(id);
    } catch {
      alert('삭제 실패');
    }
  };

  const handleReplySubmit = () => {
    if (localReplyContent.trim() === '') {
      alert('답글 내용을 입력해주세요.');
      return;
    }
    onReply(comment.commentId, localReplyContent);
    setReplyingTo(null);
    setLocalReplyContent('');
    setIsRepliesVisible(true);
  };

  const handleEditSubmit = () => {
    if (localEditContent.trim() === '') {
      alert('수정 내용을 입력해주세요.');
      return;
    }
    onEdit(comment.commentId, localEditContent);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setLocalEditContent('');
  };

  return (
      <div
          className={`${styles.commentItem} ${depth > 0 ? styles.replyItem : ''}`}
          style={{ '--depth': depth } as React.CSSProperties}
      >
        <div className={styles.commentHeader}>
          {/* 프로필 이미지 렌더링 로직 */}
          {comment.profileImg && !imageLoadError ? (
              <img
                  src={getImageUrl(comment.profileImg)}
                  alt={comment.userId}
                  className={styles.commentAvatar}
                  onError={(e) => {
                    // console.error('❌ 댓글 이미지 로드 실패:', getImageUrl(comment.profileImg));
                    setImageLoadError(true);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => setImageLoadError(false)}
              />
          ) : (
              <div className={styles.commentAvatar}>
                {getInitial(comment.userId)}
              </div>
          )}

          <div className={styles.info}>
            <span className={styles.commentAuthor}>{comment.userId}</span>
            <span className={styles.commentDate}>{formatDate(comment.createdAt)}</span>
          </div>
        </div>

        {editingCommentId === comment.commentId ? (
            <div className={styles.editForm}>
          <textarea
              value={localEditContent}
              onChange={e => setLocalEditContent(e.target.value)}
              rows={3}
              className={styles.commentTextarea}
              disabled={isLoading}
          />
              <div className={styles.actionButtons}>
                <button
                    onClick={handleEditSubmit}
                    className={styles.submitButton}
                    disabled={isLoading || localEditContent.trim() === ''}
                >
                  {isLoading ? '수정 중...' : '수정 완료'}
                </button>
                <button
                    onClick={handleCancelEdit}
                    className={styles.cancelButton}
                    disabled={isLoading}
                >
                  취소
                </button>
              </div>
            </div>
        ) : (
            <p className={styles.commentContent}>
              {comment.isDeleted ? '(삭제된 댓글입니다)' : comment.content}
            </p>
        )}

        {!comment.isDeleted && editingCommentId !== comment.commentId && (
            <div className={styles.commentActions}>
              <button
                  onClick={() => setReplyingTo(comment.commentId)}
                  className={styles.replyButton}
                  disabled={isLoading}
              >
                답글
              </button>
              {currentUserSignId === comment.userId && (
                  <>
                    <button
                        onClick={() => setEditingCommentId(comment.commentId)}
                        className={styles.editButton}
                        disabled={isLoading}
                    >
                      수정
                    </button>
                    <button
                        onClick={() => onDelete(comment.commentId)}
                        className={styles.deleteButton}
                        disabled={isLoading}
                    >
                      삭제
                    </button>
                  </>
              )}
            </div>
        )}

        {comment.replies.length > 0 && (
            <div className={styles.replyToggle} onClick={() => setIsRepliesVisible(prev => !prev)}>
              {isRepliesVisible ? '답글 접기 ▲' : `답글 ${comment.replies.length}개 펼치기 ▼`}
            </div>
        )}

        {replyingTo === comment.commentId && (
            <div className={styles.replyForm}>
          <textarea
              value={localReplyContent}
              onChange={e => setLocalReplyContent(e.target.value)}
              placeholder={`${comment.userId}님께 답글 작성`}
              rows={2}
              className={styles.commentTextarea}
              disabled={isLoading}
          />
              <div className={styles.actionButtons}>
                <button
                    onClick={handleReplySubmit}
                    className={styles.submitButton}
                    disabled={isLoading || localReplyContent.trim() === ''}
                >
                  {isLoading ? '작성 중...' : '답글 작성'}
                </button>
                <button
                    onClick={() => setReplyingTo(null)}
                    className={styles.cancelButton}
                    disabled={isLoading}
                >
                  취소
                </button>
              </div>
            </div>
        )}

        {comment.replies.length > 0 && isRepliesVisible && (
            <div className={styles.repliesList}>
              {comment.replies.map(r => (
                  <CommentItem
                      key={r.commentId}
                      comment={r}
                      currentUserSignId={currentUserSignId}
                      replyingTo={replyingTo}
                      setReplyingTo={setReplyingTo}
                      editingCommentId={editingCommentId}
                      setEditingCommentId={setEditingCommentId}
                      onReply={onReply}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      isLoading={isLoading}
                      depth={depth + 1}
                  />
              ))}
            </div>
        )}
      </div>
  );
};

// 트리 업데이트 유틸
const updateTree = (list: CommentWithProfile[], id: number, fn: (c: CommentWithProfile) => CommentWithProfile): CommentWithProfile[] =>
    list.map(c =>
        c.commentId === id
            ? fn(c)
            : (c.replies && c.replies.length > 0)
                ? {
                  ...c,
                  replies: updateTree(c.replies, id, fn),
                }
                : c
    );

export default function CommentSection({ postId, comments: ssrComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentWithProfile[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [currentUserSignId, setCurrentUserSignId] = useState('');
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🟢 [핵심] user.ts의 API를 사용하여 프로필 정보를 병합하는 함수
  const fetchProfiles = async (commentList: CommentDTO[]): Promise<CommentWithProfile[]> => {
    // 1. 모든 댓글 및 대댓글에서 userId 수집
    const collectUserIds = (cmts: CommentDTO[]): string[] => {
      const ids = new Set<string>();
      const traverse = (c: CommentDTO) => {
        ids.add(c.userId);
        c.replies.forEach(traverse);
      };
      cmts.forEach(traverse);
      return Array.from(ids);
    };

    const userIds = collectUserIds(commentList);
    if (userIds.length === 0) return commentList as CommentWithProfile[];

    try {
      // 2. user.ts의 getUserProfiles 호출 (Map 반환)
      const profileMap = await getUserProfiles(userIds);

      // 3. 댓글 트리에 프로필 이미지 매핑
      const mapProfileToComment = (cmt: CommentDTO): CommentWithProfile => {
        const userProfile = profileMap.get(cmt.userId);
        return {
          ...(cmt as CommentWithProfile),
          profileImg: userProfile?.profileImg || null,
          replies: cmt.replies.map(mapProfileToComment) as CommentWithProfile[],
        };
      };

      return commentList.map(mapProfileToComment);

    } catch (error) {
      console.error("프로필 이미지 매핑 실패:", error);
      return commentList as CommentWithProfile[];
    }
  };

  useEffect(() => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userSignId') || '' : '';
    setCurrentUserSignId(userId);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedComments = await getCommentsByPostId(postId);
        const fetchedCount = await getCommentCount(postId);

        // 프로필 정보 매핑 실행
        const commentsWithProfiles = await fetchProfiles(fetchedComments);

        setComments(commentsWithProfiles);
        setCommentCount(fetchedCount);
      } catch(e) {
        console.error("댓글 데이터 로드 실패", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleSubmitComment = async () => {
    if (newComment.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      const dto = { postId, parentCommentId: null, content: newComment };
      const newCmt = await createComment(currentUserSignId, dto);

      // 새 댓글에도 프로필 정보 매핑
      const profiles = await fetchProfiles([newCmt]);
      const newCmtWithProfile = profiles.length > 0 ? profiles[0] : newCmt as CommentWithProfile;

      setComments(prev => [newCmtWithProfile, ...prev]);
      setCommentCount(c => c + 1);
      setNewComment('');
    } catch {
      alert('댓글 작성 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = async (parentId: number, content: string) => {
    setIsLoading(true);
    try {
      const dto = { postId, parentCommentId: parentId, content };
      const newCmt = await createComment(currentUserSignId, dto);

      // 새 답글에도 프로필 정보 매핑
      const profiles = await fetchProfiles([newCmt]);
      const enrichedComment = profiles.length > 0 ? profiles[0] : newCmt as CommentWithProfile;

      setComments(prev => updateTree(prev, parentId, c => ({
        ...c,
        replies: [...(c.replies || []), enrichedComment] as CommentWithProfile[],
        childCount: c.childCount + 1,
      })));

      setCommentCount(c => c + 1);
    } catch {
      alert('답글 작성 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id: number, content: string) => {
    setIsLoading(true);
    try {
      const dto = { content };
      const updatedCmt = await updateComment(id, currentUserSignId, dto);

      setComments(prev => updateTree(prev, id, c => ({
        ...c,
        content: updatedCmt.content,
        updatedAt: updatedCmt.updatedAt
      })));

      setEditingCommentId(null);
    } catch (e: any) {
      alert(e.message || '댓글 수정 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const res = await deleteComment(id, currentUserSignId);
      if (res.includes('권한')) {
        alert(res);
        return;
      }

      // 삭제 후 최신 목록 갱신 (프로필 포함)
      const fetchedComments = await getCommentsByPostId(postId);
      const commentsWithProfiles = await fetchProfiles(fetchedComments);
      const fetchedCount = await getCommentCount(postId);

      setComments(commentsWithProfiles);
      setCommentCount(fetchedCount);

    } catch (e) {
      alert('댓글 삭제 실패');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className={styles.commentSection}>
        <h2 className={styles.commentTitle}>{commentCount}개의 댓글</h2>

        <div className={styles.commentForm}>
        <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="댓글을 작성하세요"
            rows={4}
            className={styles.commentTextarea}
            disabled={isLoading}
        />
          <button
              onClick={handleSubmitComment}
              className={styles.submitButton}
              disabled={isLoading || newComment.trim() === ''}
          >
            {isLoading ? '작성 중...' : '댓글 작성'}
          </button>
        </div>

        <div className={styles.commentList}>
          {comments.map(c => (
              <CommentItem
                  key={c.commentId}
                  comment={c}
                  currentUserSignId={currentUserSignId}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  editingCommentId={editingCommentId}
                  setEditingCommentId={setEditingCommentId}
                  onReply={handleReply}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isLoading={isLoading}
                  depth={0}
              />
          ))}
        </div>
      </div>
  );
}