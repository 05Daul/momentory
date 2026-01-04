"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { getChatHistory, markMessagesAsRead, leaveChatRoom } from '@/api/chatService/chat'; // leaveChatRoom import
import type { ChatMessage, ChatMessageDto } from '@/types/chatService/chat';
import { Send, ArrowLeft, MoreVertical, LogOut } from 'lucide-react'; // MoreVertical, LogOut import
import styles from '@/styles/chatService/ChatRoom.module.css';

interface ChatRoomProps {
  roomId: string;
  currentUserId: string;
  currentUserName: string;
  roomName: string;
  onBack: () => void;
}

export default function ChatRoom({
                                   roomId,
                                   currentUserId,
                                   currentUserName,
                                   roomName,
                                   onBack,
                                 }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ⭐ 추가: 메뉴 상태
  const [isComposing, setIsComposing] = useState(false); // 👈 한글 조합 중인지 추적
  const menuRef = useRef<HTMLDivElement>(null); // ⭐ 추가: 메뉴 참조
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('=== ChatRoom 마운트 ===');
    console.log('roomId:', roomId);
    console.log('currentUserId:', currentUserId);
    console.log('currentUserName:', currentUserName);
  }, [roomId, currentUserId, currentUserName]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // ⭐ 추가: 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleNewMessage = useCallback(
      (newMessage: ChatMessage) => {
        console.log('📨 새 메시지 수신:', newMessage);

        // ⭐ 중복 방지: 같은 메시지가 이미 있는지 확인
        setMessages((prev) => {
          // chatId가 있으면 chatId로, 없으면 content+timestamp로 중복 체크
          const isDuplicate = prev.some(msg => {
            if (newMessage.chatId && msg.chatId) {
              return msg.chatId === newMessage.chatId;
            }
            // chatId가 없는 경우 내용과 시간으로 중복 체크 (fallback)
            return msg.content === newMessage.content &&
                msg.userSignId === newMessage.userSignId &&
                msg.createdAt === newMessage.createdAt;
          });

          if (isDuplicate) {
            console.log('⚠️ 중복 메시지 무시:', newMessage.content);
            return prev;
          }

          return [...prev, newMessage];
        });

        setTimeout(scrollToBottom, 100);

        if (newMessage.userSignId !== currentUserId) {
          // ⭐ 읽음 처리 후 로컬 상태 갱신 로직
          markMessagesAsRead(roomId, currentUserId)
          .then(() => {
            console.log('✅ 새 메시지 수신 후 읽음 처리 완료');
            setMessages(prevMessages =>
                prevMessages.map(msg => {
                  if (msg.userSignId !== currentUserId && !msg.readBy?.includes(currentUserId)) {
                    return {
                      ...msg,
                      readBy: [...(msg.readBy || []), currentUserId],
                    };
                  }
                  return msg;
                })
            );
          })
          .catch(console.error);
        }
      },
      [currentUserId, roomId, scrollToBottom]
  );

  // ⭐ roomId를 꼭 전달해야 구독이 됩니다!
  const { isConnected, sendMessage } = useWebSocket({
    url: 'ws://111111/ws-chat',
    roomId: roomId,
    onMessage: handleNewMessage,
  });

  useEffect(() => {
    console.log('🔌 WebSocket 연결:', isConnected);
  }, [isConnected]);

  const loadChatHistory = useCallback(async (pageNum: number = 0) => {
    if (!hasMore && pageNum > 0) return;

    setIsLoading(true);
    try {
      console.log('📚 히스토리 로드:', roomId, 'page:', pageNum);
      const history = await getChatHistory(roomId, pageNum, 30);
      console.log('✅ 메시지', history.length, '개');

      if (history.length === 0) {
        setHasMore(false);
        return;
      }

      if (pageNum === 0) {
        // 첫 로드
        setMessages(Array.isArray(history) ? history.reverse() : []);
      } else {
        // 이전 메시지 추가 (위에 추가)
        setMessages(prev => [...(Array.isArray(history) ? history.reverse() : []), ...prev]);
      }

      if (history.length < 30) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('❌ 로드 실패:', err);
      if (pageNum === 0) {
        setMessages([]);
      }
    } finally {
      setIsLoading(false);
      if (pageNum === 0) {
        setTimeout(scrollToBottom, 100);
      }
    }
  }, [roomId, hasMore, scrollToBottom]);

  useEffect(() => {
    loadChatHistory(0);

    // 채팅방 진입 시 읽음 처리
    const markAsRead = async () => {
      try {
        await markMessagesAsRead(roomId, currentUserId);
        console.log('✅ 채팅방 진입 시 읽음 처리 완료');

        // ⭐ 읽음 처리 후 로컬 상태 갱신
        setMessages(prevMessages =>
            prevMessages.map(msg => {
              if (msg.userSignId !== currentUserId && !msg.readBy?.includes(currentUserId)) {
                return {
                  ...msg,
                  readBy: [...(msg.readBy || []), currentUserId],
                };
              }
              return msg;
            })
        );

      } catch (error) {
        console.error('❌ 읽음 처리 실패:', error);
      }
    };

    markAsRead();
  }, [roomId, currentUserId]);

  // 무한 스크롤: 스크롤이 맨 위에 도달하면 다음 페이지 로드
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop === 0 && hasMore && !isLoading) {
        const currentScrollHeight = container.scrollHeight;

        setPage(prev => {
          const nextPage = prev + 1;
          loadChatHistory(nextPage).then(() => {
            // 스크롤 위치 유지
            requestAnimationFrame(() => {
              const newScrollHeight = container.scrollHeight;
              container.scrollTop = newScrollHeight - currentScrollHeight;
            });
          });
          return nextPage;
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, loadChatHistory]);

  const handleSendMessage = useCallback(() => {
    const trimmed = inputMessage.trim();

    if (!trimmed) return;

    if (!isConnected) {
      alert('서버와 연결되지 않았습니다.');
      return;
    }

    if (!currentUserId) {
      alert('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    const messageDto: ChatMessageDto = {
      roomId,
      userSignId: currentUserId,
      name: currentUserName || currentUserId,
      content: trimmed,
      type: 'TALK',
    };

    console.log('📤 전송:', messageDto.content);

    try {
      sendMessage(messageDto);
      setInputMessage('');
      inputRef.current?.focus();
    } catch (error) {
      console.error('❌ 전송 실패:', error);
      alert('메시지 전송에 실패했습니다.');
    }
  }, [inputMessage, isConnected, currentUserId, currentUserName, roomId, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) { // ⭐ 수정: isComposing 추가
      e.preventDefault();
      handleSendMessage();
    }
  };

  // ⭐ 추가: 채팅방 나가기 핸들러
  const handleLeaveRoom = async () => {
    if (window.confirm('채팅방을 나가시겠습니까? 나가면 메시지 목록이 삭제되고 다시 참여할 수 없습니다.')) {
      try {
        await leaveChatRoom(roomId, currentUserId);
        console.log(`✅ Room ${roomId}에서 사용자 ${currentUserId} 나가기 성공`);
        onBack(); // 채팅방 목록으로 돌아가기
      } catch (error) {
        alert('채팅방 나가기에 실패했습니다.');
        console.error('채팅방 나가기 실패:', error);
      }
    }
    setIsMenuOpen(false); // 메뉴 닫기
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  /**
   * 현재 메시지가 시간 그룹의 마지막 메시지인지 확인하는 함수.
   */
  const isLastMessageInTimeGroup = (currentMsg: ChatMessage, index: number) => {
    // 1. 마지막 메시지라면 무조건 시간을 표시
    if (index === messages.length - 1) return true;

    const nextMsg = messages[index + 1];

    if (!currentMsg.createdAt || !nextMsg.createdAt) return true; // 예외 처리

    const currentTime = new Date(currentMsg.createdAt);
    const nextTime = new Date(nextMsg.createdAt);

    // 2. 다음 메시지와 발신자가 다르면 현재 메시지가 그룹의 마지막
    if (currentMsg.userSignId !== nextMsg.userSignId) {
      return true;
    }

    // 3. 다음 메시지와 분 단위로 다르면 현재 메시지가 그룹의 마지막
    if (currentTime.getHours() !== nextTime.getHours() || currentTime.getMinutes() !== nextTime.getMinutes()) {
      return true;
    }

    // 다음 메시지와 같은 분, 같은 발신자: 시간 미표시
    return false;
  };

  const getUnreadCountForMine = (msg: ChatMessage) => {
    // 내 메시지이고, readBy 배열의 길이가 1(자기 자신) 이하라면 아무도 읽지 않은 것임
    if (msg.userSignId === currentUserId) {
      if (!msg.readBy || msg.readBy.length <= 1) {
        return '1';
      }
    }
    return '';
  }

  return (
      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={onBack} className={styles.backBtn} aria-label="뒤로">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className={styles.roomName}>{roomName}</h1>
          <div className={styles.connectionStatus}>
            <span className={`${styles.statusDot} ${isConnected ? styles.connected : styles.disconnected}`} />
            <span className={styles.statusText}>{isConnected ? '온라인' : '오프라인'}</span>
          </div>

          {/* ⭐ 추가: 메뉴 버튼 및 드롭다운 */}
          <div className={styles.menuContainer} ref={menuRef}>
            <button
                className={styles.menuBtn}
                onClick={() => setIsMenuOpen(prev => !prev)}
                aria-expanded={isMenuOpen}
                aria-label="채팅방 메뉴"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                  <button
                      onClick={handleLeaveRoom}
                      className={styles.dropdownItem}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>채팅방 나가기</span>
                  </button>
                  {/* 여기에 다른 메뉴 아이템 추가 가능 */}
                </div>
            )}
          </div>
        </header>

        <main className={styles.messagesArea} ref={messagesContainerRef}>
          {isLoading ? (
              <div className={styles.loadingMessage}>메시지를 불러오는 중...</div>
          ) : messages.length === 0 ? (
              <div className={styles.emptyMessage}>
                아직 메시지가 없습니다.<br/>
                <span style={{fontSize: '0.875rem'}}>첫 메시지를 보내보세요!</span>
              </div>
          ) : (
              messages.map((msg, index) => {
                const isMine = msg.userSignId === currentUserId;
                // 현재 메시지가 시간 그룹의 마지막 메시지인지 확인
                const showTime = isLastMessageInTimeGroup(msg, index);

                return (
                    <div
                        key={msg.chatId}
                        className={`${styles.messageRow} ${isMine ? styles.mine : styles.theirs}`}
                    >
                      <div className={`${styles.messageContent} ${isMine ? styles.mine : styles.theirs}`}>
                        {!isMine && (
                            <span className={styles.senderName}>
                              {msg.name || msg.userSignId}
                            </span>
                        )}
                        <div className={`${styles.messageBubble} ${isMine ? styles.mine : styles.theirs}`}>
                          {msg.content}
                        </div>
                        {/* showTime이 true일 때만 messageFooter (시간/읽음 상태) 표시 */}
                        {showTime && (
                            <div className={styles.messageFooter}>
                              <span className={styles.messageTime}>{formatTime(msg.createdAt)}</span>
                              {isMine && (
                                  <span className={styles.readStatus}>
                                    {getUnreadCountForMine(msg)}
                                </span>
                              )}
                            </div>
                        )}
                      </div>
                    </div>
                );
              })
          )}
          <div ref={messagesEndRef} />
        </main>

        <footer className={styles.inputArea}>
          <div className={styles.inputContainer}>
            <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onCompositionStart={() => setIsComposing(true)} // ⭐ 추가: 한글 조합 시작
                onCompositionEnd={() => setIsComposing(false)} // ⭐ 추가: 한글 조합 끝
                placeholder={isConnected ? "메시지를 입력하세요..." : "연결 중..."}
                disabled={!isConnected}
                className={styles.messageInput}
                autoFocus
            />
            <button
                onClick={handleSendMessage}
                disabled={!isConnected || !inputMessage.trim()}
                className={styles.sendBtn}
                aria-label="전송"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </footer>
      </div>
  );
}
