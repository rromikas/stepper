import React, { useCallback, MouseEventHandler, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadImage from "assets/upload.png";
import Typography from "@material-ui/core/Typography";
import Table from "components/Table";
import { TableHeadCell, TableRow } from "interfaces";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

export interface DropzoneProps {
  onFiles: Function;
  files: Array<TableRow>;
  accept?: string;
  multiple?: boolean;
  error: any;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

type Mode = "upload" | "preview";

const Dropzone: React.FC<DropzoneProps> = ({
  onFiles,
  files,
  accept,
  multiple = false,
  error = "",
  onClick = () => {},
}) => {
  const [mode, setMode] = useState("upload" as Mode);

  const headCells: Array<TableHeadCell> = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "File Name",
      formatValue: (val) => val,
    },
    {
      id: "size",
      numeric: true,
      disablePadding: false,
      label: "Size",
      formatValue: (val) =>
        val > 100000 ? Math.round(val / 100000) + " MB" : Math.round(val / 1000) + " KB",
    },
    {
      id: "lastModifiedDate",
      numeric: true,
      disablePadding: false,
      label: "Created at",
      formatValue: (val) =>
        val.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  ];

  const onDrop = useCallback(
    (acceptedFiles) => {
      onFiles(acceptedFiles, true);
      setMode("preview");
    },
    [files]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
  });

  return mode === "upload" ? (
    <div onClick={onClick} {...getRootProps()}>
      <input {...getInputProps()} />
      <Box display="flex" justifyContent="center">
        <img style={{ alignSelf: "start", maxWidth: 500 }} src={UploadImage} alt=""></img>
      </Box>

      <Typography style={{ color: "gray", textAlign: "center" }} variant="h4">
        Drop your files here
      </Typography>
      <Typography style={{ textAlign: "center" }}>
        Note: Password-protected files can not be ingested
      </Typography>
      {files.length ? (
        <>
          <div style={{ textAlign: "center", marginBottom: 10, marginTop: 10 }}>
            {files.length} files uploaded
          </div>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                setMode("preview");
              }}
            >
              Preview uploaded files
            </Button>
          </Box>
        </>
      ) : error ? (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      ) : null}
    </div>
  ) : (
    <Table
      rows={files}
      headCells={headCells}
      setUploadMode={() => setMode("upload")}
      onDeleteSelected={(selectedFiles) => {
        let newFiles = files.filter((f) => !selectedFiles.includes(f.name));
        onFiles(newFiles);
      }}
      onDeleteAll={() => onFiles([])}
    ></Table>
  );
};

export default Dropzone;
