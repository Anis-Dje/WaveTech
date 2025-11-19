(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/store/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
;
;
const useAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
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
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
            delete __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.headers.common["Authorization"];
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
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("http://127.0.0.1:8000/api/auth/jwt/refresh/", {
                    refresh: refreshToken
                });
                const newToken = response.data.access;
                const currentUser = get().user;
                if (currentUser) {
                    set({
                        token: newToken
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
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
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
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
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    partialize: (state)=>({
            token: state.token,
            user: state.user,
            isAuthenticated: state.isAuthenticated
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/app/AuthProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$store$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/wavetech-complete - Copie/wavetech-complete - Copie/frontend/store/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AuthProvider({ children }) {
    _s();
    const { initializeAuth, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$store$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Initialize auth state from storage
            initializeAuth();
        }
    }["AuthProvider.useEffect"], []);
    // Show loading while initializing
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(AuthProvider, "dje8yo+SGPdSPkQF+o7XXic8Gw4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$wavetech$2d$complete__$2d$__Copie$2f$wavetech$2d$complete__$2d$__Copie$2f$frontend$2f$store$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_wavetech-complete%20-%20Copie_wavetech-complete%20-%20Copie_frontend_f1376e90._.js.map