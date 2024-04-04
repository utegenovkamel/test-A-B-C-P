import "@mantine/core/styles.css";
import { Outlet } from "@tanstack/react-router";

export default function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
