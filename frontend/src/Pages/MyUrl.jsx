import React, { useEffect, useState } from "react";
import { Container, Card, Text, Group, ActionIcon, Loader } from "@mantine/core";
import { IconCopy, IconExternalLink } from "@tabler/icons-react";
import { QRCodeCanvas } from "qrcode.react";
import Service from "../utils/http";
  import UrlsTable from '../Components/UrlsTable'


const obj = new Service();

  export default function MyUrl() {
    return (
      <div>
          <UrlsTable/>
      </div>
    )
  }