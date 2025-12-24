module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/@stomp/stompjs [external] (@stomp/stompjs, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@stomp/stompjs");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/sockjs-client [external] (sockjs-client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("sockjs-client", () => require("sockjs-client"));

module.exports = mod;
}),
"[project]/src/hooks/useWebSocket.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// src/hooks/useWebSocket.ts
__turbopack_context__.s([
    "useWebSocket",
    ()=>useWebSocket
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$stomp$2f$stompjs__$5b$external$5d$__$2840$stomp$2f$stompjs$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@stomp/stompjs [external] (@stomp/stompjs, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$sockjs$2d$client__$5b$external$5d$__$28$sockjs$2d$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/sockjs-client [external] (sockjs-client, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$stomp$2f$stompjs__$5b$external$5d$__$2840$stomp$2f$stompjs$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$stomp$2f$stompjs__$5b$external$5d$__$2840$stomp$2f$stompjs$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
// SockJS는 http/https 로 시작하는 URL만 허용한다 → ws:// → http:// 로 바꿔줘야 함
function getSockJSUrl(originalUrl) {
    // ws://localhost:8084/ws-chat   → http://localhost:8084/ws-chat
    // wss://api.example.com/chat  → https://api.example.com/chat
    return originalUrl.replace(/^ws(s)?:\/\//, (matched, s)=>s ? 'https://' : 'http://');
}
function useWebSocket({ url, roomId, onMessage }) {
    const clientRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const connect = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        const sockUrl = getSockJSUrl(url); // 여기서 자동 변환
        const client = new __TURBOPACK__imported__module__$5b$externals$5d2f40$stomp$2f$stompjs__$5b$external$5d$__$2840$stomp$2f$stompjs$2c$__esm_import$29$__["Client"]({
            webSocketFactory: ()=>new __TURBOPACK__imported__module__$5b$externals$5d2f$sockjs$2d$client__$5b$external$5d$__$28$sockjs$2d$client$2c$__cjs$29$__["default"](sockUrl),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            // 디버그는 개발할 때만 켜세요 (프로덕션에서는 끄는 게 좋음)
            debug: (str)=>{
                if ("TURBOPACK compile-time truthy", 1) {
                    console.log('STOMP →', str);
                }
            },
            onConnect: ()=>{
                console.log('WebSocket 연결 성공');
                setIsConnected(true);
                if (roomId) {
                    client.subscribe(`/topic/chat/${roomId}`, (msg)=>{
                        try {
                            const data = JSON.parse(msg.body);
                            onMessage(data);
                        } catch (e) {
                            console.error('메시지 파싱 실패', e);
                        }
                    });
                    console.log(`구독 완료: /topic/chat.room.${roomId}`);
                }
            },
            onStompError: (frame)=>{
                console.error('STOMP 오류', frame.headers['message'], frame.body);
                setIsConnected(false);
            },
            onWebSocketError: (error)=>{
                console.error('WebSocket 오류', error);
            },
            onWebSocketClose: ()=>{
                console.log('WebSocket 연결 종료');
                setIsConnected(false);
            }
        });
        client.activate();
        clientRef.current = client;
    }, [
        url,
        roomId,
        onMessage
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        connect();
        return ()=>{
            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }
        };
    }, [
        connect
    ]);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((payload)=>{
        if (clientRef.current?.connected) {
            clientRef.current.publish({
                destination: '/app/chat.message',
                body: JSON.stringify(payload)
            });
        } else {
            console.warn('WebSocket 연결 안됨 → 메시지 전송 실패', payload);
        }
    }, []);
    return {
        isConnected,
        sendMessage
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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
"[project]/src/api/chatService/chat.ts [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/api/chatService/chat.ts
__turbopack_context__.s([
    "createChatRoom",
    ()=>createChatRoom,
    "getChatHistory",
    ()=>getChatHistory,
    "getChatRooms",
    ()=>getChatRooms,
    "markMessagesAsRead",
    ()=>markMessagesAsRead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [ssr] (ecmascript)");
;
// 공통 인증 헤더 + userSignId 헤더 포함
const getHeaders = (userSignId)=>{
    const token = localStorage.getItem("accessToken");
    const headers = {
        "Content-Type": "application/json"
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    if (userSignId) {
        headers["userSignId"] = userSignId; // 백엔드 @RequestHeader 필수!
    }
    return headers;
};
async function createChatRoom(participantIds, roomName, currentUserSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CHATSERVICE_API"]}/rooms`, {
        method: "POST",
        headers: getHeaders(currentUserSignId),
        body: JSON.stringify({
            participantIds,
            roomName: roomName || null
        })
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`채팅방 생성 실패: ${error}`);
    }
    return response.json();
}
async function getChatRooms(userSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CHATSERVICE_API"]}/rooms`, {
        method: "GET",
        headers: getHeaders(userSignId)
    });
    if (response.status === 204) return [];
    if (!response.ok) {
        throw new Error("채팅방 목록 조회 실패");
    }
    return response.json();
}
async function getChatHistory(roomId, page = 0, size = 50) {
    const token = localStorage.getItem("accessToken");
    const headers = {
        "Content-Type": "application/json"
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CHATSERVICE_API"]}/rooms/${roomId}/messages?page=${page}&size=${size}`, {
        headers
    });
    if (response.status === 204) return [];
    if (!response.ok) throw new Error("메시지 조회 실패");
    return response.json();
}
async function markMessagesAsRead(roomId, userSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["CHATSERVICE_API"]}/rooms/${roomId}/read`, {
        method: "PUT",
        headers: {
            ...getHeaders(userSignId),
            "Content-Length": "0"
        }
    });
    if (!response.ok) {
        throw new Error("읽음 처리 실패");
    }
}
}),
"[project]/src/component/chatService/ChatRoom.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// app/chat/[roomId]/ChatRoom.tsx (또는 pages/chat/[roomId]/ChatRoom.tsx)
__turbopack_context__.s([
    "default",
    ()=>ChatRoom
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWebSocket.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/chatService/chat.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [ssr] (ecmascript) <export default as ArrowLeft>");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
"use client";
;
;
;
;
;
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
function ChatRoom({ roomId, currentUserId, currentUserName, roomName, onBack }) {
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [inputMessage, setInputMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    // 자동 스크롤 (새 메시지 수신 시)
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, []);
    // 메시지 수신 핸들러
    const handleNewMessage = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((newMessage)=>{
        setMessages((prev)=>[
                ...prev,
                newMessage
            ]);
        scrollToBottom();
        // 상대방이 보낸 메시지만 읽음 처리
        if (newMessage.userSignId !== currentUserId) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["markMessagesAsRead"])(roomId, currentUserId).catch(console.error);
        }
    }, [
        currentUserId,
        roomId,
        scrollToBottom
    ]);
    // WebSocket 연결
    const { isConnected, sendMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["useWebSocket"])({
        url: 'http://localhost:1005/ws-chat',
        onMessage: handleNewMessage
    });
    // 채팅 히스토리 로드
    const loadChatHistory = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(async ()=>{
        setIsLoading(true);
        try {
            const history = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getChatHistory"])(roomId);
            // 최신 메시지가 아래로 오도록 정렬 (API가 최신순이라면 reverse 필요)
            setMessages(Array.isArray(history) ? history.reverse() : []);
        } catch (err) {
            console.error('채팅 히스토리 로드 실패:', err);
            setMessages([]);
        } finally{
            setIsLoading(false);
            setTimeout(scrollToBottom, 100); // DOM 렌더링 후 스크롤
        }
    }, [
        roomId,
        scrollToBottom
    ]);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        loadChatHistory();
    }, [
        loadChatHistory
    ]);
    // 메시지 전송
    const handleSendMessage = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        const trimmed = inputMessage.trim();
        if (!trimmed || !isConnected) return;
        const messageDto = {
            roomId,
            userSignId: currentUserId,
            name: currentUserName,
            content: trimmed,
            type: 'TALK'
        };
        sendMessage(messageDto);
        setInputMessage('');
        inputRef.current?.focus();
    }, [
        inputMessage,
        isConnected,
        currentUserId,
        currentUserName,
        roomId,
        sendMessage
    ]);
    // Enter 키로 전송 (Shift+Enter는 줄바꿈 허용 안 함)
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    // 시간 포맷팅
    const formatTime = (dateString)=>{
        if (!dateString) return '';
        return new Date(dateString).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: "flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "p-2 rounded-full hover:bg-gray-100 md:hidden",
                        "aria-label": "뒤로 가기",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                            lineNumber: 124,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-none",
                        children: roomName
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: `w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`,
                                "aria-label": isConnected ? '연결됨' : '연결 끊김'
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-500",
                                children: isConnected ? '온라인' : '오프라인'
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 136,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                lineNumber: 118,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: "flex-1 overflow-y-auto px-4 py-6 space-y-4",
                children: [
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center text-gray-500",
                        children: "메시지를 불러오는 중..."
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 145,
                        columnNumber: 15
                    }, this) : messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-center text-gray-500",
                        children: "아직 메시지가 없습니다."
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 147,
                        columnNumber: 15
                    }, this) : messages.map((msg)=>{
                        const isMine = msg.userSignId === currentUserId;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: `flex ${isMine ? 'justify-end' : 'justify-start'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: `flex flex-col max-w-[80%] sm:max-w-md ${isMine ? 'items-end' : 'items-start'}`,
                                children: [
                                    !isMine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-medium text-gray-600 mb-1 px-1",
                                        children: msg.name || msg.userSignId
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                        lineNumber: 163,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `px-4 py-3 rounded-2xl shadow-sm break-words ${isMine ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'}`,
                                        children: msg.content
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                        lineNumber: 168,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-400 mt-1 px-1",
                                        children: formatTime(msg.createdAt)
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                        lineNumber: 178,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 157,
                                columnNumber: 23
                            }, this)
                        }, msg.chatId, false, {
                            fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                            lineNumber: 153,
                            columnNumber: 21
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                className: "border-t border-gray-200 bg-white p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 max-w-4xl mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            ref: inputRef,
                            type: "text",
                            value: inputMessage,
                            onChange: (e)=>setInputMessage(e.target.value),
                            onKeyDown: handleKeyDown,
                            placeholder: "메시지를 입력하세요...",
                            disabled: !isConnected,
                            className: "flex-1 px-5 py-3 text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 transition",
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: handleSendMessage,
                            disabled: !isConnected || !inputMessage.trim(),
                            className: "p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition shadow-lg",
                            "aria-label": "전송",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 209,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                            lineNumber: 203,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                    lineNumber: 191,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                lineNumber: 190,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
        lineNumber: 116,
        columnNumber: 7
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/component/chatService/ChatRoomList.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ChatRoomList.tsx
__turbopack_context__.s([
    "default",
    ()=>ChatRoomList
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/chatService/chat.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [ssr] (ecmascript) <export default as Plus>");
;
;
;
;
function ChatRoomList({ currentUserId, onSelectRoom, onCreateRoom }) {
    const [rooms, setRooms] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (currentUserId) {
            loadRooms();
        }
    }, [
        currentUserId
    ]);
    const loadRooms = async ()=>{
        setLoading(true);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getChatRooms"])(currentUserId); // currentUserId 전달
            setRooms(data);
        } catch (err) {
            console.error('채팅방 목록 로드 실패:', err);
        } finally{
            setLoading(false);
        }
    };
    // 수정된 formatTime 함수 (문자열을 반환하도록 보장)
    const formatTime = (dateString)=>{
        if (!dateString) return '알 수 없음';
        const now = new Date();
        const messageTime = new Date(dateString);
        const diffInMs = now.getTime() - messageTime.getTime();
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if (diffInMinutes < 1) return '방금 전';
        if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
        if (diffInHours < 24) return `${diffInHours}시간 전`;
        if (diffInDays < 7) return `${diffInDays}일 전`;
        // 7일 이상이면 날짜 포맷 (예: 12.25 또는 2025.01.01)
        const isThisYear = now.getFullYear() === messageTime.getFullYear();
        if (isThisYear) {
            return `${messageTime.getMonth() + 1}.${messageTime.getDate()}`;
        }
        return `${messageTime.getFullYear().toString().slice(2)}.${(messageTime.getMonth() + 1).toString().padStart(2, '0')}.${messageTime.getDate().toString().padStart(2, '0')}`;
    };
    const filteredRooms = rooms.filter((room)=>room.roomName?.toLowerCase().includes(searchQuery.toLowerCase()) || room.lastMessageContent?.toLowerCase().includes(searchQuery.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex flex-col h-full bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "p-4 border-b border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-800 mb-4",
                        children: "채팅"
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "채팅 검색",
                                        value: searchQuery,
                                        onChange: (e)=>setSearchQuery(e.target.value),
                                        className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                        lineNumber: 74,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: onCreateRoom,
                                className: "p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition",
                                title: "새 채팅 시작",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-y-auto",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "p-4 text-center text-gray-500",
                    children: "채팅방 목록을 불러오는 중..."
                }, void 0, false, {
                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                    lineNumber: 95,
                    columnNumber: 15
                }, this) : filteredRooms.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "p-4 text-center text-gray-500",
                    children: "채팅방이 없습니다."
                }, void 0, false, {
                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                    lineNumber: 97,
                    columnNumber: 15
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "divide-y divide-gray-100",
                    children: filteredRooms.map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            onClick: ()=>onSelectRoom(room.roomId, room.roomName || room.participantIds.filter((id)=>id !== currentUserId).join(', ')),
                            className: "flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "relative mr-4 flex-shrink-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-white font-bold text-lg",
                                            children: room.roomName ? room.roomName.charAt(0) : '?'
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                            lineNumber: 109,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                        lineNumber: 108,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                    lineNumber: 107,
                                    columnNumber: 23
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors",
                                                    children: room.roomName || '이름 없는 방'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-gray-400 ml-2 flex-shrink-0",
                                                    children: formatTime(room.lastMessageTime)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                            lineNumber: 117,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500 truncate group-hover:text-gray-700",
                                                children: room.lastMessageContent || '새로운 대화가 시작되었습니다.'
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                                lineNumber: 126,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                            lineNumber: 125,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                    lineNumber: 116,
                                    columnNumber: 23
                                }, this)
                            ]
                        }, room.roomId, true, {
                            fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                            lineNumber: 101,
                            columnNumber: 21
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                    lineNumber: 99,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                lineNumber: 93,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
        lineNumber: 67,
        columnNumber: 7
    }, this);
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
    "getFriendList",
    ()=>getFriendList,
    "getFriendshipStatus",
    ()=>getFriendshipStatus,
    "getReceivedFriendRequests",
    ()=>getReceivedFriendRequests,
    "rejectFriendRequest",
    ()=>rejectFriendRequest,
    "sendFriendRequest",
    ()=>sendFriendRequest,
    "unblockUser",
    ()=>unblockUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [ssr] (ecmascript)");
