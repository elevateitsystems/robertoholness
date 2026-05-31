import Link from "next/link";
import { PageHeader } from "@/components/admin/PageHeader";

const editableSections = [
  {
    title: "Home Banner",
    description: "Edit the hero title, description, and image used on the home page.",
    href: "/admin/home-page/banner",
  },
];

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Manage Home Page"
        description="Only backend-backed home page sections are shown here."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {editableSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <h2 className="text-base font-bold text-gray-950">{section.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
