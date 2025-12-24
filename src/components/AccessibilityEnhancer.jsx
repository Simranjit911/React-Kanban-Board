import { useEffect } from "react";

const AccessibilityEnhancer = () => {
  useEffect(() => {
    // Add ARIA labels and keyboard navigation support
    const setupAccessibility = () => {
      // Improve button focus states
      const buttons = document.querySelectorAll("button");
      buttons.forEach((btn) => {
        if (!btn.getAttribute("aria-label") && btn.textContent) {
          btn.setAttribute("aria-label", btn.textContent.trim());
        }
        
        // Add focus styles
        btn.addEventListener("focus", () => {
          btn.classList.add("ring-2", "ring-blue-400", "ring-offset-2");
        });
        
        btn.addEventListener("blur", () => {
          btn.classList.remove("ring-2", "ring-blue-400", "ring-offset-2");
        });
      });

      // Add role and labels to sections
      const sections = document.querySelectorAll("[class*='from-']");
      sections.forEach((section, idx) => {
        if (!section.getAttribute("role")) {
          section.setAttribute("role", "region");
        }
      });

      // Improve input labels
      const inputs = document.querySelectorAll("input[placeholder]");
      inputs.forEach((input) => {
        if (!input.getAttribute("aria-label")) {
          input.setAttribute("aria-label", input.getAttribute("placeholder"));
        }
      });
    };

    setupAccessibility();

    // Run accessibility setup when DOM changes
    const observer = new MutationObserver(setupAccessibility);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
};

export default AccessibilityEnhancer;
