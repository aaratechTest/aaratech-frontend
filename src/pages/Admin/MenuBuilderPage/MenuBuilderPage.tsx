import "./MenuBuilderPage.css";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import * as pageService from "../../../services/pageService";
import type { MenuGroup, MenuChild } from "../../../types/page";
import Alert from "../../../shared/Alert/Alert";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Plus,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Pencil,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Database,
  ExternalLink,
} from "lucide-react";

/* ─── Sortable Child Item ─── */
function SortableChildItem({
  child,
  onUpdate,
  onDelete,
}: {
  child: MenuChild;
  onUpdate: (partial: Partial<MenuChild>) => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(child.label);
  const [url, setUrl] = useState(child.url);
  const [openInNewTab, setOpenInNewTab] = useState(child.openInNewTab || false);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: child.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  function handleSave() {
    onUpdate({ label, url, openInNewTab });
    setEditing(false);
  }

  function handleCancel() {
    setLabel(child.label);
    setUrl(child.url);
    setOpenInNewTab(child.openInNewTab || false);
    setEditing(false);
  }

  return (
    <div ref={setNodeRef} style={style} className="menu-child">
      <span className="menu-child__drag" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </span>

      {editing ? (
        <div className="menu-child__edit-fields">
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
            placeholder="/url or https://..."
          />
          <label className="menu-child__checkbox">
            <input
              type="checkbox"
              checked={openInNewTab}
              onChange={(e) => setOpenInNewTab(e.target.checked)}
            />
            <ExternalLink size={13} />
          </label>
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
            <span className="menu-item__label">{child.label}</span>
            <span className="menu-item__url">{child.url || "(no url)"}</span>
            {child.openInNewTab && <ExternalLink size={13} className="menu-child__ext-icon" />}
          </div>
          <div className="menu-item__actions">
            <button
              className="menu-item__btn"
              onClick={() => onUpdate({ visible: !child.visible })}
              title={child.visible ? "Hide" : "Show"}
            >
              {child.visible ? <Eye size={15} /> : <EyeOff size={15} />}
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

/* ─── Group Section ─── */
function GroupSection({
  group,
  onUpdateGroup,
  onDeleteGroup,
  onUpdateChild,
  onDeleteChild,
  onAddChild,
  onReorderChildren,
}: {
  group: MenuGroup;
  onUpdateGroup: (partial: Partial<MenuGroup>) => void;
  onDeleteGroup: () => void;
  onUpdateChild: (childId: string, partial: Partial<MenuChild>) => void;
  onDeleteChild: (childId: string) => void;
  onAddChild: () => void;
  onReorderChildren: (oldIndex: number, newIndex: number) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(group.label);
  const [url, setUrl] = useState(group.url);

  const sortedChildren = [...group.children].sort((a, b) => a.order - b.order);

  function handleSaveGroup() {
    onUpdateGroup({ label, url });
    setEditing(false);
  }

  function handleCancelGroup() {
    setLabel(group.label);
    setUrl(group.url);
    setEditing(false);
  }

  return (
    <div className="menu-group">
      <div className="menu-group__header">
        <button
          className="menu-group__collapse"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
        </button>

        {editing ? (
          <div className="menu-group__edit-fields">
            <input
              className="menu-item__input"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Group name"
            />
            <input
              className="menu-item__input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Direct link (optional)"
            />
            <button className="menu-item__btn menu-item__btn--save" onClick={handleSaveGroup} title="Save">
              <Check size={15} />
            </button>
            <button className="menu-item__btn" onClick={handleCancelGroup} title="Cancel">
              <X size={15} />
            </button>
          </div>
        ) : (
          <>
            <div className="menu-group__info">
              <span className="menu-group__label">{group.label}</span>
              {group.url && <span className="menu-item__url">{group.url}</span>}
              <span className="menu-group__count">{group.children.length} items</span>
            </div>
            <div className="menu-item__actions">
              <button
                className="menu-item__btn"
                onClick={() => onUpdateGroup({ visible: !group.visible })}
                title={group.visible ? "Hide" : "Show"}
              >
                {group.visible ? <Eye size={15} /> : <EyeOff size={15} />}
              </button>
              <button className="menu-item__btn" onClick={() => setEditing(true)} title="Edit">
                <Pencil size={15} />
              </button>
              <button className="menu-item__btn" onClick={onAddChild} title="Add child item">
                <Plus size={15} />
              </button>
              <button className="menu-item__btn menu-item__btn--delete" onClick={onDeleteGroup} title="Delete group">
                <Trash2 size={15} />
              </button>
            </div>
          </>
        )}
      </div>

      {!collapsed && (
        <div className="menu-group__children">
          {sortedChildren.length === 0 ? (
            <div className="menu-group__empty">
              No children — this renders as a direct link{group.url ? ` to ${group.url}` : ""}.
            </div>
          ) : (
            <SortableContext
              items={sortedChildren.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {sortedChildren.map((child) => (
                <SortableChildItem
                  key={child.id}
                  child={child}
                  onUpdate={(partial) => onUpdateChild(child.id, partial)}
                  onDelete={() => onDeleteChild(child.id)}
                />
              ))}
            </SortableContext>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ─── */
export default function MenuBuilderPage() {
  const [groups, setGroups] = useState<MenuGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

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
      setGroups(menu.groups || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load menu");
    } finally {
      setLoading(false);
    }
  }

  /* ── Find which group a child belongs to ── */
  function findGroupOfChild(childId: string): MenuGroup | undefined {
    return groups.find((g) => g.children.some((c) => c.id === childId));
  }

  /* ── Drag handlers ── */
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeGroupSource = findGroupOfChild(active.id as string);
    const overGroupSource = findGroupOfChild(over.id as string);

    if (!activeGroupSource) return;

    if (overGroupSource && activeGroupSource.id === overGroupSource.id) {
      // Same group reorder
      setGroups((prev) =>
        prev.map((g) => {
          if (g.id !== activeGroupSource.id) return g;
          const oldIdx = g.children.findIndex((c) => c.id === active.id);
          const newIdx = g.children.findIndex((c) => c.id === over.id);
          const reordered = arrayMove(g.children, oldIdx, newIdx).map((c, i) => ({
            ...c,
            order: i,
          }));
          return { ...g, children: reordered };
        })
      );
    } else if (overGroupSource && activeGroupSource.id !== overGroupSource.id) {
      // Cross-group move: drop onto a child in another group
      const movedChild = activeGroupSource.children.find((c) => c.id === active.id);
      if (!movedChild) return;

      setGroups((prev) =>
        prev.map((g) => {
          if (g.id === activeGroupSource.id) {
            return {
              ...g,
              children: g.children
                .filter((c) => c.id !== active.id)
                .map((c, i) => ({ ...c, order: i })),
            };
          }
          if (g.id === overGroupSource.id) {
            const overIdx = g.children.findIndex((c) => c.id === over.id);
            const newChildren = [...g.children];
            newChildren.splice(overIdx + 1, 0, { ...movedChild, order: overIdx + 1 });
            return {
              ...g,
              children: newChildren.map((c, i) => ({ ...c, order: i })),
            };
          }
          return g;
        })
      );
    }
  }

  /* ── Group CRUD ── */
  function addGroup() {
    setGroups((prev) => [
      ...prev,
      {
        id: uuidv4(),
        label: "New Group",
        url: "",
        order: prev.length,
        visible: true,
        children: [],
      },
    ]);
  }

  function updateGroup(groupId: string, partial: Partial<MenuGroup>) {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, ...partial } : g))
    );
  }

  function deleteGroup(groupId: string) {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
  }

  /* ── Child CRUD ── */
  function addChild(groupId: string) {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          children: [
            ...g.children,
            {
              id: uuidv4(),
              label: "New Item",
              url: "/",
              order: g.children.length,
              visible: true,
              openInNewTab: false,
            },
          ],
        };
      })
    );
  }

  function updateChild(groupId: string, childId: string, partial: Partial<MenuChild>) {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          children: g.children.map((c) =>
            c.id === childId ? { ...c, ...partial } : c
          ),
        };
      })
    );
  }

  function deleteChild(groupId: string, childId: string) {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          children: g.children.filter((c) => c.id !== childId),
        };
      })
    );
  }

  /* ── Save ── */
  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const orderedGroups = groups.map((g, i) => ({
        ...g,
        order: i,
        children: g.children.map((c, j) => ({ ...c, order: j })),
      }));
      await pageService.updateMenu(orderedGroups);
      setSuccess("Menu saved successfully");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save menu");
    } finally {
      setSaving(false);
    }
  }

  /* ── Seed ── */
  async function handleSeed() {
    setSeeding(true);
    setError("");
    try {
      await pageService.seedMenu();
      await loadMenu();
      setSuccess("Menu seeded with default data");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to seed menu");
    } finally {
      setSeeding(false);
    }
  }

  /* ── Get the dragged child for overlay ── */
  const activeChild = activeId ? findGroupOfChild(activeId)?.children.find((c) => c.id === activeId) : null;

  return (
    <div className="menu-builder">
      <div className="menu-builder__header">
        <div>
          <h1 className="menu-builder__title">Menu Builder</h1>
          <p className="menu-builder__subtitle">
            Manage navigation groups and their dropdown items
          </p>
        </div>
        <div className="menu-builder__header-actions">
          <button
            className="menu-builder__seed-btn"
            onClick={handleSeed}
            disabled={seeding}
            title="Populate with default menu structure"
          >
            <Database size={18} />
            {seeding ? "Seeding..." : "Seed Default"}
          </button>
          <button className="menu-builder__add-btn" onClick={addGroup}>
            <Plus size={18} />
            Add Group
          </button>
          <button
            className="menu-builder__save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            <Save size={18} />
            {saving ? "Saving..." : "Save Menu"}
          </button>
        </div>
      </div>

      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {loading ? (
        <div className="menu-builder__loading">Loading menu...</div>
      ) : groups.length === 0 ? (
        <div className="menu-builder__empty">
          No menu groups yet. Click "Seed Default" to populate the default
          navigation, or "Add Group" to create from scratch.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="menu-builder__list">
            {groups
              .sort((a, b) => a.order - b.order)
              .map((group) => (
                <GroupSection
                  key={group.id}
                  group={group}
                  onUpdateGroup={(partial) => updateGroup(group.id, partial)}
                  onDeleteGroup={() => deleteGroup(group.id)}
                  onUpdateChild={(childId, partial) =>
                    updateChild(group.id, childId, partial)
                  }
                  onDeleteChild={(childId) => deleteChild(group.id, childId)}
                  onAddChild={() => addChild(group.id)}
                  onReorderChildren={(oldIdx, newIdx) => {
                    setGroups((prev) =>
                      prev.map((g) => {
                        if (g.id !== group.id) return g;
                        const reordered = arrayMove(g.children, oldIdx, newIdx).map(
                          (c, i) => ({ ...c, order: i })
                        );
                        return { ...g, children: reordered };
                      })
                    );
                  }}
                />
              ))}
          </div>
          <DragOverlay>
            {activeChild ? (
              <div className="menu-child menu-child--overlay">
                <GripVertical size={16} />
                <div className="menu-item__info">
                  <span className="menu-item__label">{activeChild.label}</span>
                  <span className="menu-item__url">{activeChild.url}</span>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