;
// 1. 인증 토큰을 가져오는 헬퍼 함수
const getAuthToken = ()=>{
    // TODO: 실제 프로젝트의 로직에 맞게 로컬 스토리지, 쿠키 등에서 JWT 토큰을 가져오도록 구현하세요.
    const token = localStorage.getItem('accessToken');
    if (!token) {
        console.error("Authentication token not found.");
        return null;
    }
    return token;
};
// 2. 공통 요청 헤더 생성 함수 (Authorization 헤더 포함)
const getAuthHeaders = ()=>{
    const token = getAuthToken();
    if (!token) {
        throw new Error("인증 토큰이 필요합니다. 로그인 상태를 확인해주세요.");
    }
    return {
        'Authorization': `Bearer ${token}`
    };
};
async function getFriendshipStatus(currentUserSignId, targetUserSignId) {
    const headers = getAuthHeaders();
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/status?targetUserId=${encodeURIComponent(targetUserSignId)}`, {
        method: "GET",
        headers: headers
    });
    if (response.status === 204) {
        return null;
    }
    if (response.ok) {
        return await response.json();
    }
    const msg = await response.text();
    console.error(`Status Check Failed: HTTP ${response.status} - ${msg}`);
    throw new Error(msg || "상태 조회 실패");
}
async function sendFriendRequest(currentUserSignId, receiverSignId) {
    const headers = getAuthHeaders();
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/request`, {
        method: "POST",
        headers: {
            ...headers,
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
    console.error(`Send Request Failed: HTTP ${response.status} - ${msg}`);
    throw new Error(msg || "친구 요청 실패");
}
async function getReceivedFriendRequests() {
    const headers = getAuthHeaders();
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/requests/received`, {
        method: "GET",
        headers: headers
    });
    // ✨ 204 No Content 처리
    if (response.status === 204) {
        return [];
    }
    if (response.ok) {
        return await response.json();
    }
    // ✨ 에러 로깅 추가
    const msg = await response.text();
    console.error(`Received Requests Failed: HTTP ${response.status} - ${msg}`);
    throw new Error(msg || `친구 요청 목록 조회 실패 (Status: ${response.status})`);
}
async function getFriendList() {
    const headers = getAuthHeaders();
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}`, {
        method: "GET",
        headers: headers
    });
    // ✨ 204 No Content 처리
    if (response.status === 204) {
        return [];
    }
    if (response.ok) {
        return await response.json();
    }
    // ✨ 에러 로깅 추가
    const msg = await response.text();
    console.error(`Friend List Failed: HTTP ${response.status} - ${msg}`);
    throw new Error(msg || `친구 목록 조회 실패 (Status: ${response.status})`);
}
async function acceptFriendRequest(currentUserSignId, friendId) {
    const headers = getAuthHeaders();
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}/accept`, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Length": "0"
        }
    });
    if (response.ok) {
        return await response.json();
    }
    const msg = await response.text();
    console.error(`Accept Request Failed: HTTP ${response.status} - ${msg}`);
    throw new Error(msg || "수락 실패");
}
async function rejectFriendRequest(currentUserSignId, friendId) {
    const headers = getAuthHeaders();
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}/reject`, {
        method: "DELETE",
        headers: headers
    });
    if (!response.ok) {
        const msg = await response.text();
        console.error(`Reject Request Failed: HTTP ${response.status} - ${msg}`);
        throw new Error(msg || "거절 실패");
    }
}
async function deleteFriend(currentUserSignId, friendId) {
    const headers = getAuthHeaders();
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}`, {
        method: "DELETE",
        headers: headers
    });
    if (!response.ok) {
        const msg = await response.text();
        console.error(`Delete Friend Failed: HTTP ${response.status} - ${msg}`);
        throw new Error(msg || "친구 삭제 실패");
    }
}
async function blockUser(currentUserSignId, receiverSignId) {
    const headers = getAuthHeaders();
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/block`, {
        method: "POST",
        headers: {
            ...headers,
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
    console.error(`Block User Failed: HTTP ${response.status} - ${msg}`);
    throw new Error(msg || "차단 실패");
}
async function unblockUser(currentUserSignId, friendId) {
    const headers = getAuthHeaders();
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}/unblock`, {
        method: "DELETE",
        headers: headers
    });
    if (!response.ok) {
        const msg = await response.text();
        console.error(`Unblock User Failed: HTTP ${response.status} - ${msg}`);
        throw new Error(msg || "차단 해제 실패");
    }
}
}),
"[project]/src/styles/chatService/StartNewChatModal.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "avatar": "StartNewChatModal-module__sIE5QW__avatar",
  "backdrop": "StartNewChatModal-module__sIE5QW__backdrop",
  "body": "StartNewChatModal-module__sIE5QW__body",
  "closeBtn": "StartNewChatModal-module__sIE5QW__closeBtn",
  "empty": "StartNewChatModal-module__sIE5QW__empty",
  "error": "StartNewChatModal-module__sIE5QW__error",
  "footer": "StartNewChatModal-module__sIE5QW__footer",
  "friendId": "StartNewChatModal-module__sIE5QW__friendId",
  "friendInfo": "StartNewChatModal-module__sIE5QW__friendInfo",
  "friendItem": "StartNewChatModal-module__sIE5QW__friendItem",
  "friendList": "StartNewChatModal-module__sIE5QW__friendList",
  "friendName": "StartNewChatModal-module__sIE5QW__friendName",
  "header": "StartNewChatModal-module__sIE5QW__header",
  "inputGroup": "StartNewChatModal-module__sIE5QW__inputGroup",
  "loading": "StartNewChatModal-module__sIE5QW__loading",
  "modal": "StartNewChatModal-module__sIE5QW__modal",
  "sectionTitle": "StartNewChatModal-module__sIE5QW__sectionTitle",
  "selected": "StartNewChatModal-module__sIE5QW__selected",
  "submitBtn": "StartNewChatModal-module__sIE5QW__submitBtn",
});
}),
"[project]/src/component/chatService/StartNewChatModal.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// StartNewChatModal.tsx (최종 완성판 - FriendActionModal 참고 수정)
__turbopack_context__.s([
    "default",
    ()=>StartNewChatModal
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/chatService/chat.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/userService/friends.ts [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/chatService/StartNewChatModal.module.css [ssr] (css module)");
"use client";
;
;
;
;
;
;
function StartNewChatModal({ currentUserId, onClose, onRoomCreated }) {
    const [friends, setFriends] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [selectedFriends, setSelectedFriends] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [roomName, setRoomName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const loadFriends = async ()=>{
            try {
                const rawData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["getFriendList"])();
                const safeFriends = rawData.filter((item)=>!!item && typeof item.friendId !== "undefined" && typeof item.requesterSignId === "string" && typeof item.receiverSignId === "string").map((item)=>({
                        friendId: String(item.friendId),
                        userSignId: item.requesterSignId === currentUserId ? item.receiverSignId : item.requesterSignId,
                        name: item.name?.trim() || (item.requesterSignId === currentUserId ? item.receiverSignId : item.requesterSignId)
                    })).filter((friend, index, self)=>friend.userSignId && index === self.findIndex((f)=>f.userSignId === friend.userSignId));
                setFriends(safeFriends);
            } catch (err) {
                console.error("친구 목록 로드 실패:", err);
                setError("친구 목록을 불러오지 못했습니다.");
                setFriends([]);
            } finally{
                setLoading(false);
            }
        };
        loadFriends();
    }, [
        currentUserId
    ]); // currentUserId 의존성 추가 (상대방 ID 계산에 필요)
    const toggleFriend = (userSignId)=>{
        setSelectedFriends((prev)=>prev.includes(userSignId) ? prev.filter((id)=>id !== userSignId) : [
                ...prev,
                userSignId
            ]);
    };
    const handleSubmit = async ()=>{
        if (selectedFriends.length === 0 || submitting) return;
        setSubmitting(true);
        setError('');
        try {
            const participantIds = [
                ...selectedFriends,
                currentUserId
            ];
            let defaultName = '';
            if (selectedFriends.length === 1) {
                const friend = friends.find((f)=>f.userSignId === selectedFriends[0]);
                defaultName = friend?.name || selectedFriends[0];
            } else {
                defaultName = `${selectedFriends.length + 1}명의 그룹 채팅`;
            }
            const finalName = roomName.trim() || defaultName;
            const newRoom = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$ssr$5d$__$28$ecmascript$29$__["createChatRoom"])(participantIds, finalName, currentUserId);
            onRoomCreated({
                roomId: newRoom.roomId,
                roomName: newRoom.roomName || finalName
            });
            onClose();
        } catch (err) {
            setError(err.message || "채팅방 생성에 실패했습니다.");
        } finally{
            setSubmitting(false);
        }
    };
    const getAvatarLetter = (friend)=>{
        return friend.name[0]?.toUpperCase() || '?';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].backdrop,
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].modal,
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: "새 채팅 시작하기"
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].closeBtn,
                                "aria-label": "닫기",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 28
                                }, void 0, false, {
                                    fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                lineNumber: 132,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].body,
                        children: [
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].error,
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                lineNumber: 138,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].inputGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        children: [
                                            "채팅방 이름 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "text-gray-500",
                                                children: "(선택)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                lineNumber: 141,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                        lineNumber: 141,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: roomName,
                                        onChange: (e)=>setRoomName(e.target.value),
                                        placeholder: selectedFriends.length > 0 ? "그룹 채팅 이름" : "이름 입력 후 친구 선택"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                        lineNumber: 142,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].friendListSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                                        children: [
                                            "친구 선택 (",
                                            selectedFriends.length,
                                            "명)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this),
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].loading,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "animate-spin",
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                lineNumber: 157,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                children: "친구 목록을 불러오는 중..."
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                lineNumber: 158,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                        lineNumber: 156,
                                        columnNumber: 19
                                    }, this) : friends.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].empty,
                                        children: "친구가 없습니다"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                        lineNumber: 161,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].friendList,
                                        children: friends.map((friend)=>{
                                            const isSelected = selectedFriends.includes(friend.userSignId);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                onClick: ()=>toggleFriend(friend.userSignId),
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].friendItem} ${isSelected ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].selected : ''}`,
                                                role: "button",
                                                tabIndex: 0,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].friendInfo,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].avatar,
                                                                children: getAvatarLetter(friend)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                                lineNumber: 175,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].friendName,
                                                                        children: friend.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                                        lineNumber: 179,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].friendId,
                                                                        children: [
                                                                            "@",
                                                                            friend.userSignId
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                                        lineNumber: 180,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                                lineNumber: 178,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                        lineNumber: 174,
                                                        columnNumber: 29
                                                    }, this),
                                                    isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                        size: 22,
                                                        strokeWidth: 3
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 44
                                                    }, this)
                                                ]
                                            }, friend.friendId, true, {
                                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                lineNumber: 167,
                                                columnNumber: 27
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                        lineNumber: 163,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].footer,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: handleSubmit,
                            disabled: selectedFriends.length === 0 || submitting,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].submitBtn,
                            children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: "생성 중..."
                            }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    "채팅 시작하기 ",
                                    selectedFriends.length > 0 && `(${selectedFriends.length})`
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                            lineNumber: 193,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                        lineNumber: 192,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                lineNumber: 129,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/src/styles/chatService/ChatPage.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "ChatPage-module__yzMSqa__container",
  "emptyIcon": "ChatPage-module__yzMSqa__emptyIcon",
  "emptyState": "ChatPage-module__yzMSqa__emptyState",
  "hiddenOnMobile": "ChatPage-module__yzMSqa__hiddenOnMobile",
  "main": "ChatPage-module__yzMSqa__main",
  "newChatBtn": "ChatPage-module__yzMSqa__newChatBtn",
  "sidebar": "ChatPage-module__yzMSqa__sidebar",
});
}),
"[project]/src/pages/ChatPage.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

