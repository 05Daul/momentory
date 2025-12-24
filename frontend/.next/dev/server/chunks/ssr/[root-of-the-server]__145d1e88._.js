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
"[project]/src/pages/community.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/pages/community/index.tsx
__turbopack_context__.s([
    "default",
    ()=>CommunityPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/MainLayout.tsx [ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/styles/community/CommunityMain.module.css'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
function CommunityPage() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('all');
    const tabs = [
        {
            id: 'all',
            label: '전체',
            icon: '🌐'
        },
        {
            id: 'concern',
            label: '고민있어요',
            icon: '💭'
        },
        {
            id: 'project',
            label: '프로젝트',
            icon: '🚀'
        },
        {
            id: 'study',
            label: '스터디',
            icon: '📚'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: styles.container,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                        className: styles.header,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: styles.headerContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: styles.title,
                                        children: "Momentory 커뮤니티"
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/community.tsx",
                                        lineNumber: 25,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: styles.subtitle,
                                        children: [
                                            activeTab === 'all' && '모든 게시글을 한눈에',
                                            activeTab === 'concern' && '일상, 진로, 고민을 나누는 공간',
                                            activeTab === 'project' && '함께 만들어나가는 프로젝트',
                                            activeTab === 'study' && '지식과 경험을 공유하는 스터디'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/pages/community.tsx",
                                        lineNumber: 26,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/community.tsx",
                                lineNumber: 24,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/community/write",
                                className: styles.writeButton,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    children: "글쓰기"
                                }, void 0, false, {
                                    fileName: "[project]/src/pages/community.tsx",
                                    lineNumber: 34,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/pages/community.tsx",
                                lineNumber: 33,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/community.tsx",
                        lineNumber: 23,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: styles.tabContainer,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                            className: styles.tabs,
                            children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab(tab.id),
                                    className: `${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: styles.tabIcon,
                                            children: tab.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/community.tsx",
                                            lineNumber: 46,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: styles.tabLabel,
                                            children: tab.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/community.tsx",
                                            lineNumber: 47,
                                            columnNumber: 23
                                        }, this),
                                        activeTab === tab.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: styles.activeIndicator
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/community.tsx",
                                            lineNumber: 48,
                                            columnNumber: 48
                                        }, this)
                                    ]
                                }, tab.id, true, {
                                    fileName: "[project]/src/pages/community.tsx",
                                    lineNumber: 41,
                                    columnNumber: 21
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/community.tsx",
                            lineNumber: 39,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/community.tsx",
                        lineNumber: 38,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                        className: styles.main,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: styles.postList,
                            children: [
                                1,
                                2,
                                3
                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
                                    className: styles.postCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: styles.postHeader,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: styles.postType,
                                                    children: activeTab === 'all' ? '고민있어요' : activeTab
                                                }, void 0, false, {
                                                    fileName: "[project]/src/pages/community.tsx",
                                                    lineNumber: 60,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: styles.postActions,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            className: styles.likeButton,
                                                            children: "좋아요 12"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/community.tsx",
                                                            lineNumber: 62,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            className: styles.commentButton,
                                                            children: "댓글 5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/pages/community.tsx",
                                                            lineNumber: 63,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/pages/community.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/community.tsx",
                                            lineNumber: 59,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/community/post/${i}`,
                                            className: styles.postTitle,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                children: [
                                                    "새로운 ",
                                                    activeTab,
                                                    " 주제에 대해 이야기해요!"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/community.tsx",
                                                lineNumber: 67,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/community.tsx",
                                            lineNumber: 66,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: styles.postExcerpt,
                                            children: [
                                                activeTab === 'concern' && '요즘 고민이 많아요...',
                                                activeTab === 'project' && '새로운 프로젝트 아이디어 떠올랐어요!',
                                                activeTab === 'study' && '스터디 모집 중입니다.'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/pages/community.tsx",
                                            lineNumber: 69,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: styles.postFooter,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: styles.authorInfo,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: styles.avatar,
                                                        children: "김"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 76,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: styles.authorName,
                                                                children: "김모멘토리"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/community.tsx",
                                                                lineNumber: 78,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: styles.postDate,
                                                                children: "· 1시간 전"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/pages/community.tsx",
                                                                lineNumber: 79,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/pages/community.tsx",
                                                lineNumber: 75,
                                                columnNumber: 25
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/pages/community.tsx",
                                            lineNumber: 74,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/pages/community.tsx",
                                    lineNumber: 58,
                                    columnNumber: 21
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/pages/community.tsx",
                            lineNumber: 55,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/community.tsx",
                        lineNumber: 54,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/community.tsx",
                lineNumber: 22,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/community.tsx",
            lineNumber: 21,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/community.tsx",
        lineNumber: 20,
        columnNumber: 7
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__145d1e88._.js.map