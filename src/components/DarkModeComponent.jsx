import { useEffect } from "react";
import Darkmode from "darkmode-js";

function DarkModeComponent() {
  useEffect(() => {
    const options = {
      bottom: "20px",
      right: "unset",
      left: "20px",
      time: "0.5s",
      mixColor: "#e2e8f0",
      backgroundColor: "#fff",
      buttonColorDark: "#000",
      buttonColorLight: "#999",
      saveInCookies: true,
      label: "🌓",
      autoMatchOsTheme: false,
    };

    const darkmode = new Darkmode(options);
    darkmode.showWidget();

    // Apply class to html element for tailwind dark mode
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("darkmode--activated");
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Initial check
    const isDark = document.documentElement.classList.contains("darkmode--activated");
    if (isDark) {
      document.documentElement.classList.add("dark");
    }

    return () => {
      observer.disconnect();
      darkmode.destroy();
    };
  }, []);

  return <></>;
}

export default DarkModeComponent;