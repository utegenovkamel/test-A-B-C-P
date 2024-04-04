import { Box, Button, Container, LoadingOverlay } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCallback, useState } from "react";
import { UserInfoCard } from "../UserInfoCard/UserInfoCard.tsx";
import { requestUser } from "../api/user/user.controller.ts";
import type { User } from "../api/user/user.model.ts";

type CallbackFunction = (...args: unknown[]) => void;

function useThrottle(callback: CallbackFunction, delay: number) {
  const [isReady, setIsReady] = useState(true);

  const throttledCallback: CallbackFunction = useCallback(
    (...args: unknown[]) => {
      if (!isReady) return;

      callback(...args);
      setIsReady(false);
      setTimeout(() => setIsReady(true), delay);
    },
    [callback, delay, isReady],
  );

  return throttledCallback;
}

export function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usersCache, setUsersCache] = useState<Record<User["id"], User>>({});

  const fetchUser = useCallback(
    async (id: User["id"]) => {
      setIsLoading(true);
      if (usersCache[id]) {
        setUser(usersCache[id]);
        setIsLoading(false);
        return;
      }

      try {
        const newUser = await requestUser(id);
        // throw new Error('Проверка ошибки)');
        setUser(newUser);
        setUsersCache((prevCache) => ({ ...prevCache, [id]: newUser }));
      } catch (error) {
        setUser(null);
        if (error instanceof Error) {
          notifications.show({
            color: "red",
            title: "ошибка получения юзера",
            message: error.message,
          });
        }
        // alert(`ошибка получения юзера`);
        // console.error("ошибка получения юзера:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [usersCache],
  );

  // если пользователь нажмет больше 1 раза на кнопку за 1 секунду, то запрос для получения юзера отправиться только один
  const receiveRandomUser = useThrottle(() => {
    const id = Math.floor(Math.random() * 10) + 1;
    fetchUser(id);
  }, 1000);

  return (
    <Container>
      {/*если пользователь нажмет больше 1 раза на кнопку за 1 секунду, то запрос для получения юзера отправиться только один*/}
      <Button onClick={receiveRandomUser}>Get random user</Button>

      <Box pos="relative" mt="2rem">
        <LoadingOverlay visible={isLoading} />

        {user ? <UserInfoCard user={user} /> : <div>Данных нету</div>}
      </Box>
    </Container>
  );
}
