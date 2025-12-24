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
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[externals]/@tiptap/react [external] (@tiptap/react, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@tiptap/react");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@tiptap/starter-kit [external] (@tiptap/starter-kit, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@tiptap/starter-kit");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@tiptap/extension-image [external] (@tiptap/extension-image, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@tiptap/extension-image");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/config/env.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BLOGSERVICE_API",
    ()=>BLOGSERVICE_API,
    "CHATSERVICE_API",
    ()=>CHATSERVICE_API,
    "FEEDSERVICE_API",
    ()=>FEEDSERVICE_API,
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
"[project]/src/component/TiptapEditor.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// src/component/TiptapEditor.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$react__$5b$external$5d$__$2840$tiptap$2f$react$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@tiptap/react [external] (@tiptap/react, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$starter$2d$kit__$5b$external$5d$__$2840$tiptap$2f$starter$2d$kit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@tiptap/starter-kit [external] (@tiptap/starter-kit, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$extension$2d$image__$5b$external$5d$__$2840$tiptap$2f$extension$2d$image$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@tiptap/extension-image [external] (@tiptap/extension-image, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/blogService/blog.ts [ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../api/ImageResizer'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$react__$5b$external$5d$__$2840$tiptap$2f$react$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$starter$2d$kit__$5b$external$5d$__$2840$tiptap$2f$starter$2d$kit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$extension$2d$image__$5b$external$5d$__$2840$tiptap$2f$extension$2d$image$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$react__$5b$external$5d$__$2840$tiptap$2f$react$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$starter$2d$kit__$5b$external$5d$__$2840$tiptap$2f$starter$2d$kit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$extension$2d$image__$5b$external$5d$__$2840$tiptap$2f$extension$2d$image$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
// 커스텀 이미지 확장 - 리사이징 가능하도록
const CustomImage = __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$extension$2d$image__$5b$external$5d$__$2840$tiptap$2f$extension$2d$image$2c$__esm_import$29$__["default"].extend({
    addAttributes () {
        return {
            ...this.parent?.(),
            width: {
                default: null,
                renderHTML: (attributes)=>{
                    if (!attributes.width) return {};
                    return {
                        width: attributes.width
                    };
                }
            },
            height: {
                default: null,
                renderHTML: (attributes)=>{
                    if (!attributes.height) return {};
                    return {
                        height: attributes.height
                    };
                }
            }
        };
    }
});
const TiptapEditor = ({ content, onChange })=>{
    const [isImageUploading, setIsImageUploading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [selectedImageUrl, setSelectedImageUrl] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [imageWidth, setImageWidth] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(500);
    const editor = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$react__$5b$external$5d$__$2840$tiptap$2f$react$2c$__esm_import$29$__["useEditor"])({
        extensions: [
            __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$starter$2d$kit__$5b$external$5d$__$2840$tiptap$2f$starter$2d$kit$2c$__esm_import$29$__["default"],
            CustomImage.configure({
                inline: true,
                allowBase64: false
            })
        ],
        content: content,
        onUpdate: ({ editor })=>{
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none'
            },
            // 이미지 클릭 이벤트 처리
            handleClick: (view, pos, event)=>{
                const target = event.target;
                if (target.tagName === 'IMG') {
                    const imgElement = target;
                    setSelectedImageUrl(imgElement.src);
                    setImageWidth(imgElement.width || 500);
                    return true;
                }
                setSelectedImageUrl(null);
                return false;
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [
        content,
        editor
    ]);
    // 이미지 업로드 핸들러
    const handleImageUpload = async (event)=>{
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }
        setIsImageUploading(true);
        try {
            // 이미지 리사이징 (1200px, 80% 품질)
            const resizedBlob = await resizeImage(file, {
                maxWidth: 1200,
                maxHeight: 1200,
                quality: 0.8
            });
            const resizedFile = blobToFile(resizedBlob, file.name, file.type);
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["uploadImage"])(resizedFile);
            const url = result.url;
            // 에디터에 이미지 삽입
            if (editor) {
                editor.chain().focus().setImage({
                    src: url,
                    width: '500'
                }).run();
            }
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
        } finally{
            setIsImageUploading(false);
            event.target.value = '';
        }
    };
    // 선택된 이미지 크기 변경
    const handleImageResize = ()=>{
        if (!editor || !selectedImageUrl) return;
        // 현재 선택된 이미지의 위치 찾기
        const { state } = editor;
        const { doc } = state;
        let imagePos = null;
        doc.descendants((node, pos)=>{
            if (node.type.name === 'image' && node.attrs.src === selectedImageUrl) {
                imagePos = pos;
                return false;
            }
        });
        if (imagePos !== null) {
            editor.chain().focus().setNodeSelection(imagePos).updateAttributes('image', {
                width: `${imageWidth}`
            }).run();
        }
        setSelectedImageUrl(null);
    };
    if (!editor) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "jsx-5f3e63ea4ce04dfa" + " " + "tiptap-editor-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-5f3e63ea4ce04dfa" + " " + "editor-toolbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleHeading({
                                level: 1
                            }).run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('heading', {
                            level: 1
                        }) ? 'is-active' : '') || ""),
                        children: "H1"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 151,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleHeading({
                                level: 2
                            }).run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('heading', {
                            level: 2
                        }) ? 'is-active' : '') || ""),
                        children: "H2"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleHeading({
                                level: 3
                            }).run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('heading', {
                            level: 3
                        }) ? 'is-active' : '') || ""),
                        children: "H3"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleBold().run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('bold') ? 'is-active' : '') || ""),
                        children: "Bold"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleItalic().run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('italic') ? 'is-active' : '') || ""),
                        children: "Italic"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleStrike().run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('strike') ? 'is-active' : '') || ""),
                        children: "Strike"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleCode().run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('code') ? 'is-active' : '') || ""),
                        children: "Code"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleBulletList().run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('bulletList') ? 'is-active' : '') || ""),
                        children: "List"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 200,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleOrderedList().run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('orderedList') ? 'is-active' : '') || ""),
                        children: "Ordered List"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 207,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleBlockquote().run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('blockquote') ? 'is-active' : '') || ""),
                        children: "Quote"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                        className: "jsx-5f3e63ea4ce04dfa" + " " + "image-upload-btn",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: "image/*",
                                onChange: handleImageUpload,
                                disabled: isImageUploading,
                                style: {
                                    display: 'none'
                                },
                                className: "jsx-5f3e63ea4ce04dfa"
                            }, void 0, false, {
                                fileName: "[project]/src/component/TiptapEditor.tsx",
                                lineNumber: 224,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: (e)=>{
                                    e.preventDefault();
                                    e.currentTarget.previousElementSibling?.click();
                                },
                                disabled: isImageUploading,
                                className: "jsx-5f3e63ea4ce04dfa" + " " + "toolbar-button",
                                children: isImageUploading ? '업로드 중...' : 'Image'
                            }, void 0, false, {
                                fileName: "[project]/src/component/TiptapEditor.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>editor.chain().focus().toggleCodeBlock().run(),
                        className: "jsx-5f3e63ea4ce04dfa" + " " + ((editor.isActive('codeBlock') ? 'is-active' : '') || ""),
                        children: "Code Block"
                    }, void 0, false, {
                        fileName: "[project]/src/component/TiptapEditor.tsx",
                        lineNumber: 244,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/TiptapEditor.tsx",
                lineNumber: 150,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$react__$5b$external$5d$__$2840$tiptap$2f$react$2c$__esm_import$29$__["EditorContent"], {
                editor: editor,
                className: "editor-content"
            }, void 0, false, {
                fileName: "[project]/src/component/TiptapEditor.tsx",
                lineNumber: 254,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            selectedImageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-5f3e63ea4ce04dfa" + " " + "image-resize-modal",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-5f3e63ea4ce04dfa" + " " + "modal-content",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            className: "jsx-5f3e63ea4ce04dfa",
                            children: "이미지 크기 조정"
                        }, void 0, false, {
                            fileName: "[project]/src/component/TiptapEditor.tsx",
                            lineNumber: 260,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                            src: selectedImageUrl,
                            alt: "Selected",
                            style: {
                                maxWidth: '100%',
                                marginBottom: '1rem'
                            },
                            className: "jsx-5f3e63ea4ce04dfa"
                        }, void 0, false, {
                            fileName: "[project]/src/component/TiptapEditor.tsx",
                            lineNumber: 261,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-5f3e63ea4ce04dfa" + " " + "resize-controls",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                className: "jsx-5f3e63ea4ce04dfa",
                                children: [
                                    "너비: ",
                                    imageWidth,
                                    "px",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "range",
                                        min: "200",
                                        max: "1200",
                                        step: "50",
                                        value: imageWidth,
                                        onChange: (e)=>setImageWidth(Number(e.target.value)),
                                        className: "jsx-5f3e63ea4ce04dfa" + " " + "width-slider"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/TiptapEditor.tsx",
                                        lineNumber: 266,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/TiptapEditor.tsx",
                                lineNumber: 264,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/component/TiptapEditor.tsx",
                            lineNumber: 263,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-5f3e63ea4ce04dfa" + " " + "modal-buttons",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: handleImageResize,
                                    className: "jsx-5f3e63ea4ce04dfa" + " " + "apply-btn",
                                    children: "적용"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/TiptapEditor.tsx",
                                    lineNumber: 279,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedImageUrl(null),
                                    className: "jsx-5f3e63ea4ce04dfa" + " " + "cancel-btn",
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/TiptapEditor.tsx",
                                    lineNumber: 282,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/TiptapEditor.tsx",
                            lineNumber: 278,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/TiptapEditor.tsx",
                    lineNumber: 259,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/component/TiptapEditor.tsx",
                lineNumber: 258,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "5f3e63ea4ce04dfa",
                children: ".tiptap-editor-container.jsx-5f3e63ea4ce04dfa{border:1px solid #ddd;border-radius:8px;overflow:hidden}.editor-toolbar.jsx-5f3e63ea4ce04dfa{background-color:#f5f5f5;border-bottom:1px solid #ddd;flex-wrap:wrap;gap:.5rem;padding:1rem;display:flex}.editor-toolbar.jsx-5f3e63ea4ce04dfa button.jsx-5f3e63ea4ce04dfa,.toolbar-button.jsx-5f3e63ea4ce04dfa{cursor:pointer;background-color:#fff;border:1px solid #ccc;border-radius:4px;padding:.5rem 1rem;transition:all .2s}.editor-toolbar.jsx-5f3e63ea4ce04dfa button.jsx-5f3e63ea4ce04dfa:hover,.toolbar-button.jsx-5f3e63ea4ce04dfa:hover{background-color:#e8e8e8}.editor-toolbar.jsx-5f3e63ea4ce04dfa button.is-active.jsx-5f3e63ea4ce04dfa{color:#fff;background-color:#4caf50;border-color:#4caf50}.editor-toolbar.jsx-5f3e63ea4ce04dfa button.jsx-5f3e63ea4ce04dfa:disabled{opacity:.5;cursor:not-allowed}.editor-content.jsx-5f3e63ea4ce04dfa{background-color:#fff;min-height:400px;padding:1.5rem}.editor-content.jsx-5f3e63ea4ce04dfa img{cursor:pointer;border:2px solid #0000;max-width:100%;height:auto;transition:border-color .2s}.editor-content.jsx-5f3e63ea4ce04dfa img:hover{border-color:#4caf50}.image-resize-modal.jsx-5f3e63ea4ce04dfa{z-index:1000;background-color:#000000b3;justify-content:center;align-items:center;display:flex;position:fixed;inset:0}.modal-content.jsx-5f3e63ea4ce04dfa{background:#fff;border-radius:12px;width:90%;max-width:600px;max-height:90vh;padding:2rem;overflow-y:auto}.modal-content.jsx-5f3e63ea4ce04dfa h3.jsx-5f3e63ea4ce04dfa{margin:0 0 1rem}.resize-controls.jsx-5f3e63ea4ce04dfa{margin:1rem 0}.resize-controls.jsx-5f3e63ea4ce04dfa label.jsx-5f3e63ea4ce04dfa{flex-direction:column;gap:.5rem;font-weight:600;display:flex}.width-slider.jsx-5f3e63ea4ce04dfa{cursor:pointer;background:#e0e0e0;border-radius:3px;outline:none;width:100%;height:6px}.width-slider.jsx-5f3e63ea4ce04dfa::-webkit-slider-thumb{appearance:none;cursor:pointer;background:#4caf50;border-radius:50%;width:18px;height:18px}.width-slider.jsx-5f3e63ea4ce04dfa::-moz-range-thumb{cursor:pointer;background:#4caf50;border:none;border-radius:50%;width:18px;height:18px}.modal-buttons.jsx-5f3e63ea4ce04dfa{gap:1rem;margin-top:1.5rem;display:flex}.apply-btn.jsx-5f3e63ea4ce04dfa,.cancel-btn.jsx-5f3e63ea4ce04dfa{cursor:pointer;border:none;border-radius:6px;flex:1;padding:.75rem;font-weight:600;transition:opacity .2s}.apply-btn.jsx-5f3e63ea4ce04dfa{color:#fff;background-color:#4caf50}.apply-btn.jsx-5f3e63ea4ce04dfa:hover{opacity:.9}.cancel-btn.jsx-5f3e63ea4ce04dfa{color:#fff;background-color:#f44336}.cancel-btn.jsx-5f3e63ea4ce04dfa:hover{opacity:.9}"
            }, void 0, false, void 0, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/TiptapEditor.tsx",
        lineNumber: 148,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = TiptapEditor;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/styles/blogService/write.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "checkbox": "write-module__58lXLq__checkbox",
  "checkboxLabel": "write-module__58lXLq__checkboxLabel",
  "checkboxWrapper": "write-module__58lXLq__checkboxWrapper",
  "form": "write-module__58lXLq__form",
  "hint": "write-module__58lXLq__hint",
  "label": "write-module__58lXLq__label",
  "removeTagBtn": "write-module__58lXLq__removeTagBtn",
  "removeThumbnailBtn": "write-module__58lXLq__removeThumbnailBtn",
  "submitButton": "write-module__58lXLq__submitButton",
  "tagInputGroup": "write-module__58lXLq__tagInputGroup",
  "tagItem": "write-module__58lXLq__tagItem",
  "tagList": "write-module__58lXLq__tagList",
  "textInput": "write-module__58lXLq__textInput",
  "thumbnailPreview": "write-module__58lXLq__thumbnailPreview",
  "thumbnailSection": "write-module__58lXLq__thumbnailSection",
  "thumbnailWrapper": "write-module__58lXLq__thumbnailWrapper",
  "titleInput": "write-module__58lXLq__titleInput",
  "titleInputWrapper": "write-module__58lXLq__titleInputWrapper",
  "titleThumbnailGroup": "write-module__58lXLq__titleThumbnailGroup",
  "writeHeader": "write-module__58lXLq__writeHeader",
  "writePageContainer": "write-module__58lXLq__writePageContainer",
  "writeTitle": "write-module__58lXLq__writeTitle",
});
}),
"[project]/src/component/blogService/WritePage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// src/component/blogService/WritePage.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$TiptapEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/TiptapEditor.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/blogService/blog.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/blogService/write.module.css [ssr] (css module)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$TiptapEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$TiptapEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
const WritePage = ({ postId })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isComposing, setIsComposing] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [tagInput, setTagInput] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [thumbnailUrl, setThumbnailUrl] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [isThumbnailUploading, setIsThumbnailUploading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const thumbnailInputRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [isPublished, setIsPublished] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [isInitialLoad, setIsInitialLoad] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [userSignId, setUserSignId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // 1. [사용자 ID 로드]
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const id = localStorage.getItem('userSignId');
        if (id) {
            setUserSignId(id);
        }
    }, [
        router
    ]);
    // 2. [수정 모드] 데이터 로드 로직
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (postId && !isInitialLoad) {
            const loadPostData = async ()=>{
                try {
                    setIsLoading(true);
                    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["readPost"])(postId);
                    setTitle(data.title);
                    setContent(data.content);
                    const loadedTags = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getPostTags"])(postId);
                    setTags(loadedTags);
                    console.log(loadedTags);
                    setThumbnailUrl(data.thumbnail || null);
                    setIsPublished(data.isPublished);
                } catch (error) {
                    console.error("데이터 로드 실패:", error);
                    // ⚠️ alert 대신 사용자 정의 모달 또는 인라인 메시지 사용 권장
                    alert("게시글 정보를 불러오는데 실패했습니다.");
                    router.back();
                } finally{
                    setIsLoading(false);
                    setIsInitialLoad(true);
                }
            };
            loadPostData();
        }
    }, [
        postId,
        isInitialLoad,
        router
    ]);
    // 3. 태그 관리 로직
    const handleTagKeyDown = (e)=>{
        // ⚠️ [핵심 수정] 한글 조합(Composition) 중이라면 Enter, Spacebar 처리 스킵
        // '가나다라' 입력 후 ' ' (공백) 입력 시 '라'가 분리되는 버그 방지
        if (isComposing) {
            return;
        }
        // Enter 또는 Spacebar를 눌렀을 때
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const newTag = tagInput.trim();
            // 태그가 실제로 입력되었고, 기존 태그 목록에 포함되어 있지 않을 때만 추가
            if (newTag.length > 0 && !tags.includes(newTag)) {
                setTags([
                    ...tags,
                    newTag
                ]);
            }
            setTagInput(''); // 입력 필드 초기화
        }
    };
    const removeTag = (tagToRemove)=>{
        setTags(tags.filter((tag)=>tag !== tagToRemove));
    };
    // 썸네일 파일 업로드 핸들러
    const handleThumbnailUpload = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        setIsThumbnailUploading(true);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["uploadImage"])(file);
            const url = result.url;
            setThumbnailUrl(url);
            // ⚠️ alert 대신 사용자 정의 모달 또는 인라인 메시지 사용 권장
            alert('썸네일 업로드 완료');
        } catch (error) {
            console.error('썸네일 업로드 실패:', error);
            // ⚠️ alert 대신 사용자 정의 모달 또는 인라인 메시지 사용 권장
            alert('썸네일 업로드에 실패했습니다. (콘솔 확인)');
            setThumbnailUrl(null);
        } finally{
            setIsThumbnailUploading(false);
            if (thumbnailInputRef.current) {
                thumbnailInputRef.current.value = '';
            }
        }
    }, []);
    // 4. [저장/수정] 핸들러 로직
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            // ⚠️ alert 대신 사용자 정의 모달 또는 인라인 메시지 사용 권장
            alert("제목과 내용을 입력해주세요.");
            return;
        }
        if (!userSignId) {
            // ⚠️ alert 대신 사용자 정의 모달 또는 인라인 메시지 사용 권장
            alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
            router.push('/login');
            return;
        }
        setIsLoading(true);
        try {
            const postData = {
                title,
                content,
                tags,
                isPublished,
                thumbnail: thumbnailUrl || undefined
            };
            let resultPost;
            if (postId) {
                resultPost = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["updatePost"])(postId, postData, userSignId);
                // ⚠️ alert 대신 사용자 정의 모달 또는 인라인 메시지 사용 권장
                alert("게시글이 성공적으로 수정되었습니다.");
                router.push(`/post/${postId}`);
            } else {
                resultPost = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["writeFeed"])(postData, userSignId);
                if (resultPost.postId) {
                    // ⚠️ alert 대신 사용자 정의 모달 또는 인라인 메시지 사용 권장
                    alert("글이 성공적으로 등록되었습니다!");
                    router.push(`/post/${resultPost.postId}`);
                } else {
                    // ⚠️ alert 대신 사용자 정의 모달 또는 인라인 메시지 사용 권장
                    alert("글이 등록되었으나 ID를 받지 못했습니다. 홈으로 이동합니다.");
                    router.push('/');
                }
            }
        } catch (error) {
            console.error("작업 중 오류 발생:", error);
            // ⚠️ alert 대신 사용자 정의 모달 또는 인라인 메시지 사용 권장
            alert("작업 중 오류가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요.");
        } finally{
            setIsLoading(false);
        }
    };
    if (isLoading && !isInitialLoad) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].writePageContainer,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                children: "데이터를 불러오는 중입니다..."
            }, void 0, false, {
                fileName: "[project]/src/component/blogService/WritePage.tsx",
                lineNumber: 196,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/component/blogService/WritePage.tsx",
            lineNumber: 195,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].writePageContainer,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
            onSubmit: handleSubmit,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].form,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].titleThumbnailGroup,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].titleInputWrapper,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].writeHeader,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].writeTitle,
                                        children: postId ? "게시글 수정" : "순간과 순간이 모여 삶을 이루며"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/blogService/WritePage.tsx",
                                        lineNumber: 215,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                                    lineNumber: 214,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].label,
                                    children: "제목"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: title,
                                    onChange: (e)=>setTitle(e.target.value),
                                    placeholder: "오늘의 이야기를 들려주세요",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].titleInput,
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                            lineNumber: 213,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].thumbnailSection,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    children: "대표 썸네일 설정"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                                    lineNumber: 232,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].thumbnailWrapper,
                                    onClick: ()=>!isThumbnailUploading && thumbnailInputRef.current?.click(),
                                    // 동적 커서 스타일만 인라인으로 유지.
                                    style: {
                                        cursor: isThumbnailUploading ? 'not-allowed' : 'pointer'
                                    },
                                    children: [
                                        thumbnailUrl ? // 썸네일 미리보기
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: thumbnailUrl,
                                            alt: "Thumbnail Preview",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].thumbnailPreview
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                                            lineNumber: 243,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)) : // 업로드 버튼/안내 텍스트
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                textAlign: 'center',
                                                color: '#666'
                                            },
                                            children: isThumbnailUploading ? '업로드 중...' : '클릭하여 썸네일 이미지 업로드 (선택 사항)'
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                                            lineNumber: 250,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            ref: thumbnailInputRef,
                                            accept: "image/*",
                                            onChange: handleThumbnailUpload,
                                            style: {
                                                display: 'none'
                                            },
                                            disabled: isThumbnailUploading
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                                            lineNumber: 255,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                                    lineNumber: 233,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                thumbnailUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setThumbnailUrl(null),
                                    disabled: isThumbnailUploading,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].removeThumbnailBtn,
                                    children: "썸네일 제거"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                                    lineNumber: 267,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                            lineNumber: 231,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                    lineNumber: 210,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].label,
                            children: "내용"
                        }, void 0, false, {
                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                            lineNumber: 284,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$TiptapEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            content: content,
                            onChange: setContent
                        }, void 0, false, {
                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                            lineNumber: 285,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                    lineNumber: 283,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tagInputGroup,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].label,
                            children: "태그"
                        }, void 0, false, {
                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                            lineNumber: 292,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tagList,
                            children: tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tagItem,
                                    children: [
                                        "#",
                                        tag,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>removeTag(tag),
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].removeTagBtn,
                                            children: "×"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                                            lineNumber: 302,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, tag, true, {
                                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                                    lineNumber: 297,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "text",
                            value: tagInput,
                            onChange: (e)=>setTagInput(e.target.value),
                            // ✅ 한글 조합 시작/종료 이벤트 추가
                            onCompositionStart: ()=>setIsComposing(true),
                            onCompositionEnd: ()=>setIsComposing(false),
                            onKeyDown: handleTagKeyDown,
                            placeholder: "태그를 입력하고 Enter",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].textInput
                        }, void 0, false, {
                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                            lineNumber: 314,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("small", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].hint,
                            children: "태그를 입력하고 엔터를 누르면 추가됩니다."
                        }, void 0, false, {
                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                            lineNumber: 325,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                    lineNumber: 291,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkboxWrapper,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "checkbox",
                            id: "isPublished",
                            checked: isPublished,
                            onChange: (e)=>setIsPublished(e.target.checked),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkbox
                        }, void 0, false, {
                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                            lineNumber: 328,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                            htmlFor: "isPublished",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].checkboxLabel,
                            children: postId ? "수정 후 바로 게시하기" : "바로 게시하기"
                        }, void 0, false, {
                            fileName: "[project]/src/component/blogService/WritePage.tsx",
                            lineNumber: 335,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                    lineNumber: 327,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                    type: "submit",
                    disabled: isLoading || isThumbnailUploading,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$write$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].submitButton,
                    children: isLoading ? "저장 중..." : postId ? "수정 완료" : "작성 완료하고 게시하기"
                }, void 0, false, {
                    fileName: "[project]/src/component/blogService/WritePage.tsx",
                    lineNumber: 340,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/blogService/WritePage.tsx",
            lineNumber: 205,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/component/blogService/WritePage.tsx",
        lineNumber: 202,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = WritePage;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/styles/layout/layout.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "leftSection": "layout-module__oXCPXq__leftSection",
  "rightItem": "layout-module__oXCPXq__rightItem",
  "rightSection": "layout-module__oXCPXq__rightSection",
  "topbar": "layout-module__oXCPXq__topbar",
  "writeButton": "layout-module__oXCPXq__writeButton",
});
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

