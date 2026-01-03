import React, { useState } from "react";
import { useEditableValue } from "@/hooks/useEditableValue";

export default function BackspaceInput() {
  const { value, setValue, backspace } = useEditableValue("");
  const [items, setItems] = useState<string[]>([]);

  const addItem = () => {
    const v = value.trim();
    if (!v) return;
    setItems((s) => [...s, v]);
    setValue("");
  };

  const removeItem = (index: number) => {
    setItems((s) => s.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    } else if (e.key === "Backspace" && value === "") {
      e.preventDefault();
      removeItem(items.length - 1);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Digite e aperte Enter" />
        <button type="button" onClick={backspace}>⌫</button>
        <button type="button" onClick={addItem}>Adicionar</button>
        <button type="button" onClick={() => setItems([])}>Limpar</button>
      </div>
      <ul style={{ margin: 0, paddingLeft: 16 }}>
        {items.map((it, idx) => (
          <li key={idx} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span>{it}</span>
            <button type="button" onClick={() => removeItem(idx)}>Apagar</button>
          </li>
        ))}
        {items.length === 0 && <li style={{ color: "#999" }}>Nenhum valor</li>}
      </ul>
    </div>
  );
}