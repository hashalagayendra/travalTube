import * as Icons from "lucide-react";
import React from "react";

export interface LucideIconProps {
  name?: string;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

/**
 * Dynamically renders any Lucide React icon by name.
 * Supports case-insensitive matching and provides a clean fallback if not found.
 */
export function LucideIcon({
  name = "Sparkles",
  className,
  size = 28,
  strokeWidth = 1.8,
}: LucideIconProps) {
  const iconsMap = Icons as unknown as Record<string, React.ComponentType<any>>;

  // Clean name format (e.g. "Plane", "plane", "FileText")
  const trimmed = name ? name.trim() : "Sparkles";
  const pascalName = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);

  // Common aliases for ease of use in admin panel
  const aliasMap: Record<string, string> = {
    airplane: "Plane",
    flights: "Plane",
    route: "Map",
    tours: "Calendar",
    passport: "FileText",
    visa: "FileText",
    scenery: "Mountain",
    currency: "CreditCard",
    chauffeur: "Car",
    taxi: "Car",
  };

  const resolvedName =
    aliasMap[trimmed.toLowerCase()] ||
    (iconsMap[trimmed] ? trimmed : iconsMap[pascalName] ? pascalName : "Sparkles");

  const Component = iconsMap[resolvedName] || Icons.Sparkles;

  return (
    <Component
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
    />
  );
}
