// Create new site page — name, slug, template picker form

"use client";

import { PageHeader } from "@/components/shared/PageHeader";
import { CreateSiteModal } from "@/components/dashboard/CreateSiteModal";

export default function NewSitePage() {
  return (
    <div>
      <PageHeader title="Create New Website" />
      <div className="mx-auto max-w-2xl">
        <CreateSiteModal isOpen={true} onClose={() => window.history.back()} />
      </div>
    </div>
  );
}
