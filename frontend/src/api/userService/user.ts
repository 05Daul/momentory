// src/api/userService/user.ts (최종 완성본)

import { USERSERVICE_API } from "@/config/env";
import {
  UserDTO,
  LoginDTO,
  FriendReqDTO,
  FriendsResDTO,
} from "@/types/userService/user";

// 공통 응답 타입
interface ApiResponse {
  success: boolean;
  message?: string;
}

// 중복 체크 응답 타입 (백엔드에서 "exists" 또는 "not exists" 같은 문자열 반환 예상)
interface DuplicateCheckResponse {
  available: boolean;   // 프론트에서 쓰기 좋게 통일
}

export interface UserProfile {
  userSignId: string;
  userName: string;
  nickName: string;
  email: string;
  profileImg: string | null;
}

export async function uploadProfileImage(userSignId: string, imageFile: File): Promise<{ profileImg: string }> {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch(`${USERSERVICE_API}/profile/image`, {
    method: 'POST',
    headers: {
      // 파일 업로드는 Content-Type을 'multipart/form-data'로 명시하지 않아야
      // 브라우저가 boundary를 자동으로 설정합니다.
      userSignId: userSignId, // 사용자 식별을 위한 Header
      // Authorization 헤더가 필요하다면 여기에 추가해야 합니다.
    },
    body: formData,
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || "프로필 이미지 업로드 실패");
  }

  // 백엔드에서 새로운 프로필 이미지 경로({ profileImg: "/path/to/image.jpg" })를 반환한다고 가정
  return await response.json();
}

/**
 * [추가] 비밀번호 변경
 * @param userSignId 현재 로그인한 사용자 ID
 * @param currentPassword 현재 비밀번호
 * @param newPassword 새 비밀번호
 */
export async function changePassword(userSignId: string, currentPassword: string, newPassword: string): Promise<ApiResponse> {
  const response = await fetch(`${USERSERVICE_API}/profile/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      userSignId: userSignId, // 사용자 식별을 위한 Header
    },
    body: JSON.stringify({
      currentPassword: currentPassword,
      newPassword: newPassword,
    }),
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || "비밀번호 변경 실패");
  }

  // 성공 시 메시지를 반환한다고 가정
  return { success: true, message: "비밀번호가 성공적으로 변경되었습니다." };
}

/**
 * 사용자 프로필 정보 조회
 */
export async function getUserProfile(userSignId: string): Promise<UserProfile | null> {
  try {
    const response = await fetch(`${USERSERVICE_API}/profile/${userSignId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`사용자 프로필 조회 실패: ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('사용자 프로필 조회 중 오류:', error);
    return null;
  }
}

/**
 * 여러 사용자의 프로필 정보 일괄 조회
 */
export async function getUserProfiles(userSignIds: string[]): Promise<Map<string, UserProfile>> {
  const profileMap = new Map<string, UserProfile>();

  // 중복 제거
  const uniqueIds = [...new Set(userSignIds)];

  // 병렬로 조회
  const results = await Promise.allSettled(
      uniqueIds.map(id => getUserProfile(id))
  );

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value) {
      profileMap.set(uniqueIds[index], result.value);
    }
  });

  return profileMap;
}

// 1. 회원가입
export async function signup(formData: FormData): Promise<ApiResponse> {
  const response = await fetch(`${USERSERVICE_API}/signup`, {
    method: "POST",
    // FormData 사용 시 Content-Type 헤더를 설정하지 않음 (브라우저가 자동으로 설정)
    body: formData,
  });

  const text = await response.text();

  if (response.status === 201) {
    return { success: true, message: text || "회원가입 성공" };
  }

  return { success: false, message: text || "회원가입 실패" };
}
// 2. 로그인
export async function login(loginDto: LoginDTO): Promise<{
  userSignId: string;
  role: string;
  refreshToken: string;
  accessToken: string;
  profileImg?: string
}> {
  const response = await fetch(`${USERSERVICE_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginDto),
  });

  if (!response.ok) {
    throw new Error(`로그인 실패: ${response.status}`);
  }

  const authHeader = response.headers.get("Authorization");
  const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : "";
  const body = await response.json();

  return {
    userSignId: body.userSignId,
    role: body.role,
    refreshToken: body.refreshToken,
    accessToken,
    profileImg: body.profileImg,
  };
}

// 3. 아이디 중복 체크 → GET /existId?userId=xxx
export async function checkUserSignId(userSignId: string): Promise<DuplicateCheckResponse> {
  const response = await fetch(
      `${USERSERVICE_API}/existId?userId=${encodeURIComponent(userSignId)}`
  );

  const text = await response.text();
  const available = text.trim() === "not exists";
  return { available };
}

// 4. 이메일 중복 체크 → GET /existEmail?email=xxx
export async function checkEmail(email: string): Promise<DuplicateCheckResponse> {
  const response = await fetch(
      `${USERSERVICE_API}/existEmail?email=${encodeURIComponent(email)}`
  );

  const text = await response.text();
  const available = text.trim() === "not exists";
  return { available };
}

// 5. 닉네임 중복 체크 → GET /existNickname?nickname=xxx
export async function checkNickName(nickname: string): Promise<DuplicateCheckResponse> {
  const response = await fetch(
      `${USERSERVICE_API}/existNickname?nickname=${encodeURIComponent(nickname)}`
  );

  const text = await response.text();
  const available = text.trim() === "not exists";
  return { available };
}

// 6. 친구 요청
export async function requestFriend(requesterSignId: string, reqDto: FriendReqDTO): Promise<FriendsResDTO> {
  const response = await fetch(`${USERSERVICE_API}/friends`, {
    method: "POST",
    headers: {
      userSignId: requesterSignId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqDto),
  });

  if (response.status === 201) {
    return await response.json();
  }

  const msg = await response.text();
  throw new Error(msg || "친구 요청 실패");
}

// 7. 친구 요청 수락
export async function acceptFriend(receiverSignId: string, requesterSignId: string): Promise<FriendsResDTO> {
  const response = await fetch(`${USERSERVICE_API}/friends/${requesterSignId}/accept`, {
    method: "PUT",
    headers: {
      userSignId: receiverSignId,
      "Content-Length": "0",
    },
  });

  if (response.ok) {
    return await response.json();
  }

  const msg = await response.text();
  throw new Error(msg || "친구 수락 실패");
}

export async function updateNickname(userSignId: string, newNickName: string): Promise<{ nickname: string }> {
  const response = await fetch(`${USERSERVICE_API}/profile/nickname`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'userSignId': userSignId,
    },
    body: JSON.stringify({
      newNickName,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "닉네임 변경에 실패했습니다.");
  }

  return await response.json();
}