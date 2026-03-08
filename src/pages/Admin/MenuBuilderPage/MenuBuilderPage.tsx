import "./MenuBuilderPage.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import * as pageService from "../../../services/pageService";
import type { MenuItem } from "../../../types/page";
import Alert from "../../../shared/Alert/Alert";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2, Save, Eye, EyeOff, Pencil, Check, X } from "lucide-react";

function SortableMenuItem({
  item,
  onUpdate,
  onDelete,
}: {
  item: MenuItem;
  onUpdate: (partial: Partial<MenuItem>) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(item.label);
  const [url, setUrl] = useState(item.url);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function handleSave() {
    onUpdate({ label, url });
    setEditing(false);
  }

  function handleCancel() {
    setLabel(item.label);
    setUrl(item.url);
    setEditing(false);
  }

  return (
    <div ref={setNodeRef} style={style} className="menu-item">
      <span className="menu-item__drag" {...attributes} {...listeners}>
        <GripVertical size={18} />
      </span>

      {editing ? (
        <div className="menu-item__edit-fields">
          <input
            className="menu-item__input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label"
          />
          <input
            className="menu-item__input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="/url"
          />
          <button className="menu-item__btn menu-item__btn--save" onClick={handleSave} title="Save">
            <Check size={15} />
          </button>
          <button className="menu-item__btn" onClick={handleCancel} title="Cancel">
            <X size={15} />
          </button>
        </div>
      ) : (
        <>
          <div className="menu-item__info">
            <span className="menu-item__label">{item.label}</span>
            <span className="menu-item__url">{item.url}</span>
          </div>
          <div className="menu-item__actions">
            <button
              className="menu-item__btn"
              onClick={() => onUpdate({ visible: !item.visible })}
              title={item.visible ? "Hide" : "Show"}
            >
              {item.visible ? <Eye size={15} /> : <EyeOff size={15} />}
            </button>
            <button className="menu-item__btn" onClick={() => setEditing(true)} title="Edit">
              <Pencil size={15} />
            </button>
            <button className="menu-item__btn menu-item__btn--delete" onClick={onDelete} title="Delete">
              <Trash2 size={15} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function MenuBuilderPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    loadMenu();
  }, []);

  async function loadMenu() {
    try {
      setLoading(true);
      const menu = await pageService.getMenu();
      setItems(menu.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load menu");
    } finally {
      setLoading(false);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    setItems(arrayMove(items, oldIndex, newIndex).map((item, i) => ({ ...item, order: i })));
  }

  function addItem() {
    setItems((prev) => [
      ...prev,
      {
        id: uuidv4(),
        label: "New Link",
        url: "/",
        order: prev.length,
        visible: true,
      },
    ]);
  }

  function updateItem(id: string, partial: Partial<MenuItem>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...partial } : item)));
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const orderedItems = items.map((item, i) => ({ ...item, order: i }));
      await pageService.updateMenu(orderedItems);
      setSuccess("Menu saved successfully");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save menu");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="menu-builder">
      <div className="menu-builder__header">
        <div>
          <h1 className="menu-builder__title">Menu Builder</h1>
          <p className="menu-builder__subtitle">Manage your navigation menu items</p>
        </div>
        <div className="menu-builder__header-actions">
          <button className="menu-builder__add-btn" onClick={addItem}>
            <Plus size={18} />
            Add Item
          </button>
          <button className="menu-builder__save-btn" onClick={handleSave} disabled={saving}>
            <Save size={18} />
            {saving ? "Saving..." : "Save Menu"}
          </button>
        </div>
      </div>

      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="menu-builder__loading">Loading menu...</div>
      ) : items.length === 0 ? (
        <div className="menu-builder__empty">
          No menu items yet. Click "Add Item" to create your first navigation link.
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            <div className="menu-builder__list">
              {items.map((item) => (
                <SortableMenuItem
                  key={item.id}
                  item={item}
                  onUpdate={(partial) => updateItem(item.id, partial)}
                  onDelete={() => deleteItem(item.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
