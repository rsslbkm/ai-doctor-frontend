import React, { useMemo, useRef, useState } from "react";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

type Props = {
  value: File | null;
  onChange: (file: File | null) => void;
  label?: string;
};

const MAX_BYTES = 25 * 1024 * 1024; 
const ALLOWED = ["image/png", "image/jpeg", "image/jpg"]; 

export default function ImageUpload({ value, onChange, label = "Upload image (optional)" }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(() => {
    if (!value) return null;
    return URL.createObjectURL(value);
  }, [value]);

  const validate = (file: File) => {
    if (!ALLOWED.includes(file.type)) {
      return "Unsupported format. Please upload PNG or JPG.";
    }
    if (file.size > MAX_BYTES) {
      return "File is too large. Max size is 25MB.";
    }
    return null;
  };

  const pickFile = () => inputRef.current?.click();

  const handleFile = (file: File | null) => {
    setError(null);
    if (!file) {
      onChange(null);
      return;
    }
    const err = validate(file);
    if (err) {
      setError(err);
      onChange(null);
      return;
    }
    onChange(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null);
  };

  
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] ?? null;
    handleFile(file);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <Card style={{ marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontWeight: 700 }}>{label}</div>
          <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>
            PNG/JPG up to 25MB. Preview will appear below.
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button type="button" variant="secondary" onClick={pickFile}>
            Choose file
          </Button>
          {value && (
            <Button type="button" variant="secondary" onClick={() => handleFile(null)}>
              Remove
            </Button>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg"
        style={{ display: "none" }}
        onChange={onInputChange}
      />

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        style={{
          marginTop: 12,
          border: "1px dashed #bbb",
          borderRadius: 12,
          padding: 14,
          background: "#fafafa",
        }}
      >
        <div style={{ fontSize: 13, color: "#666" }}>Drag & drop an image here (optional)</div>

        {error && (
          <div style={{ marginTop: 10, color: "#b00020", fontWeight: 600 }}>
            {error}
          </div>
        )}

        {previewUrl && (
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, marginBottom: 8, color: "#444" }}>Preview:</div>
            <img
              src={previewUrl}
              alt="preview"
              style={{ maxWidth: 360, width: "100%", borderRadius: 12, border: "1px solid #eee" }}
              onLoad={() => {
                
                URL.revokeObjectURL(previewUrl);
              }}
            />
            <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
              File: {value?.name} ({Math.round((value?.size ?? 0) / 1024)} KB)
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}