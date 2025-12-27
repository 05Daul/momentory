// pages/settings/index.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/component/layout/MainLayout'; // 경로에 맞게 수정
import styles from '@/styles/userService/settings.module.css'; // CSS 모듈 사용
// 🟢 [가정] updateNickname 함수가 updateNicknameWithoutPassword로 변경되거나,
// 기존 함수가 비밀번호 없이 호출될 수 있도록 백엔드 API도 수정되어야 합니다.
import { getUserProfile, UserProfile, uploadProfileImage, changePassword, updateNickname } from '@/api/userService/user';
import { getImageUrl, getInitial } from '@/utils/imageUtils';

const SETTINGS_TABS = {
  PROFILE: 'profile',
  PASSWORD: 'password',
} as const;

type ActiveTab = typeof SETTINGS_TABS[keyof typeof SETTINGS_TABS];

// === 1. 프로필 이미지 및 정보 수정 컴포넌트 ===
interface ProfileSettingsProps {
  initialProfile: UserProfile;
  onProfileUpdate: (newProfile: UserProfile) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ initialProfile, onProfileUpdate }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isUpdating, setIsUpdating] = useState(false); // 이미지/닉네임 업데이트 공용 로딩 상태
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nickName, setNickName] = useState(initialProfile.nickName || '');
  const [email, setEmail] = useState(initialProfile.email || '');

  const [nicknameError, setNicknameError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ [수정] 제한 크기를 5MB로 변경 (5 * 1024 * 1024)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert("파일 크기는 최대 5MB까지만 허용됩니다.");
      // 파일 선택 초기화 (같은 파일을 다시 선택할 수 있게 함)
      e.target.value = '';
      return;
    }

    setIsUpdating(true);
    setNicknameError('');

    try {
      const { profileImg: newImgPath } = await uploadProfileImage(profile.userSignId, file);

      const updatedProfile: UserProfile = { ...profile, profileImg: newImgPath };

      setProfile(updatedProfile);
      onProfileUpdate(updatedProfile);

      // ✅ [추가] Topbar와 동기화를 위해 localStorage도 함께 업데이트
      localStorage.setItem('profile_img', newImgPath);

      // 앱 전체에 프로필이 변경되었음을 알리는 이벤트 발신
      window.dispatchEvent(new Event('profileUpdate'));
      alert("프로필 이미지가 성공적으로 변경되었습니다.");

    } catch (error: any) {
      // ✅ [수정] 런타임 에러 페이지 방지를 위해 catch 로직 강화
      console.error("프로필 이미지 업데이트 실패:", error);

      // 서버에서 전달한 구체적인 에러 메시지가 있다면 alert로 표시
      const errorMessage = error.message || "프로필 이미지 업데이트에 실패했습니다.";
      alert(errorMessage);

      // 에러 발생 시 파일 선택 초기화
      e.target.value = '';
    } finally {
      setIsUpdating(false);
    }
  };

  // 🟢 [수정] 일반 정보 (닉네임) 수정 처리
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNicknameError('');

    const trimmedNickName = nickName.trim();
    const isNicknameChanged = trimmedNickName !== profile.nickName;

    if (!isNicknameChanged) {
      setNicknameError("닉네임을 변경해야만 수정할 수 있습니다.");
      return;
    }

    // 🔴 [제거] 비밀번호 필수 검사 제거

    setIsUpdating(true);
    try {
      const response = await updateNickname(profile.userSignId, trimmedNickName); // 비밀번호 필드를 빈 문자열로 넘김

      const newNickname = response.nickname;

      const updatedProfile: UserProfile = { ...profile, nickName: newNickname };

      setProfile(updatedProfile);
      onProfileUpdate(updatedProfile);

      alert(`닉네임이 변경되었습니다.`);

    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "닉네임 변경 중 알 수 없는 오류 발생";
      setNicknameError(errMsg);
    } finally {
      setIsUpdating(false);
    }
  };

  // 🟢 [수정] 버튼 활성화 조건: 닉네임이 변경되었기만 하면 됨
  const isNicknameUpdateReady = nickName.trim() !== profile.nickName;

  return (
      <div className={styles.profileSection}>
        <h2>프로필 정보</h2>

        {/* 1. 이미지 수정 영역 */}
        <div className={styles.imageUploadArea}>
          <div className={styles.avatarWrapper} onClick={() => !isUpdating && fileInputRef.current?.click()}>
            {profile.profileImg ? (
                <img
                    src={getImageUrl(profile.profileImg)}
                    alt="프로필 이미지"
                    className={styles.avatar}
                />
            ) : (
                <div className={styles.avatarPlaceholder}>
                  {getInitial(profile.userSignId)}
                </div>
            )}
            <div className={styles.avatarOverlay}>
              {isUpdating ? '업로드 중...' : '이미지 변경'}
            </div>
          </div>
          <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              disabled={isUpdating}
          />
        </div>

        {/* 2. 일반 정보 표시/수정 영역 */}
        <div className={styles.userInfoDisplay}>
          <p className={styles.userSignId}>아이디: @{profile.userSignId}</p>
          <form onSubmit={handleProfileSubmit} className={styles.profileForm}>

            {nicknameError && <p className={styles.errorMessage}>{nicknameError}</p>}

            {/* 닉네임 */}
            <label htmlFor="nickname">닉네임</label>
            <input
                id="nickname"
                type="text"
                value={nickName}
                onChange={(e) => {
                  setNickName(e.target.value);
                  setNicknameError(''); // 입력 시 오류 초기화
                }}
                required
                maxLength={20}
                disabled={isUpdating}
            />

            {/* 이메일 */}
            <label htmlFor="email">이메일</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled // 이메일 변경은 비활성화 유지
            />

            {/* 🔴 [제거] 닉네임 변경을 위한 현재 비밀번호 입력 필드 제거 */}
            {/* <label htmlFor="currentPassword">현재 비밀번호 (닉네임 변경 시 필수)</label>
            <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setNicknameError('');
                }}
                disabled={isUpdating}
            />
            */}

            <p className={styles.note}>
              닉네임 변경 시 보안 절차가 .
              이메일은 변경할 수 없습니다.
            </p>

            <button type="submit" disabled={isUpdating || !isNicknameUpdateReady}>
              {isUpdating ? '수정 중...' : '닉네임 수정'}
            </button>
          </form>
        </div>
      </div>
  );
};


