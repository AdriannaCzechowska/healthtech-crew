"use client";

import { useAppStore } from "@/lib/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Settings2, Type, Contrast } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AccessibilitySettings() {
  const { contrastMode, fontSize, setContrastMode, setFontSize } = useAppStore();

  const contrastOptions = [
    { value: "normal" as const, label: "Normalny", description: "Standardowe kolory" },
    { value: "high" as const, label: "Wysoki", description: "Zwiększony kontrast" },
    { value: "higher" as const, label: "Najwyższy", description: "Maksymalny kontrast" },
  ];

  const fontSizeOptions = [
    { value: "normal" as const, label: "Normalny", description: "16px bazowy" },
    { value: "large" as const, label: "Duży", description: "18px bazowy" },
    { value: "xlarge" as const, label: "Bardzo duży", description: "20px bazowy" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Ustawienia dostępności"
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Ustawienia Dostępności
          </DialogTitle>
          <DialogDescription>
            Dostosuj kontrast i rozmiar czcionki dla lepszej czytelności
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Contrast Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Contrast className="h-4 w-4 text-muted-foreground" />
              <Label className="text-base font-semibold">Kontrast</Label>
            </div>
            <div className="grid gap-2">
              {contrastOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setContrastMode(option.value)}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left ${
                    contrastMode === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  aria-pressed={contrastMode === option.value}
                >
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                  {contrastMode === option.value && (
                    <Badge variant="default" className="rounded-full">
                      Aktywny
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Settings */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-muted-foreground" />
              <Label className="text-base font-semibold">Rozmiar Czcionki</Label>
            </div>
            <div className="grid gap-2">
              {fontSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFontSize(option.value)}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left ${
                    fontSize === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  aria-pressed={fontSize === option.value}
                >
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                  {fontSize === option.value && (
                    <Badge variant="default" className="rounded-full">
                      Aktywny
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/50 border">
            <p className="text-sm text-muted-foreground">
              <strong>Wskazówka:</strong> Ustawienia zostaną zapisane i zastosowane
              automatycznie przy następnej wizycie.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

