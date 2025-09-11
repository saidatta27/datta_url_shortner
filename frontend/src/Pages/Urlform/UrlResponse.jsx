import React from "react";
import { Text, Group, ActionIcon, Button } from "@mantine/core";
import { IconCopy, IconExternalLink } from "@tabler/icons-react";
import { QRCodeCanvas } from "qrcode.react";
import Service from "../../utils/http"; 

const obj = new Service();

export default function UrlResponse({ response, setResponse }) {
  const base = obj.getBaseURL
    ? obj.getBaseURL()
    : "https://url-shortener-bootcamp.onrender.com";
  const shortUrl = `${base}/api/s/${response?.shortCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("copy failed", err);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Text size="sm" c="dimmed">Short URL</Text>

      <Group position="center" spacing="xs" style={{ marginTop: 6 }}>
        <Text>
          {shortUrl}
        </Text>

        <ActionIcon onClick={handleCopy}>
          <IconCopy size={16} />
        </ActionIcon>

        <ActionIcon
          component="a"
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconExternalLink size={16} />
        </ActionIcon>
      </Group>
      <div style={{ marginTop: 20 }}>
        <QRCodeCanvas value={shortUrl} size={220} />
      </div>

      <div style={{ marginTop: 14 }}>
        <Text size="sm" c="dimmed">Original URL</Text>
        <Text size="sm" style={{ wordBreak: "break-word" }}>
          {response?.originalUrl}
        </Text>
      </div>
      
        <Button color="red" mt="lg" onClick={() => navigate("/Urlform/urlshortener")}>
          Shortner another
        </Button>
      </div>
  );
}
