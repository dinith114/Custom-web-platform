// Dashboard home — My Websites grid with create button
"use client";

import { useState } from "react";
import { SiteGrid } from "@/components/dashboard/SiteGrid";
import { CreateSiteModal } from "@/components/dashboard/CreateSiteModal";
import { PageHeader } from "@/components/shared/PageHeader";

export default function DashboardPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="My Websites"
        action={{ label: "+ Create Website", onClick: () => setIsCreateOpen(true) }}
      />
      <SiteGrid />
      <CreateSiteModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
}
