import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";
import App from "./App.tsx";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(
    () => import("./pages/UserInfo.tsx"),
    "UserInfo",
  ),
});

// const newFormationPage = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/formations/new",
//   component: lazyRouteComponent(
//     () => import("./pages/NewFormationPage.tsx"),
//     "NewFormationPage",
//   ),
//   validateSearch: (search: Record<string, unknown>) => {
//     return {
//       parent_id:
//         search.parent_id != null ? Number(search.parent_id) : undefined,
//     };
//   },
// });

const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
