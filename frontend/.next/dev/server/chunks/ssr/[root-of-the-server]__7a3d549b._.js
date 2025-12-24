module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
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
"[project]/src/styles/blogService/MyPosts.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "MyPosts-module__HjetTq__container",
  "error": "MyPosts-module__HjetTq__error",
  "loadMoreButton": "MyPosts-module__HjetTq__loadMoreButton",
  "noContent": "MyPosts-module__HjetTq__noContent",
  "pageTitle": "MyPosts-module__HjetTq__pageTitle",
  "postContent": "MyPosts-module__HjetTq__postContent",
  "postList": "MyPosts-module__HjetTq__postList",
  "postMeta": "MyPosts-module__HjetTq__postMeta",
  "postPreview": "MyPosts-module__HjetTq__postPreview",
  "postSnippet": "MyPosts-module__HjetTq__postSnippet",
  "postTitle": "MyPosts-module__HjetTq__postTitle",
  "thumbnail": "MyPosts-module__HjetTq__thumbnail",
});
}),
"[project]/src/pages/my-posts/[userSignId].tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/my-posts/[userSignId].tsx
__turbopack_context__.s([
    "default",
    ()=>MyPostsPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
(()=>{
    const e = new Error("Cannot find module '@/api/blogService/post'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/blogService/MyPosts.module.css [ssr] (css module)");
(()=>{
    const e = new Error("Cannot find module '../component/layout/MainLayout'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
;
// 게시글 미리보기 컴포넌트 (PostPreview)는 변경 없이 유지합니다.
const PostPreview = ({ post })=>{
// ... (기존 PostPreview 로직 유지)
};
// 💡 [수정] 메인 로직을 별도의 함수로 분리 (Layout 적용을 위함)
function MyPostsContent({ authorId }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // userSignId가 이미 MyPostsPage 함수에서 추출되어 Content 함수로 authorId로 전달되므로
    // router.query를 다시 사용할 필요는 없습니다.
    // (기존 로직에서 authorId가 null/undefined일 경우를 대비해 타입 보장)
    const finalAuthorId = Array.isArray(authorId) ? authorId[0] : authorId;
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [isLastPage, setIsLastPage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // currentUserId는 로직이 복잡하지 않으므로 그대로 유지
    const currentUserId = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // 💡 [수정] finalAuthorId를 사용하도록 변경
        if (!finalAuthorId || !router.isReady) {
            return;
        }
        const fetchPosts = async (page)=>{
            if (page === 0) setIsLoading(true);
            setError(null);
            try {
                // API 호출: getMyPosts 대신 getPostsByAuthor를 사용한다고 가정
                const response = await getPostsByAuthor(finalAuthorId, page);
                // 페이지 0이면 목록을 새로 설정, 아니면 기존 목록에 추가
                setPosts((prev)=>page === 0 ? response.content : [
                        ...prev,
                        ...response.content
                    ]);
                setIsLastPage(response.last);
            } catch (err) {
                setError("게시글 목록을 불러오는 데 실패했습니다.");
                console.error(err);
            } finally{
                setIsLoading(false);
            }
        };
        fetchPosts(currentPage);
    }, [
        finalAuthorId,
        router.isReady,
        currentPage
    ]);
    // 무한 스크롤 또는 "더 보기" 버튼 클릭 시 다음 페이지 로드
    const handleLoadMore = ()=>{
        if (!isLastPage && !isLoading) {
            setCurrentPage((prev)=>prev + 1);
        }
    };
    // 💡 [수정] authorId 대신 finalAuthorId를 사용합니다.
    if (!finalAuthorId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].loading,
            children: "정보를 불러오는 중..."
        }, void 0, false, {
            fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
            lineNumber: 77,
            columnNumber: 12
        }, this);
    }
    if (isLoading && currentPage === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].loading,
            children: "게시글 목록 로딩 중..."
        }, void 0, false, {
            fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
            lineNumber: 81,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].error,
            children: error
        }, void 0, false, {
            fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
            lineNumber: 85,
            columnNumber: 12
        }, this);
    }
    if (posts.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageTitle,
                    children: [
                        finalAuthorId,
                        "님의 게시물"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                    lineNumber: 91,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].noContent,
                    children: "작성된 게시글이 없습니다."
                }, void 0, false, {
                    fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
            lineNumber: 90,
            columnNumber: 9
        }, this);
    }
    // 정상 렌더링
    return(// 💡 [수정] CSS container로 감싸서 중앙 정렬 및 최대 너비 설정
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pageTitle,
                children: [
                    finalAuthorId,
                    "님의 게시물 (",
                    posts.length,
                    "개)"
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].postList,
                children: posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(PostPreview, {
                        post: post
                    }, post.postId, false, {
                        fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                        lineNumber: 107,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            !isLastPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                onClick: handleLoadMore,
                disabled: isLoading,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].loadMoreButton,
                children: isLoading ? '로딩 중...' : '더 보기'
            }, void 0, false, {
                fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                lineNumber: 113,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
        lineNumber: 100,
        columnNumber: 7
    }, this));
}
function MyPostsPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { userSignId } = router.query;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Layout, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MyPostsContent, {
            authorId: userSignId
        }, void 0, false, {
            fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
            lineNumber: 134,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
        lineNumber: 132,
        columnNumber: 7
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7a3d549b._.js.map