// import React, { useEffect, useState } from "react";
// import { Container, Card, Text, Group, ActionIcon, Loader } from "@mantine/core";
// import { IconCopy, IconExternalLink } from "@tabler/icons-react";
// import { QRCodeCanvas } from "qrcode.react";
// import Service from "../utils/http";
//   import UrlsTable from '../Components/UrlsTable'


// const obj = new Service();

//   export default function MyUrl() {
//     return (
//       <div>
//           <UrlsTable/>
//       </div>
//     )
//   }



  import React, { useEffect, useState } from "react";
import axios from "axios";

const myurls = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    // Fetch this user's URLs from backend
    axios.get("/api/urls/myurls")
      .then((response) => setUrls(response.data))
      .catch((err) => setUrls([]));
  }, []);

  return (
    <div>
      <h2>My URLs</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Original Url</th>
            <th>Short Url</th>
            <th>Clicks</th>
            <th>Expires At</th>
          </tr>
        </thead>
        <tbody>
          {urls.length === 0 ? (
            <tr>
              <td colSpan={5}>No URLs found</td>
            </tr>
          ) : (
            urls.map((url, index) => (
              <tr key={url._id || index}>
                <td>{index + 1}</td>
                <td>
                  <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                    {url.originalUrl}
                  </a>
                </td>
                <td>
                  <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                    {url.shortUrl}
                  </a>
                </td>
                <td>{url.clicks}</td>
                <td>{url.expiresAt ? new Date(url.expiresAt).toLocaleString() : "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default myurls;
