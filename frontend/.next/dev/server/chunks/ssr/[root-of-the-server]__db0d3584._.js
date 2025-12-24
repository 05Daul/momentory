module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

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
"[project]/src/api/userService/friends.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/api/userService/friends.ts
__turbopack_context__.s([
    "acceptFriendRequest",
    ()=>acceptFriendRequest,
    "blockUser",
    ()=>blockUser,
    "deleteFriend",
    ()=>deleteFriend,
    "getFriendshipStatus",
    ()=>getFriendshipStatus,
    "rejectFriendRequest",
    ()=>rejectFriendRequest,
    "sendFriendRequest",
    ()=>sendFriendRequest,
    "unblockUser",
    ()=>unblockUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [ssr] (ecmascript)");
;
async function getFriendshipStatus(currentUserSignId, targetUserSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/status?targetUserId=${encodeURIComponent(targetUserSignId)}`, {
        method: "GET",
        headers: {
            userSignId: currentUserSignId
        }
    });
    if (response.status === 204) {
        return null; // 관계 없음
    }
    if (response.ok) {
        return await response.json();
    }
    throw new Error("상태 조회 실패");
}
async function sendFriendRequest(currentUserSignId, receiverSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/request`, {
        method: "POST",
        headers: {
            userSignId: currentUserSignId,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            receiverSignId
        })
    });
    if (response.ok) {
        return await response.json();
    }
    const msg = await response.text();
    throw new Error(msg || "친구 요청 실패");
}
async function acceptFriendRequest(currentUserSignId, friendId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}/accept`, {
        method: "PUT",
        headers: {
            userSignId: currentUserSignId,
            "Content-Length": "0"
        }
    });
    if (response.ok) {
        return await response.json();
    }
    const msg = await response.text();
    throw new Error(msg || "수락 실패");
}
async function rejectFriendRequest(currentUserSignId, friendId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}/reject`, {
        method: "DELETE",
        headers: {
            userSignId: currentUserSignId
        }
    });
    if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "거절 실패");
    }
}
async function deleteFriend(currentUserSignId, friendId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}`, {
        method: "DELETE",
        headers: {
            userSignId: currentUserSignId
        }
    });
    if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "친구 삭제 실패");
    }
}
async function blockUser(currentUserSignId, receiverSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/block`, {
        method: "POST",
        headers: {
            userSignId: currentUserSignId,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            receiverSignId
        })
    });
    if (response.ok) {
        return await response.json();
    }
    const msg = await response.text();
    throw new Error(msg || "차단 실패");
}
async function unblockUser(currentUserSignId, friendId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}/unblock`, {
        method: "DELETE",
        headers: {
            userSignId: currentUserSignId
        }
    });
    if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || "차단 해제 실패");
    }
}
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
(()=>{
    const e = new Error("Cannot find module '@/styles/blogService/moduleDeleteConfirmModal.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/userService/friends.ts [ssr] (ecmascript)");
;
;
;
;
function FriendManagerModal({ currentUserSignId, isOpen, onClose }) {
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("add");
    const [inputId, setInputId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [friends, setFriends] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const API_BASE = ("TURBOPACK compile-time value", "http://127.0.0.1:1000/user");
    const loadData = async ()=>{
        setLoading(true);
        try {
            const [reqRes, friendRes] = await Promise.all([
                fetch(`${API_BASE}/friends/requests/received`, {
                    headers: {
                        userSignId: currentUserSignId
                    }
                }),
                fetch(`${API_BASE}/friends`, {
                    headers: {
                        userSignId: currentUserSignId
                    }
                })
            ]);
            if (reqRes.ok) {
                const data = await reqRes.json();
                setRequests(data.map((d)=>({
                        friendId: d.friendId,
                        userSignId: d.requesterSignId
                    })));
            }
            if (friendRes.ok) {
                const data = await friendRes.json();
                setFriends(data.map((d)=>({
                        friendId: d.friendId,
                        userSignId: d.requesterSignId === currentUserSignId ? d.receiverSignId : d.requesterSignId
                    })));
            }
        } catch (err) {
            console.error(err);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isOpen) loadData();
    }, [
        isOpen
    ]);
    const sendRequest = async ()=>{
        if (!inputId.trim()) return alert("아이디를 입력해주세요");
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["sendFriendRequest"])(currentUserSignId, inputId.trim());
            alert("친구 요청을 보냈습니다!");
            setInputId("");
        } catch (err) {
            alert(err.message || "요청 실패");
        }
    };
    const accept = async (friendId)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["acceptFriendRequest"])(currentUserSignId, friendId);
        loadData();
    };
    const reject = async (friendId)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["rejectFriendRequest"])(currentUserSignId, friendId);
        loadData();
    };
    const remove = async (friendId)=>{
        if (!confirm("정말 삭제하시겠습니까?")) return;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["deleteFriend"])(currentUserSignId, friendId);
        loadData();
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "modalBackdrop",
        style: {
            zIndex: 9999
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "modalContent",
            style: {
                maxWidth: "440px",
                width: "95%"
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                    className: "modalTitle",
                    children: "친구 관리"
                }, void 0, false, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex border-b mb-5 -mx-8",
                    children: [
                        "add",
                        "requests",
                        "friends"
                    ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>setTab(t),
                            className: `flex-1 py-3 text-sm font-semibold transition ${tab === t ? "text-red-600 border-b-2 border-red-600" : "text-gray-500 hover:text-gray-700"}`,
                            children: [
                                t === "add" && "친구 추가",
                                t === "requests" && `받은 요청 (${requests.length})`,
                                t === "friends" && `내 친구 (${friends.length})`
                            ]
                        }, t, true, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 112,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 110,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "min-h-64",
                    children: [
                        tab === "add" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: inputId,
                                    onChange: (e)=>setInputId(e.target.value),
                                    onKeyDown: (e)=>e.key === "Enter" && sendRequest(),
                                    placeholder: "친구의 아이디를 입력하세요",
                                    className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 133,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    className: "modalMessage text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                            children: inputId || "[아이디]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                            lineNumber: 142,
                                            columnNumber: 21
                                        }, this),
                                        "님에게",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                            lineNumber: 143,
                                            columnNumber: 21
                                        }, this),
                                        "친구 요청을 보내시겠습니까?"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 141,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "modalActions",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: "cancelButton",
                                            onClick: onClose,
                                            children: "취소"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                            lineNumber: 147,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            className: "deleteButton",
                                            disabled: loading || !inputId.trim(),
                                            onClick: sendRequest,
                                            children: loading ? "보내는 중..." : "요청 보내기"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                            lineNumber: 150,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 146,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 132,
                            columnNumber: 17
                        }, this),
                        tab === "requests" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: requests.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-500 py-10",
                                children: "받은 요청이 없습니다"
                            }, void 0, false, {
                                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                lineNumber: 165,
                                columnNumber: 23
                            }, this) : requests.map((req)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: req.userSignId
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                            lineNumber: 169,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>reject(req.friendId),
                                                    className: "px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400",
                                                    children: "거절"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 31
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>accept(req.friendId),
                                                    className: "px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700",
                                                    children: "수락"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                            lineNumber: 170,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, req.friendId, true, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 168,
                                    columnNumber: 27
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 163,
                            columnNumber: 17
                        }, this),
                        tab === "friends" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: friends.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                className: "text-center text-gray-500 py-10",
                                children: "아직 친구가 없습니다"
                            }, void 0, false, {
                                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                lineNumber: 194,
                                columnNumber: 23
                            }, this) : friends.map((friend)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: friend.userSignId
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                            lineNumber: 198,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>remove(friend.friendId),
                                            className: "text-sm text-red-600 hover:underline",
                                            children: "삭제"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                            lineNumber: 199,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, friend.friendId, true, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 197,
                                    columnNumber: 27
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 192,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "mt-6 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: "text-sm text-gray-500 hover:text-gray-700",
                        children: "닫기"
                    }, void 0, false, {
                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                        lineNumber: 213,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 212,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
            lineNumber: 102,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
        lineNumber: 101,
        columnNumber: 7
    }, this);
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
"[project]/src/styles/community/CommunityMain.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "activeTab": "CommunityMain-module__acAlRW__activeTab",
  "author": "CommunityMain-module__acAlRW__author",
  "authorInfo": "CommunityMain-module__acAlRW__authorInfo",
  "badge": "CommunityMain-module__acAlRW__badge",
  "badgeConcern": "CommunityMain-module__acAlRW__badgeConcern",
  "badgeContainer": "CommunityMain-module__acAlRW__badgeContainer",
  "badgeProject": "CommunityMain-module__acAlRW__badgeProject",
  "badgeStudy": "CommunityMain-module__acAlRW__badgeStudy",
  "card": "CommunityMain-module__acAlRW__card",
  "cardExcerpt": "CommunityMain-module__acAlRW__cardExcerpt",
  "cardFooter": "CommunityMain-module__acAlRW__cardFooter",
  "cardHeader": "CommunityMain-module__acAlRW__cardHeader",
  "cardLink": "CommunityMain-module__acAlRW__cardLink",
  "cardTitle": "CommunityMain-module__acAlRW__cardTitle",
  "container": "CommunityMain-module__acAlRW__container",
  "dateInfo": "CommunityMain-module__acAlRW__dateInfo",
  "dateRight": "CommunityMain-module__acAlRW__dateRight",
  "fab": "CommunityMain-module__acAlRW__fab",
  "grid": "CommunityMain-module__acAlRW__grid",
  "header": "CommunityMain-module__acAlRW__header",
  "stats": "CommunityMain-module__acAlRW__stats",
  "statusBadge": "CommunityMain-module__acAlRW__statusBadge",
  "statusClosed": "CommunityMain-module__acAlRW__statusClosed",
  "statusInfo": "CommunityMain-module__acAlRW__statusInfo",
  "statusRecruiting": "CommunityMain-module__acAlRW__statusRecruiting",
  "subtitle": "CommunityMain-module__acAlRW__subtitle",
  "tab": "CommunityMain-module__acAlRW__tab",
  "tabContainer": "CommunityMain-module__acAlRW__tabContainer",
  "tabEmoji": "CommunityMain-module__acAlRW__tabEmoji",
});
}),
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
"[project]/src/api/communityService/like.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/api/communityService/like.ts
__turbopack_context__.s([
    "checkLike",
    ()=>checkLike,
    "getLikeCount",
    ()=>getLikeCount,
    "toggleLike",
    ()=>toggleLike
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [ssr] (ecmascript)");
;
async function toggleLike(type, communityId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/likes/${type.toUpperCase()}/${communityId}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "userSignId": userSignId
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `좋아요 토글 실패: HTTP ${response.status}`);
    }
}
async function getLikeCount(type, communityId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/likes/${type.toUpperCase()}/${communityId}/count`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `좋아요 수 조회 실패: HTTP ${response.status}`);
    }
}
async function checkLike(type, communityId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/likes/${type.toUpperCase()}/${communityId}/check`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "userSignId": userSignId
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `좋아요 여부 확인 실패: HTTP ${response.status}`);
    }
}
}),
"[project]/src/api/communityService/comment.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/api/communityService/comment.ts
__turbopack_context__.s([
    "createComment",
    ()=>createComment,
    "deleteComment",
    ()=>deleteComment,
    "getCommentCount",
    ()=>getCommentCount,
    "getComments",
    ()=>getComments,
    "getReplies",
    ()=>getReplies,
    "updateComment",
    ()=>updateComment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [ssr] (ecmascript)");
;
async function createComment(type, communityId, request, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/comments/${type.toUpperCase()}/${communityId}`;
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
        throw new Error(errorText || `댓글 작성 실패: HTTP ${response.status}`);
    }
}
async function getComments(type, communityId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/comments/${type.toUpperCase()}/${communityId}`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `댓글 조회 실패: HTTP ${response.status}`);
    }
}
async function getReplies(commentId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/comments/${commentId}/replies`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `대댓글 조회 실패: HTTP ${response.status}`);
    }
}
async function getCommentCount(type, communityId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/comments/${type.toUpperCase()}/${communityId}/count`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `댓글 수 조회 실패: HTTP ${response.status}`);
    }
}
async function updateComment(type, communityId, commentId, request, userSignId) {
    // 백엔드 CommentController의 PUT 경로: /community/{type}/{communityId}/comments/{commentId}
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/${type.toUpperCase()}/${communityId}/comments/${commentId}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "userSignId": userSignId
        },
        body: JSON.stringify(request)
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `댓글 수정 실패: HTTP ${response.status}`);
    }
}
async function deleteComment(type, communityId, commentId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/${type.toUpperCase()}/${communityId}/comments/${commentId}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "userSignId": userSignId
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `댓글 삭제 실패: HTTP ${response.status}`);
    }
}
}),
"[project]/src/api/communityService/tag.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/api/communityService/tag.ts
__turbopack_context__.s([
    "getTags",
    ()=>getTags
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [ssr] (ecmascript)");
;
async function getTags(communityId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/tags/${communityId}`;
    const response = await fetch(url, {
        method: "GET"
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `태그 조회 실패: HTTP ${response.status}`);
    }
}
}),
"[project]/src/types/communityService/communityType.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/types/communityService/communityType.ts
__turbopack_context__.s([
    "CommunityPostType",
    ()=>CommunityPostType,
    "PostFormat",
    ()=>PostFormat,
    "RecruitmentStatus",
    ()=>RecruitmentStatus
]);
var RecruitmentStatus = /*#__PURE__*/ function(RecruitmentStatus) {
    RecruitmentStatus["RECRUITING"] = "RECRUITING";
    RecruitmentStatus["COMPLETED"] = "COMPLETED";
    RecruitmentStatus["CLOSED"] = "CLOSED"; // 기타 사유로 종료
    return RecruitmentStatus;
}({});
var PostFormat = /*#__PURE__*/ function(PostFormat) {
    PostFormat["ONLINE"] = "ONLINE";
    PostFormat["OFFLINE"] = "OFFLINE";
    PostFormat["HYBRID"] = "HYBRID"; // 혼합 (선택 사항)
    return PostFormat;
}({});
var CommunityPostType = /*#__PURE__*/ function(CommunityPostType) {
    CommunityPostType["CONCERN"] = "CONCERN";
    CommunityPostType["PROJECT"] = "PROJECT";
    CommunityPostType["STUDY"] = "STUDY";
    return CommunityPostType;
}({});
}),
"[externals]/react-intersection-observer [external] (react-intersection-observer, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("react-intersection-observer");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/pages/community.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// src/pages/community.tsx
__turbopack_context__.s([
    "default",
    ()=>Community
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/MainLayout.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/community/CommunityMain.module.css [ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/communityService/community.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$like$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/communityService/like.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/communityService/comment.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$tag$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/communityService/tag.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/communityService/communityType.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/react-intersection-observer [external] (react-intersection-observer, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
;
function Community() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('all');
    // ⭐️ [확인] CommunityPost[]로 설정 완료
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0); // 다음으로 로드할 페이지 인덱스 (0부터 시작)
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [userSignId, setUserSignId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$intersection$2d$observer__$5b$external$5d$__$28$react$2d$intersection$2d$observer$2c$__esm_import$29$__["useInView"])({
        threshold: 0.5,
        triggerOnce: false
    });
    const tabs = [
        {
            id: 'all',
            label: '전체',
            emoji: 'All'
        },
        {
            id: 'concern',
            label: '고민있어요',
            emoji: 'Thought'
        },
        {
            id: 'project',
            label: '프로젝트',
            emoji: 'Rocket'
        },
        {
            id: 'study',
            label: '스터디',
            emoji: 'Book'
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        setUserSignId(localStorage.getItem('userSignId') || '');
    }, []);
    // ----------------------------------------------------------------------------------
    // 1. 단일 탭 데이터 요청 및 처리 함수 (API 호출 + 좋아요/댓글/태그 정보 추가)
    // ----------------------------------------------------------------------------------
    // ⭐️ [확인] 반환 타입이 { posts: CommunityPost[], ... } 로 정확히 설정됨
    const fetchAndProcessPosts = async (tab, pageNum)=>{
        try {
            let response;
            let postType;
            switch(tab){
                case 'concern':
                    response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getConcernList"])(pageNum, 10);
                    postType = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN;
                    break;
                case 'project':
                    response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getProjectList"])(pageNum, 10);
                    postType = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT;
                    break;
                case 'study':
                    response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getStudyList"])(pageNum, 10);
                    postType = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY;
                    break;
                default:
                    return {
                        posts: [],
                        totalPages: 0
                    };
            }
            if (!response?.content) return {
                posts: [],
                totalPages: 0
            };
            const extendedPosts = await Promise.all(response.content.map(async (post)=>{
                const [likeCount, commentCount, isLiked, tags] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$like$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getLikeCount"])(postType, post.communityId).catch(()=>0),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$comment$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getCommentCount"])(postType, post.communityId).catch(()=>0),
                    userSignId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$like$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["checkLike"])(postType, post.communityId, userSignId).catch(()=>false) : false,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$tag$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getTags"])(post.communityId).catch(()=>[])
                ]);
                return {
                    ...post,
                    postType,
                    likeCount,
                    commentCount,
                    isLiked,
                    tags,
                    status: post.status,
                    deadline: post.deadline,
                    startDate: post.startDate
                };
            }));
            return {
                posts: extendedPosts,
                totalPages: response.totalPages
            };
        } catch (error) {
            console.error(`[fetchAndProcessPosts] ${tab} 로딩 실패:`, error);
            return {
                posts: [],
                totalPages: 0
            };
        }
    };
    // ----------------------------------------------------------------------------------
    // 2. 중앙 데이터 로딩 및 상태 업데이트 함수 (중복 로딩 방지 로직 포함)
    // ----------------------------------------------------------------------------------
    const loadData = async (targetPage, tab)=>{
        // 이미 로딩 중이거나 더 이상 데이터가 없으면 요청하지 않음
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        try {
            // ⭐️ [수정] fetchedPosts 타입을 CommunityPost[]로 명시합니다.
            let fetchedPosts = [];
            let totalPages = 0;
            if (tab !== 'all') {
                // Case 1: Single Tab (Concern, Project, Study)
                const result = await fetchAndProcessPosts(tab, targetPage);
                fetchedPosts = result.posts;
                totalPages = result.totalPages;
            } else {
                // Case 2: 'all' Tab (모든 탭에서 데이터를 가져와 병합)
                const [concerns, projects, studies] = await Promise.all([
                    fetchAndProcessPosts('concern', targetPage),
                    fetchAndProcessPosts('project', targetPage),
                    fetchAndProcessPosts('study', targetPage)
                ]);
                fetchedPosts = [
                    ...concerns.posts,
                    ...projects.posts,
                    ...studies.posts
                ].sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                // totalPages는 셋 중 가장 큰 값 또는 페이지가 남아있는지 여부를 판단하는 근사치 사용
                totalPages = Math.max(concerns.totalPages, projects.totalPages, studies.totalPages);
            }
            if (fetchedPosts.length > 0) {
                setPosts((prev)=>{
                    // ⭐️ [핵심 수정] 중복 게시글 필터링 로직
                    const existingIds = new Set(prev.map((p)=>`${p.postType}-${p.communityId}`));
                    const filteredNewPosts = fetchedPosts.filter((p)=>!existingIds.has(`${p.postType}-${p.communityId}`));
                    // 페이지 0(초기 로드 또는 탭 변경)인 경우, 기존 게시글을 덮어씁니다.
                    const finalPosts = targetPage === 0 ? filteredNewPosts : [
                        ...prev,
                        ...filteredNewPosts
                    ];
                    return finalPosts;
                });
                // ⭐️ [핵심 수정] 성공적으로 데이터를 로드한 후에만 페이지 인덱스 업데이트
                setPage(targetPage + 1);
                setHasMore(targetPage + 1 < totalPages);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to load data:', error);
            setHasMore(false);
        } finally{
            setIsLoading(false);
        }
    };
    // ----------------------------------------------------------------------------------
    // 3. Effect for Tab Change (Initial Load: Page 0)
    // ----------------------------------------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // ⭐️ [수정] 탭 변경 시 상태 초기화 및 페이지 0 로드 요청
        setPosts([]);
        setPage(0);
        setHasMore(true);
        // Strict Mode에서 두 번 호출되지만, loadData 내부의 isLoading 체크와 중복 필터링으로 해결
        loadData(0, activeTab);
    }, [
        activeTab,
        userSignId
    ]);
    // ----------------------------------------------------------------------------------
    // 4. Effect for Infinite Scroll (Load Next Page)
    // ----------------------------------------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (inView && hasMore && !isLoading) {
            // ✅ inView일 때, 현재 page 상태(다음 로드할 페이지 번호)를 사용하여 데이터 로드
            loadData(page, activeTab);
        }
    }, [
        inView,
        hasMore,
        isLoading
    ]); // page 상태 변화에 직접 의존하지 않아 무한 루프 위험 방지
    const handleLikeToggle = async (post)=>{
        if (!userSignId) {
            alert('로그인이 필요합니다.');
            return;
        }
        try {
            const newIsLiked = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$like$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["toggleLike"])(post.postType, post.communityId, userSignId);
            setPosts((prevPosts)=>prevPosts.map((p)=>p.communityId === post.communityId && p.postType === post.postType ? {
                        ...p,
                        isLiked: newIsLiked,
                        likeCount: p.likeCount + (newIsLiked ? 1 : -1)
                    } : p));
        } catch (error) {
            alert('좋아요 처리에 실패했습니다.');
        }
    };
    const formatDate = (dateString)=>{
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // 유효하지 않은 날짜 처리
            return '날짜 오류';
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };
    // HTML 태그 제거 및 안전한 텍스트 추출
    const getPlainText = (html)=>{
        if (!html) return '내용 없음';
        try {
            // 브라우저 환경에서 DOM 파싱을 통해 안전하게 텍스트 추출
            const tmp = document.createElement('div');
            tmp.innerHTML = html;
            const text = tmp.textContent || tmp.innerText || '';
            return text.trim() || '내용 없음';
        } catch  {
            return '내용 없음';
        }
    };
    const getBadgeStyle = (type)=>{
        switch(type){
            case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN:
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].badgeConcern;
            case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT:
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].badgeProject;
            case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY:
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].badgeStudy;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].badgeConcern;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tabContainer,
                    children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab(tab.id),
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tab} ${activeTab === tab.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].activeTab : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tabEmoji,
                                    children: tab.emoji
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/community.tsx",
                                    lineNumber: 257,
                                    columnNumber: 19
                                }, this),
                                tab.label
                            ]
                        }, tab.id, true, {
                            fileName: "[project]/src/pages/community.tsx",
                            lineNumber: 252,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/pages/community.tsx",
                    lineNumber: 250,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].grid,
                    children: posts.map((post)=>{
                        const postTypeLabel = post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN ? '고민' : post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT ? '프로젝트' : '스터디';
                        const badgeClass = post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].badgeConcern : post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].badgeProject : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].badgeStudy;
                        if (post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT || post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY) {
                            console.log(`Post ID: ${post.communityId}, Status: ${post.status}, Deadline: ${post.deadline}, StartDate: ${post.startDate}`);
                        }
                        const plainText = getPlainText(post.content);
                        const excerpt = plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/community/${post.postType.toLowerCase()}/${post.communityId}`,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardLink,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].card,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].badgeContainer,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].badge} ${badgeClass}`,
                                                        children: postTypeLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 27
                                                    }, this),
                                                    (post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT || post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY) && post.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusBadge} ${post.status === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RecruitmentStatus"].RECRUITING ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusRecruiting : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].statusClosed}`,
                                                        children: post.status === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["RecruitmentStatus"].RECRUITING ? '모집중' : '마감'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/community.tsx",
                                                lineNumber: 291,
                                                columnNumber: 25
                                            }, this),
                                            (post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT || post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].dateRight,
                                                children: [
                                                    post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT && post.deadline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].dateInfo,
                                                        children: [
                                                            "마감일: ",
                                                            formatDate(post.deadline)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 35
                                                    }, this),
                                                    post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY && post.startDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].dateInfo,
                                                        children: [
                                                            "시작일: ",
                                                            formatDate(post.startDate)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 35
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/community.tsx",
                                                lineNumber: 306,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/community.tsx",
                                        lineNumber: 290,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardTitle,
                                        children: post.title || '제목 없음'
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/community.tsx",
                                        lineNumber: 322,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardExcerpt,
                                        children: excerpt
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/community.tsx",
                                        lineNumber: 323,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tags,
                                        children: post.tags && post.tags.length > 0 && post.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tag,
                                                children: [
                                                    "#",
                                                    tag
                                                ]
                                            }, tag, true, {
                                                fileName: "[project]/src/pages/community.tsx",
                                                lineNumber: 326,
                                                columnNumber: 29
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/community.tsx",
                                        lineNumber: 324,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardFooter,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authorInfo,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].author,
                                                        children: post.authorNickname || '익명'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].time,
                                                        children: formatDate(post.createdAt)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 332,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/community.tsx",
                                                lineNumber: 330,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].stats,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            handleLikeToggle(post);
                                                        },
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].likeButton} ${post.isLiked ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].liked : ''}`,
                                                        children: [
                                                            "좋아요 ",
                                                            post.likeCount || 0
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "댓글 ",
                                                            post.commentCount || 0
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/community.tsx",
                                                lineNumber: 334,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/community.tsx",
                                        lineNumber: 329,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/community.tsx",
                                lineNumber: 288,
                                columnNumber: 21
                            }, this)
                        }, `${post.postType}-${post.communityId}`, false, {
                            fileName: "[project]/src/pages/community.tsx",
                            lineNumber: 283,
                            columnNumber: 19
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/pages/community.tsx",
                    lineNumber: 263,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    ref: ref,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].loadMore,
                    children: !hasMore && posts.length > 0
                }, void 0, false, {
                    fileName: "[project]/src/pages/community.tsx",
                    lineNumber: 353,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/community/write",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].fab,
                    children: "+ 글쓰기"
                }, void 0, false, {
                    fileName: "[project]/src/pages/community.tsx",
                    lineNumber: 357,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/community.tsx",
            lineNumber: 249,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/community.tsx",
        lineNumber: 248,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__db0d3584._.js.map