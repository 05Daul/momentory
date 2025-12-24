module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/styles/blogService/postDetail.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "activeLike": "postDetail-module__4ccv2W__activeLike",
  "authorActions": "postDetail-module__4ccv2W__authorActions",
  "centralContent": "postDetail-module__4ccv2W__centralContent",
  "deleteButton": "postDetail-module__4ccv2W__deleteButton",
  "detailContainer": "postDetail-module__4ccv2W__detailContainer",
  "editButton": "postDetail-module__4ccv2W__editButton",
  "gridWrapper": "postDetail-module__4ccv2W__gridWrapper",
  "leftSidebar": "postDetail-module__4ccv2W__leftSidebar",
  "likeButton": "postDetail-module__4ccv2W__likeButton",
  "mainContent": "postDetail-module__4ccv2W__mainContent",
  "metaRow": "postDetail-module__4ccv2W__metaRow",
  "postHeader": "postDetail-module__4ccv2W__postHeader",
  "postThumbnail": "postDetail-module__4ccv2W__postThumbnail",
  "postTitle": "postDetail-module__4ccv2W__postTitle",
  "reactionContainer": "postDetail-module__4ccv2W__reactionContainer",
  "shareButton": "postDetail-module__4ccv2W__shareButton",
  "sidebar": "postDetail-module__4ccv2W__sidebar",
  "stickyBox": "postDetail-module__4ccv2W__stickyBox",
  "tagsContainer": "postDetail-module__4ccv2W__tagsContainer",
  "tocLevel2": "postDetail-module__4ccv2W__tocLevel2",
  "tocLevel3": "postDetail-module__4ccv2W__tocLevel3",
  "tocLink": "postDetail-module__4ccv2W__tocLink",
  "tocList": "postDetail-module__4ccv2W__tocList",
  "tocNav": "postDetail-module__4ccv2W__tocNav",
  "tocTitle": "postDetail-module__4ccv2W__tocTitle",
});
}),
"[project]/src/config/env.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLOGSERVICE_API",
    ()=>BLOGSERVICE_API,
    "CHATSERVICE_API",
    ()=>CHATSERVICE_API,
    "COMMUNITYSERVICE_API",
    ()=>COMMUNITYSERVICE_API,
    "FEEDSERVICE_API",
    ()=>FEEDSERVICE_API,
    "FRIENDSSERVICE_API",
    ()=>FRIENDSSERVICE_API,
    "GATEWAY_API_URL",
    ()=>GATEWAY_API_URL,
    "NOTIFICATIONSERVEICE_API",
    ()=>NOTIFICATIONSERVEICE_API,
    "USERSERVICE_API",
    ()=>USERSERVICE_API
]);
const FEEDSERVICE_API = ("TURBOPACK compile-time value", "http://127.0.0.1:1000/feed");
const NOTIFICATIONSERVEICE_API = ("TURBOPACK compile-time value", "http://127.0.0.1:1000/notifi");
const USERSERVICE_API = ("TURBOPACK compile-time value", "http://127.0.0.1:1000/user");
const BLOGSERVICE_API = ("TURBOPACK compile-time value", "http://127.0.0.1:1000/blog");
const CHATSERVICE_API = ("TURBOPACK compile-time value", "http://127.0.0.1:1000/chat");
const GATEWAY_API_URL = ("TURBOPACK compile-time value", "http://127.0.0.1:1000");
const COMMUNITYSERVICE_API = ("TURBOPACK compile-time value", "http://127.0.0.1:1000/community");
const FRIENDSSERVICE_API = ("TURBOPACK compile-time value", "http://127.0.0.1:1000/friends");
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
}),
"[project]/src/api/blogService/blog.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteFeed",
    ()=>deleteFeed,
    "getPostTags",
    ()=>getPostTags,
    "getRecentPosts",
    ()=>getRecentPosts,
    "getTrendingPosts",
    ()=>getTrendingPosts,
    "incrementViewCount",
    ()=>incrementViewCount,
    "readPost",
    ()=>readPost,
    "toggleLike",
    ()=>toggleLike,
    "updatePost",
    ()=>updatePost,
    "uploadImage",
    ()=>uploadImage,
    "writeFeed",
    ()=>writeFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [ssr] (ecmascript)");
