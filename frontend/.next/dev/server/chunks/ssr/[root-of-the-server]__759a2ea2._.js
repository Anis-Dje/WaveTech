module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/store/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/node_modules/zustand/esm/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
;
;
const useAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: true,
        login: (token, user)=>{
            set({
                token,
                user,
                isAuthenticated: true,
                isLoading: false
            });
            // Set default authorization header for axios
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].defaults.headers.common["Authorization"] = `Bearer ${token}`;
            console.log("Login successful, token set");
        },
        logout: ()=>{
            set({
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            });
            // Remove authorization header
            delete __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].defaults.headers.common["Authorization"];
            // Clear localStorage
            localStorage.removeItem("refresh_token");
            console.log("Logout successful");
        },
        refreshAccessToken: async ()=>{
            const refreshToken = localStorage.getItem("refresh_token");
            if (!refreshToken) {
                get().logout();
                return false;
            }
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post("http://127.0.0.1:8000/api/auth/jwt/refresh/", {
                    refresh: refreshToken
                });
                const newToken = response.data.access;
                const currentUser = get().user;
                if (currentUser) {
                    set({
                        token: newToken
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                    console.log("Token refreshed successfully");
                    return true;
                }
                return false;
            } catch (error) {
                console.error("Token refresh failed:", error);
                get().logout();
                return false;
            }
        },
        initializeAuth: ()=>{
            const state = get();
            if (state.token && state.user) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
                set({
                    isLoading: false
                });
                console.log("Auth initialized from storage");
            } else {
                set({
                    isLoading: false
                });
                console.log("No stored auth found");
            }
        }
    }), {
    name: "auth-storage",
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    partialize: (state)=>({
            token: state.token,
            user: state.user,
            isAuthenticated: state.isAuthenticated
        })
}));
}),
"[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/app/AuthProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$store$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/store/auth.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function AuthProvider({ children }) {
    const { initializeAuth, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$store$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initialize auth state from storage
        initializeAuth();
    }, []);
    // Show loading while initializing
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xl",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/app/AuthProvider.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/app/AuthProvider.tsx",
            lineNumber: 20,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__759a2ea2._.js.map