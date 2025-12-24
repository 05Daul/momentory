(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/src/hooks/useWebSocket.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/hooks/useWebSocket.ts
__turbopack_context__.s([
    "useWebSocket",
    ()=>useWebSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stomp$2f$stompjs$2f$esm6$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@stomp/stompjs/esm6/client.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sockjs$2d$client$2f$lib$2f$entry$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sockjs-client/lib/entry.js [client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function getSockJSUrl(originalUrl) {
    return originalUrl.replace(/^ws(s)?:\/\//, (matched, s)=>s ? 'https://' : 'http://');
}
function useWebSocket({ url, roomId, onMessage }) {
    _s();
    const clientRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const connect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[connect]": ()=>{
            const sockUrl = getSockJSUrl(url);
            console.log('🔌 WebSocket 연결 시작:', sockUrl);
            if (roomId) {
                console.log('📡 구독할 방:', roomId);
            }
            const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$stomp$2f$stompjs$2f$esm6$2f$client$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Client"]({
                webSocketFactory: {
                    "useWebSocket.useCallback[connect]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sockjs$2d$client$2f$lib$2f$entry$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"](sockUrl)
                }["useWebSocket.useCallback[connect]"],
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                debug: {
                    "useWebSocket.useCallback[connect]": (str)=>{
                        // 항상 출력 (개발 중)
                        console.log('STOMP →', str);
                    }
                }["useWebSocket.useCallback[connect]"],
                onConnect: {
                    "useWebSocket.useCallback[connect]": ()=>{
                        console.log('✅ WebSocket 연결 성공');
                        setIsConnected(true);
                        if (roomId) {
                            // ⭐ 핵심 수정: 구독 경로
                            // 기존: `/topic/chat/${roomId}` (X)
                            // 수정: `/topic/chat.room.${roomId}` (O)
                            const subscriptionPath = `/topic/chat.room.${roomId}`;
                            console.log(`📡 구독 시작: ${subscriptionPath}`);
                            const subscription = client.subscribe(subscriptionPath, {
                                "useWebSocket.useCallback[connect].subscription": (msg)=>{
                                    console.log('📨 메시지 수신 raw:', msg.body);
                                    try {
                                        const data = JSON.parse(msg.body);
                                        console.log('📨 메시지 파싱 완료:', data);
                                        onMessage(data);
                                    } catch (e) {
                                        console.error('❌ 메시지 파싱 실패:', e, msg.body);
                                    }
                                }
                            }["useWebSocket.useCallback[connect].subscription"]);
                            console.log(`✅ 구독 완료:`, subscription.id);
                        }
                    }
                }["useWebSocket.useCallback[connect]"],
                onStompError: {
                    "useWebSocket.useCallback[connect]": (frame)=>{
                        console.error('❌ STOMP 오류:', frame.headers['message']);
                        console.error('오류 상세:', frame.body);
                        setIsConnected(false);
                    }
                }["useWebSocket.useCallback[connect]"],
                onWebSocketError: {
                    "useWebSocket.useCallback[connect]": (error)=>{
                        console.error('❌ WebSocket 오류:', error);
                    }
                }["useWebSocket.useCallback[connect]"],
                onWebSocketClose: {
                    "useWebSocket.useCallback[connect]": ()=>{
                        console.log('🔌 WebSocket 연결 종료');
                        setIsConnected(false);
                    }
                }["useWebSocket.useCallback[connect]"]
            });
            client.activate();
            clientRef.current = client;
        }
    }["useWebSocket.useCallback[connect]"], [
        url,
        roomId,
        onMessage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWebSocket.useEffect": ()=>{
            connect();
            return ({
                "useWebSocket.useEffect": ()=>{
                    console.log('🧹 WebSocket 정리');
                    if (clientRef.current) {
                        clientRef.current.deactivate();
                        clientRef.current = null;
                    }
                }
            })["useWebSocket.useEffect"];
        }
    }["useWebSocket.useEffect"], [
        connect
    ]);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useWebSocket.useCallback[sendMessage]": (payload)=>{
            console.log('=== sendMessage 호출 ===');
            console.log('clientRef.current:', clientRef.current);
            console.log('connected:', clientRef.current?.connected);
            if (!clientRef.current) {
                console.error('❌ clientRef.current가 null입니다!');
                return;
            }
            if (!clientRef.current?.connected) {
                console.warn('❌ WebSocket 연결 안됨 → 메시지 전송 실패');
                return;
            }
            console.log('📤 메시지 전송 시도:', payload);
            console.log('📤 destination:', '/app/chat.message');
            try {
                clientRef.current.publish({
                    destination: '/app/chat.message',
                    body: JSON.stringify(payload)
                });
                console.log('✅ publish() 호출 완료');
            } catch (error) {
                console.error('❌ publish() 에러:', error);
            }
        }
    }["useWebSocket.useCallback[sendMessage]"], []);
    return {
        isConnected,
        sendMessage
    };
}
_s(useWebSocket, "2vA8TY95nZqEyUMXxFUTyEqvawA=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/env.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/chatService/chat.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/api/chatService/chat.ts
__turbopack_context__.s([
    "createChatRoom",
    ()=>createChatRoom,
    "getChatHistory",
    ()=>getChatHistory,
    "getChatRooms",
    ()=>getChatRooms,
    "leaveChatRoom",
    ()=>leaveChatRoom,
    "markMessagesAsRead",
    ()=>markMessagesAsRead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [client] (ecmascript)");
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CHATSERVICE_API"]}/rooms`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CHATSERVICE_API"]}/rooms`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CHATSERVICE_API"]}/rooms/${roomId}/messages?page=${page}&size=${size}`, {
        headers
    });
    if (response.status === 204) return [];
    if (!response.ok) throw new Error("메시지 조회 실패");
    return response.json();
}
async function markMessagesAsRead(roomId, userSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CHATSERVICE_API"]}/rooms/${roomId}/read`, {
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
async function leaveChatRoom(roomId, userSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CHATSERVICE_API"]}/rooms/${roomId}/leave`, {
        method: "DELETE",
        headers: getHeaders(userSignId)
    });
    // 백엔드가 200 OK 또는 204 No Content를 반환하면 response.ok는 true
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`채팅방 나가기 실패: ${error}`);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/chatService/ChatRoom.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "backBtn": "ChatRoom-module__OxUiYW__backBtn",
  "connected": "ChatRoom-module__OxUiYW__connected",
  "connectionStatus": "ChatRoom-module__OxUiYW__connectionStatus",
  "container": "ChatRoom-module__OxUiYW__container",
  "debugInfo": "ChatRoom-module__OxUiYW__debugInfo",
  "disconnected": "ChatRoom-module__OxUiYW__disconnected",
  "dropdownItem": "ChatRoom-module__OxUiYW__dropdownItem",
  "dropdownMenu": "ChatRoom-module__OxUiYW__dropdownMenu",
  "emptyMessage": "ChatRoom-module__OxUiYW__emptyMessage",
  "header": "ChatRoom-module__OxUiYW__header",
  "inputArea": "ChatRoom-module__OxUiYW__inputArea",
  "inputContainer": "ChatRoom-module__OxUiYW__inputContainer",
  "loadingMessage": "ChatRoom-module__OxUiYW__loadingMessage",
  "menuBtn": "ChatRoom-module__OxUiYW__menuBtn",
  "menuContainer": "ChatRoom-module__OxUiYW__menuContainer",
  "messageBubble": "ChatRoom-module__OxUiYW__messageBubble",
  "messageContent": "ChatRoom-module__OxUiYW__messageContent",
  "messageFooter": "ChatRoom-module__OxUiYW__messageFooter",
  "messageInput": "ChatRoom-module__OxUiYW__messageInput",
  "messageRow": "ChatRoom-module__OxUiYW__messageRow",
  "messageTime": "ChatRoom-module__OxUiYW__messageTime",
  "messagesArea": "ChatRoom-module__OxUiYW__messagesArea",
  "mine": "ChatRoom-module__OxUiYW__mine",
  "readStatus": "ChatRoom-module__OxUiYW__readStatus",
  "roomName": "ChatRoom-module__OxUiYW__roomName",
  "sendBtn": "ChatRoom-module__OxUiYW__sendBtn",
  "senderName": "ChatRoom-module__OxUiYW__senderName",
  "statusDot": "ChatRoom-module__OxUiYW__statusDot",
  "theirs": "ChatRoom-module__OxUiYW__theirs",
});
}),
"[project]/src/component/chatService/ChatRoom.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatRoom
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useWebSocket.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/chatService/chat.ts [client] (ecmascript)"); // leaveChatRoom import
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [client] (ecmascript) <export default as Send>"); // MoreVertical, LogOut import
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/chatService/ChatRoom.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function ChatRoom({ roomId, currentUserId, currentUserName, roomName, onBack }) {
    _s();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputMessage, setInputMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false); // ⭐ 추가: 메뉴 상태
    const [isComposing, setIsComposing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false); // 👈 한글 조합 중인지 추적
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null); // ⭐ 추가: 메뉴 참조
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesStartRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const messagesContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatRoom.useEffect": ()=>{
            console.log('=== ChatRoom 마운트 ===');
            console.log('roomId:', roomId);
            console.log('currentUserId:', currentUserId);
            console.log('currentUserName:', currentUserName);
        }
    }["ChatRoom.useEffect"], [
        roomId,
        currentUserId,
        currentUserName
    ]);
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatRoom.useCallback[scrollToBottom]": ()=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["ChatRoom.useCallback[scrollToBottom]"], []);
    // ⭐ 추가: 메뉴 외부 클릭 시 닫기
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatRoom.useEffect": ()=>{
            const handleClickOutside = {
                "ChatRoom.useEffect.handleClickOutside": (event)=>{
                    if (menuRef.current && !menuRef.current.contains(event.target)) {
                        setIsMenuOpen(false);
                    }
                }
            }["ChatRoom.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "ChatRoom.useEffect": ()=>{
                    document.removeEventListener('mousedown', handleClickOutside);
                }
            })["ChatRoom.useEffect"];
        }
    }["ChatRoom.useEffect"], [
        menuRef
    ]);
    const handleNewMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatRoom.useCallback[handleNewMessage]": (newMessage)=>{
            console.log('📨 새 메시지 수신:', newMessage);
            // ⭐ 중복 방지: 같은 메시지가 이미 있는지 확인
            setMessages({
                "ChatRoom.useCallback[handleNewMessage]": (prev)=>{
                    // chatId가 있으면 chatId로, 없으면 content+timestamp로 중복 체크
                    const isDuplicate = prev.some({
                        "ChatRoom.useCallback[handleNewMessage].isDuplicate": (msg)=>{
                            if (newMessage.chatId && msg.chatId) {
                                return msg.chatId === newMessage.chatId;
                            }
                            // chatId가 없는 경우 내용과 시간으로 중복 체크 (fallback)
                            return msg.content === newMessage.content && msg.userSignId === newMessage.userSignId && msg.createdAt === newMessage.createdAt;
                        }
                    }["ChatRoom.useCallback[handleNewMessage].isDuplicate"]);
                    if (isDuplicate) {
                        console.log('⚠️ 중복 메시지 무시:', newMessage.content);
                        return prev;
                    }
                    return [
                        ...prev,
                        newMessage
                    ];
                }
            }["ChatRoom.useCallback[handleNewMessage]"]);
            setTimeout(scrollToBottom, 100);
            if (newMessage.userSignId !== currentUserId) {
                // ⭐ 읽음 처리 후 로컬 상태 갱신 로직
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["markMessagesAsRead"])(roomId, currentUserId).then({
                    "ChatRoom.useCallback[handleNewMessage]": ()=>{
                        console.log('✅ 새 메시지 수신 후 읽음 처리 완료');
                        setMessages({
                            "ChatRoom.useCallback[handleNewMessage]": (prevMessages)=>prevMessages.map({
                                    "ChatRoom.useCallback[handleNewMessage]": (msg)=>{
                                        if (msg.userSignId !== currentUserId && !msg.readBy?.includes(currentUserId)) {
                                            return {
                                                ...msg,
                                                readBy: [
                                                    ...msg.readBy || [],
                                                    currentUserId
                                                ]
                                            };
                                        }
                                        return msg;
                                    }
                                }["ChatRoom.useCallback[handleNewMessage]"])
                        }["ChatRoom.useCallback[handleNewMessage]"]);
                    }
                }["ChatRoom.useCallback[handleNewMessage]"]).catch(console.error);
            }
        }
    }["ChatRoom.useCallback[handleNewMessage]"], [
        currentUserId,
        roomId,
        scrollToBottom
    ]);
    // ⭐ roomId를 꼭 전달해야 구독이 됩니다!
    const { isConnected, sendMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useWebSocket"])({
        url: 'ws://localhost:1005/ws-chat',
        roomId: roomId,
        onMessage: handleNewMessage
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatRoom.useEffect": ()=>{
            console.log('🔌 WebSocket 연결:', isConnected);
        }
    }["ChatRoom.useEffect"], [
        isConnected
    ]);
    const loadChatHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatRoom.useCallback[loadChatHistory]": async (pageNum = 0)=>{
            if (!hasMore && pageNum > 0) return;
            setIsLoading(true);
            try {
                console.log('📚 히스토리 로드:', roomId, 'page:', pageNum);
                const history = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getChatHistory"])(roomId, pageNum, 30);
                console.log('✅ 메시지', history.length, '개');
                if (history.length === 0) {
                    setHasMore(false);
                    return;
                }
                if (pageNum === 0) {
                    // 첫 로드
                    setMessages(Array.isArray(history) ? history.reverse() : []);
                } else {
                    // 이전 메시지 추가 (위에 추가)
                    setMessages({
                        "ChatRoom.useCallback[loadChatHistory]": (prev)=>[
                                ...Array.isArray(history) ? history.reverse() : [],
                                ...prev
                            ]
                    }["ChatRoom.useCallback[loadChatHistory]"]);
                }
                if (history.length < 30) {
                    setHasMore(false);
                }
            } catch (err) {
                console.error('❌ 로드 실패:', err);
                if (pageNum === 0) {
                    setMessages([]);
                }
            } finally{
                setIsLoading(false);
                if (pageNum === 0) {
                    setTimeout(scrollToBottom, 100);
                }
            }
        }
    }["ChatRoom.useCallback[loadChatHistory]"], [
        roomId,
        hasMore,
        scrollToBottom
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatRoom.useEffect": ()=>{
            loadChatHistory(0);
            // 채팅방 진입 시 읽음 처리
            const markAsRead = {
                "ChatRoom.useEffect.markAsRead": async ()=>{
                    try {
                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["markMessagesAsRead"])(roomId, currentUserId);
                        console.log('✅ 채팅방 진입 시 읽음 처리 완료');
                        // ⭐ 읽음 처리 후 로컬 상태 갱신
                        setMessages({
                            "ChatRoom.useEffect.markAsRead": (prevMessages)=>prevMessages.map({
                                    "ChatRoom.useEffect.markAsRead": (msg)=>{
                                        if (msg.userSignId !== currentUserId && !msg.readBy?.includes(currentUserId)) {
                                            return {
                                                ...msg,
                                                readBy: [
                                                    ...msg.readBy || [],
                                                    currentUserId
                                                ]
                                            };
                                        }
                                        return msg;
                                    }
                                }["ChatRoom.useEffect.markAsRead"])
                        }["ChatRoom.useEffect.markAsRead"]);
                    } catch (error) {
                        console.error('❌ 읽음 처리 실패:', error);
                    }
                }
            }["ChatRoom.useEffect.markAsRead"];
            markAsRead();
        }
    }["ChatRoom.useEffect"], [
        roomId,
        currentUserId
    ]);
    // 무한 스크롤: 스크롤이 맨 위에 도달하면 다음 페이지 로드
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatRoom.useEffect": ()=>{
            const container = messagesContainerRef.current;
            if (!container) return;
            const handleScroll = {
                "ChatRoom.useEffect.handleScroll": ()=>{
                    if (container.scrollTop === 0 && hasMore && !isLoading) {
                        const currentScrollHeight = container.scrollHeight;
                        setPage({
                            "ChatRoom.useEffect.handleScroll": (prev)=>{
                                const nextPage = prev + 1;
                                loadChatHistory(nextPage).then({
                                    "ChatRoom.useEffect.handleScroll": ()=>{
                                        // 스크롤 위치 유지
                                        requestAnimationFrame({
                                            "ChatRoom.useEffect.handleScroll": ()=>{
                                                const newScrollHeight = container.scrollHeight;
                                                container.scrollTop = newScrollHeight - currentScrollHeight;
                                            }
                                        }["ChatRoom.useEffect.handleScroll"]);
                                    }
                                }["ChatRoom.useEffect.handleScroll"]);
                                return nextPage;
                            }
                        }["ChatRoom.useEffect.handleScroll"]);
                    }
                }
            }["ChatRoom.useEffect.handleScroll"];
            container.addEventListener('scroll', handleScroll);
            return ({
                "ChatRoom.useEffect": ()=>container.removeEventListener('scroll', handleScroll)
            })["ChatRoom.useEffect"];
        }
    }["ChatRoom.useEffect"], [
        hasMore,
        isLoading,
        loadChatHistory
    ]);
    const handleSendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatRoom.useCallback[handleSendMessage]": ()=>{
            const trimmed = inputMessage.trim();
            if (!trimmed) return;
            if (!isConnected) {
                alert('서버와 연결되지 않았습니다.');
                return;
            }
            if (!currentUserId) {
                alert('사용자 정보를 찾을 수 없습니다.');
                return;
            }
            const messageDto = {
                roomId,
                userSignId: currentUserId,
                name: currentUserName || currentUserId,
                content: trimmed,
                type: 'TALK'
            };
            console.log('📤 전송:', messageDto.content);
            try {
                sendMessage(messageDto);
                setInputMessage('');
                inputRef.current?.focus();
            } catch (error) {
                console.error('❌ 전송 실패:', error);
                alert('메시지 전송에 실패했습니다.');
            }
        }
    }["ChatRoom.useCallback[handleSendMessage]"], [
        inputMessage,
        isConnected,
        currentUserId,
        currentUserName,
        roomId,
        sendMessage
    ]);
    const handleKeyDown = (e)=>{
        if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    // ⭐ 추가: 채팅방 나가기 핸들러
    const handleLeaveRoom = async ()=>{
        if (window.confirm('채팅방을 나가시겠습니까? 나가면 메시지 목록이 삭제되고 다시 참여할 수 없습니다.')) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["leaveChatRoom"])(roomId, currentUserId);
                console.log(`✅ Room ${roomId}에서 사용자 ${currentUserId} 나가기 성공`);
                onBack(); // 채팅방 목록으로 돌아가기
            } catch (error) {
                alert('채팅방 나가기에 실패했습니다.');
                console.error('채팅방 나가기 실패:', error);
            }
        }
        setIsMenuOpen(false); // 메뉴 닫기
    };
    const formatTime = (dateString)=>{
        if (!dateString) return '';
        return new Date(dateString).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };
    /**
   * 현재 메시지가 시간 그룹의 마지막 메시지인지 확인하는 함수.
   */ const isLastMessageInTimeGroup = (currentMsg, index)=>{
        // 1. 마지막 메시지라면 무조건 시간을 표시
        if (index === messages.length - 1) return true;
        const nextMsg = messages[index + 1];
        if (!currentMsg.createdAt || !nextMsg.createdAt) return true; // 예외 처리
        const currentTime = new Date(currentMsg.createdAt);
        const nextTime = new Date(nextMsg.createdAt);
        // 2. 다음 메시지와 발신자가 다르면 현재 메시지가 그룹의 마지막
        if (currentMsg.userSignId !== nextMsg.userSignId) {
            return true;
        }
        // 3. 다음 메시지와 분 단위로 다르면 현재 메시지가 그룹의 마지막
        if (currentTime.getHours() !== nextTime.getHours() || currentTime.getMinutes() !== nextTime.getMinutes()) {
            return true;
        }
        // 다음 메시지와 같은 분, 같은 발신자: 시간 미표시
        return false;
    };
    const getUnreadCountForMine = (msg)=>{
        // 내 메시지이고, readBy 배열의 길이가 1(자기 자신) 이하라면 아무도 읽지 않은 것임
        if (msg.userSignId === currentUserId) {
            if (!msg.readBy || msg.readBy.length <= 1) {
                return '1';
            }
        }
        return '';
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].backBtn,
                        "aria-label": "뒤로",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "w-5 h-5"
                        }, void 0, false, {
                            fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                            lineNumber: 327,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 326,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].roomName,
                        children: roomName
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 329,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].connectionStatus,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusDot} ${isConnected ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].connected : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].disconnected}`
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusText,
                                children: isConnected ? '온라인' : '오프라인'
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 330,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].menuContainer,
                        ref: menuRef,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].menuBtn,
                                onClick: ()=>setIsMenuOpen((prev)=>!prev),
                                "aria-expanded": isMenuOpen,
                                "aria-label": "채팅방 메뉴",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                    lineNumber: 343,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 337,
                                columnNumber: 13
                            }, this),
                            isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dropdownMenu,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLeaveRoom,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dropdownItem,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                            lineNumber: 351,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "채팅방 나가기"
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                            lineNumber: 352,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                    lineNumber: 347,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 346,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 336,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                lineNumber: 325,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].messagesArea,
                ref: messagesContainerRef,
                children: [
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loadingMessage,
                        children: "메시지를 불러오는 중..."
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 362,
                        columnNumber: 15
                    }, this) : messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].emptyMessage,
                        children: [
                            "아직 메시지가 없습니다.",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 365,
                                columnNumber: 30
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: '0.875rem'
                                },
                                children: "첫 메시지를 보내보세요!"
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 366,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 364,
                        columnNumber: 15
                    }, this) : messages.map((msg, index)=>{
                        const isMine = msg.userSignId === currentUserId;
                        // 현재 메시지가 시간 그룹의 마지막 메시지인지 확인
                        const showTime = isLastMessageInTimeGroup(msg, index);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].messageRow} ${isMine ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mine : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].theirs}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].messageContent} ${isMine ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mine : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].theirs}`,
                                children: [
                                    !isMine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].senderName,
                                        children: msg.name || msg.userSignId
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                        lineNumber: 381,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].messageBubble} ${isMine ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mine : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].theirs}`,
                                        children: msg.content
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                        lineNumber: 385,
                                        columnNumber: 25
                                    }, this),
                                    showTime && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].messageFooter,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].messageTime,
                                                children: formatTime(msg.createdAt)
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                                lineNumber: 391,
                                                columnNumber: 31
                                            }, this),
                                            isMine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].readStatus,
                                                children: getUnreadCountForMine(msg)
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                                lineNumber: 393,
                                                columnNumber: 35
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                        lineNumber: 390,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 379,
                                columnNumber: 23
                            }, this)
                        }, msg.chatId, false, {
                            fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                            lineNumber: 375,
                            columnNumber: 21
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: messagesEndRef
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                        lineNumber: 404,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                lineNumber: 360,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputArea,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: inputRef,
                            type: "text",
                            value: inputMessage,
                            onChange: (e)=>setInputMessage(e.target.value),
                            onKeyDown: handleKeyDown,
                            onCompositionStart: ()=>setIsComposing(true),
                            onCompositionEnd: ()=>setIsComposing(false),
                            placeholder: isConnected ? "메시지를 입력하세요..." : "연결 중...",
                            disabled: !isConnected,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].messageInput,
                            autoFocus: true
                        }, void 0, false, {
                            fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                            lineNumber: 409,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSendMessage,
                            disabled: !isConnected || !inputMessage.trim(),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoom$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sendBtn,
                            "aria-label": "전송",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                                lineNumber: 428,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                            lineNumber: 422,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                    lineNumber: 408,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/component/chatService/ChatRoom.tsx",
                lineNumber: 407,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/chatService/ChatRoom.tsx",
        lineNumber: 324,
        columnNumber: 7
    }, this);
}
_s(ChatRoom, "MRRuF87swvMtghN7eUjl8Dl8Yx4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useWebSocket$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["useWebSocket"]
    ];
});
_c = ChatRoom;
var _c;
__turbopack_context__.k.register(_c, "ChatRoom");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/chatService/ChatRoomList.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "avatar": "ChatRoomList-module__Ikfwnq__avatar",
  "avatarText": "ChatRoomList-module__Ikfwnq__avatarText",
  "avatarWrapper": "ChatRoomList-module__Ikfwnq__avatarWrapper",
  "bold": "ChatRoomList-module__Ikfwnq__bold",
  "container": "ChatRoomList-module__Ikfwnq__container",
  "createBtn": "ChatRoomList-module__Ikfwnq__createBtn",
  "empty": "ChatRoomList-module__Ikfwnq__empty",
  "error": "ChatRoomList-module__Ikfwnq__error",
  "header": "ChatRoomList-module__Ikfwnq__header",
  "lastMessage": "ChatRoomList-module__Ikfwnq__lastMessage",
  "loading": "ChatRoomList-module__Ikfwnq__loading",
  "roomFooter": "ChatRoomList-module__Ikfwnq__roomFooter",
  "roomHeader": "ChatRoomList-module__Ikfwnq__roomHeader",
  "roomInfo": "ChatRoomList-module__Ikfwnq__roomInfo",
  "roomItem": "ChatRoomList-module__Ikfwnq__roomItem",
  "roomMeta": "ChatRoomList-module__Ikfwnq__roomMeta",
  "roomName": "ChatRoomList-module__Ikfwnq__roomName",
  "roomTime": "ChatRoomList-module__Ikfwnq__roomTime",
  "roomsList": "ChatRoomList-module__Ikfwnq__roomsList",
  "searchArea": "ChatRoomList-module__Ikfwnq__searchArea",
  "searchIcon": "ChatRoomList-module__Ikfwnq__searchIcon",
  "searchInput": "ChatRoomList-module__Ikfwnq__searchInput",
  "searchInputWrapper": "ChatRoomList-module__Ikfwnq__searchInputWrapper",
  "title": "ChatRoomList-module__Ikfwnq__title",
  "titleArea": "ChatRoomList-module__Ikfwnq__titleArea",
  "unread": "ChatRoomList-module__Ikfwnq__unread",
  "unreadBadge": "ChatRoomList-module__Ikfwnq__unreadBadge",
});
}),
"[project]/src/component/chatService/ChatRoomList.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ChatRoomList.tsx
__turbopack_context__.s([
    "default",
    ()=>ChatRoomList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/chatService/chat.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/chatService/ChatRoomList.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function ChatRoomList({ currentUserId, onSelectRoom, onCreateRoom }) {
    _s();
    const [rooms, setRooms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatRoomList.useEffect": ()=>{
            if (currentUserId) {
                loadRooms();
                // 30초마다 자동 새로고침 (읽음 상태 업데이트)
                const interval = setInterval({
                    "ChatRoomList.useEffect.interval": ()=>{
                        loadRooms();
                    }
                }["ChatRoomList.useEffect.interval"], 30000);
                return ({
                    "ChatRoomList.useEffect": ()=>clearInterval(interval)
                })["ChatRoomList.useEffect"];
            }
        }
    }["ChatRoomList.useEffect"], [
        currentUserId
    ]);
    const loadRooms = async ()=>{
        setLoading(true);
        setError('');
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getChatRooms"])(currentUserId);
            setRooms(data);
        } catch (err) {
            console.error('채팅방 목록 로드 실패:', err);
            setError('채팅방 목록을 불러오는데 실패했습니다.');
        } finally{
            setLoading(false);
        }
    };
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
        const isThisYear = now.getFullYear() === messageTime.getFullYear();
        if (isThisYear) {
            return `${messageTime.getMonth() + 1}.${messageTime.getDate()}`;
        }
        return `${messageTime.getFullYear().toString().slice(2)}.${(messageTime.getMonth() + 1).toString().padStart(2, '0')}.${messageTime.getDate().toString().padStart(2, '0')}`;
    };
    // 안읽은 메시지 개수 (백엔드에서 제공)
    const getUnreadCount = (room)=>{
        return room.unreadCount || 0;
    };
    const filteredRooms = rooms.filter((room)=>room.roomName?.toLowerCase().includes(searchQuery.toLowerCase()) || room.lastMessageContent?.toLowerCase().includes(searchQuery.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].title,
                        children: "채팅"
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchArea,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchInputWrapper,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchIcon
                                }, void 0, false, {
                                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                    lineNumber: 87,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "채팅 검색",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].searchInput
                                }, void 0, false, {
                                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                lineNumber: 82,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].roomsList,
                children: error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].error,
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                    lineNumber: 102,
                    columnNumber: 15
                }, this) : loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loading,
                    children: "채팅방 목록을 불러오는 중..."
                }, void 0, false, {
                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                    lineNumber: 104,
                    columnNumber: 15
                }, this) : filteredRooms.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].empty,
                    children: searchQuery ? '검색 결과가 없습니다.' : '채팅방이 없습니다.'
                }, void 0, false, {
                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                    lineNumber: 106,
                    columnNumber: 15
                }, this) : filteredRooms.map((room)=>{
                    const unreadCount = getUnreadCount(room);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>onSelectRoom(room.roomId, room.roomName || room.participantIds.filter((id)=>id !== currentUserId).join(', ')),
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].roomItem} ${unreadCount > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].unread : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].avatarWrapper,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].avatar,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].avatarText,
                                        children: room.roomName ? room.roomName.charAt(0) : '?'
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                        lineNumber: 120,
                                        columnNumber: 27
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                    lineNumber: 119,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                lineNumber: 118,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].roomInfo,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].roomHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].roomName,
                                                children: room.roomName || '이름 없는 방'
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                                lineNumber: 129,
                                                columnNumber: 27
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].roomMeta,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].roomTime,
                                                    children: formatTime(room.lastMessageTime)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 29
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                                lineNumber: 132,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                        lineNumber: 128,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].roomFooter,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].lastMessage} ${unreadCount > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].bold : ''}`,
                                                children: room.lastMessageContent || '새로운 대화가 시작되었습니다.'
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                                lineNumber: 139,
                                                columnNumber: 27
                                            }, this),
                                            unreadCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatRoomList$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].unreadBadge,
                                                children: unreadCount > 99 ? '99+' : unreadCount
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                                lineNumber: 143,
                                                columnNumber: 31
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                        lineNumber: 138,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                                lineNumber: 127,
                                columnNumber: 23
                            }, this)
                        ]
                    }, room.roomId, true, {
                        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                        lineNumber: 113,
                        columnNumber: 21
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/chatService/ChatRoomList.tsx",
        lineNumber: 81,
        columnNumber: 7
    }, this);
}
_s(ChatRoomList, "Y71tkxyX2mDiEKpzxG0EaCrcuOE=");
_c = ChatRoomList;
var _c;
__turbopack_context__.k.register(_c, "ChatRoomList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/userService/friends.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [client] (ecmascript)");
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/status?targetUserId=${encodeURIComponent(targetUserSignId)}`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/request`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/requests/received`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}/accept`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}/reject`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/block`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["FRIENDSSERVICE_API"]}/${friendId}/unblock`, {
        method: "DELETE",
        headers: headers
    });
    if (!response.ok) {
        const msg = await response.text();
        console.error(`Unblock User Failed: HTTP ${response.status} - ${msg}`);
        throw new Error(msg || "차단 해제 실패");
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/chatService/StartNewChatModal.module.css [client] (css module)", ((__turbopack_context__) => {

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
"[project]/src/component/chatService/StartNewChatModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// StartNewChatModal.tsx (최종 완성판 - FriendActionModal 참고 수정)
__turbopack_context__.s([
    "default",
    ()=>StartNewChatModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/chatService/chat.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/userService/friends.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/chatService/StartNewChatModal.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function StartNewChatModal({ currentUserId, onClose, onRoomCreated }) {
    _s();
    const [friends, setFriends] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedFriends, setSelectedFriends] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [roomName, setRoomName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StartNewChatModal.useEffect": ()=>{
            const loadFriends = {
                "StartNewChatModal.useEffect.loadFriends": async ()=>{
                    try {
                        const rawData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getFriendList"])();
                        const safeFriends = rawData.filter({
                            "StartNewChatModal.useEffect.loadFriends.safeFriends": (item)=>!!item && typeof item.friendId !== "undefined" && typeof item.requesterSignId === "string" && typeof item.receiverSignId === "string"
                        }["StartNewChatModal.useEffect.loadFriends.safeFriends"]).map({
                            "StartNewChatModal.useEffect.loadFriends.safeFriends": (item)=>({
                                    friendId: String(item.friendId),
                                    userSignId: item.requesterSignId === currentUserId ? item.receiverSignId : item.requesterSignId,
                                    name: item.name?.trim() || (item.requesterSignId === currentUserId ? item.receiverSignId : item.requesterSignId)
                                })
                        }["StartNewChatModal.useEffect.loadFriends.safeFriends"]).filter({
                            "StartNewChatModal.useEffect.loadFriends.safeFriends": (friend, index, self)=>friend.userSignId && index === self.findIndex({
                                    "StartNewChatModal.useEffect.loadFriends.safeFriends": (f)=>f.userSignId === friend.userSignId
                                }["StartNewChatModal.useEffect.loadFriends.safeFriends"])
                        }["StartNewChatModal.useEffect.loadFriends.safeFriends"]);
                        setFriends(safeFriends);
                    } catch (err) {
                        console.error("친구 목록 로드 실패:", err);
                        setError("친구 목록을 불러오지 못했습니다.");
                        setFriends([]);
                    } finally{
                        setLoading(false);
                    }
                }
            }["StartNewChatModal.useEffect.loadFriends"];
            loadFriends();
        }
    }["StartNewChatModal.useEffect"], [
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
            const newRoom = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$chatService$2f$chat$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["createChatRoom"])(participantIds, finalName, currentUserId);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].backdrop,
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].modal,
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].header,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "새 채팅 시작하기"
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].closeBtn,
                                "aria-label": "닫기",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].body,
                        children: [
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].error,
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                lineNumber: 138,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].inputGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            "채팅방 이름 ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].friendListSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sectionTitle,
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
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loading,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                className: "animate-spin",
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                lineNumber: 157,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    }, this) : friends.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].empty,
                                        children: "친구가 없습니다"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                        lineNumber: 161,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].friendList,
                                        children: friends.map((friend)=>{
                                            const isSelected = selectedFriends.includes(friend.userSignId);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>toggleFriend(friend.userSignId),
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].friendItem} ${isSelected ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].selected : ''}`,
                                                role: "button",
                                                tabIndex: 0,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].friendInfo,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].avatar,
                                                                children: getAvatarLetter(friend)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                                lineNumber: 175,
                                                                columnNumber: 31
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].friendName,
                                                                        children: friend.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/component/chatService/StartNewChatModal.tsx",
                                                                        lineNumber: 179,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].friendId,
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
                                                    isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].footer,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSubmit,
                            disabled: selectedFriends.length === 0 || submitting,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$StartNewChatModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].submitBtn,
                            children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: "생성 중..."
                            }, void 0, false) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
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
_s(StartNewChatModal, "IZVPbgw5UT38s6uU9DkakK9GmyI=");
_c = StartNewChatModal;
var _c;
__turbopack_context__.k.register(_c, "StartNewChatModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/chatService/ChatPage.module.css [client] (css module)", ((__turbopack_context__) => {

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
"[project]/src/styles/layout/layout.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "Link": "layout-module__oXCPXq__Link",
  "dropdownHeader": "layout-module__oXCPXq__dropdownHeader",
  "dropdownItem": "layout-module__oXCPXq__dropdownItem",
  "leftSection": "layout-module__oXCPXq__leftSection",
  "navLink": "layout-module__oXCPXq__navLink",
  "profileCircle": "layout-module__oXCPXq__profileCircle",
  "profileContainer": "layout-module__oXCPXq__profileContainer",
  "profileDropdown": "layout-module__oXCPXq__profileDropdown",
  "profileImage": "layout-module__oXCPXq__profileImage",
  "profileSection": "layout-module__oXCPXq__profileSection",
  "rightItem": "layout-module__oXCPXq__rightItem",
  "rightSection": "layout-module__oXCPXq__rightSection",
  "topbar": "layout-module__oXCPXq__topbar",
});
}),
"[project]/src/styles/userService/LoginModal.module.css [client] (css module)", ((__turbopack_context__) => {

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
  "profileCircle": "LoginModal-module__9G312W__profileCircle",
  "profileImage": "LoginModal-module__9G312W__profileImage",
  "profileSection": "LoginModal-module__9G312W__profileSection",
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
"[project]/src/api/userService/user.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/api/userService/user.ts (최종 완성본)
__turbopack_context__.s([
    "acceptFriend",
    ()=>acceptFriend,
    "changePassword",
    ()=>changePassword,
    "checkEmail",
    ()=>checkEmail,
    "checkNickName",
    ()=>checkNickName,
    "checkUserSignId",
    ()=>checkUserSignId,
    "getUserProfile",
    ()=>getUserProfile,
    "getUserProfiles",
    ()=>getUserProfiles,
    "login",
    ()=>login,
    "requestFriend",
    ()=>requestFriend,
    "signup",
    ()=>signup,
    "updateNickname",
    ()=>updateNickname,
    "uploadProfileImage",
    ()=>uploadProfileImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [client] (ecmascript)");
;
async function uploadProfileImage(userSignId, imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/profile/image`, {
        method: 'POST',
        headers: {
            // 파일 업로드는 Content-Type을 'multipart/form-data'로 명시하지 않아야
            // 브라우저가 boundary를 자동으로 설정합니다.
            userSignId: userSignId
        },
        body: formData
    });
    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "프로필 이미지 업로드 실패");
    }
    // 백엔드에서 새로운 프로필 이미지 경로({ profileImg: "/path/to/image.jpg" })를 반환한다고 가정
    return await response.json();
}
async function changePassword(userSignId, currentPassword, newPassword) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/profile/password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            userSignId: userSignId
        },
        body: JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
        })
    });
    if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "비밀번호 변경 실패");
    }
    // 성공 시 메시지를 반환한다고 가정
    return {
        success: true,
        message: "비밀번호가 성공적으로 변경되었습니다."
    };
}
async function getUserProfile(userSignId) {
    try {
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/profile/${userSignId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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
async function getUserProfiles(userSignIds) {
    const profileMap = new Map();
    // 중복 제거
    const uniqueIds = [
        ...new Set(userSignIds)
    ];
    // 병렬로 조회
    const results = await Promise.allSettled(uniqueIds.map((id)=>getUserProfile(id)));
    results.forEach((result, index)=>{
        if (result.status === 'fulfilled' && result.value) {
            profileMap.set(uniqueIds[index], result.value);
        }
    });
    return profileMap;
}
async function signup(formData) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/signup`, {
        method: "POST",
        // FormData 사용 시 Content-Type 헤더를 설정하지 않음 (브라우저가 자동으로 설정)
        body: formData
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/login`, {
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
        accessToken,
        profileImg: body.profileImg
    };
}
async function checkUserSignId(userSignId) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/existId?userId=${encodeURIComponent(userSignId)}`);
    const text = await response.text();
    const available = text.trim() === "not exists";
    return {
        available
    };
}
async function checkEmail(email) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/existEmail?email=${encodeURIComponent(email)}`);
    const text = await response.text();
    const available = text.trim() === "not exists";
    return {
        available
    };
}
async function checkNickName(nickname) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/existNickname?nickname=${encodeURIComponent(nickname)}`);
    const text = await response.text();
    const available = text.trim() === "not exists";
    return {
        available
    };
}
async function requestFriend(requesterSignId, reqDto) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/friends`, {
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
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/friends/${requesterSignId}/accept`, {
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
async function updateNickname(userSignId, newNickName) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/profile/nickname`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'userSignId': userSignId
        },
        body: JSON.stringify({
            newNickName
        })
    });
    if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.message || "닉네임 변경에 실패했습니다.");
    }
    return await response.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/userService/LoginModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/userService/LoginModal.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$user$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/userService/user.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function LoginModal({ onClose, onLoginSuccess }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [userSignId, setUserSignId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$user$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["login"])({
                userSignId,
                password
            });
            console.log("🔥 [LoginModal] 로그인 응답:", response);
            console.log("🔥 [LoginModal] response.profileImg:", response.profileImg);
            console.log("🔥 [LoginModal] response.profile_img:", response.profile_img);
            // 토큰 및 사용자 정보 저장
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);
            localStorage.setItem("userSignId", response.userSignId);
            // 프로필 이미지가 있으면 저장 (profileImg 또는 profile_img 모두 확인)
            const profileImage = response.profileImg || response.profile_img;
            console.log("🔥 [LoginModal] 최종 profileImage:", profileImage);
            if (profileImage) {
                localStorage.setItem("profile_img", profileImage);
                console.log("✅ [LoginModal] localStorage에 저장됨:", profileImage);
            } else {
                console.warn("⚠️ [LoginModal] 프로필 이미지가 응답에 없습니다");
            }
            alert("환영합니다!");
            onLoginSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].overlay,
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].modalBox,
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].leftSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].illustration,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                role: "img",
                                "aria-label": "sparkles",
                                style: {
                                    fontSize: "4rem"
                                },
                                children: "✨"
                            }, void 0, false, {
                                fileName: "[project]/src/component/userService/LoginModal.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 61,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].welcomeText,
                            children: "다시 만나서 반가워요"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 64,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].welcomeSub,
                            children: "오늘도 소중한 순간을 기록해볼까요?"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                    lineNumber: 60,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].closeButton,
                            onClick: onClose,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].title,
                            children: "로그인"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].form,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].input,
                                    placeholder: "아이디",
                                    value: userSignId,
                                    onChange: (e)=>setUserSignId(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].input,
                                    placeholder: "비밀번호",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value)
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].errorMessage,
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 89,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loginButton,
                                    children: "로그인"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 91,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].footer,
                            children: [
                                "아직 계정이 없나요? ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/signup",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].signupLink,
                                    onClick: onClose,
                                    children: "회원가입"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 97,
                                    columnNumber: 27
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 96,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                    lineNumber: 69,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/userService/LoginModal.tsx",
            lineNumber: 57,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/component/userService/LoginModal.tsx",
        lineNumber: 56,
        columnNumber: 7
    }, this);
}
_s(LoginModal, "mPh5DVJ2FZb4i77oJfYJqPtfkgU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LoginModal;
var _c;
__turbopack_context__.k.register(_c, "LoginModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/userService/ModalFriends.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "cancelButton": "ModalFriends-module__4kHBrW__cancelButton",
  "closeButton": "ModalFriends-module__4kHBrW__closeButton",
  "deleteButton": "ModalFriends-module__4kHBrW__deleteButton",
  "fadeIn": "ModalFriends-module__4kHBrW__fadeIn",
  "listItemDeleteButton": "ModalFriends-module__4kHBrW__listItemDeleteButton",
  "modalActions": "ModalFriends-module__4kHBrW__modalActions",
  "modalBackdrop": "ModalFriends-module__4kHBrW__modalBackdrop",
  "modalContent": "ModalFriends-module__4kHBrW__modalContent",
  "modalMessage": "ModalFriends-module__4kHBrW__modalMessage",
  "modalTitle": "ModalFriends-module__4kHBrW__modalTitle",
  "slideInRight": "ModalFriends-module__4kHBrW__slideInRight",
});
}),
"[project]/src/component/userService/FriendActionModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FriendManagerModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/userService/ModalFriends.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/userService/friends.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const ITEMS_PER_PAGE = 5;
const RequestItem = ({ userSignId, friendId, onAccept, onReject })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between p-3 border-b last:border-b-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-semibold text-gray-700",
                children: userSignId
            }, void 0, false, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onAccept(friendId),
                        className: "px-3 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600 transition",
                        children: "수락"
                    }, void 0, false, {
                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onReject(friendId),
                        className: "px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition",
                        children: "거절"
                    }, void 0, false, {
                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c = RequestItem;
const FriendListItem = ({ userSignId, friendId, onRemove })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between p-3 border-b last:border-b-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-semibold text-gray-700",
                children: userSignId
            }, void 0, false, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>onRemove(friendId),
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].listItemDeleteButton,
                children: "삭제"
            }, void 0, false, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
_c1 = FriendListItem;
function FriendManagerModal({ currentUserSignId, isOpen, onClose }) {
    _s();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("add");
    const [inputId, setInputId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [requests, setRequests] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [friends, setFriends] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [requestsCurrentPage, setRequestsCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [friendsCurrentPage, setFriendsCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const loadData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FriendManagerModal.useCallback[loadData]": async ()=>{
            setLoading(true);
            try {
                const [requestsData, friendsData] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getReceivedFriendRequests"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getFriendList"])()
                ]);
                setRequests(requestsData.map({
                    "FriendManagerModal.useCallback[loadData]": (d)=>({
                            friendId: d.friendId,
                            userSignId: d.requesterSignId
                        })
                }["FriendManagerModal.useCallback[loadData]"]));
                setFriends(friendsData.map({
                    "FriendManagerModal.useCallback[loadData]": (d)=>({
                            friendId: d.friendId,
                            userSignId: d.requesterSignId === currentUserSignId ? d.receiverSignId : d.requesterSignId
                        })
                }["FriendManagerModal.useCallback[loadData]"]));
            } catch (err) {
                console.error("Failed to load friend data", err);
                setRequests([]);
                setFriends([]);
            } finally{
                setLoading(false);
            }
        }
    }["FriendManagerModal.useCallback[loadData]"], [
        currentUserSignId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FriendManagerModal.useEffect": ()=>{
            if (isOpen) {
                loadData();
                setRequestsCurrentPage(1);
                setFriendsCurrentPage(1);
            }
        }
    }["FriendManagerModal.useEffect"], [
        isOpen,
        loadData
    ]);
    // ✨ 수정: 친구 요청 전 상태 확인 로직 추가
    const sendRequest = async ()=>{
        const trimmedId = inputId.trim();
        // 입력값 검증
        if (!trimmedId) {
            return alert("아이디를 입력해주세요");
        }
        // 자기 자신에게 요청하는 경우
        if (trimmedId === currentUserSignId) {
            return alert("자신에게는 친구를 추가할 수 없습니다");
        }
        try {
            // ✨ 친구 관계 상태 확인
            const status = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getFriendshipStatus"])(currentUserSignId, trimmedId);
            // 이미 친구 관계가 존재하는 경우
            if (status) {
                if (status.friendsStatus === "ACCEPTED") {
                    return alert("이미 친구 관계입니다");
                } else if (status.friendsStatus === "PENDING") {
                    // 요청자가 현재 사용자인 경우
                    if (status.requesterSignId === currentUserSignId) {
                        return alert("이미 친구 요청을 보낸 상태입니다");
                    } else {
                        // 상대방이 요청자인 경우
                        return alert("상대방이 이미 친구 요청을 보냈습니다. '친구 요청' 탭에서 확인해주세요");
                    }
                } else if (status.friendsStatus === "BLOCKED") {
                    return alert("차단된 사용자입니다");
                }
            }
            // 상태 확인 완료 후 친구 요청 전송
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["sendFriendRequest"])(currentUserSignId, trimmedId);
            alert("친구 요청을 보냈습니다!");
            setInputId("");
        } catch (err) {
            alert(err.message || "요청 실패");
        }
    };
    const accept = async (friendId)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["acceptFriendRequest"])(currentUserSignId, friendId);
            alert("친구 요청을 수락했습니다.");
            loadData();
        } catch (err) {
            alert(err.message || "수락 실패");
        }
    };
    const reject = async (friendId)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["rejectFriendRequest"])(currentUserSignId, friendId);
            alert("친구 요청을 거절했습니다.");
            loadData();
        } catch (err) {
            alert(err.message || "거절 실패");
        }
    };
    const remove = async (friendId)=>{
        if (!confirm("정말 삭제하시겠습니까?")) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$friends$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["deleteFriend"])(currentUserSignId, friendId);
            alert("친구가 삭제되었습니다.");
            loadData();
        } catch (err) {
            alert(err.message || "삭제 실패");
        }
    };
    if (!isOpen) return null;
    const getPaginationData = (list, currentPage)=>{
        const totalItems = list.length;
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const currentItems = list.slice(startIndex, endIndex);
        return {
            currentItems,
            totalItems,
            totalPages
        };
    };
    const { currentItems: currentRequests, totalItems: totalRequests, totalPages: requestsTotalPages } = getPaginationData(requests, requestsCurrentPage);
    const { currentItems: currentFriends, totalItems: totalFriends, totalPages: friendsTotalPages } = getPaginationData(friends, friendsCurrentPage);
    const PaginationControls = ({ totalPages, currentPage, setCurrentPage })=>{
        if (totalPages <= 1) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex justify-center space-x-2 mt-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setCurrentPage(Math.max(1, currentPage - 1)),
                    disabled: currentPage === 1,
                    className: "px-3 py-1 border rounded disabled:opacity-50",
                    children: "이전"
                }, void 0, false, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 228,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "py-1 px-3",
                    children: [
                        currentPage,
                        " / ",
                        totalPages
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 235,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setCurrentPage(Math.min(totalPages, currentPage + 1)),
                    disabled: currentPage === totalPages,
                    className: "px-3 py-1 border rounded disabled:opacity-50",
                    children: "다음"
                }, void 0, false, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 238,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
            lineNumber: 227,
            columnNumber: 9
        }, this);
    };
    const TabButton = ({ label, type, count })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: ()=>{
                setTab(type);
                if (type === 'requests') setRequestsCurrentPage(1);
                if (type === 'friends') setFriendsCurrentPage(1);
            },
            className: `flex-1 text-center py-3 font-semibold transition relative ${tab === type ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`,
            children: [
                label,
                count !== undefined && count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ml-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full",
                    children: count
                }, void 0, false, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 264,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
            lineNumber: 250,
            columnNumber: 7
        }, this);
    const renderContent = ()=>{
        if (loading) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 text-center text-gray-500",
                children: "로딩 중..."
            }, void 0, false, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 273,
                columnNumber: 14
            }, this);
        }
        switch(tab){
            case "add":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold mb-4",
                            children: "친구 ID로 추가"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 280,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: inputId,
                                    onChange: (e)=>setInputId(e.target.value),
                                    onKeyPress: (e)=>e.key === 'Enter' && sendRequest(),
                                    placeholder: "친구의 ID를 입력하세요",
                                    className: "flex-grow p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 282,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: sendRequest,
                                    className: "px-6 py-3 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 transition",
                                    children: "요청"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 290,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 281,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 279,
                    columnNumber: 13
                }, this);
            case "requests":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold mb-4",
                            children: [
                                "받은 친구 요청 (",
                                totalRequests,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 302,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border border-gray-200 rounded",
                            children: totalRequests === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p-4 text-center text-gray-500",
                                children: "받은 친구 요청이 없습니다."
                            }, void 0, false, {
                                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                lineNumber: 305,
                                columnNumber: 21
                            }, this) : currentRequests.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RequestItem, {
                                    ...item,
                                    onAccept: accept,
                                    onReject: reject
                                }, item.friendId, false, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 308,
                                    columnNumber: 25
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 303,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaginationControls, {
                            totalPages: requestsTotalPages,
                            currentPage: requestsCurrentPage,
                            setCurrentPage: setRequestsCurrentPage
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 317,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 301,
                    columnNumber: 13
                }, this);
            case "friends":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-xl font-bold mb-4",
                            children: [
                                "내 친구 목록 (",
                                totalFriends,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 327,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border border-gray-200 rounded",
                            children: totalFriends === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "p-4 text-center text-gray-500",
                                children: "등록된 친구가 없습니다."
                            }, void 0, false, {
                                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                lineNumber: 330,
                                columnNumber: 21
                            }, this) : currentFriends.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FriendListItem, {
                                    ...item,
                                    onRemove: remove
                                }, item.friendId, false, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 333,
                                    columnNumber: 25
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 328,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaginationControls, {
                            totalPages: friendsTotalPages,
                            currentPage: friendsCurrentPage,
                            setCurrentPage: setFriendsCurrentPage
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                            lineNumber: 341,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                    lineNumber: 326,
                    columnNumber: 13
                }, this);
            default:
                return null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].modalBackdrop,
                onMouseDown: onClose
            }, void 0, false, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 355,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].modalContent,
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].closeButton,
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                        lineNumber: 357,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-8 border-b",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$ModalFriends$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].modalTitle,
                                    children: "친구 관리"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                    lineNumber: 360,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex -mx-8 border-b",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                        label: "친구 추가",
                                        type: "add"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                        lineNumber: 363,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                        label: "친구 요청",
                                        type: "requests",
                                        count: requests.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TabButton, {
                                        label: "친구 목록",
                                        type: "friends",
                                        count: friends.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                        lineNumber: 365,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                                lineNumber: 362,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                        lineNumber: 358,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col flex-grow",
                        children: renderContent()
                    }, void 0, false, {
                        fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                        lineNumber: 368,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/userService/FriendActionModal.tsx",
                lineNumber: 356,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(FriendManagerModal, "7N9e/EKC+ObIo5oEQNSLyCTSXCU=");
_c2 = FriendManagerModal;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "RequestItem");
__turbopack_context__.k.register(_c1, "FriendListItem");
__turbopack_context__.k.register(_c2, "FriendManagerModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/imageUtils.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getImageUrl",
    ()=>getImageUrl,
    "getInitial",
    ()=>getInitial
]);
const getImageUrl = (path)=>{
    if (!path) return '';
    // 이미 완전한 URL인 경우 그대로 반환
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }
    // userService 포트로 직접 연결 (Gateway 우회)
    const USERSERVICE_URL = 'http://127.0.0.1:1003';
    return `${USERSERVICE_URL}${path}`;
};
const getInitial = (userId)=>{
    if (!userId || userId.length === 0) return '?';
    return userId[0].toUpperCase();
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/layout/Bar/Topbar.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Topbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/layout/layout.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$LoginModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/userService/LoginModal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$FriendActionModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/userService/FriendActionModal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imageUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/imageUtils.ts [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
// 🟢 [추가] ProfileDropdown 컴포넌트
const ProfileDropdown = ({ onClose, onNavigate, userSignId })=>{
    const handleLinkClick = (path)=>{
        onNavigate(path);
        onClose();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].profileDropdown,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dropdownHeader,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: userSignId
                }, void 0, false, {
                    fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                    lineNumber: 28,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>handleLinkClick(`/my-posts/${userSignId}`),
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dropdownItem,
                children: "내 게시물"
            }, void 0, false, {
                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>handleLinkClick('/setting'),
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dropdownItem,
                children: "설정 (이미지/비밀번호)"
            }, void 0, false, {
                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
        lineNumber: 26,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ProfileDropdown;
function Topbar() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showLoginModal, setShowLoginModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFriendModal, setShowFriendModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [profileImg, setProfileImg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [userSignId, setUserSignId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [imageLoadError, setImageLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 🟢 [추가] 드롭다운 메뉴 상태
    const [showProfileDropdown, setShowProfileDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 초기 로그인 상태 확인
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Topbar.useEffect": ()=>{
            checkLoginStatus();
            setImageLoadError(false);
        }
    }["Topbar.useEffect"], []);
    const checkLoginStatus = ()=>{
        const token = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("userSignId");
        const profile = localStorage.getItem("profile_img");
        console.log("🔥 [Topbar] checkLoginStatus 호출");
        console.log("🔥 [Topbar] token:", token ? "존재" : "없음");
        console.log("🔥 [Topbar] userId:", userId);
        console.log("🔥 [Topbar] profile_img from localStorage:", profile);
        setIsLoggedIn(!!token);
        setUserSignId(userId || '');
        setProfileImg(profile || '');
        console.log("🔥 [Topbar] State 업데이트 - profileImg:", profile || '없음');
    };
    const handleLoginSuccess = ()=>{
        checkLoginStatus();
        setShowLoginModal(false);
    };
    const handleLogout = ()=>{
        localStorage.clear();
        setIsLoggedIn(false);
        setProfileImg('');
        setUserSignId('');
        alert("로그아웃 되었습니다.");
        router.push("/");
    };
    const handleProfileClick = ()=>{
        setShowProfileDropdown((prev)=>!prev);
    };
    const handleNavigate = (path)=>{
        router.push(path);
        setShowProfileDropdown(false); // 네비게이션 후 닫기
    };
    // 로그인한 사용자 signId 가져오기
    const currentUserSignId = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("userSignId") || "" : "TURBOPACK unreachable";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].topbar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].leftSection,
                        children: "MomenTory"
                    }, void 0, false, {
                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightSection,
                        children: isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/community",
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].navLink}`,
                                    children: "커뮤니티"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                    lineNumber: 115,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem,
                                    style: {
                                        cursor: 'pointer'
                                    },
                                    onClick: ()=>setShowFriendModal(true),
                                    children: [
                                        "친구",
                                        showFriendModal && currentUserSignId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$FriendActionModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                            currentUserSignId: currentUserSignId,
                                            isOpen: showFriendModal,
                                            onClose: ()=>setShowFriendModal(false)
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                            lineNumber: 127,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                    lineNumber: 120,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/page",
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].writeButton}`,
                                    children: "채팅"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                    lineNumber: 135,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/write",
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].writeButton}`,
                                    children: "Log 작성"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                    lineNumber: 139,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].profileContainer,
                                    children: [
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].profileSection,
                                            onClick: handleProfileClick,
                                            style: {
                                                cursor: 'pointer'
                                            },
                                            children: profileImg && !imageLoadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imageUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getImageUrl"])(profileImg),
                                                alt: "프로필",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].profileImage,
                                                onError: (e)=>{
                                                    console.error('❌ 이미지 로드 실패:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imageUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getImageUrl"])(profileImg));
                                                    setImageLoadError(true);
                                                    e.currentTarget.style.display = 'none';
                                                },
                                                onLoad: ()=>{
                                                    console.log('✅ 이미지 로드 성공:', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imageUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getImageUrl"])(profileImg));
                                                    setImageLoadError(false);
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                                lineNumber: 151,
                                                columnNumber: 27
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].profileCircle,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imageUtils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getInitial"])(userSignId)
                                            }, void 0, false, {
                                                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                                lineNumber: 166,
                                                columnNumber: 27
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                            lineNumber: 144,
                                            columnNumber: 21
                                        }, this),
                                        showProfileDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileDropdown, {
                                            onClose: ()=>setShowProfileDropdown(false),
                                            onNavigate: handleNavigate,
                                            userSignId: userSignId
                                        }, void 0, false, {
                                            fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                            lineNumber: 174,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                    lineNumber: 143,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem,
                                    onClick: handleLogout,
                                    style: {
                                        cursor: 'pointer'
                                    },
                                    children: "로그아웃"
                                }, void 0, false, {
                                    fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                    lineNumber: 183,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem,
                            style: {
                                cursor: "pointer"
                            },
                            onClick: ()=>setShowLoginModal(true),
                            children: "로그인"
                        }, void 0, false, {
                            fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                            lineNumber: 189,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this),
            showLoginModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$LoginModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                onClose: ()=>setShowLoginModal(false),
                onLoginSuccess: handleLoginSuccess
            }, void 0, false, {
                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                lineNumber: 201,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s(Topbar, "S5Q7LmN9Lhyk4bkOSogLuu3ZvZk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = Topbar;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProfileDropdown");
__turbopack_context__.k.register(_c1, "Topbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/layout/MainLayout.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "layoutContainer": "MainLayout-module__rxU5Kq__layoutContainer",
  "mainContent": "MainLayout-module__rxU5Kq__mainContent",
});
}),
"[project]/src/component/layout/MainLayout.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$Bar$2f$Topbar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/Bar/Topbar.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$MainLayout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/layout/MainLayout.module.css [client] (css module)");
;
;
;
function Layout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$MainLayout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].layoutContainer,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$Bar$2f$Topbar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/component/layout/MainLayout.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$MainLayout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].mainContent,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/component/layout/MainLayout.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/component/layout/MainLayout.tsx",
        lineNumber: 11,
        columnNumber: 7
    }, this);
}
_c = Layout;
var _c;
__turbopack_context__.k.register(_c, "Layout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/page.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// component/chatService/ChatPage.tsx
__turbopack_context__.s([
    "default",
    ()=>ChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$ChatRoom$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/chatService/ChatRoom.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$ChatRoomList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/chatService/ChatRoomList.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$StartNewChatModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/chatService/StartNewChatModal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/chatService/ChatPage.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/MainLayout.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ChatPage({ currentUserId: initialUserId, currentUserName: initialUserName }) {
    _s();
    const [selectedRoom, setSelectedRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showNewChatModal, setShowNewChatModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ✅ WritePage와 동일한 패턴으로 localStorage 사용
    const [currentUserId, setCurrentUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentUserName, setCurrentUserName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // ✅ WritePage와 완전히 동일한 패턴으로 사용자 정보 로드
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            const id = localStorage.getItem('userSignId');
            const name = localStorage.getItem('userName');
            if (id) {
                setCurrentUserId(id);
                setCurrentUserName(name || id);
            } else {
                console.warn("사용자 정보를 찾을 수 없습니다.");
            }
            setIsLoading(false);
        }
    }["ChatPage.useEffect"], []);
    const handleRoomCreated = (newRoom)=>{
        setShowNewChatModal(false);
        setSelectedRoom({
            id: newRoom.roomId,
            name: newRoom.roomName
        });
    };
    // ✅ 로딩 중 표시
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-screen",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "로딩 중..."
                }, void 0, false, {
                    fileName: "[project]/src/pages/page.tsx",
                    lineNumber: 51,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/page.tsx",
                lineNumber: 50,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/page.tsx",
            lineNumber: 49,
            columnNumber: 9
        }, this);
    }
    // ✅ 로그인 체크
    if (!currentUserId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center h-screen",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-4",
                            children: "로그인이 필요한 서비스입니다."
                        }, void 0, false, {
                            fileName: "[project]/src/pages/page.tsx",
                            lineNumber: 63,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.location.href = '/login',
                            className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
                            children: "로그인하기"
                        }, void 0, false, {
                            fileName: "[project]/src/pages/page.tsx",
                            lineNumber: 64,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/page.tsx",
                    lineNumber: 62,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/pages/page.tsx",
                lineNumber: 61,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/pages/page.tsx",
            lineNumber: 60,
            columnNumber: 9
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].sidebar} ${selectedRoom ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].hiddenOnMobile : ''}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$ChatRoomList$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        currentUserId: currentUserId,
                        onSelectRoom: (id, name)=>setSelectedRoom({
                                id,
                                name
                            }),
                        onCreateRoom: ()=>setShowNewChatModal(true)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/page.tsx",
                        lineNumber: 80,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/page.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].main,
                    children: selectedRoom ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$ChatRoom$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        roomId: selectedRoom.id,
                        roomName: selectedRoom.name,
                        currentUserId: currentUserId,
                        currentUserName: currentUserName,
                        onBack: ()=>setSelectedRoom(null)
                    }, void 0, false, {
                        fileName: "[project]/src/pages/page.tsx",
                        lineNumber: 89,
                        columnNumber: 17
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].emptyState,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].emptyIcon,
                                children: "💬"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/page.tsx",
                                lineNumber: 98,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "채팅을 시작하세요"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/page.tsx",
                                lineNumber: 99,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "친구를 선택하여 대화를 시작해보세요"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/page.tsx",
                                lineNumber: 100,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowNewChatModal(true),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$chatService$2f$ChatPage$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].newChatBtn,
                                children: "새 채팅 시작"
                            }, void 0, false, {
                                fileName: "[project]/src/pages/page.tsx",
                                lineNumber: 101,
                                columnNumber: 19
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/page.tsx",
                        lineNumber: 97,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/pages/page.tsx",
                    lineNumber: 87,
                    columnNumber: 11
                }, this),
                showNewChatModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$chatService$2f$StartNewChatModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    currentUserId: currentUserId,
                    onClose: ()=>setShowNewChatModal(false),
                    onRoomCreated: handleRoomCreated
                }, void 0, false, {
                    fileName: "[project]/src/pages/page.tsx",
                    lineNumber: 109,
                    columnNumber: 15
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/page.tsx",
            lineNumber: 78,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/page.tsx",
        lineNumber: 77,
        columnNumber: 7
    }, this);
}
_s(ChatPage, "ELezwv0PguTwy4v39wHs/VwF4jQ=");
_c = ChatPage;
var _c;
__turbopack_context__.k.register(_c, "ChatPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/page.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/page";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/page.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/src/pages/page\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/page.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__4104287c._.js.map