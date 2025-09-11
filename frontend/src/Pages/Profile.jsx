import React, { useEffect, useState } from "react";
import "./Profile.css";
import Service from "../utils/http";
import {
  Avatar,
  Button,
  Card,
  Group,
  Text,
  Center,
  Loader,
  Alert,
} from "@mantine/core";

const obj = new Service();

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfileData = async () => {
    try {
      setLoading(true);
      let data = await obj.get("user/me"); 
      setUser(data);
    } catch (err) {
      setError("Failed to load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Alert color="red">{error}</Alert>
      </Center>
    );
  }

  return (
    <Center h="100vh">
      <Card withBorder padding="xl" radius="md" shadow="sm" w={400}>
        {/* Banner */}
        <Card.Section
          h={140}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=80)",
          }}
        />

        {/* Avatar */}
        <Avatar
          src={
            user?.avatar ||
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png"
          }
          size={80}
          radius={80}
          mx="auto"
          mt={-30}
          style={{ border: "3px solid white" }}
        />

        {/* Name & Email */}
        <Text ta="center" fz="lg" fw={600} mt="sm">
          {user?.name || "Unknown User"}
        </Text>
        <Text ta="center" fz="sm" c="dimmed">
          {user?.email || "Fetching email..."}
        </Text>

        {/* Extra Details */}
        <div className="profile-details">
          
          <p className="profile-detail">
            <span className="label">Account Created:</span>{" "}
            {user?.createdAt || "Fetching date..."}
          </p>
        </div>

        {/* Stats */}
        <Group mt="md" justify="center" gap={30}>
          <div>
            <Text ta="center" fz="lg" fw={500}>
              34K
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
              Viewed
            </Text>
          </div>
          <div>
            <Text ta="center" fz="lg" fw={500}>
              187
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
              Follows
            </Text>
          </div>
          <div>
            <Text ta="center" fz="lg" fw={500}>
              1.6K
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
              Posts
            </Text>
          </div>
        </Group>

        {/* Button */}
        <Button fullWidth radius="md" mt="xl" size="md" variant="default">
          Edit Profile
        </Button>
      </Card>
    </Center>
  );
}
