import {
  Check,
  Eye,
  EyeOff,
  Image,
  Layers,
  LayoutDashboard,
  Loader2,
  Lock,
  PanelRight,
  Plus,
  Save,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { AddSectionModal } from "../components/editor/AddSectionModal";
import { SettingsPanel } from "../components/editor/SettingsPanel";
import { AboutSection } from "../components/sections/AboutSection";
import { BlackberryHubSection } from "../components/sections/BlackberryHubSection";
import { CertificatesSection } from "../components/sections/CertificatesSection";
import { ContactSection } from "../components/sections/ContactSection";
import { CustomSection } from "../components/sections/CustomSection";
import { EducationSection } from "../components/sections/EducationSection";
import { GallerySection } from "../components/sections/GallerySection";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillsSection } from "../components/sections/SkillsSection";
import type { usePortfolio } from "../hooks/usePortfolio";
import { useTheme } from "../hooks/useTheme";
import type {
  PortfolioData,
  Section,
  SectionItem,
  SectionType,
} from "../types/portfolio";

function uid() {
  return Math.random().toString(36).slice(2);
}

function newItem(type: SectionType): SectionItem {
  switch (type) {
    case "projects":
      return {
        id: uid(),
        title: "New Project",
        description: "Project description",
        tags: ["Tag"],
      };
    case "certificates":
      return {
        id: uid(),
        title: "New Certificate",
        issuer: "Issuing Organization",
        startDate: "2024",
      };
    case "education":
      return {
        id: uid(),
        title: "Degree / Course",
        subtitle: "Institution",
        startDate: "2020",
        endDate: "2024",
      };
    case "skills":
      return { id: uid(), title: "New Skill", subtitle: "Category", level: 3 };
    case "gallery":
      return { id: uid(), title: "Photo" };
    default:
      return { id: uid(), title: "Item" };
  }
}

type SaveState = "idle" | "saving" | "saved" | "error";

interface Props {
  onGoPublic: () => void;
  pin: string;
  portfolio: ReturnType<typeof usePortfolio>;
}

