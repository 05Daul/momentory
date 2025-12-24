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
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].leftSection,
                        children: "MomenTory"
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/community",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navLink}`,
                                        children: "커뮤니티"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 50,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                        children: "알림"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 53,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem,
                                        children: "채팅"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 54,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/write",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].rightItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].writeButton}`,
                                        children: "Log 작성"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 55,
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
                                        lineNumber: 58,
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
"[project]/src/styles/community/SimpleTiptapEditor.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "alignActive": "SimpleTiptapEditor-module__5Yzcmq__alignActive",
  "alignButtons": "SimpleTiptapEditor-module__5Yzcmq__alignButtons",
  "applyBtn": "SimpleTiptapEditor-module__5Yzcmq__applyBtn",
  "cancelBtn": "SimpleTiptapEditor-module__5Yzcmq__cancelBtn",
  "control": "SimpleTiptapEditor-module__5Yzcmq__control",
  "editorContent": "SimpleTiptapEditor-module__5Yzcmq__editorContent",
  "editorWrapper": "SimpleTiptapEditor-module__5Yzcmq__editorWrapper",
  "isActive": "SimpleTiptapEditor-module__5Yzcmq__isActive",
  "menuBar": "SimpleTiptapEditor-module__5Yzcmq__menuBar",
  "modal": "SimpleTiptapEditor-module__5Yzcmq__modal",
  "modalButtons": "SimpleTiptapEditor-module__5Yzcmq__modalButtons",
  "modalContent": "SimpleTiptapEditor-module__5Yzcmq__modalContent",
  "previewContainer": "SimpleTiptapEditor-module__5Yzcmq__previewContainer",
});
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
"[project]/src/component/communityService/SimpleTiptapEditor.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// src/component/community/SimpleTiptapEditor.tsx
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$react__$5b$external$5d$__$2840$tiptap$2f$react$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@tiptap/react [external] (@tiptap/react, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$starter$2d$kit__$5b$external$5d$__$2840$tiptap$2f$starter$2d$kit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@tiptap/starter-kit [external] (@tiptap/starter-kit, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$extension$2d$image__$5b$external$5d$__$2840$tiptap$2f$extension$2d$image$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@tiptap/extension-image [external] (@tiptap/extension-image, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/community/SimpleTiptapEditor.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/blogService/blog.ts [ssr] (ecmascript)");
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
const ResizableImage = __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$extension$2d$image__$5b$external$5d$__$2840$tiptap$2f$extension$2d$image$2c$__esm_import$29$__["default"].extend({
    addAttributes () {
        return {
            src: {
                default: null
            },
            alt: {
                default: null
            },
            title: {
                default: null
            },
            'data-align': {
                default: 'center',
                parseHTML: (element)=>element.getAttribute('data-align') || 'center',
                renderHTML: (attributes)=>({
                        'data-align': attributes['data-align']
                    })
            },
            'data-width': {
                default: null,
                parseHTML: (element)=>{
                    const width = element.getAttribute('data-width');
                    return width ? parseInt(width, 10) : null;
                },
                renderHTML: (attributes)=>{
                    if (!attributes['data-width']) return {};
                    const align = attributes['data-align'] || 'center';
                    let marginStyle = '';
                    if (align === 'left') marginStyle = 'margin-left: 0; margin-right: auto;';
                    else if (align === 'right') marginStyle = 'margin-left: auto; margin-right: 0;';
                    else marginStyle = 'margin-left: auto; margin-right: auto;';
                    return {
                        'data-width': attributes['data-width'],
                        'data-align': align,
                        style: `width: ${attributes['data-width']}px; max-width: 100%; height: auto; display: block; ${marginStyle}`
                    };
                }
            }
        };
    },
    addNodeView () {
        return ({ node, getPos })=>{
            const img = document.createElement('img');
            const attrs = node.attrs;
            img.src = attrs.src;
            img.alt = attrs.alt || '';
            img.dataset.width = attrs['data-width']?.toString() || '';
            img.dataset.align = attrs['data-align'] || 'center';
            const currentAlign = attrs['data-align'] || 'center';
            let marginStyle = '';
            if (currentAlign === 'left') marginStyle = 'margin-left: 0; margin-right: auto;';
            else if (currentAlign === 'right') marginStyle = 'margin-left: auto; margin-right: 0;';
            else marginStyle = 'margin-left: auto; margin-right: auto;';
            img.style.cssText = `
        max-width: 100%;
        height: auto;
        cursor: pointer;
        border: 2px solid transparent;
        border-radius: 8px;
        transition: border-color 0.2s;
        display: block;
        ${attrs['data-width'] ? `width: ${attrs['data-width']}px;` : 'width: 100%;'}
        ${marginStyle}
      `;
            img.onmouseover = ()=>img.style.borderColor = '#6366F1';
            img.onmouseout = ()=>img.style.borderColor = 'transparent';
            img.onclick = (e)=>{
                e.stopPropagation();
                if (typeof getPos === 'function') {
                    document.dispatchEvent(new CustomEvent('simple-tiptap-image-resize', {
                        detail: {
                            src: attrs.src,
                            currentWidth: attrs['data-width'] || 600,
                            pos: getPos(),
                            currentAlign: attrs['data-align'] || 'center'
                        }
                    }));
                }
            };
            return {
                dom: img,
                update: (updatedNode)=>{
                    if (updatedNode.type.name !== 'image') return false;
                    const newAttrs = updatedNode.attrs;
                    if (newAttrs.src !== img.src) img.src = newAttrs.src;
                    if (newAttrs['data-width'] !== undefined) {
                        img.dataset.width = newAttrs['data-width']?.toString() || '';
                        img.style.width = newAttrs['data-width'] ? `${newAttrs['data-width']}px` : '100%';
                    }
                    if (newAttrs['data-align'] !== img.dataset.align) {
                        const newAlign = newAttrs['data-align'] || 'center';
                        img.dataset.align = newAlign;
                        if (newAlign === 'left') {
                            img.style.marginLeft = '0';
                            img.style.marginRight = 'auto';
                        } else if (newAlign === 'right') {
                            img.style.marginLeft = 'auto';
                            img.style.marginRight = '0';
                        } else {
                            img.style.marginLeft = 'auto';
                            img.style.marginRight = 'auto';
                        }
                    }
                    return true;
                }
            };
        };
    }
});
const MenuBar = ({ editor, addImage })=>{
    if (!editor) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].menuBar,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>editor.chain().focus().toggleHeading({
                        level: 1
                    }).run(),
                className: editor.isActive('heading', {
                    level: 1
                }) ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].isActive : '',
                title: "제목 1",
                children: "H1"
            }, void 0, false, {
                fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                lineNumber: 131,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>editor.chain().focus().toggleHeading({
                        level: 2
                    }).run(),
                className: editor.isActive('heading', {
                    level: 2
                }) ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].isActive : '',
                title: "제목 2",
                children: "H2"
            }, void 0, false, {
                fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                lineNumber: 139,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>editor.chain().focus().toggleBold().run(),
                className: editor.isActive('bold') ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].isActive : '',
                title: "굵게",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                    children: "B"
                }, void 0, false, {
                    fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                    lineNumber: 153,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>editor.chain().focus().toggleBulletList().run(),
                className: editor.isActive('bulletList') ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].isActive : '',
                title: "글머리 기호 목록",
                children: "•"
            }, void 0, false, {
                fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                lineNumber: 155,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>editor.chain().focus().toggleOrderedList().run(),
                className: editor.isActive('orderedList') ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].isActive : '',
                title: "번호 목록",
                children: "1."
            }, void 0, false, {
                fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: addImage,
                title: "이미지 추가",
                children: "🖼️"
            }, void 0, false, {
                fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                lineNumber: 171,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
        lineNumber: 130,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
const SimpleTiptapEditor = ({ content, onChange })=>{
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [imageWidth, setImageWidth] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(600);
    const [imageAlign, setImageAlign] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('center');
    const [targetPos, setTargetPos] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [targetSrc, setTargetSrc] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const editor = (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$react__$5b$external$5d$__$2840$tiptap$2f$react$2c$__esm_import$29$__["useEditor"])({
        extensions: [
            __TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$starter$2d$kit__$5b$external$5d$__$2840$tiptap$2f$starter$2d$kit$2c$__esm_import$29$__["default"].configure({
                paragraph: {
                    HTMLAttributes: {
                        style: 'white-space: pre-wrap;'
                    }
                }
            }),
            ResizableImage.configure({
                inline: false,
                allowBase64: false
            })
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor })=>{
            onChange(editor.getHTML());
        }
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (editor && !editor.isDestroyed && editor.getHTML() !== content) {
            editor.commands.setContent(content, {
                emitUpdate: false
            });
        }
    }, [
        content,
        editor
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handler = (e)=>{
            const ev = e;
            setTargetSrc(ev.detail.src);
            setImageWidth(ev.detail.currentWidth);
            setTargetPos(ev.detail.pos);
            setImageAlign(ev.detail.currentAlign || 'center');
            setModalOpen(true);
        };
        document.addEventListener('simple-tiptap-image-resize', handler);
        return ()=>document.removeEventListener('simple-tiptap-image-resize', handler);
    }, []);
    const addImage = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e)=>{
            const file = e.target.files?.[0];
            if (!file || !editor) return;
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["uploadImage"])(file);
                const url = result.url || result;
                editor.chain().focus().setImage({
                    src: url,
                    'data-width': 600,
                    'data-align': 'center'
                }).run();
            } catch (err) {
                console.error(err);
                alert('이미지 업로드 실패');
            }
        };
        input.click();
    }, [
        editor
    ]);
    const applyResize = ()=>{
        if (!editor || targetPos === null) return;
        const tr = editor.state.tr;
        const currentAttrs = editor.getAttributes('image');
        tr.setNodeMarkup(targetPos, undefined, {
            ...currentAttrs,
            'data-width': imageWidth,
            'data-align': imageAlign
        });
        editor.view.dispatch(tr);
        setModalOpen(false);
    };
    if (!editor) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editorWrapper,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(MenuBar, {
                editor: editor,
                addImage: addImage
            }, void 0, false, {
                fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                lineNumber: 269,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$tiptap$2f$react__$5b$external$5d$__$2840$tiptap$2f$react$2c$__esm_import$29$__["EditorContent"], {
                editor: editor,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editorContent
            }, void 0, false, {
                fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                lineNumber: 270,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            modalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modal,
                onClick: ()=>setModalOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modalContent,
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            children: "이미지 설정"
                        }, void 0, false, {
                            fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                            lineNumber: 275,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].previewContainer,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: targetSrc,
                                alt: "preview",
                                style: {
                                    width: `${imageWidth}px`,
                                    maxWidth: '100%',
                                    maxHeight: '300px',
                                    objectFit: 'contain',
                                    marginLeft: imageAlign === 'left' ? '0' : 'auto',
                                    marginRight: imageAlign === 'right' ? '0' : 'auto'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                                lineNumber: 278,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                            lineNumber: 277,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].control,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    children: [
                                        "너비: ",
                                        imageWidth,
                                        "px"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                                    lineNumber: 293,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "range",
                                    min: "200",
                                    max: "1200",
                                    step: "10",
                                    value: imageWidth,
                                    onChange: (e)=>setImageWidth(Number(e.target.value))
                                }, void 0, false, {
                                    fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                                    lineNumber: 294,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                            lineNumber: 292,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].control,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    children: "정렬:"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                                    lineNumber: 305,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].alignButtons,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setImageAlign('left'),
                                            className: imageAlign === 'left' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].alignActive : '',
                                            children: "좌"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                                            lineNumber: 307,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setImageAlign('center'),
                                            className: imageAlign === 'center' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].alignActive : '',
                                            children: "중앙"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                                            lineNumber: 314,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setImageAlign('right'),
                                            className: imageAlign === 'right' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].alignActive : '',
                                            children: "우"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                                            lineNumber: 321,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                                    lineNumber: 306,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                            lineNumber: 304,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modalButtons,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setModalOpen(false),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cancelBtn,
                                    children: "취소"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                                    lineNumber: 332,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: applyResize,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$SimpleTiptapEditor$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].applyBtn,
                                    children: "적용"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                                    lineNumber: 335,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                            lineNumber: 331,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                    lineNumber: 274,
                    columnNumber: 15
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
                lineNumber: 273,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/communityService/SimpleTiptapEditor.tsx",
        lineNumber: 268,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = SimpleTiptapEditor;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/api/communityService/community.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/api/communityService/community.ts
