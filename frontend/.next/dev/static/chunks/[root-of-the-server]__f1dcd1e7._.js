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
"[project]/src/api/blogService/blog.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteFeed",
    ()=>deleteFeed,
    "getFriendsPosts",
    ()=>getFriendsPosts,
    "getMyPosts",
    ()=>getMyPosts,
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
    "searchPosts",
    ()=>searchPosts,
    "toggleLike",
    ()=>toggleLike,
    "updatePost",
    ()=>updatePost,
    "uploadImage",
    ()=>uploadImage,
    "writeFeed",
    ()=>writeFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [client] (ecmascript)");
;
async function getPostTags(postId) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/tags?postId=${postId}`;
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
const searchPosts = async (keyword, page = 0, size = 10)=>{
    try {
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to search posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error searching posts:', error);
        throw error;
    }
};
async function uploadImage(file) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/upload`;
    const formData = new FormData();
    formData.append("file", file);
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/likes/${postId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/write`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/${postId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/write/${postId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/${postId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/view?postId=${postId}`;
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/trending?page=${page}&size=${size}`;
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
async function getMyPosts(userSignId, page = 0, size = 10) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/my-posts/${userSignId}?page=${page}&size=${size}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "authorId": userSignId,
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
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/recent?page=${page}&size=${size}`;
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
async function getFriendsPosts(userSignId, page = 0, size = 10) {
    const url = `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["BLOGSERVICE_API"]}/feed?page=${page}&size=${size}`;
    const token = localStorage.getItem('accessToken');
    console.log("--- Friends Posts API Call Debug ---");
    console.log(`User Sign ID: ${userSignId}`);
    console.log(`Token Key Check: 'accessToken'`);
    console.log("------------------------------------");
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            "userSignId": userSignId,
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorText = await response.text();
        throw new Error(errorText || `게시물 조회 실패: HTTP ${response.status}`);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/styles/blogService/MyPosts.module.css [client] (css module)", ((__turbopack_context__) => {

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
"[project]/src/pages/my-posts/[userSignId].tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// pages/my-posts/[userSignId].tsx
__turbopack_context__.s([
    "default",
    ()=>MyPostsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/blogService/blog.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/styles/blogService/MyPosts.module.css [client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/component/layout/MainLayout.tsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
;
;
;
;
;
// 🟢 [추가] HTML 태그를 제거하고 순수 텍스트만 추출하는 함수를 유틸리티로 정의
const stripHtml = (html)=>{
    if (!html) return "";
    if ("TURBOPACK compile-time truthy", 1) {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        const text = temp.textContent || temp.innerText || '';
        return text.replace(/\s+/g, ' ').trim();
    }
    //TURBOPACK unreachable
    ;
};
// 게시글 미리보기 컴포넌트 (PostPreview) 수정
const PostPreview = ({ post })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handlePostClick = ()=>{
        router.push(`/post/${post.postId}`);
    };
    const formatDate = (dateString)=>{
        return new Date(dateString).toLocaleDateString('ko-KR');
    };
    // 🟢 [수정] stripHtml 함수를 사용하여 미리보기 텍스트 생성
    const plainText = stripHtml(post.content);
    const previewText = plainText.length > 100 ? plainText.substring(0, 100) + "..." : plainText;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].postPreview,
        onClick: handlePostClick,
        children: [
            post.thumbnail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: post.thumbnail,
                alt: post.title,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].thumbnail
            }, void 0, false, {
                fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                lineNumber: 49,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].postContent,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].postTitle,
                        children: post.title
                    }, void 0, false, {
                        fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].postSnippet,
                        children: previewText
                    }, void 0, false, {
                        fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].postMeta,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "작성일: ",
                                    formatDate(post.createdAt)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "조회수: ",
                                    post.viewCount
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                        lineNumber: 59,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                lineNumber: 55,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
        lineNumber: 47,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PostPreview, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PostPreview;
