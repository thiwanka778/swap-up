import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const FileSystem = () => {
  const [files, setFiles] = useState([
    {
      fileName: "Main Folder",
      fileOpen: false,
      id: 1,
      sub: [
        {
          fileName: "Subfolder 1",
          fileOpen: false,
          id: 11,
        },
        {
          fileName: "Subfolder 2",
          fileOpen: false,
          id: 12,
        },
      ],
    },
    {
      fileName: "Main Folder 2",
      fileOpen: false,
      id: 2,
      sub:[
        {
            fileName: "Subfolder 1",
            fileOpen: false,
            id: 11,
          },
          {
            fileName: "Subfolder 2",
            fileOpen: false,
            id: 12,
            sub:[
                {
                    fileName: "Subfolder 1",
                    fileOpen: false,
                    id: 11,
                  },
                  {
                    fileName: "Subfolder 2",
                    fileOpen: false,
                    id: 12,
                  },
                  {
                    fileName: "Main Folder 3",
                    fileOpen: false,
                    id: 3,
                  },
                  {
                    fileName: "Main Folder 10",
                    fileOpen: false,
                    id: 7,
                  },
                  {
                    fileName: "Main Folder 11",
                    fileOpen: false,
                    id: 8,
                  },
            ]
          },
      ]
    },
    {
      fileName: "Main Folder 3",
      fileOpen: false,
      id: 3,
    },
    {
      fileName: "Main Folder 10",
      fileOpen: false,
      id: 7,
    },
    {
      fileName: "Main Folder 11",
      fileOpen: false,
      id: 8,
    },
  ]);

  const toggleFolder = (id) => {
    const updatedFiles = files.map((item) => {
      if (item.id === id) {
        return { ...item, fileOpen: !item.fileOpen };
      }
      return item;
    });
    setFiles(updatedFiles);
  };

  const handleFolderClick = (id) => {
    toggleFolder(id);
  };

  const displayFiles = files.map((item) => (
    <div
      key={item.id}
      style={{
        width: "100%",
        background: "lightgray",
        marginTop: "1rem",
        padding: "1.5rem",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => handleFolderClick(item.id)}
    >
      <p>{item.fileName}</p>
      {item.fileOpen && item.sub && (
        <div style={{ marginLeft: "20px" }}>
          {item.sub.map((subItem) => (
            <div
              key={subItem.id}
              style={{
                width: "100%",
                background: "lightgray",
                marginTop: "1rem",
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <p>{subItem.fileName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  ));

  return (
    <div style={{ minHeight: "100vh", paddingTop: "12vh" }}>
      {displayFiles}
    </div>
  );
};

export default FileSystem;
