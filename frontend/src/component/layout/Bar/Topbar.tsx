'use client';

import styles from "../../../styles/layout/layout.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginModal from "../../userService/LoginModal";
import FriendActionModal from "@/component/userService/FriendActionModal";
import { getImageUrl, getInitial } from "@/utils/imageUtils";
import React from "react";

// ProfileDropdown 컴포넌트
interface ProfileDropdownProps {
  onClose: () => void;
  onNavigate: (path: string) => void;
  userSignId: string;
}

const ProfileDropdown = ({ onClose, onNavigate, userSignId }: ProfileDropdownProps) => {
  const handleLinkClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
      <div className={styles.profileDropdown}>
        <div className={styles.dropdownHeader}>
          <strong>{userSignId}</strong>
        </div>
        <button onClick={() => handleLinkClick(`/my-posts/${userSignId}`)} className={styles.dropdownItem}>
          내 게시물
        </button>
        <button onClick={() => handleLinkClick('/setting')} className={styles.dropdownItem}>
          설정 (이미지/비밀번호)
        </button>
      </div>
  );
};

export default function Topbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [userSignId, setUserSignId] = useState('');
  const [imageLoadError, setImageLoadError] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // ✅ [수정] 로그인 상태 및 프로필 정보를 다시 불러오는 함수 추출
  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    const expiresAt = localStorage.getItem("accessTokenExpiresAt");
    const userId = localStorage.getItem("userSignId");
    const profile = localStorage.getItem("profile_img"); // 설정 페이지와 키 값 확인 필요

    if (!token || !expiresAt) {
      setIsLoggedIn(false);
      return;
    }

    if (Date.now() > Number(expiresAt)) {
      forceLogout();
      return;
    }

    setIsLoggedIn(true);
    setUserSignId(userId || '');
    setProfileImg(profile || '');
    // 새로운 이미지를 불러올 때 에러 상태 초기화
    setImageLoadError(false);
  };

  // ✅ [추가] 실시간 프로필 업데이트를 위한 이벤트 리스너 등록
  useEffect(() => {
    checkLoginStatus();

    // 'profileUpdate' 커스텀 이벤트 리스너 등록
    const handleProfileUpdate = () => {
      console.log("🔄 프로필 변경 감지: Topbar 업데이트");
      checkLoginStatus();
    };

    window.addEventListener('profileUpdate', handleProfileUpdate);

    return () => {
      window.removeEventListener('profileUpdate', handleProfileUpdate);
    };
  }, []);

  // 자동 로그아웃 로직
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const expiresAt = localStorage.getItem("accessTokenExpiresAt");
    if (!token || !expiresAt) return;

    const remainingTime = Number(expiresAt) - Date.now();
    if (remainingTime <= 0) {
      forceLogout();
      return;
    }

    const timer = setTimeout(() => {
      forceLogout();
    }, remainingTime);

    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = () => {
    checkLoginStatus();
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setProfileImg('');
    setUserSignId('');
    alert("로그아웃 되었습니다.");
    router.push("/");
  };

  const forceLogout = () => {
    console.warn("⏳ 토큰 만료 → 자동 로그아웃");
    localStorage.clear();
    setIsLoggedIn(false);
    setProfileImg('');
    setUserSignId('');
    setShowProfileDropdown(false);
    alert("로그인 시간이 만료되었습니다.");
    router.replace("/");
  };

  const handleProfileClick = () => {
    setShowProfileDropdown(prev => !prev);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
    setShowProfileDropdown(false);
  };

  const currentUserSignId = typeof window !== "undefined"
      ? localStorage.getItem("userSignId") || ""
      : "";

  return (
      <>
        <header className={styles.topbar}>
          <Link href="/" className={styles.leftSection}>
            MomenTory
          </Link>

          <nav className={styles.rightSection}>
            {isLoggedIn ? (
                <>
                  <Link href="/community" className={`${styles.rightItem} ${styles.navLink}`}>
                    커뮤니티
                  </Link>

                  <div
                      className={styles.rightItem}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowFriendModal(true)}
                  >
                    친구
                    {showFriendModal && currentUserSignId && (
                        <FriendActionModal
                            currentUserSignId={currentUserSignId}
                            isOpen={showFriendModal}
                            onClose={() => setShowFriendModal(false)}
                        />
                    )}
                  </div>

                  <Link href="/page" className={`${styles.rightItem} ${styles.writeButton}`}>
                    채팅
                  </Link>

                  <Link href="/write" className={`${styles.rightItem} ${styles.writeButton}`}>
                    Log 작성
                  </Link>

                  <div className={styles.profileContainer}>
                    <div
                        className={styles.profileSection}
                        onClick={handleProfileClick}
                        style={{ cursor: 'pointer' }}
                    >
                      {profileImg && !imageLoadError ? (
                          <img
                              src={getImageUrl(profileImg)}
                              alt="프로필"
                              className={styles.profileImage}
                              onError={(e) => {
                                setImageLoadError(true);
                                e.currentTarget.style.display = 'none';
                              }}
                          />
                      ) : (
                          <div className={styles.profileCircle}>
                            {getInitial(userSignId)}
                          </div>
                      )}
                    </div>

                    {showProfileDropdown && (
                        <ProfileDropdown
                            onClose={() => setShowProfileDropdown(false)}
                            onNavigate={handleNavigate}
                            userSignId={userSignId}
                        />
                    )}
                  </div>

                  <div className={styles.rightItem} onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    로그아웃
                  </div>
                </>
            ) : (
                <div
                    className={styles.rightItem}
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowLoginModal(true)}
                >
                  로그인
                </div>
            )}
          </nav>
        </header>

        {showLoginModal && (
            <LoginModal
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        )}
      </>
  );
}