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
"[project]/src/styles/layout/layout.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "Link": "layout-module__oXCPXq__Link",
  "leftSection": "layout-module__oXCPXq__leftSection",
  "navLink": "layout-module__oXCPXq__navLink",
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
"[project]/src/api/userService/user.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [client] (ecmascript)");
;
async function signup(userDto) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["USERSERVICE_API"]}/signup`, {
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
        accessToken
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/userService/LoginModal.module.css [client] (css module)"); // 위에서 만든 CSS 경로에 맞게 수정하세요
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
    // 로그인 핸들러
    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$userService$2f$user$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["login"])({
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
                                lineNumber: 47,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 46,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].welcomeText,
                            children: " 다시 만나서 반가워요"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 49,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].welcomeSub,
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightSection,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].closeButton,
                            onClick: onClose,
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].title,
                            children: "로그인"
                        }, void 0, false, {
                            fileName: "[project]/src/component/userService/LoginModal.tsx",
                            lineNumber: 57,
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
                                    lineNumber: 59,
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
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].errorMessage,
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/src/component/userService/LoginModal.tsx",
                                    lineNumber: 62,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$userService$2f$LoginModal$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loginButton,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$LoginModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/userService/LoginModal.tsx [client] (ecmascript)"); // (경로 확인 필요)
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function Topbar() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showLoginModal, setShowLoginModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false); // 모달 표시 상태
    // 초기 로그인 상태 확인
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Topbar.useEffect": ()=>{
            checkLoginStatus();
        }
    }["Topbar.useEffect"], []);
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
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem,
                                children: "검색"
                            }, void 0, false, {
                                fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this),
                            isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/community",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].navLink}`,
                                        children: "커뮤니티"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 50,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem,
                                        children: "알림"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 53,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem,
                                        children: "채팅"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 54,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/write",
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].rightItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$layout$2f$layout$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].writeButton}`,
                                        children: "Log 작성"
                                    }, void 0, false, {
                                        fileName: "[project]/src/component/layout/Bar/Topbar.tsx",
                                        lineNumber: 55,
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
                                        lineNumber: 58,
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
            showLoginModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$userService$2f$LoginModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(Topbar, "Gx5YvXrPP6xzsjaItLULTNTd8U8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Topbar;
var _c;
__turbopack_context__.k.register(_c, "Topbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/component/layout/MainLayout.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$Bar$2f$Topbar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/Bar/Topbar.tsx [client] (ecmascript)"); // Topbar 컴포넌트 경로에 맞게 수정
;
;
function Layout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$Bar$2f$Topbar$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/component/layout/MainLayout.tsx",
                lineNumber: 9,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/component/layout/MainLayout.tsx",
                lineNumber: 10,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_c = Layout;
var _c;
__turbopack_context__.k.register(_c, "Layout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/community/CommunityMain.module.css [client] (css module)", ((__turbopack_context__) => {

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
"[project]/src/api/communityService/community.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [client] (ecmascript)"); // 환경변수 설정 필요
;
async function createConcern(userSignId, request) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/concerns`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/concerns/${communityId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/concerns?page=${page}&size=${size}&sort=createdAt,DESC`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/concerns/${communityId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/projects`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/projects/${communityId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/projects?page=${page}&size=${size}&sort=createdAt,DESC`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/projects/${communityId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/studies`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/studies/${communityId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/studies?page=${page}&size=${size}&sort=createdAt,DESC`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/studies/${communityId}`;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/communityService/like.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [client] (ecmascript)");
;
async function toggleLike(type, communityId, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/likes/${type.toUpperCase()}/${communityId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/likes/${type.toUpperCase()}/${communityId}/count`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/likes/${type.toUpperCase()}/${communityId}/check`;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/communityService/comment.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [client] (ecmascript)");
;
async function createComment(type, communityId, request, userSignId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/comments/${type.toUpperCase()}/${communityId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/comments/${type.toUpperCase()}/${communityId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/comments/${commentId}/replies`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/comments/${type.toUpperCase()}/${communityId}/count`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/${type.toUpperCase()}/${communityId}/comments/${commentId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/${type.toUpperCase()}/${communityId}/comments/${commentId}`;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/api/communityService/tag.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/api/communityService/tag.ts
__turbopack_context__.s([
    "getTags",
    ()=>getTags
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [client] (ecmascript)");
;
async function getTags(communityId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["COMMUNITYSERVICE_API"]}/tags/${communityId}`;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/types/communityService/communityType.ts [client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/pages/community.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/pages/community.tsx
__turbopack_context__.s([
    "default",
    ()=>Community
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/MainLayout.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/community/CommunityMain.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/communityService/community.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$like$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/communityService/like.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$comment$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/communityService/comment.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$tag$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/communityService/tag.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/communityService/communityType.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-intersection-observer/dist/index.mjs [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('all');
    // ⭐️ [확인] CommunityPost[]로 설정 완료
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0); // 다음으로 로드할 페이지 인덱스 (0부터 시작)
    const [hasMore, setHasMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userSignId, setUserSignId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [ref, inView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"])({
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Community.useEffect": ()=>{
            setUserSignId(localStorage.getItem('userSignId') || '');
        }
    }["Community.useEffect"], []);
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
                    response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getConcernList"])(pageNum, 10);
                    postType = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN;
                    break;
                case 'project':
                    response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getProjectList"])(pageNum, 10);
                    postType = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT;
                    break;
                case 'study':
                    response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$community$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getStudyList"])(pageNum, 10);
                    postType = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY;
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
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$like$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getLikeCount"])(postType, post.communityId).catch(()=>0),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$comment$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getCommentCount"])(postType, post.communityId).catch(()=>0),
                    userSignId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$like$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["checkLike"])(postType, post.communityId, userSignId).catch(()=>false) : false,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$tag$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getTags"])(post.communityId).catch(()=>[])
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Community.useEffect": ()=>{
            // ⭐️ [수정] 탭 변경 시 상태 초기화 및 페이지 0 로드 요청
            setPosts([]);
            setPage(0);
            setHasMore(true);
            // Strict Mode에서 두 번 호출되지만, loadData 내부의 isLoading 체크와 중복 필터링으로 해결
            loadData(0, activeTab);
        }
    }["Community.useEffect"], [
        activeTab,
        userSignId
    ]);
    // ----------------------------------------------------------------------------------
    // 4. Effect for Infinite Scroll (Load Next Page)
    // ----------------------------------------------------------------------------------
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Community.useEffect": ()=>{
            if (inView && hasMore && !isLoading) {
                // ✅ inView일 때, 현재 page 상태(다음 로드할 페이지 번호)를 사용하여 데이터 로드
                loadData(page, activeTab);
            }
        }
    }["Community.useEffect"], [
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
            const newIsLiked = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$communityService$2f$like$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["toggleLike"])(post.postType, post.communityId, userSignId);
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
            case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN:
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].badgeConcern;
            case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT:
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].badgeProject;
            case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY:
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].badgeStudy;
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].badgeConcern;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].tabContainer,
                    children: tabs.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setActiveTab(tab.id),
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].tab} ${activeTab === tab.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].activeTab : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].tabEmoji,
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].grid,
                    children: posts.map((post)=>{
                        const postTypeLabel = post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN ? '고민' : post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT ? '프로젝트' : '스터디';
                        const badgeClass = post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].CONCERN ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].badgeConcern : post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].badgeProject : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].badgeStudy;
                        if (post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT || post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY) {
                            console.log(`Post ID: ${post.communityId}, Status: ${post.status}, Deadline: ${post.deadline}, StartDate: ${post.startDate}`);
                        }
                        const plainText = getPlainText(post.content);
                        const excerpt = plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: `/community/${post.postType.toLowerCase()}/${post.communityId}`,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardLink,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].card,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].badgeContainer,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].badge} ${badgeClass}`,
                                                        children: postTypeLabel
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 293,
                                                        columnNumber: 27
                                                    }, this),
                                                    (post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT || post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY) && post.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusBadge} ${post.status === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["RecruitmentStatus"].RECRUITING ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusRecruiting : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].statusClosed}`,
                                                        children: post.status === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["RecruitmentStatus"].RECRUITING ? '모집중' : '마감'
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
                                            (post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT || post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dateRight,
                                                children: [
                                                    post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].PROJECT && post.deadline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dateInfo,
                                                        children: [
                                                            "마감일: ",
                                                            formatDate(post.deadline)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 35
                                                    }, this),
                                                    post.postType === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$communityService$2f$communityType$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["CommunityPostType"].STUDY && post.startDate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].dateInfo,
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                        children: post.title || '제목 없음'
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/community.tsx",
                                        lineNumber: 322,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardExcerpt,
                                        children: excerpt
                                    }, void 0, false, {
                                        fileName: "[project]/src/pages/community.tsx",
                                        lineNumber: 323,
                                        columnNumber: 23
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].tags,
                                        children: post.tags && post.tags.length > 0 && post.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].tag,
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].cardFooter,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].authorInfo,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].author,
                                                        children: post.authorNickname || '익명'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 331,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].time,
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].stats,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: (e)=>{
                                                            e.preventDefault();
                                                            handleLikeToggle(post);
                                                        },
                                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].likeButton} ${post.isLiked ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].liked : ''}`,
                                                        children: [
                                                            "좋아요 ",
                                                            post.likeCount || 0
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/pages/community.tsx",
                                                        lineNumber: 335,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: ref,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loadMore,
                    children: !hasMore && posts.length > 0
                }, void 0, false, {
                    fileName: "[project]/src/pages/community.tsx",
                    lineNumber: 353,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/community/write",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$community$2f$CommunityMain$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].fab,
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
_s(Community, "C48toqJe2zROUm46ZDE8rRKptt4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = Community;
var _c;
__turbopack_context__.k.register(_c, "Community");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/community.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/community";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/community.tsx [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/src/pages/community\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/community.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__5be0476b._.js.map