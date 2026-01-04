// src/api/chatService/chat.ts

import { CHATSERVICE_API } from "@/config/env";
import type { ChatRoom, ChatMessage } from "@/types/chatService/chat";

// 공통 인증 헤더 + userSignId 헤더 포함
const getHeaders = (userSignId?: string) => {
  const token = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true", // ngrok 경고 건너뛰기 추가
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (userSignId) {
    headers["userSignId"] = userSignId; // 백엔드 @RequestHeader 필수!
  }

  return headers;
};

/**
 * 채팅방 생성 (백엔드와 정확히 매칭)
 */
export async function createChatRoom(
    participantIds: string[],
    roomName: string,
    currentUserSignId: string
): Promise<ChatRoom> {
  const response = await fetch(`${CHATSERVICE_API}/rooms`, {
    method: "POST",
    headers: getHeaders(currentUserSignId), // userSignId 헤더 포함
    body: JSON.stringify({
      participantIds,
      roomName: roomName || null, // 백엔드에서 null 허용
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`채팅방 생성 실패: ${error}`);
  }

  return response.json();
}

/**
 * 내 채팅방 목록 조회
 */
export async function getChatRooms(userSignId: string): Promise<ChatRoom[]> {
  const response = await fetch(`${CHATSERVICE_API}/rooms`, {
    method: "GET",
    headers: getHeaders(userSignId), // 필수 헤더
  });

  if (response.status === 204) return [];
  if (!response.ok) {
    throw new Error("채팅방 목록 조회 실패");
  }

  return response.json();
}

/**
 * 채팅 히스토리 조회
 */
export async function getChatHistory(
    roomId: string,
    page = 0,
    size = 50
): Promise<ChatMessage[]> {
  const token = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true" // 추가
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(
      `${CHATSERVICE_API}/rooms/${roomId}/messages?page=${page}&size=${size}`,
      { headers }
  );

  if (response.status === 204) return [];
  if (!response.ok) throw new Error("메시지 조회 실패");
  return response.json();
}

/**
 * 읽음 처리
 */
export async function markMessagesAsRead(
    roomId: string,
    userSignId: string
): Promise<void> {
  const response = await fetch(`${CHATSERVICE_API}/rooms/${roomId}/read`, {
    method: "PUT",
    headers: {
      ...getHeaders(userSignId),
      "Content-Length": "0",
    },
  });

  if (!response.ok) {
    throw new Error("읽음 처리 실패");
  }
}

export async function leaveChatRoom(
    roomId: string,
    userSignId: string
): Promise<void> {
  const response = await fetch(`${CHATSERVICE_API}/rooms/${roomId}/leave`, {
    method: "DELETE", // 🎯 백엔드 ChatController.java의 @DeleteMapping과 일치하도록 수정
    headers: getHeaders(userSignId),
  });

  // 백엔드가 200 OK 또는 204 No Content를 반환하면 response.ok는 true
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`채팅방 나가기 실패: ${error}`);
  }
}