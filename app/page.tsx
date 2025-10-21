"use client";

import { useState } from "react";
import { Header } from "@/components/core/Header";
import { Sidebar } from "@/components/core/Sidebar";
import { DashboardContent } from "@/app/(dashboard)/DashboardContent";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="md:pl-64 pt-16">
        <div className="container py-6 px-4">
          <DashboardContent />
        </div>
      </main>
    </div>
  );
}