// === 2. 비밀번호 변경 컴포넌트 (변경 없음) ===
const PasswordSettings: React.FC<{ userSignId: string }> = ({ userSignId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isChanging, setIsChanging] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 기본 유효성 검사
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    if (newPassword.length < 8) {
      setError("새 비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (currentPassword === newPassword) {
      setError("현재 비밀번호와 새 비밀번호가 동일합니다.");
      return;
    }

    setIsChanging(true);
    try {
      // API 호출: 비밀번호 변경
      await changePassword(userSignId, currentPassword, newPassword);
      alert("비밀번호가 성공적으로 변경되었습니다. 보안을 위해 다시 로그인해야 할 수 있습니다.");

      // 성공 후 필드 초기화
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "비밀번호 변경 중 알 수 없는 오류 발생";
      setError(errMsg);
    } finally {
      setIsChanging(false);
    }
  };

  return (
      <div className={styles.passwordSection}>
        <h2>비밀번호 변경</h2>
        <form onSubmit={handleSubmit} className={styles.passwordForm}>
          {error && <p className={styles.errorMessage}>{error}</p>}

          <label>현재 비밀번호</label>
          <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
          />

          <label>새 비밀번호 (8자 이상, 특수문자 포함돼야합니다.)</label>
          <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
          />

          <label>새 비밀번호 확인</label>
          <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
          />

          <button type="submit" disabled={isChanging || !currentPassword || !newPassword || !confirmPassword}>
            {isChanging ? '변경 중...' : '비밀번호 변경'}
          </button>
        </form>
      </div>
  );
};


// === 3. 메인 설정 페이지 컴포넌트 (변경 없음) ===
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(SETTINGS_TABS.PROFILE);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const id = localStorage.getItem('userSignId');
    if (id) {
      setUserId(id);

      const fetchProfile = async () => {
        try {
          const userProfile = await getUserProfile(id);
          if (userProfile) {
            setProfile(userProfile);
          }
        } catch (error) {
          console.error("프로필 로딩 실패:", error);
          // 실제 서비스에서는 에러 시 사용자에게 알림
        } finally {
          setIsLoading(false);
        }
      };

      fetchProfile();
    } else {
      // 로그인되지 않은 경우 (실제로는 로그인 페이지로 리다이렉트 필요)
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
        <Layout>
          <div className={styles.loading}>프로필 정보 로딩 중...</div>
        </Layout>
    );
  }

  if (!userId || !profile) {
    return (
        <Layout>
          <div className={styles.container}>로그인이 필요합니다.</div>
        </Layout>
    );
  }

  return (
      <Layout>
        <div className={styles.settingsPage}>
          <h1 className={styles.pageTitle}>계정 설정</h1>

          <div className={styles.contentWrapper}>
            {/* 좌측 탭 메뉴 */}
            <nav className={styles.sidebar}>
              <button
                  className={activeTab === SETTINGS_TABS.PROFILE ? styles.activeTab : ''}
                  onClick={() => setActiveTab(SETTINGS_TABS.PROFILE)}
              >
                프로필 관리
              </button>
              <button
                  className={activeTab === SETTINGS_TABS.PASSWORD ? styles.activeTab : ''}
                  onClick={() => setActiveTab(SETTINGS_TABS.PASSWORD)}
              >
                비밀번호 변경
              </button>
            </nav>

            {/* 우측 콘텐츠 영역 */}
            <main className={styles.mainContent}>
              {activeTab === SETTINGS_TABS.PROFILE && (
                  <ProfileSettings
                      initialProfile={profile}
                      onProfileUpdate={setProfile} // 업데이트된 프로필을 메인 컴포넌트에 반영
                  />
              )}

              {activeTab === SETTINGS_TABS.PASSWORD && (
                  <PasswordSettings userSignId={userId} />
              )}
            </main>
          </div>
        </div>
      </Layout>
  );
}