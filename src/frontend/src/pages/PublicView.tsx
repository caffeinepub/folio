import { Edit2 } from "lucide-react";
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
import type { PortfolioData } from "../types/portfolio";

interface Props {
  data: PortfolioData;
  onGoEdit: () => void;
}

export function PublicView({ data, onGoEdit }: Props) {
  const visibleSections = [...data.sections]
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <div
      style={{
        background: "var(--p-bg)",
        minHeight: "100vh",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Navbar */}
      <nav
        className="sticky top-0 z-30 border-b"
        style={{
          background: "var(--p-header)",
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span
            className="font-bold text-white text-lg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {data.profile.name}
          </span>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-5">
              {visibleSections
                .filter((s) => s.type !== "hero")
                .map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="text-sm font-medium transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {s.title}
                  </a>
                ))}
            </div>
            {/* Owner edit button */}
            <button
              type="button"
              onClick={onGoEdit}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all hover:opacity-90"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
              }}
              title="Owner login"
              data-ocid="public.edit_button"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Sections */}
      {visibleSections.map((section) => {
        switch (section.type) {
          case "hero":
            return <HeroSection key={section.id} profile={data.profile} />;
          case "about":
            return <AboutSection key={section.id} section={section} />;
          case "projects":
            return <ProjectsSection key={section.id} section={section} />;
          case "certificates":
            return <CertificatesSection key={section.id} section={section} />;
          case "education":
            return <EducationSection key={section.id} section={section} />;
          case "skills":
            return <SkillsSection key={section.id} section={section} />;
          case "gallery":
            return <GallerySection key={section.id} section={section} />;
          case "contact":
            return (
              <ContactSection
                key={section.id}
                section={section}
                profile={data.profile}
              />
            );
          case "custom":
            return <CustomSection key={section.id} section={section} />;
          case "blackberryhub":
            return <BlackberryHubSection key={section.id} section={section} />;
          default:
            return null;
        }
      })}

      {/* Footer */}
      <footer
        className="py-8 text-center text-sm"
        style={{
          color: "var(--p-text2)",
          borderTop: "1px solid var(--p-border)",
        }}
      >
        &copy; {new Date().getFullYear()} {data.profile.name} &mdash; Built with{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
          style={{ color: "var(--p-accent)" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