// ChatPage.tsx
__turbopack_context__.s([
    "default",
    ()=>ChatPage
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$ChatRoom$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/chatService/ChatRoom.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$ChatRoomList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/chatService/ChatRoomList.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$StartNewChatModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/chatService/StartNewChatModal.tsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/chatService/ChatPage.module.css [ssr] (css module)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$ChatRoom$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$ChatRoom$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
function ChatPage() {
    const [selectedRoom, setSelectedRoom] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [showNewChatModal, setShowNewChatModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const currentUserId = "user1"; // 실제로는 auth에서 가져와야 함
    const currentUserName = "나";
    const handleRoomCreated = (newRoom)=>{
        setShowNewChatModal(false);
        setSelectedRoom({
            id: newRoom.roomId,
            name: newRoom.roomName
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].sidebar} ${selectedRoom ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].hiddenOnMobile : ''}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$ChatRoomList$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    currentUserId: currentUserId,
                    onSelectRoom: (id, name)=>setSelectedRoom({
                            id,
                            name
                        }),
                    onCreateRoom: ()=>setShowNewChatModal(true)
                }, void 0, false, {
                    fileName: "[project]/src/pages/ChatPage.tsx",
                    lineNumber: 23,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/ChatPage.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].main,
                children: selectedRoom ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$ChatRoom$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                    roomId: selectedRoom.id,
                    roomName: selectedRoom.name,
                    currentUserId: currentUserId,
                    currentUserName: currentUserName,
                    onBack: ()=>setSelectedRoom(null)
                }, void 0, false, {
                    fileName: "[project]/src/pages/ChatPage.tsx",
                    lineNumber: 32,
                    columnNumber: 15
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].emptyState,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].emptyIcon,
                            children: "메시지 아이콘"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/ChatPage.tsx",
                            lineNumber: 41,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                            children: "채팅을 시작하세요"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/ChatPage.tsx",
                            lineNumber: 42,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: "친구를 선택하여 대화를 시작해보세요"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/ChatPage.tsx",
                            lineNumber: 43,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowNewChatModal(true),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].newChatBtn,
                            children: "새 채팅 시작"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/ChatPage.tsx",
                            lineNumber: 44,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/ChatPage.tsx",
                    lineNumber: 40,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/ChatPage.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this),
            showNewChatModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$StartNewChatModal$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                currentUserId: currentUserId,
                onClose: ()=>setShowNewChatModal(false),
                onRoomCreated: handleRoomCreated
            }, void 0, false, {
                fileName: "[project]/src/pages/ChatPage.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/ChatPage.tsx",
        lineNumber: 21,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__c925f2cc._.js.map