// 💡 MyPostsContent 함수 (메인 로직)
function MyPostsContent({ authorId }) {
    _s1();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const finalAuthorId = Array.isArray(authorId) ? authorId[0] : authorId;
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isLastPage, setIsLastPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentUserId = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem("userSignId") : "TURBOPACK unreachable";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MyPostsContent.useEffect": ()=>{
            if (!finalAuthorId || !router.isReady) {
                return;
            }
            const fetchPosts = {
                "MyPostsContent.useEffect.fetchPosts": async (page)=>{
                    if (page === 0) setIsLoading(true);
                    setError(null);
                    try {
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$blogService$2f$blog$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["getMyPosts"])(finalAuthorId, page);
                        setPosts({
                            "MyPostsContent.useEffect.fetchPosts": (prev)=>page === 0 ? response.content : [
                                    ...prev,
                                    ...response.content
                                ]
                        }["MyPostsContent.useEffect.fetchPosts"]);
                        setIsLastPage(response.last);
                    } catch (err) {
                        setError("게시글 목록을 불러오는 데 실패했습니다.");
                        console.error(err);
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["MyPostsContent.useEffect.fetchPosts"];
            fetchPosts(currentPage);
        }
    }["MyPostsContent.useEffect"], [
        finalAuthorId,
        router.isReady,
        currentPage
    ]);
    const handleLoadMore = ()=>{
        if (!isLastPage && !isLoading) {
            setCurrentPage((prev)=>prev + 1);
        }
    };
    if (!finalAuthorId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loading,
            children: "정보를 불러오는 중..."
        }, void 0, false, {
            fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
            lineNumber: 114,
            columnNumber: 12
        }, this);
    }
    if (isLoading && currentPage === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loading,
            children: "게시글 목록 로딩 중..."
        }, void 0, false, {
            fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
            lineNumber: 118,
            columnNumber: 12
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].error,
            children: error
        }, void 0, false, {
            fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
            lineNumber: 122,
            columnNumber: 12
        }, this);
    }
    if (posts.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageTitle,
                    children: [
                        finalAuthorId,
                        "님의 게시물"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].noContent,
                    children: "작성된 게시글이 없습니다."
                }, void 0, false, {
                    fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
            lineNumber: 127,
            columnNumber: 9
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pageTitle,
                children: [
                    finalAuthorId,
                    "님의 게시물"
                ]
            }, void 0, true, {
                fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                lineNumber: 136,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].postList,
                children: posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PostPreview, {
                        post: post
                    }, post.postId, false, {
                        fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                        lineNumber: 142,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                lineNumber: 140,
                columnNumber: 9
            }, this),
            !isLastPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleLoadMore,
                disabled: isLoading,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$styles$2f$blogService$2f$MyPosts$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].loadMoreButton,
                children: isLoading ? '로딩 중...' : '더 보기'
            }, void 0, false, {
                fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
                lineNumber: 147,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
        lineNumber: 135,
        columnNumber: 7
    }, this);
}
_s1(MyPostsContent, "1C7Xbhg6BJUXNXsLYEnYtpwOAsQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = MyPostsContent;
function MyPostsPage() {
    _s2();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { userSignId } = router.query;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$component$2f$layout$2f$MainLayout$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MyPostsContent, {
            authorId: userSignId
        }, void 0, false, {
            fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
            lineNumber: 167,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/pages/my-posts/[userSignId].tsx",
        lineNumber: 166,
        columnNumber: 7
    }, this);
}
_s2(MyPostsPage, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = MyPostsPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "PostPreview");
__turbopack_context__.k.register(_c1, "MyPostsContent");
__turbopack_context__.k.register(_c2, "MyPostsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/my-posts/[userSignId].tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/my-posts/[userSignId]";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/src/pages/my-posts/[userSignId].tsx [client] (ecmascript)");
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
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/src/pages/my-posts/[userSignId].tsx\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/src/pages/my-posts/[userSignId].tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__f1dcd1e7._.js.map