export function EditView({ onGoPublic, pin, portfolio }: Props) {
  // data is guaranteed non-null here because App.tsx checks before rendering EditView
  const data = portfolio.data as PortfolioData;
  useTheme(data.settings.theme, data.settings.fontPair);

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "sections" | "media" | "settings"
  >("dashboard");
  const [showSettings, setShowSettings] = useState(true);
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const [addSectionOpen, setAddSectionOpen] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const sortedSections = [...data.sections].sort((a, b) => a.order - b.order);

  const handleToggleSection = (id: string) => {
    const section = data.sections.find((s) => s.id === id);
    if (section) portfolio.updateSection(id, { isVisible: !section.isVisible });
  };

  const handleMoveSection = (id: string, dir: -1 | 1) => {
    const sorted = [...data.sections].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((s) => s.id === id);
    const other = sorted[idx + dir];
    if (!other) return;
    portfolio.updateSection(id, { order: other.order });
    portfolio.updateSection(other.id, { order: sorted[idx].order });
  };

  const handleAddSection = (type: SectionType) => {
    const maxOrder = Math.max(0, ...data.sections.map((s) => s.order));
    portfolio.addSection({
      id: uid(),
      type,
      title:
        type === "blackberryhub"
          ? "BlackberryHub"
          : type.charAt(0).toUpperCase() + type.slice(1),
      isVisible: true,
      order: maxOrder + 1,
      items: [],
      content: "",
    });
  };

  const handleSave = async () => {
    if (saveState === "saving") return;
    setSaveState("saving");
    const ok = await portfolio.saveToBackend(pin);
    if (ok) {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2000);
    } else {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 3000);
    }
  };

  const renderSection = (section: Section) => {
    const base = {
      key: section.id,
      section,
      isEditing: true,
      onUpdate: (changes: Partial<Section>) =>
        portfolio.updateSection(section.id, changes),
      onAddItem: () => portfolio.addItem(section.id, newItem(section.type)),
      onUpdateItem: (itemId: string, changes: Partial<SectionItem>) =>
        portfolio.updateItem(section.id, itemId, changes),
      onRemoveItem: (itemId: string) =>
        portfolio.removeItem(section.id, itemId),
    };

    return (
      <div key={section.id} className="relative">
        <div
          className="flex items-center justify-between px-6 md:px-12 py-2 border-b"
          style={{ background: "var(--p-bg2)", borderColor: "var(--p-border)" }}
        >
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--p-text2)" }}
          >
            {section.title}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleToggleSection(section.id)}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors"
              style={{
                color: section.isVisible ? "var(--p-accent)" : "var(--p-text2)",
                background: "var(--p-bg)",
              }}
            >
              {section.isVisible ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              {section.isVisible ? "Visible" : "Hidden"}
            </button>
            {section.type !== "hero" && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Remove "${section.title}" section?`))
                    portfolio.removeSection(section.id);
                }}
                className="p-1 rounded-md text-red-400 hover:text-red-500 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            {!section.isVisible && (
              <span
                className="flex items-center gap-1 text-xs"
                style={{ color: "var(--p-text2)" }}
              >
                <Lock className="w-3 h-3" /> Private
              </span>
            )}
          </div>
        </div>
        {(() => {
          switch (section.type) {
            case "hero":
              return (
                <HeroSection
                  profile={data.profile}
                  isEditing
                  onUpdate={portfolio.updateProfile}
                />
              );
            case "about":
              return <AboutSection {...base} />;
            case "projects":
              return <ProjectsSection {...base} />;
            case "certificates":
              return <CertificatesSection {...base} />;
            case "education":
              return <EducationSection {...base} />;
            case "skills":
              return <SkillsSection {...base} />;
            case "gallery":
              return <GallerySection {...base} />;
            case "contact":
              return (
                <ContactSection
                  section={section}
                  profile={data.profile}
                  isEditing
                  onUpdate={base.onUpdate}
                  onUpdateProfile={portfolio.updateProfile}
                  onAddItem={() =>
                    portfolio.addItem(section.id, {
                      id: Math.random().toString(36).slice(2),
                      title: "Link Label",
                      url: "https://",
                    })
                  }
                  onUpdateItem={base.onUpdateItem}
                  onRemoveItem={base.onRemoveItem}
                />
              );
            case "custom":
              return <CustomSection {...base} />;
            case "blackberryhub":
              return <BlackberryHubSection {...base} />;
            default:
              return null;
          }
        })()}
      </div>
    );
  };

  const navItems = [
    {
      id: "dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
    { id: "sections", icon: <Layers className="w-5 h-5" />, label: "Sections" },
    { id: "media", icon: <Image className="w-5 h-5" />, label: "Media" },
    {
      id: "settings",
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
    },
  ] as const;

  const renderSaveButton = () => {
    if (saveState === "saving") {
      return (
        <button
          type="button"
          disabled
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium opacity-75"
          style={{ background: "var(--p-accent)", color: "#fff" }}
          data-ocid="edit.save_button"
        >
          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
        </button>
      );
    }
    if (saveState === "saved") {
      return (
        <button
          type="button"
          disabled
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium"
          style={{ background: "#22c55e", color: "#fff" }}
          data-ocid="edit.save_button"
        >
          <Check className="w-3.5 h-3.5" /> Saved!
        </button>
      );
    }
    if (saveState === "error") {
      return (
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium"
          style={{ background: "#ef4444", color: "#fff" }}
          data-ocid="edit.save_button"
        >
          <X className="w-3.5 h-3.5" /> Failed — Retry
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={handleSave}
        className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium transition-all hover:opacity-90"
        style={{ background: "var(--p-accent)", color: "#fff" }}
        data-ocid="edit.save_button"
      >
        <Save className="w-3.5 h-3.5" /> Save
      </button>
    );
  };

  const settingsPanelProps = {
    settings: data.settings,
    sections: data.sections,
    profile: data.profile,
    onUpdateSettings: portfolio.updateSettings,
    onUpdateProfile: portfolio.updateProfile,
    onToggleSection: handleToggleSection,
    onMoveSection: handleMoveSection,
  };

  return (
    <div
      className="flex flex-col h-screen"
      style={{ fontFamily: "var(--font-body)", background: "var(--p-bg)" }}
    >
      {/* TOP HEADER */}
      <header
        className="flex items-center h-14 px-4 gap-4 shrink-0 z-20"
        style={{
          background: "var(--p-header)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="flex items-center gap-2 font-bold text-white"
          style={{ fontFamily: "var(--font-heading)", minWidth: "160px" }}
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-black"
            style={{ background: "var(--p-accent)" }}
          >
            F
          </span>
          Folio
        </div>
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === "settings") {
                  setShowSettings(true);
                }
              }}
              className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors"
              style={{
                color: activeTab === item.id ? "#fff" : "rgba(255,255,255,0.6)",
                borderBottom:
                  activeTab === item.id
                    ? "2px solid var(--p-accent)"
                    : "2px solid transparent",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2 ml-auto">
          {renderSaveButton()}
          <button
            type="button"
            onClick={onGoPublic}
            className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)",
            }}
            data-ocid="edit.preview_button"
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
          <button
            type="button"
            onClick={() => setShowMobileSettings(true)}
            className="lg:hidden p-2 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
            }}
            title="Settings"
            data-ocid="settings.open_modal_button"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowSettings((v) => !v)}
            className="hidden lg:flex p-2 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <PanelRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT RAIL */}
        <aside
          className="hidden md:flex flex-col items-center w-16 py-4 gap-3 shrink-0"
          style={{
            background: "var(--p-rail)",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === "settings") {
                  setShowSettings(true);
                }
              }}
              title={item.label}
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
              style={{
                background:
                  activeTab === item.id
                    ? "var(--p-accent)"
                    : "rgba(255,255,255,0.07)",
                color: activeTab === item.id ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            >
              {item.icon}
            </button>
          ))}
        </aside>

        {/* MAIN CONTENT */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: "var(--p-bg)" }}
        >
          {sortedSections.map(renderSection)}
          <div className="px-6 md:px-12 py-8">
            <button
              type="button"
              onClick={() => setAddSectionOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed font-medium text-sm transition-colors hover:border-[var(--p-accent)] hover:bg-[var(--p-bg2)]"
              style={{
                borderColor: "var(--p-border)",
                color: "var(--p-text2)",
              }}
              data-ocid="sections.button"
            >
              <Plus className="w-4 h-4" /> Add Section
            </button>
          </div>
        </main>

        {/* SETTINGS PANEL (desktop) */}
        {showSettings && (
          <aside
            className="hidden lg:flex flex-col w-72 shrink-0 border-l"
            style={{
              background: "var(--p-card)",
              borderColor: "var(--p-border)",
            }}
          >
            <div
              className="p-4 border-b font-semibold text-sm"
              style={{ borderColor: "var(--p-border)", color: "var(--p-text)" }}
            >
              Settings
            </div>
            <SettingsPanel {...settingsPanelProps} />
          </aside>
        )}
      </div>

      {/* MOBILE SETTINGS SHEET */}
      {showMobileSettings && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileSettings(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setShowMobileSettings(false);
            }}
            role="button"
            tabIndex={-1}
            aria-label="Close settings"
          />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl overflow-hidden flex flex-col"
            style={{
              background: "var(--p-card)",
              maxHeight: "80vh",
            }}
            data-ocid="settings.panel"
          >
            <div
              className="flex items-center justify-between p-4 border-b shrink-0"
              style={{ borderColor: "var(--p-border)" }}
            >
              <span
                className="font-semibold text-sm"
                style={{ color: "var(--p-text)" }}
              >
                Settings
              </span>
              <button
                type="button"
                onClick={() => setShowMobileSettings(false)}
                className="p-1 rounded-lg"
                style={{ color: "var(--p-text2)" }}
                data-ocid="settings.close_button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <SettingsPanel {...settingsPanelProps} />
            </div>
          </div>
        </div>
      )}

      <AddSectionModal
        open={addSectionOpen}
        onClose={() => setAddSectionOpen(false)}
        onAdd={handleAddSection}
      />
    </div>
  );
}