__turbopack_context__.s([
    "createConcern",
    ()=>createConcern,
    "createProject",
    ()=>createProject,
    "createStudy",
    ()=>createStudy,
    "deleteConcern",
    ()=>deleteConcern,
    "deleteProject",
    ()=>deleteProject,
    "deleteStudy",
    ()=>deleteStudy,
    "getConcernDetail",
    ()=>getConcernDetail,
    "getConcernList",
    ()=>getConcernList,
    "getProjectDetail",
    ()=>getProjectDetail,
    "getProjectList",
    ()=>getProjectList,
    "getStudyDetail",
    ()=>getStudyDetail,
    "getStudyList",
    ()=>getStudyList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [ssr] (ecmascript)"); // 환경변수 설정 필요
;
async function createConcern(userSignId, request) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/concerns`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "userSignId": userSignId
        },
        body: JSON.stringify(request)
    });
    if (response.status === 201) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `고민 게시글 작성 실패: HTTP ${response.status}`);
    }
}
async function getConcernDetail(communityId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/concerns/${communityId}`;
    const headers = {};
    if (userSignId) {
        headers["userSignId"] = userSignId;
    }
    const response = await fetch(url, {
        method: "GET",
        headers
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `고민 게시글 상세 조회 실패: HTTP ${response.status}`);
    }
}
async function getConcernList(page = 0, size = 20) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/concerns?page=${page}&size=${size}&sort=createdAt,DESC`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `고민 게시글 목록 조회 실패: HTTP ${response.status}`);
    }
}
async function deleteConcern(communityId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/concerns/${communityId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "userSignId": userSignId
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `고민 게시글 삭제 실패: HTTP ${response.status}`);
    }
}
async function createProject(userSignId, request) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/projects`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "userSignId": userSignId
        },
        body: JSON.stringify(request)
    });
    if (response.status === 201) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `프로젝트 게시글 작성 실패: HTTP ${response.status}`);
    }
}
async function getProjectDetail(communityId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/projects/${communityId}`;
    const headers = {};
    if (userSignId) {
        headers["userSignId"] = userSignId;
    }
    const response = await fetch(url, {
        method: "GET",
        headers
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `프로젝트 게시글 상세 조회 실패: HTTP ${response.status}`);
    }
}
async function getProjectList(page = 0, size = 20) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/projects?page=${page}&size=${size}&sort=createdAt,DESC`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `프로젝트 게시글 목록 조회 실패: HTTP ${response.status}`);
    }
}
async function deleteProject(communityId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/projects/${communityId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "userSignId": userSignId
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `프로젝트 게시글 삭제 실패: HTTP ${response.status}`);
    }
}
async function createStudy(userSignId, request) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/studies`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "userSignId": userSignId
        },
        body: JSON.stringify(request)
    });
    if (response.status === 201) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `스터디 게시글 작성 실패: HTTP ${response.status}`);
    }
}
async function getStudyDetail(communityId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/studies/${communityId}`;
    const headers = {};
    if (userSignId) {
        headers["userSignId"] = userSignId;
    }
    const response = await fetch(url, {
        method: "GET",
        headers
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `스터디 게시글 상세 조회 실패: HTTP ${response.status}`);
    }
}
async function getStudyList(page = 0, size = 20) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/studies?page=${page}&size=${size}&sort=createdAt,DESC`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `스터디 게시글 목록 조회 실패: HTTP ${response.status}`);
    }
}
async function deleteStudy(communityId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/studies/${communityId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "userSignId": userSignId
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `스터디 게시글 삭제 실패: HTTP ${response.status}`);
    }
}
}),
"[project]/src/types/communityService/communityType.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/types/communityService/communityType.ts
__turbopack_context__.s([
    "CommunityPostType",
    ()=>CommunityPostType
]);
var CommunityPostType = /*#__PURE__*/ function(CommunityPostType) {
    CommunityPostType["CONCERN"] = "CONCERN";
    CommunityPostType["PROJECT"] = "PROJECT";
    CommunityPostType["STUDY"] = "STUDY";
    return CommunityPostType;
}({});
}),
"[project]/src/pages/community/write.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// src/pages/community/write.tsx
__turbopack_context__.s([
    "default",
    ()=>CommunityWrite
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/MainLayout.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$communityService$2f$SimpleTiptapEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/communityService/SimpleTiptapEditor.tsx [ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/styles/community/CommunityWrite.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/communityService/community.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/communityService/communityType.ts [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$communityService$2f$SimpleTiptapEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$communityService$2f$SimpleTiptapEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
function CommunityWrite() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [userSignId, setUserSignId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [postType, setPostType] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN);
    const [title, setTitle] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [content, setContent] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [tags, setTags] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [tagInput, setTagInput] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const userId = localStorage.getItem('userSignId');
        if (!userId) {
            alert('로그인이 필요합니다.');
            router.push('/login');
            return;
        }
        setUserSignId(userId);
    }, []);
    const handleTagAdd = ()=>{
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
            setTags([
                ...tags,
                trimmedTag
            ]);
            setTagInput('');
        }
    };
    const handleTagRemove = (tagToRemove)=>{
        setTags(tags.filter((tag)=>tag !== tagToRemove));
    };
    const handleTagInputKeyDown = (e)=>{
        if (e.key === 'Enter') {
            e.preventDefault();
            handleTagAdd();
        }
    };
    const handleSubmit = async ()=>{
        if (!title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!content.trim() || content === '<p></p>') {
            alert('내용을 입력해주세요.');
            return;
        }
        if (tags.length === 0) {
            alert('태그를 최소 1개 이상 입력해주세요.');
            return;
        }
        setIsSubmitting(true);
        try {
            let communityId;
            switch(postType){
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN:
                    {
                        const request = {
                            title,
                            content,
                            tagNames: tags
                        };
                        communityId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createConcern"])(userSignId, request);
                        break;
                    }
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT:
                    {
                        const request = {
                            title,
                            content,
                            tagNames: tags
                        };
                        communityId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createProject"])(userSignId, request);
                        break;
                    }
                case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY:
                    {
                        const request = {
                            title,
                            content,
                            tagNames: tags
                        };
                        communityId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createStudy"])(userSignId, request);
                        break;
                    }
                default:
                    throw new Error('Invalid post type');
            }
            alert('게시글이 작성되었습니다.');
            router.push(`/community/${postType.toLowerCase()}/${communityId}`);
        } catch (error) {
            console.error('Failed to create post:', error);
            alert('게시글 작성에 실패했습니다.');
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: styles.container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: styles.header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                            className: styles.title,
                            children: "글쓰기"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/community/write.tsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.back(),
                            className: styles.backButton,
                            children: "취소"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/community/write.tsx",
                            lineNumber: 111,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/community/write.tsx",
                    lineNumber: 109,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: styles.form,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: styles.typeSelector,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    className: styles.label,
                                    children: "카테고리"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/community/write.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: styles.typeButtons,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setPostType(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN),
                                            className: `${styles.typeButton} ${postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN ? styles.typeButtonActive : ''} ${styles.typeConcern}`,
                                            children: "고민있어요"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/community/write.tsx",
                                            lineNumber: 123,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setPostType(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT),
                                            className: `${styles.typeButton} ${postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT ? styles.typeButtonActive : ''} ${styles.typeProject}`,
                                            children: "프로젝트"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/community/write.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setPostType(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY),
                                            className: `${styles.typeButton} ${postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY ? styles.typeButtonActive : ''} ${styles.typeStudy}`,
                                            children: "스터디"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/community/write.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/community/write.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/community/write.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: styles.inputGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    className: styles.label,
                                    children: "제목"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/community/write.tsx",
                                    lineNumber: 148,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: title,
                                    onChange: (e)=>setTitle(e.target.value),
                                    placeholder: "제목을 입력하세요",
                                    className: styles.input,
                                    maxLength: 100
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/community/write.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: styles.charCount,
                                    children: [
                                        title.length,
                                        "/100"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/community/write.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/community/write.tsx",
                            lineNumber: 147,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: styles.inputGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    className: styles.label,
                                    children: "내용"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/community/write.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$communityService$2f$SimpleTiptapEditor$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    content: content,
                                    onChange: setContent
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/community/write.tsx",
                                    lineNumber: 162,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/community/write.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: styles.inputGroup,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                    className: styles.label,
                                    children: "태그 (최대 5개)"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/community/write.tsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: styles.tagInputWrapper,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: tagInput,
                                            onChange: (e)=>setTagInput(e.target.value),
                                            onKeyDown: handleTagInputKeyDown,
                                            placeholder: "태그를 입력하고 Enter를 누르세요",
                                            className: styles.input,
                                            maxLength: 20,
                                            disabled: tags.length >= 5
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/community/write.tsx",
                                            lineNumber: 168,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleTagAdd,
                                            className: styles.tagAddButton,
                                            disabled: tags.length >= 5,
                                            children: "추가"
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/community/write.tsx",
                                            lineNumber: 178,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/pages/community/write.tsx",
                                    lineNumber: 167,
                                    columnNumber: 15
                                }, this),
                                tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: styles.tagList,
                                    children: tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: styles.tag,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "#",
                                                        tag
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/community/write.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>handleTagRemove(tag),
                                                    className: styles.tagRemoveButton,
                                                    children: "×"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/community/write.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, tag, true, {
                                            fileName: "[project]/src/pages/community/write.tsx",
                                            lineNumber: 190,
                                            columnNumber: 25
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/community/write.tsx",
                                    lineNumber: 188,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/pages/community/write.tsx",
                            lineNumber: 165,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: styles.actions,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: handleSubmit,
                                disabled: isSubmitting,
                                className: styles.submitButton,
                                children: isSubmitting ? '작성 중...' : '작성 완료'
                            }, void 0, false, {
                                fileName: "[project]/src/pages/community/write.tsx",
                                lineNumber: 206,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/pages/community/write.tsx",
                            lineNumber: 205,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/community/write.tsx",
                    lineNumber: 119,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/community/write.tsx",
            lineNumber: 108,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/community/write.tsx",
        lineNumber: 107,
        columnNumber: 7
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0b7d8020._.js.map