__turbopack_context__.s([
    "acceptFriend",
    ()=>acceptFriend,
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/signup`;
    const response = await fetch(url, {
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
            message: text || "회원가입이 완료되었습니다."
        };
    }
    // 모든 에러도 메시지 그대로 반환
    return {
        success: false,
        message: text || "회원가입 중 문제가 발생했습니다."
    };
}
async function login(loginDto) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/login`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginDto)
    });
    if (response.ok) {
        // Authorization 헤더에서 Bearer 토큰 추출
        const authHeader = response.headers.get("Authorization");
        const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : "";
        // 응답 본문 파싱 (Map<String, String> -> JS Object)
        const body = await response.json();
        return {
            userSignId: body["userSignId"],
            role: body["role"],
            refreshToken: body["refreshToken"],
            accessToken: accessToken
        };
    } else {
        throw new Error(`로그인 실패: HTTP ${response.status}`);
    }
}
async function requestFriend(requesterSignId, reqDto) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/friends`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "userSignId": requesterSignId,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqDto)
    });
    if (response.status === 201) {
        return await response.json(); // FriendsResDTO 반환
    } else {
        // 서버의 상태 코드 및 예외 처리 로직 반영
        let errorMessage = `친구 요청 실패: HTTP ${response.status}`;
        switch(response.status){
            case 404:
                errorMessage = "요청자 또는 수신자 ID를 찾을 수 없습니다.";
                break;
            case 400:
                errorMessage = "본인에게 친구 신청을 할 수 없습니다.";
                break;
            case 409:
                errorMessage = "이미 친구 관계이거나 요청이 전송된 상태입니다.";
                break;
            case 500:
                errorMessage = "친구 요청 중 서버 오류가 발생했습니다.";
                break;
        }
        throw new Error(errorMessage);
    }
}
async function acceptFriend(receiverSignId, requesterSignId) {
    // requesterSignId는 PathVariable로 URL에 포함
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/friends/${requesterSignId}/accept`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "userSignId": receiverSignId,
            "Content-Length": "0"
        }
    });
    if (response.ok) {
        return await response.json(); // FriendsResDTO 반환
    } else {
        // 서버의 예외 처리 로직 반영
        let errorMessage = `친구 요청 수락 실패: HTTP ${response.status}`;
        switch(response.status){
            case 404:
                errorMessage = "요청을 보낸 사용자 ID를 찾을 수 없거나, 대기 중인 요청이 없습니다.";
                break;
            case 400:
                errorMessage = "자기 자신의 요청을 수락할 수 없습니다.";
                break;
            case 409:
                errorMessage = "이미 친구 관계이거나 요청 상태가 유효하지 않습니다.";
                break;
            case 500:
                errorMessage = "친구 요청 수락 중 서버 오류가 발생했습니다.";
                break;
        }
        throw new Error(errorMessage);
    }
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$LoginModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/userService/LoginModal.tsx [ssr] (ecmascript)"); // (경로 확인 필요)
;
;
;
;
;
;
function Topbar() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [showLoginModal, setShowLoginModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false); // 모달 표시 상태
    // 초기 로그인 상태 확인
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        checkLoginStatus();
    }, []);
    const checkLoginStatus = ()=>{
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    };
    // 로그인 성공 시 호출될 함수
    const handleLoginSuccess = ()=>{
        checkLoginStatus(); // 상태 갱신 (로그인 버튼 -> 마이페이지로 변경됨)
    // 필요하면 router.reload() 혹은 router.push('/') 등을 추가
    };
    // 로그아웃 함수
    const handleLogout = ()=>{
        localStorage.clear();
        setIsLoggedIn(false);
        alert("로그아웃 되었습니다.");
        router.push("/");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].topbar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].leftSection,
                            children: "MomenTory"
                        }, void 0, false, {
                            fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                        lineNumber: 40,
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
                                lineNumber: 46,
                                columnNumber: 13
                            }, this),
                            isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                        children: "알림"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 50,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                        children: "채팅"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 51,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/write",
                                        passHref: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].writeButton}`,
                                            children: "Log 작성"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                            lineNumber: 53,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 52,
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
                                        lineNumber: 57,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true) : /* 로그인 버튼 클릭 시 모달 open */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                style: {
                                    cursor: "pointer"
                                },
                                onClick: ()=>setShowLoginModal(true),
                                children: "로그인"
                            }, void 0, false, {
                                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                lineNumber: 64,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                        lineNumber: 45,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, this),
            showLoginModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$LoginModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setShowLoginModal(false),
                onLoginSuccess: handleLoginSuccess
            }, void 0, false, {
                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                lineNumber: 77,
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
"[project]/src/pages/write.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$WritePage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/blogService/WritePage.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/MainLayout.tsx [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$WritePage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$WritePage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
/**
 * Next.js의 /write 경로에 매핑되는 페이지 컴포넌트
 */ const WriteRoutePage = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$blogService$2f$WritePage$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/pages/write.tsx",
                lineNumber: 12,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/pages/write.tsx",
            lineNumber: 11,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/pages/write.tsx",
        lineNumber: 10,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = WriteRoutePage;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5e66a6aa._.js.map