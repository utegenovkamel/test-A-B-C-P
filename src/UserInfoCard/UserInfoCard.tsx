import { Badge, Card, Group, Text, Title } from "@mantine/core";
import type React from "react";
import classes from "./UserInfoCard.module.css";

interface User {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  // Предположим, что у компании и адреса есть несколько интересных свойств для отображения
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    city: string;
  };
}

interface UserInfoCardProps {
  user: User;
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section}>
        <Title order={2}>Данные пользователя</Title>
        <Group>
          <Text size="lg">{user.name}</Text>
          <Badge size="sm" variant="light">
            {user.username}
          </Badge>
        </Group>
        <Text size="sm" mt="xs">
          Email: {user.email}
        </Text>
        <Text size="sm">Phone: {user.phone}</Text>
        <Text size="sm">Website: {user.website}</Text>
        <Text size="sm">Company: {user.company.name}</Text>
        <Text size="sm">City: {user.address.city}</Text>
      </Card.Section>
    </Card>
  );
};
