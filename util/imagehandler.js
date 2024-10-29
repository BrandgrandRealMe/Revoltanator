const mtempy = require("mtempy");
const fetch = require("cross-fetch");
const FormData = require("form-data");
const fs = require("fs");
const { pipeline } = require("stream/promises");

async function downloadImage(url, fname) {
  try {
    const localPath = mtempy.file({ name: fname });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to download: ${response.status} ${response.statusText}`
      );
    }

    const fileStream = fs.createWriteStream(localPath);
    await pipeline(response.body, fileStream);
    return fileStream.path;
  } catch (error) {
    console.error("Download failed: ", error);
    throw error; // Re-throw the error for handling by the caller
  }
}

async function uploadImage(client, botToken, filePath) {
  let autumnURL = null;
  if (client.configuration) {
    autumnURL = client.configuration.features.autumn.url;
  } else {
    console.error("Error uploading image:", "No Autumn URL found");
    return "err";
  }

  // Create a new FormData instance
  const form = new FormData();

  // Append the file directly from the filesystem
  form.append("file", fs.createReadStream(filePath));

  try {
    console.log(`Uploading to ${autumnURL}/attachments`);
    const response = await fetch(`${autumnURL}/attachments`, {
      method: "POST",
      headers: {
        Authorization: `Bot ${botToken}`,
        ...form.getHeaders(), // This is important - let FormData set its own headers
      },
      body: form,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    const attachmentId = data.id;
    return attachmentId;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

module.exports = { uploadImage, downloadImage };
