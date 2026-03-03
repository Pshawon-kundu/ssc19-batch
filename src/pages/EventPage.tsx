import { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import { Hero } from "../components/Hero";
import { Packages } from "../components/Packages";
import { Album } from "../components/Album";
import { RegistrationForm } from "../components/RegistrationForm";
import { DonationSection } from "../components/DonationSection";
import { Footer } from "../components/Footer";
import { ContactSection } from "../components/ContactSection";
import { SuccessModal } from "../components/SuccessModal";
import { ErrorModal } from "../components/ErrorModal";
import { BotChat } from "../components/BotChat";
import { submitRegistration, fetchStats } from "../api";
import type { RegistrationData } from "../api";

export type PackageType =
  | "iftar-only"
  | "iftar-jersey"
  | "iftar-jersey-seheri"
  | "jersey-only";

export function EventPage() {
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(
    null,
  );
  const [totalRegistered, setTotalRegistered] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastRegistration, setLastRegistration] = useState<
    RegistrationData | undefined
  >(undefined);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Load initial stats and set up auto-refresh
  useEffect(() => {
    loadStats();

    // Auto-refresh stats every 30 seconds
    const interval = setInterval(() => {
      loadStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const stats = await fetchStats();
      setTotalRegistered(stats.total_students);
      setTotalMoney(stats.total_money);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleRegistrationSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);

    try {
      // Submit to Google Sheets
      const response = await submitRegistration(data);

      if (response.success) {
        // Update local stats immediately for better UX
        setTotalRegistered((prev) => prev + 1);
        setTotalMoney((prev) => prev + data.amount);

        // Show success modal
        setShowSuccess(true);

        // Reset form
        setSelectedPackage(null);

        // Store last registration for success modal
        setLastRegistration(data);

        // Refresh stats from server to ensure accuracy
        setTimeout(() => {
          loadStats();
        }, 2000);
      } else {
        throw new Error(
          response.error || response.message || "Registration failed",
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Registration failed",
      );
      setShowError(true);
      // Re-throw so the form component can handle it (e.g. stop loading state)
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToRegistration = () => {
    console.log("=== SCROLL TO REGISTRATION CALLED ===");

    const element = document.getElementById("registration");
    console.log("Found element:", element);

    if (element) {
      // Get position
      const rect = element.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - 100;

      console.log("Scrolling to position:", targetY);

      // Jump instantly
      window.scrollTo({
        top: targetY,
        behavior: "auto",
      });

      console.log("✅ SCROLLED!");
    } else {
      console.error("❌ Registration element NOT FOUND!");
      // Try to find it
      const all = document.querySelectorAll("[id]");
      console.log(
        "All elements with IDs:",
        Array.from(all).map((el) => el.id),
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <Navigation />

      <Hero
        totalRegistered={totalRegistered}
        totalMoney={totalMoney}
        onRegisterClick={scrollToRegistration}
        isLoading={isLoadingStats}
      />

      <Packages
        selectedPackage={selectedPackage}
        onSelectPackage={(pkg) => {
          setSelectedPackage(pkg);
          scrollToRegistration();
        }}
      />

      <Album />

      <RegistrationForm
        selectedPackage={selectedPackage}
        onSubmit={handleRegistrationSubmit}
        isSubmitting={isSubmitting}
      />

      <DonationSection />

      <ContactSection />

      <Footer />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        registrationData={lastRegistration}
      />

      <ErrorModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        message={errorMessage}
      />

      <BotChat />
    </div>
  );
}