;
async function getPostTags(postId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/tags?postId=${postId}`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text().catch(()=>" ");
        const errorMessage = errorText || `태그 조회 실패: HTTP ${response.status} 응답`;
        throw new Error(errorMessage);
    }
}
async function uploadImage(file) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/upload`;
    const formData = new FormData();
    formData.append("file", file); // 백엔드 @RequestParam("file")과 이름 일치
    const response = await fetch(url, {
        method: "POST",
        body: formData
    });
    if (response.ok) {
        // 백엔드에서 { "url": "..." } 형태의 JSON을 반환
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `이미지 업로드 실패: HTTP ${response.status}`);
    }
}
async function toggleLike(postId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/likes/${postId}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "userSignId": userSignId
            }
        });
        if (response.ok) {
            return await response.json(); // { isLiked: true, likeCount: 10 } 반환
        } else {
            const errorText = await response.text();
            throw new Error(errorText || `좋아요 처리 실패: HTTP ${response.status}`);
        }
    } catch (error) {
        console.error("좋아요 API 오류:", error);
        throw error;
    }
}
async function writeFeed(postData, userSignId) {
    console.log("글쓰기 메서드 실행 (JSON DTO 방식)");
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/write`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "userSignId": userSignId
        },
        body: JSON.stringify(postData)
    });
    if (response.ok) {
        return await response.json(); // PostEntity 반환
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `게시글 등록 실패: HTTP ${response.status}`);
    }
}
async function readPost(postId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/${postId}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `게시글 조회 실패: HTTP ${response.status}`);
    }
}
async function updatePost(postId, postData, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/write/${postId}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "userSignId": userSignId
        },
        body: JSON.stringify(postData)
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `게시글 수정 실패: HTTP ${response.status}`);
    }
}
async function deleteFeed(postId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/${postId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "userSignId": userSignId
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `게시글 삭제 실패: HTTP ${response.status}`);
    }
}
async function incrementViewCount(postId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/view?postId=${postId}`;
    const response = await fetch(url, {
        method: "POST"
    });
    if (response.ok) {
        return await response.text(); // "조회수가 증가되었습니다."
    } else {
        const errorText = await response.text(); // 오류 메시지 반환
        throw new Error(errorText || `조회수 증가 실패: HTTP ${response.status}`);
    }
}
async function getTrendingPosts(page = 0, size = 10) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/trending?page=${page}&size=${size}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        // 백엔드에서 Page<PostEntity> 형태로 반환된 JSON을 파싱
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `게시물 조회 실패: HTTP ${response.status}`);
    }
}
async function getRecentPosts(page = 0, size = 10) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/recent?page=${page}&size=${size}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `게시물 조회 실패: HTTP ${response.status}`);
    }
}
}),
"[project]/src/component/blogService/LikeShareSidebar.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/component/blogService/LikeShareSidebar.tsx
__turbopack_context__.s([
    "default",
    ()=>LikeShareSidebar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/blogService/postDetail.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/blogService/blog.ts [ssr] (ecmascript)"); // API 함수 import
'use client';
;
;
;
;
function LikeShareSidebar({ postId, initialLikeCount = 0, initialIsLiked = false }) {
    const [likeCount, setLikeCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(initialLikeCount);
    const [isLiked, setIsLiked] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(initialIsLiked);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // (선택 사항) props로 초기값이 나중에 들어올 경우를 대비해 상태 동기화
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setLikeCount(initialLikeCount);
        setIsLiked(initialIsLiked);
    }, [
        initialLikeCount,
        initialIsLiked
    ]);
    const handleLike = async ()=>{
        // 1. 로그인 확인
        const userSignId = localStorage.getItem('userSignId');
        if (!userSignId) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }
        if (isLoading) return; // 중복 클릭 방지
        setIsLoading(true);
        try {
            // 2. API 호출
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["toggleLike"])(postId, userSignId);
            // 3. 상태 업데이트 (서버 응답값으로 갱신)
            setIsLiked(result.isLiked);
            setLikeCount(result.likeCount);
        } catch (error) {
            console.error("좋아요 실패:", error);
            alert("좋아요 처리에 실패했습니다.");
        } finally{
            setIsLoading(false);
        }
    };
    const handleShare = ()=>{
        const shareUrl = `${window.location.origin}/post/${postId}`;
        navigator.clipboard.writeText(shareUrl).then(()=>alert('게시물 링크가 클립보드에 복사되었습니다.')).catch((err)=>console.error('클립보드 복사 실패:', err));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].reactionContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: handleLike,
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].likeButton} ${isLiked ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].activeLike : ''}`,
                title: isLiked ? "좋아요 취소" : "좋아요",
                disabled: isLoading,
                children: [
                    isLiked ? '❤️' : '🤍',
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        children: likeCount
                    }, void 0, false, {
                        fileName: "[project]/src/component/blogService/LikeShareSidebar.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/blogService/LikeShareSidebar.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: handleShare,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].shareButton,
                title: "공유 링크 복사",
                children: "🔗"
            }, void 0, false, {
                fileName: "[project]/src/component/blogService/LikeShareSidebar.tsx",
                lineNumber: 77,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/blogService/LikeShareSidebar.tsx",
        lineNumber: 65,
        columnNumber: 7
    }, this);
}
}),
"[project]/src/component/blogService/ProgressBar.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProgressBar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)"); // 💡 useRef 임포트
'use client';
;
;
function ProgressBar() {
    // 🟢 1. useRef를 사용하여 DOM 요소를 참조할 레퍼런스를 생성
    const progressBarRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const updateProgress = ()=>{
            const scrolled = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = height > 0 ? scrolled / height * 100 : 0;
            if (progressBarRef.current) {
                // document.getElementById() 대신 ref.current 사용
                progressBarRef.current.style.width = `${progress}%`;
            }
        };
        updateProgress();
        window.addEventListener('scroll', updateProgress);
        return ()=>window.removeEventListener('scroll', updateProgress);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 pointer-events-none",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            ref: progressBarRef,
            id: "progress-bar",
            className: "h-full bg-green-500 transition-all duration-150",
            style: {
                width: '0%'
            }
        }, void 0, false, {
            fileName: "[project]/src/component/blogService/ProgressBar.tsx",
            lineNumber: 29,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/component/blogService/ProgressBar.tsx",
        lineNumber: 28,
        columnNumber: 7
    }, this);
}
}),
"[project]/src/component/blogService/TableOfContents.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/component/blogService/TableOfContents.tsx (새 파일)
__turbopack_context__.s([
    "default",
    ()=>TableOfContents
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/blogService/postDetail.module.css [ssr] (css module)");
'use client';
;
;
;
function TableOfContents({ content }) {
    const [tocItems, setTocItems] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    // 💡 [수정] PostContent가 렌더링한 실제 DOM에서 제목 태그를 스캔하여 목차를 만듭니다.
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const scanHeadings = ()=>{
            const scannedItems = [];
            // article.mainContent 내부의 H1, H2, H3 태그 중 ID가 있는 것을 찾습니다.
            document.querySelectorAll('article h1[id], article h2[id], article h3[id]').forEach((heading)=>{
                const id = heading.getAttribute('id');
                const text = heading.textContent;
                const level = parseInt(heading.tagName[1], 10);
                if (id && text && text.trim().length > 0) {
                    scannedItems.push({
                        id,
                        text: text.trim(),
                        level
                    });
                }
            });
            setTocItems(scannedItems);
        };
        // DOM이 완전히 업데이트된 후 스캔하도록 보장 (PostContent의 innerHTML 적용 후)
        const timeoutId = setTimeout(scanHeadings, 100);
        return ()=>clearTimeout(timeoutId);
    }, [
        content
    ]);
    // 🖱️ 스크롤 이동 로직: 클릭 시 부드럽게 이동
    const handleScrollTo = (e, id)=>{
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    // 목차가 없으면 null 반환 (PostDetail.tsx에서 이미 조건부 렌더링 했지만 안전 장치)
    if (tocItems.length === 0) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tocNav,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tocTitle,
                children: "목차"
            }, void 0, false, {
                fileName: "[project]/src/component/blogService/TableOfContents.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tocList,
                children: tocItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                        // CSS 모듈에 정의된 레벨별 들여쓰기 클래스 사용 (예: tocLevel2, tocLevel3)
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"][`tocLevel${item.level}`],
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                            href: `#${item.id}`,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tocLink,
                            onClick: (e)=>handleScrollTo(e, item.id),
                            children: item.text
                        }, void 0, false, {
                            fileName: "[project]/src/component/blogService/TableOfContents.tsx",
                            lineNumber: 70,
                            columnNumber: 17
                        }, this)
                    }, index, false, {
                        fileName: "[project]/src/component/blogService/TableOfContents.tsx",
                        lineNumber: 65,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/component/blogService/TableOfContents.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/blogService/TableOfContents.tsx",
        lineNumber: 60,
        columnNumber: 7
    }, this);
}
}),
"[externals]/highlight.js [external] (highlight.js, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("highlight.js");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/component/blogService/PostContent.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// src/component/blogService/PostContent.tsx
__turbopack_context__.s([
    "default",
    ()=>PostContent
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$highlight$2e$js__$5b$external$5d$__$28$highlight$2e$js$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/highlight.js [external] (highlight.js, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$highlight$2e$js__$5b$external$5d$__$28$highlight$2e$js$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$highlight$2e$js__$5b$external$5d$__$28$highlight$2e$js$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
'use client';
;
;
;
;
// 제목 태그에 ID를 자동으로 부여하는 함수
function assignIdsToHeadings(contentHtml) {
    let sectionIndex = 1;
    return contentHtml.replace(/<h([1-3])(.*?)>(.*?)<\/h\1>/gi, (match, level, attrs, text)=>{
        const slug = text.trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        const id = `section-${sectionIndex++}-${slug}`;
        return `<h${level} id="${id}"${attrs}>${text}</h${level}>`;
    });
}
function PostContent({ content }) {
    const contentRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (contentRef.current) {
            const contentWithIds = assignIdsToHeadings(content);
            contentRef.current.innerHTML = contentWithIds;
            // 코드 하이라이팅 적용
            contentRef.current.querySelectorAll('pre code').forEach((block)=>{
                __TURBOPACK__imported__module__$5b$externals$5d2f$highlight$2e$js__$5b$external$5d$__$28$highlight$2e$js$2c$__esm_import$29$__["default"].highlightElement(block);
            });
        }
    }, [
        content
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        ref: contentRef,
        style: {
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.5' // ✅ 줄 높이 명시
        },
        className: "prose prose-lg max-w-none leading-relaxed prose-pre:bg-gray-900 prose-pre:p-4 prose-pre:rounded-lg prose-code:text-sm prose-code:font-mono prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:whitespace-pre-wrap prose-p:min-h-[1.5em] prose-p:leading-[1.5]"
    }, void 0, false, {
        fileName: "[project]/src/component/blogService/PostContent.tsx",
        lineNumber: 39,
        columnNumber: 7
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/styles/blogService/commentSection.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "commentActions": "commentSection-module__9ZiFnW__commentActions",
  "commentAuthor": "commentSection-module__9ZiFnW__commentAuthor",
  "commentAvatar": "commentSection-module__9ZiFnW__commentAvatar",
  "commentContent": "commentSection-module__9ZiFnW__commentContent",
  "commentDate": "commentSection-module__9ZiFnW__commentDate",
  "commentForm": "commentSection-module__9ZiFnW__commentForm",
  "commentHeader": "commentSection-module__9ZiFnW__commentHeader",
  "commentItem": "commentSection-module__9ZiFnW__commentItem",
  "commentList": "commentSection-module__9ZiFnW__commentList",
  "commentSection": "commentSection-module__9ZiFnW__commentSection",
  "commentTextarea": "commentSection-module__9ZiFnW__commentTextarea",
  "commentTitle": "commentSection-module__9ZiFnW__commentTitle",
  "deleteButton": "commentSection-module__9ZiFnW__deleteButton",
  "editButton": "commentSection-module__9ZiFnW__editButton",
  "replyButton": "commentSection-module__9ZiFnW__replyButton",
  "replyForm": "commentSection-module__9ZiFnW__replyForm",
  "replyToggle": "commentSection-module__9ZiFnW__replyToggle",
  "submitButton": "commentSection-module__9ZiFnW__submitButton",
});
}),
"[project]/src/api/blogService/comment.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// @/api/blogService/comment.ts
__turbopack_context__.s([
    "createComment",
    ()=>createComment,
    "deleteComment",
    ()=>deleteComment,
    "getCommentCount",
    ()=>getCommentCount,
    "getCommentsByPostId",
    ()=>getCommentsByPostId,
    "updateComment",
    ()=>updateComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [ssr] (ecmascript)");
;
async function createComment(userSignId, dto) {
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/comments`, {
        method: "POST",
        headers: {
            "userSignId": userSignId,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            postId: dto.postId,
            content: dto.content,
            parentId: dto.parentCommentId
        })
    });
    if (!res.ok) throw new Error("댓글 작성 실패");
    return mapToReplies(await res.json());
}
async function updateComment(commentId, userSignId, dto) {
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "userSignId": userSignId,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dto)
    });
    if (!res.ok) throw new Error("수정 실패");
    return mapToReplies(await res.json());
}
async function deleteComment(commentId, userSignId) {
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "userSignId": userSignId
        }
    });
    if (res.status === 403) return "권한이 없습니다.";
    if (!res.ok) throw new Error("삭제 실패");
    return await res.text();
}
async function getCommentCount(postId) {
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/comments/count?postId=${postId}`);
    if (!res.ok) return 0;
    return parseInt(await res.text(), 10);
}
function mapToReplies(comment) {
    return {
        commentId: comment.commentId,
        postId: comment.postId,
        userId: comment.userId,
        parentId: comment.parentId ?? null,
        content: comment.isDeleted ? "(삭제된 댓글)" : comment.content,
        isDeleted: comment.isDeleted ?? false,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        childCount: comment.childCount ?? 0,
        replies: comment.childComments && comment.childComments.length > 0 ? comment.childComments.map(mapToReplies) : []
    };
}
async function getCommentsByPostId(postId) {
    const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/comments?postId=${postId}`);
    if (!res.ok) return [];
    const raw = await res.json();
    return raw.map(mapToReplies);
}
}),
"[project]/src/component/blogService/CommentSection.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommentSection
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/blogService/commentSection.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/blogService/comment.ts [ssr] (ecmascript)");
'use client';
;
;
;
;
// 날짜 포맷팅 유틸리티
const formatDate = (dateString)=>{
    return new Date(dateString).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};
// 🟢 [수정 완료된] 들여쓰기, 대댓글 접기/펼치기 기능을 추가한 CommentItem 컴포넌트
const CommentItem = ({ comment, currentUserSignId, replyingTo, setReplyingTo, editingCommentId, setEditingCommentId, onReply, onEdit, onDelete, isLoading, depth = 0 // 💡 depth prop 추가 (기본값 0)
 })=>{
    // 입력 상태 관리
    const [localReplyContent, setLocalReplyContent] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [localEditContent, setLocalEditContent] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    // const [isRepliesVisible, setIsRepliesVisible] = useState(depth === 0);
    const [isRepliesVisible, setIsRepliesVisible] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // 수정 폼이 열릴 때만 현재 댓글 내용을 localEditContent에 설정
        if (editingCommentId === comment.commentId) {
            setLocalEditContent(comment.content);
        }
    }, [
        editingCommentId,
        comment.commentId,
        comment.content
    ]);
    // 삭제 핸들러 (API 호출 및 상태 업데이트)
    const handleDeleteComment = async (id)=>{
        if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) return;
        // setIsLoading은 CommentSection에서 관리하고 있으므로 여기서는 사용하지 않습니다.
        // CommentSection의 handleDelete에서 setIsLoading을 처리하도록 로직 변경
        try {
            // API 호출 (성공/실패만 판단)
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["deleteComment"])(id, currentUserSignId);
            if (res.includes('권한')) return alert(res);
            // 상위 컴포넌트의 트리 삭제 로직 호출
            onDelete(id);
        } catch  {
            alert('삭제 실패');
        }
    };
    // 답글 작성 핸들러
    const handleReplySubmit = ()=>{
        if (localReplyContent.trim() === '') {
            alert('답글 내용을 입력해주세요.');
            return;
        }
        // 답글 작성 후, 방금 작성한 답글을 보기 위해 isRepliesVisible을 true로 설정
        onReply(comment.commentId, localReplyContent);
        setReplyingTo(null);
        setLocalReplyContent('');
        setIsRepliesVisible(true); // 답글 작성 후 펼치기
    };
    // 수정 제출 핸들러
    const handleEditSubmit = ()=>{
        if (localEditContent.trim() === '') {
            alert('수정 내용을 입력해주세요.');
            return;
        }
        // 💡 onEdit 호출: TS2304 오류 해결의 핵심
        onEdit(comment.commentId, localEditContent);
    // 수정 완료는 상위 컴포넌트에서 로딩 완료 후 처리하는 것이 더 좋으나,
    // 여기서는 로딩 시작 즉시 폼을 닫습니다. (CommentSection에서 처리)
    // setEditingCommentId(null);
    };
    const handleCancelEdit = ()=>{
        setEditingCommentId(null);
        setLocalEditContent('');
    };
    // 💡 [수정] 댓글 컨테이너에 CSS 변수(--depth)를 사용하여 들여쓰기를 적용합니다.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentItem} ${depth > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].replyItem : ''}`,
        style: {
            '--depth': depth
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentHeader,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentAvatar,
                        children: comment.userId[0].toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].info,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentAuthor,
                                children: comment.userId
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentDate,
                                children: formatDate(comment.createdAt)
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                lineNumber: 123,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            editingCommentId === comment.commentId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editForm,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                        value: localEditContent,
                        onChange: (e)=>setLocalEditContent(e.target.value),
                        rows: 3,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentTextarea,
                        disabled: isLoading
                    }, void 0, false, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].actionButtons,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleEditSubmit,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].submitButton,
                                disabled: isLoading || localEditContent.trim() === '',
                                children: isLoading ? '수정 중...' : '수정 완료'
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                                lineNumber: 141,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleCancelEdit,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cancelButton,
                                disabled: isLoading,
                                children: "취소"
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                                lineNumber: 148,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 140,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                lineNumber: 132,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentContent,
                children: comment.isDeleted ? '(삭제된 댓글입니다)' : comment.content
            }, void 0, false, {
                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                lineNumber: 158,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            !comment.isDeleted && editingCommentId !== comment.commentId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentActions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>setReplyingTo(comment.commentId),
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].replyButton,
                        disabled: isLoading,
                        children: "답글"
                    }, void 0, false, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 164,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentUserSignId === comment.userId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setEditingCommentId(comment.commentId),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editButton,
                                disabled: isLoading,
                                children: "수정"
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                                lineNumber: 173,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>onDelete(comment.commentId),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].deleteButton,
                                disabled: isLoading,
                                children: "삭제"
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                                lineNumber: 180,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                lineNumber: 163,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            comment.replies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].replyToggle,
                onClick: ()=>setIsRepliesVisible((prev)=>!prev),
                children: isRepliesVisible ? '답글 접기 ▲' : `답글 ${comment.replies.length}개 펼치기 ▼`
            }, void 0, false, {
                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                lineNumber: 194,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            replyingTo === comment.commentId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].replyForm,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                        value: localReplyContent,
                        onChange: (e)=>setLocalReplyContent(e.target.value),
                        placeholder: `${comment.userId}님께 답글 작성`,
                        rows: 2,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentTextarea,
                        disabled: isLoading
                    }, void 0, false, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 202,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].actionButtons,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleReplySubmit,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].submitButton,
                                disabled: isLoading || localReplyContent.trim() === '',
                                children: isLoading ? '작성 중...' : '답글 작성'
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                                lineNumber: 211,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setReplyingTo(null),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cancelButton,
                                disabled: isLoading,
                                children: "취소"
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                                lineNumber: 218,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 210,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                lineNumber: 201,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            comment.replies.length > 0 && isRepliesVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].repliesList,
                children: comment.replies.map((r)=>// 💡 [핵심] 재귀 호출 시 depth를 1 증가시켜 전달
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CommentItem, {
                        comment: r,
                        currentUserSignId: currentUserSignId,
                        replyingTo: replyingTo,
                        setReplyingTo: setReplyingTo,
                        editingCommentId: editingCommentId,
                        setEditingCommentId: setEditingCommentId,
                        onReply: onReply,
                        onEdit: onEdit,
                        onDelete: onDelete,
                        isLoading: isLoading,
                        depth: depth + 1
                    }, r.commentId, false, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 234,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                lineNumber: 231,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/blogService/CommentSection.tsx",
        lineNumber: 119,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
const updateTree = (list, id, fn)=>list.map((c)=>c.commentId === id ? fn(c) : c.replies && c.replies.length > 0 ? {
            ...c,
            replies: updateTree(c.replies, id, fn)
        } : c);
// 트리에서 댓글을 제거하는 유틸 (대댓글까지 제거될 경우 부모의 childCount도 업데이트)
const removeFromTree = (list, id)=>list.reduce((acc, c)=>{
        if (c.commentId === id) {
            return acc;
        }
        let newReplies = c.replies;
        if (c.replies && c.replies.length > 0) {
            newReplies = removeFromTree(c.replies, id);
        }
        acc.push({
            ...c,
            replies: newReplies
        });
        return acc;
    }, []);
function CommentSection({ postId, comments: ssrComments = [] }) {
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [commentCount, setCommentCount] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [currentUserSignId, setCurrentUserSignId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [newComment, setNewComment] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [replyingTo, setReplyingTo] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [editingCommentId, setEditingCommentId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // 🟢 isLoading 상태: TS2552 오류 해결을 위해 정의
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // 클라이언트에서만 실행 → 무조건 최신 데이터 + replies 매핑 보장
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const userId = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : '';
        setCurrentUserSignId(userId);
        const fetchData = async ()=>{
            setIsLoading(true); // 🟢 로딩 시작
            try {
                const fetchedComments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getCommentsByPostId"])(postId);
                const fetchedCount = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getCommentCount"])(postId);
                // console.log("🔥 서버에서 받은 댓글 데이터 (배열):", fetchedComments);
                // console.log("🔥 최상위 댓글 개수:", fetchedComments.length);
                setComments(fetchedComments);
                setCommentCount(fetchedCount);
            } catch (e) {
                console.error("댓글 데이터 로드 실패", e);
            } finally{
                setIsLoading(false); // 🟢 로딩 종료
            }
        };
        fetchData();
    }, [
        postId
    ]);
    // 최상위 댓글 작성
    const handleSubmitComment = async ()=>{
        if (newComment.trim() === '') {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        setIsLoading(true); // 🟢 로딩 시작
        try {
            const dto = {
                postId,
                parentCommentId: null,
                content: newComment
            };
            const newCmt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createComment"])(currentUserSignId, dto);
            setComments((prev)=>[
                    newCmt,
                    ...prev
                ]); // 최신 댓글을 맨 위에 추가
            setCommentCount((c)=>c + 1);
            setNewComment('');
        } catch  {
            alert('댓글 작성 실패');
        } finally{
            setIsLoading(false); // 🟢 로딩 종료
        }
    };
    // 답글 작성 (CommentItem 내부에서 호출)
    const handleReply = async (parentId, content)=>{
        setIsLoading(true); // 🟢 로딩 시작
        try {
            const dto = {
                postId,
                parentCommentId: parentId,
                content
            };
            const newCmt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createComment"])(currentUserSignId, dto);
            // 답글이 달린 부모 댓글을 찾아 replies에 추가
            setComments((prev)=>updateTree(prev, parentId, (c)=>({
                        ...c,
                        replies: [
                            ...c.replies,
                            newCmt
                        ],
                        childCount: c.childCount + 1
                    })));
            setCommentCount((c)=>c + 1);
        } catch  {
            alert('답글 작성 실패');
        } finally{
            setIsLoading(false);
        }
    };
    const handleEdit = async (id, content)=>{
        setIsLoading(true);
        try {
            const dto = {
                content
            };
            // API 호출
            const updatedCmt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["updateComment"])(id, currentUserSignId, dto);
            // 댓글 목록 업데이트
            setComments((prev)=>updateTree(prev, id, (c)=>({
                        ...c,
                        content: updatedCmt.content,
                        updatedAt: updatedCmt.updatedAt
                    })));
            // 수정 폼 닫기
            setEditingCommentId(null);
        } catch (e) {
            alert(e.message || '댓글 수정 실패');
            console.error(e);
        } finally{
            setIsLoading(false); // 🟢 로딩 종료
        }
    };
    // 댓글 삭제 (CommentItem에서 호출)
    const handleDelete = async (id)=>{
        setIsLoading(true);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["deleteComment"])(id, currentUserSignId);
            if (res.includes('권한')) {
                alert(res);
                return;
            }
            const fetchedComments = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getCommentsByPostId"])(postId);
            const fetchedCount = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getCommentCount"])(postId);
            setComments(fetchedComments);
            setCommentCount(fetchedCount);
        } catch (e) {
            alert('댓글 삭제 실패');
            console.error(e);
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentSection,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentTitle,
                children: [
                    commentCount,
                    "개의 댓글"
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                lineNumber: 408,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentForm,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                        value: newComment,
                        onChange: (e)=>setNewComment(e.target.value),
                        placeholder: "댓글을 작성하세요",
                        rows: 4,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentTextarea,
                        disabled: isLoading
                    }, void 0, false, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 411,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: handleSubmitComment,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].submitButton,
                        disabled: isLoading || newComment.trim() === '',
                        children: isLoading ? '작성 중...' : '댓글 작성'
                    }, void 0, false, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 419,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                lineNumber: 410,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$commentSection$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].commentList,
                children: comments.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CommentItem, {
                        comment: c,
                        currentUserSignId: currentUserSignId,
                        replyingTo: replyingTo,
                        setReplyingTo: setReplyingTo,
                        editingCommentId: editingCommentId,
                        setEditingCommentId: setEditingCommentId,
                        onReply: handleReply,
                        onEdit: handleEdit,
                        onDelete: handleDelete,
                        isLoading: isLoading,
                        depth: 0
                    }, c.commentId, false, {
                        fileName: "[project]/src/component/blogService/CommentSection.tsx",
                        lineNumber: 430,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/component/blogService/CommentSection.tsx",
                lineNumber: 428,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/blogService/CommentSection.tsx",
        lineNumber: 407,
        columnNumber: 7
    }, this);
}
}),
"[project]/src/component/blogService/PostDetail.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// src/component/blogService/PostDetail.tsx
__turbopack_context__.s([
    "default",
    ()=>PostDetail
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$LikeShareSidebar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/blogService/LikeShareSidebar.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$ProgressBar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/blogService/ProgressBar.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$TableOfContents$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/blogService/TableOfContents.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$PostContent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/blogService/PostContent.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$CommentSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/blogService/CommentSection.tsx [ssr] (ecmascript)"); // 기존 import 유지
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/blogService/blog.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/blogService/postDetail.module.css [ssr] (css module)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$PostContent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$PostContent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
'use client';
;
;
;
;
;
;
;
;
;
;
// HTML 내용에 제목 태그(H1, H2, H3 등)가 포함되어 있는지 확인하는 함수
const hasHeadings = (htmlContent)=>{
    if (!htmlContent) return false;
    return /<h[1-3]/i.test(htmlContent);
};
function PostDetail({ post }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [currentUserSignId, setCurrentUserSignId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [isDeleting, setIsDeleting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const isAuthor = currentUserSignId === post.authorId;
    const shouldShowToc = hasHeadings(post.content);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const userId = localStorage.getItem('userSignId') || '';
        setCurrentUserSignId(userId);
        const updateViewCount = async ()=>{
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["incrementViewCount"])(post.postId);
                console.log(`게시물 ID ${post.postId} 조회수 증가 성공`);
            } catch (error) {
                console.error('조회수 증가 실패:', error);
            }
        };
        updateViewCount();
        if (post.tags && Array.isArray(post.tags) && post.tags.length > 0) {
            setTags(post.tags);
        } else {
            const fetchTags = async ()=>{
                try {
                    const fetchedTags = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getPostTags"])(post.postId);
                    setTags(fetchedTags);
                } catch (error) {
                    console.error('태그 가져오기 실패:', error);
                    setTags([]);
                }
            };
            fetchTags();
        }
    }, [
        post
    ]);
    const handleEdit = ()=>{
        router.push(`/post/edit/${post.postId}`);
    };
    const handleDelete = async ()=>{
        if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            setIsDeleting(true);
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["deleteFeed"])(post.postId, currentUserSignId);
                alert('게시물이 삭제되었습니다.');
                router.push('/');
            } catch (error) {
                console.error('삭제 실패:', error);
                alert('게시물 삭제에 실패했습니다.');
            } finally{
                setIsDeleting(false);
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$ProgressBar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].detailContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].postHeader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                                children: post.title
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].metaRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].metaInfo,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].author,
                                                children: [
                                                    "작성자: ",
                                                    post.authorId
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].date,
                                                children: [
                                                    " 등록일:",
                                                    new Date(post.createdAt).toLocaleDateString('ko-KR')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].views,
                                                children: [
                                                    " 조회수: ",
                                                    post.viewCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                                lineNumber: 95,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                        lineNumber: 90,
                                        columnNumber: 15
                                    }, this),
                                    isAuthor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authorActions,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: handleEdit,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editButton,
                                                children: "수정"
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                                lineNumber: 100,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: handleDelete,
                                                disabled: isDeleting,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].deleteButton,
                                                children: isDeleting ? '삭제 중...' : '삭제'
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                                lineNumber: 103,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                        lineNumber: 99,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this),
                            (tags ?? []).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tagsContainer,
                                children: tags.map((tag, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tag,
                                        onClick: ()=>router.push(`/tag/${encodeURIComponent(tag)}`),
                                        style: {
                                            cursor: 'pointer'
                                        },
                                        "data-color": index % 5,
                                        children: [
                                            "#",
                                            tag
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                        lineNumber: 117,
                                        columnNumber: 23
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                lineNumber: 115,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/blogService/PostDetail.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this),
                    post.thumbnail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                        src: post.thumbnail,
                        alt: post.title,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].postThumbnail,
                        onError: (e)=>e.currentTarget.style.display = 'none'
                    }, void 0, false, {
                        fileName: "[project]/src/component/blogService/PostDetail.tsx",
                        lineNumber: 132,
                        columnNumber: 15
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].gridWrapper,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].leftSidebar,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].stickyBox,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$LikeShareSidebar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        postId: post.postId
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                        lineNumber: 147,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].centralContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mainContent,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$PostContent$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            content: post.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                            lineNumber: 156,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$CommentSection$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        postId: post.postId,
                                        comments: post.comments || []
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                        lineNumber: 160,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            shouldShowToc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sidebar,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$postDetail$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].stickyBox,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$TableOfContents$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        content: post.content
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                        lineNumber: 167,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                    lineNumber: 166,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                                lineNumber: 165,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/blogService/PostDetail.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/blogService/PostDetail.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/styles/layout/layout.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "Link": "layout-module__oXCPXq__Link",
  "leftSection": "layout-module__oXCPXq__leftSection",
  "navLink": "layout-module__oXCPXq__navLink",
  "rightItem": "layout-module__oXCPXq__rightItem",
  "rightSection": "layout-module__oXCPXq__rightSection",
  "topbar": "layout-module__oXCPXq__topbar",
});
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/src/styles/userService/LoginModal.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "closeButton": "LoginModal-module__9G312W__closeButton",
  "footer": "LoginModal-module__9G312W__footer",
  "form": "LoginModal-module__9G312W__form",
  "iconButton": "LoginModal-module__9G312W__iconButton",
  "input": "LoginModal-module__9G312W__input",
  "leftSection": "LoginModal-module__9G312W__leftSection",
  "loginButton": "LoginModal-module__9G312W__loginButton",
  "modalBox": "LoginModal-module__9G312W__modalBox",
  "overlay": "LoginModal-module__9G312W__overlay",
  "rightSection": "LoginModal-module__9G312W__rightSection",
  "signupLink": "LoginModal-module__9G312W__signupLink",
  "socialIcons": "LoginModal-module__9G312W__socialIcons",
  "socialLabel": "LoginModal-module__9G312W__socialLabel",
  "socialSection": "LoginModal-module__9G312W__socialSection",
  "subTitle": "LoginModal-module__9G312W__subTitle",
  "title": "LoginModal-module__9G312W__title",
  "welcomeText": "LoginModal-module__9G312W__welcomeText",
});
}),
"[project]/src/api/userService/user.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/api/userService/user.ts (최종 완성본)
__turbopack_context__.s([
    "acceptFriend",
    ()=>acceptFriend,
    "checkEmail",
    ()=>checkEmail,
    "checkNickName",
    ()=>checkNickName,
    "checkUserSignId",
    ()=>checkUserSignId,
    "login",
    ()=>login,
    "requestFriend",
    ()=>requestFriend,
    "signup",
    ()=>signup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [ssr] (ecmascript)");
;
async function signup(userDto) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDto)
    });
    const text = await response.text();
    if (response.status === 201) {
        return {
            success: true,
            message: text || "회원가입 성공"
        };
    }
    return {
        success: false,
        message: text || "회원가입 실패"
    };
}
async function login(loginDto) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginDto)
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
        accessToken
    };
}
async function checkUserSignId(userSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/existId?userId=${encodeURIComponent(userSignId)}`);
    const text = await response.text();
    const available = text.trim() === "not exists";
    return {
        available
    };
}
async function checkEmail(email) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/existEmail?email=${encodeURIComponent(email)}`);
    const text = await response.text();
    const available = text.trim() === "not exists";
    return {
        available
    };
}
async function checkNickName(nickname) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/existNickname?nickname=${encodeURIComponent(nickname)}`);
    const text = await response.text();
    const available = text.trim() === "not exists";
    return {
        available
    };
}
async function requestFriend(requesterSignId, reqDto) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/friends`, {
        method: "POST",
        headers: {
            userSignId: requesterSignId,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqDto)
    });
    if (response.status === 201) {
        return await response.json();
    }
    const msg = await response.text();
    throw new Error(msg || "친구 요청 실패");
}
async function acceptFriend(receiverSignId, requesterSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/friends/${requesterSignId}/accept`, {
        method: "PUT",
        headers: {
            userSignId: receiverSignId,
            "Content-Length": "0"
        }
    });
    if (response.ok) {
        return await response.json();
    }
    const msg = await response.text();
    throw new Error(msg || "친구 수락 실패");
}
}),
"[project]/src/component/userService/LoginModal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/userService/LoginModal.module.css [ssr] (css module)"); // 위에서 만든 CSS 경로에 맞게 수정하세요
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$user$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/userService/user.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
;
;
;
;
;
;
function LoginModal({ onClose, onLoginSuccess }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [userSignId, setUserSignId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // 로그인 핸들러
    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$user$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["login"])({
                userSignId,
                password
            });
            // 토큰 저장
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            localStorage.setItem("userSignId", response.userSignId);
            alert("환영합니다!");
            onLoginSuccess(); // Topbar의 상태를 로그인 됨으로 변경
            onClose(); // 모달 닫기
        } catch (err) {
            console.error(err);
            setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        }
    } // LoginModal.tsx (최고의 로그인 모달)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].overlay,
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modalBox,
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].leftSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].illustration,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                role: "img",
                                "aria-label": "sparkles",
                                style: {
                                    fontSize: "4rem"
                                },
                                children: "✨"
                            }, void 0, false, {
                                fileName: "[project]/src/component/userService/LoginModal.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].welcomeText,
                            children: " 다시 만나서 반가워요"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].welcomeSub,
                            children: "오늘도 소중한 순간을 기록해볼까요?"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].closeButton,
                            onClick: onClose,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].title,
                            children: "로그인"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].form,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
                                    placeholder: "아이디",
                                    value: userSignId,
                                    onChange: (e)=>setUserSignId(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].input,
                                    placeholder: "비밀번호",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].errorMessage,
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 62,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].loginButton,
                                    children: "로그인"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 58,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].footer,
                            children: [
                                "아직 계정이 없나요? ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/signup",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].signupLink,
                                    onClick: onClose,
                                    children: "회원가입"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 70,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                    lineNumber: 54,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/userService/LoginModal.tsx",
            lineNumber: 42,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/component/userService/LoginModal.tsx",
        lineNumber: 41,
        columnNumber: 7
    }, this);
// return (
//     <div className={styles.overlay} onClick={onClose}>
//       {/* 모달 내부 클릭 시 닫히지 않도록 stopPropagation */}
//       <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
//
//         {/* --- 왼쪽: 환영 이미지 섹션 --- */}
//         <div className={styles.leftSection}>
//           {/* 여기에 이미지를 넣으세요. 예: <img src="/welcome.png" width={150} /> */}
//           <div style={{ fontSize: "5rem" }}>👋</div> {/* 임시 이모지 */}
//           <div className={styles.welcomeText}>환영합니다!</div>
//         </div>
//
//         {/* --- 오른쪽: 로그인 폼 섹션 --- */}
//         <div className={styles.rightSection}>
//           <button className={styles.closeButton} onClick={onClose}>✕</button>
//
//           <h2 className={styles.title}>로그인</h2>
//           <p className={styles.subTitle}>아이디/비밀번호로 로그인</p>
//
//           <form onSubmit={handleSubmit} className={styles.form}>
//             <input
//                 type="text"
//                 className={styles.input}
//                 placeholder="아이디를 입력하세요."
//                 value={userSignId}
//                 onChange={(e) => setUserSignId(e.target.value)}
//             />
//             <input
//                 type="password"
//                 className={styles.input}
//                 placeholder="비밀번호를 입력하세요."
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//
//             {error && <div style={{color: 'red', fontSize: '0.8rem'}}>{error}</div>}
//
//             <button type="submit" className={styles.loginButton}>로그인</button>
//           </form>
//
//           {/* 소셜 로그인 (모양만 구현) */}
//           <div className={styles.socialSection}>
//             <span className={styles.socialLabel}>소셜 계정으로 로그인</span>
//             <div className={styles.socialIcons}>
//               <button className={styles.iconButton}>🐱</button> {/* GitHub */}
//               <button className={styles.iconButton}>G</button> {/* Google */}
//               <button className={styles.iconButton}>f</button> {/* Facebook */}
//             </div>
//           </div>
//
//           <div className={styles.footer}>
//             아직 회원이 아니신가요?{" "}
//             <Link href="/signup" className={styles.signupLink} onClick={onClose}>
//               회원가입
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
// );
}
}),
"[project]/src/styles/userService/ModalFriends.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "ModalFriends-module__4kHBrW__active",
  "closeButton": "ModalFriends-module__4kHBrW__closeButton",
  "deleteButton": "ModalFriends-module__4kHBrW__deleteButton",
  "fadeIn": "ModalFriends-module__4kHBrW__fadeIn",
  "modalBackdrop": "ModalFriends-module__4kHBrW__modalBackdrop",
  "modalContent": "ModalFriends-module__4kHBrW__modalContent",
  "modalContentArea": "ModalFriends-module__4kHBrW__modalContentArea",
  "modalEnter": "ModalFriends-module__4kHBrW__modalEnter",
  "modalTitle": "ModalFriends-module__4kHBrW__modalTitle",
  "tabBar": "ModalFriends-module__4kHBrW__tabBar",
  "tabButton": "ModalFriends-module__4kHBrW__tabButton",
});
}),
"[project]/src/component/userService/FriendActionModal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/component/userService/FriendManagerModal.tsx
__turbopack_context__.s([
    "default",
    ()=>FriendManagerModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/userService/ModalFriends.module.css [ssr] (css module)"); // CSS 모듈 불러오기
;
;
;
// 🌟 요청 목록 디자인 개선: 수락/거절 버튼 스타일 변경
const RequestItem = ({ userSignId, friendId, onAccept, onReject })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "font-medium text-gray-800",
                children: userSignId
            }, void 0, false, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onAccept(friendId),
                        className: "px-3 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 transition duration-150 ease-in-out",
                        children: "수락"
                    }, void 0, false, {
                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: ()=>onReject(friendId),
                        className: "px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition duration-150 ease-in-out",
                        children: "거절"
                    }, void 0, false, {
                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
// 🌟 친구 목록 디자인 개선: 삭제 버튼 스타일 변경 (CSS 모듈 사용)
const FriendListItem = ({ userSignId, friendId, onRemove })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                className: "font-medium text-gray-800",
                children: userSignId
            }, void 0, false, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: ()=>onRemove(friendId),
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].deleteButton,
                children: "삭제"
            }, void 0, false, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
function FriendManagerModal({ currentUserSignId, isOpen, onClose }) {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("add");
    const [inputId, setInputId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [friends, setFriends] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // API_BASE는 환경 변수에서 가져오는 것이므로 그대로 둠
    const API_BASE = ("TURBOPACK compile-time value", "http://127.0.0.1:1000/user");
    const loadData = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async ()=>{
        setLoading(true);
        try {
            // ⚠️ 주의: 이전 로그에서 API_BASE가 중복 경로를 포함하고 있을 가능성이 있었으므로,
            // 환경 변수 설정을 "http://localhost:1003" 와 같이 기본 URL로만 설정하는 것이 좋습니다.
            const [reqRes, friendRes] = await Promise.all([
                fetch(`${API_BASE}/friends/requests/received`, {
                    // ⚠️ 이전 단계의 오류 수정: 인증 헤더는 'Authorization'을 사용해야 합니다.
                    // 현재 모달은 이전 요청의 에러로 인해 임시로 'userSignId'를 사용하고 있으나,
                    // `friends.ts` 파일에서 'Authorization' 헤더를 사용하도록 수정했으므로,
                    // `friends.ts`의 함수를 호출하여 수정된 인증 로직을 따르는 것이 올바릅니다.
                    // **임시 수정: fetch 대신 friends.ts의 함수를 사용하여 인증 로직 통일**
                    // (다만 friends.ts에 목록 조회 함수가 없으므로 fetch를 사용하되, 헤더를 수정합니다)
                    headers: {
                    }
                }),
                fetch(`${API_BASE}/friends`, {
                    headers: {
                    }
                })
            ]);
            if (reqRes.ok) {
                const data = await reqRes.json();
                setRequests(data.map((d)=>({
                        friendId: d.friendId,
                        userSignId: d.requesterSignId
                    })));
            } else {
                console.error("Failed to load friend requests", await reqRes.text());
                setRequests([]);
            }
            if (friendRes.ok) {
                const data = await friendRes.json();
                // 🌟 수정: 친구 목록 데이터 매핑 로직 개선
                setFriends(data.map((d)=>({
                        friendId: d.friendId,
                        // 친구 목록에서 상대방 ID를 가져오도록 수정 (requester/receiver 중 내가 아닌 쪽)
                        userSignId: d.requesterSignId === currentUserSignId ? d.receiverSignId : d.requesterSignId
                    })));
            } else {
                console.error("Failed to load friends list", await friendRes.text());
                setFriends([]);
            }
        } catch (err) {
            console.error(err);
        } finally{
            setLoading(false);
        }
    }, [
        API_BASE,
        currentUserSignId
    ]); // useCallback 의존성 추가
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isOpen) loadData();
    }, [
        isOpen,
        loadData
    ]); // loadData 의존성 추가
    // ... (sendRequest, accept, reject, remove 함수는 변경 없음)
    const sendRequest = async ()=>{};
    const accept = async (friendId)=>{
        loadData();
    };
    const reject = async (friendId)=>{
        loadData();
    };
    const remove = async (friendId)=>{
        loadData();
    };
    if (!isOpen) return null;
    // 🌟 탭 버튼 컴포넌트 개선: CSS 모듈 사용
    const TabButton = ({ label, type, count })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
            onClick: ()=>setTab(type),
            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tabButton} ${tab === type ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].active : ''}`,
            children: [
                label,
                count !== undefined && count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: "ml-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full",
                    children: count
                }, void 0, false, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 169,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
            lineNumber: 163,
            columnNumber: 7
        }, this);
    const renderContent = ()=>{
        if (loading) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "p-8 text-center text-gray-500",
                children: "로딩 중..."
            }, void 0, false, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 178,
                columnNumber: 14
            }, this);
        }
        switch(tab){
            case "add":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "p-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4 text-gray-800",
                            children: "친구 ID로 추가"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 185,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: inputId,
                                    onChange: (e)=>setInputId(e.target.value),
                                    placeholder: "친구의 ID를 입력하세요",
                                    className: "flex-grow p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 187,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: sendRequest,
                                    className: "px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-150",
                                    children: "요청"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 194,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 186,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 184,
                    columnNumber: 13
                }, this);
            case "requests":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "p-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4 text-gray-800",
                            children: [
                                "받은 친구 요청 (",
                                requests.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 206,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "border border-gray-200 rounded-lg divide-y divide-gray-100",
                            children: requests.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "p-4 text-center text-gray-500",
                                children: "받은 친구 요청이 없습니다."
                            }, void 0, false, {
                                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                lineNumber: 209,
                                columnNumber: 21
                            }, this) : requests.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(RequestItem, {
                                    ...item,
                                    onAccept: accept,
                                    onReject: reject
                                }, item.friendId, false, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 212,
                                    columnNumber: 25
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 207,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 205,
                    columnNumber: 13
                }, this);
            case "friends":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "p-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-4 text-gray-800",
                            children: [
                                "내 친구 목록 (",
                                friends.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 226,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "border border-gray-200 rounded-lg divide-y divide-gray-100",
                            children: friends.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "p-4 text-center text-gray-500",
                                children: "등록된 친구가 없습니다."
                            }, void 0, false, {
                                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                lineNumber: 229,
                                columnNumber: 21
                            }, this) : friends.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(FriendListItem, {
                                    ...item,
                                    onRemove: remove
                                }, item.friendId, false, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 232,
                                    columnNumber: 25
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 227,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 225,
                    columnNumber: 13
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modalBackdrop,
                onMouseDown: onClose
            }, void 0, false, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 250,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modalContent,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "p-8 pb-4 border-b",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modalTitle,
                                        children: "친구 관리"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].closeButton,
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                        lineNumber: 259,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                lineNumber: 257,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tabBar,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TabButton, {
                                        label: "친구 추가",
                                        type: "add"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                        lineNumber: 267,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TabButton, {
                                        label: "친구 요청",
                                        type: "requests",
                                        count: requests.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                        lineNumber: 268,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(TabButton, {
                                        label: "친구 목록",
                                        type: "friends",
                                        count: friends.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                        lineNumber: 269,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                lineNumber: 266,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                        lineNumber: 256,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modalContentArea,
                        children: renderContent()
                    }, void 0, false, {
                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                        lineNumber: 274,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 253,
                columnNumber: 11
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/component/layout/Bar/Topbar.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Topbar
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/layout/layout.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$LoginModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/userService/LoginModal.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$FriendActionModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/userService/FriendActionModal.tsx [ssr] (ecmascript)"); // 추가된 줄 1
;
;
;
;
;
;
;
function Topbar() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showLoginModal, setShowLoginModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showFriendModal, setShowFriendModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false); // 추가된 줄 2
    // 초기 로그인 상태 확인
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        checkLoginStatus();
    }, []);
    const checkLoginStatus = ()=>{
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    };
    const handleLoginSuccess = ()=>{
        checkLoginStatus();
    };
    const handleLogout = ()=>{
        localStorage.clear();
        setIsLoggedIn(false);
        alert("로그아웃 되었습니다.");
        router.push("/");
    };
    // 로그인한 사용자 signId 가져오기 (로그인 시 localStorage에 저장돼 있다고 가정)
    const currentUserSignId = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].topbar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].leftSection,
                        children: "MomenTory"
                    }, void 0, false, {
                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                children: "검색"
                            }, void 0, false, {
                                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                lineNumber: 48,
                                columnNumber: 13
                            }, this),
                            isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/community",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navLink}`,
                                        children: "커뮤니티"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 52,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                        style: {
                                            cursor: 'pointer'
                                        },
                                        onClick: ()=>setShowFriendModal(true),
                                        children: [
                                            "친구",
                                            showFriendModal && currentUserSignId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$FriendActionModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                currentUserSignId: currentUserSignId,
                                                isOpen: showFriendModal,
                                                onClose: ()=>setShowFriendModal(false)
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                                lineNumber: 63,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 56,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                        children: "알림"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 70,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                        children: "채팅"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 71,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/write",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].writeButton}`,
                                        children: "Log 작성"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 72,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                        onClick: handleLogout,
                                        style: {
                                            cursor: 'pointer'
                                        },
                                        children: "로그아웃"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 75,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                style: {
                                    cursor: "pointer"
                                },
                                onClick: ()=>setShowLoginModal(true),
                                children: "로그인"
                            }, void 0, false, {
                                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                lineNumber: 81,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                lineNumber: 42,
                columnNumber: 9
            }, this),
            showLoginModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$LoginModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setShowLoginModal(false),
                onLoginSuccess: handleLoginSuccess
            }, void 0, false, {
                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                lineNumber: 93,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/component/layout/MainLayout.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$Bar$2f$Topbar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/Bar/Topbar.tsx [ssr] (ecmascript)"); // Topbar 컴포넌트 경로에 맞게 수정
;
;
function Layout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$Bar$2f$Topbar$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/component/layout/MainLayout.tsx",
                lineNumber: 9,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/component/layout/MainLayout.tsx",
                lineNumber: 10,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/pages/post/[postId].tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// pages/post/[postId].tsx
__turbopack_context__.s([
    "default",
    ()=>PostPage,
    "getServerSideProps",
    ()=>getServerSideProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$PostDetail$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/blogService/PostDetail.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/blogService/blog.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/MainLayout.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$PostDetail$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$PostDetail$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
function PostPage({ post }) {
    console.log("PostDetail 렌더링 시작. 수신된 Post:", post); // ⬅️ 이 로그가 찍히는지 확인
    if (!post) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-6 py-20 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: "text-2xl font-bold",
                    children: "게시물을 찾을 수 없습니다."
                }, void 0, false, {
                    fileName: "[project]/src/pages/post/[postId].tsx",
                    lineNumber: 14,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/post/[postId].tsx",
                lineNumber: 13,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/post/[postId].tsx",
            lineNumber: 12,
            columnNumber: 9
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$PostDetail$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            post: post
        }, void 0, false, {
            fileName: "[project]/src/pages/post/[postId].tsx",
            lineNumber: 22,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/post/[postId].tsx",
        lineNumber: 21,
        columnNumber: 7
    }, this);
}
const getServerSideProps = async (context)=>{
    const { postId } = context.params;
    try {
        const post = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["readPost"])(Number(postId));
        return {
            props: {
                post
            }
        };
    } catch (error) {
        console.error("게시물 로드 실패:", error);
        return {
            props: {
                post: null
            }
        };
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bda693b2._.js.map