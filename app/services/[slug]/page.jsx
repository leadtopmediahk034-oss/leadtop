import { notFound } from "next/navigation";

import ServiceDetailPage from "../../../components/ServiceDetailPage";
import { getServicePage, serviceSlugs } from "../../../components/servicePageData";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) return {};

  return {
    title: `${service.navLabel} | Leadtop 数字营销`,
    description: service.metaDescription,
    openGraph: {
      title: `${service.navLabel} | Leadtop 数字营销`,
      description: service.metaDescription,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceRoute({ params }) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) notFound();

  return <ServiceDetailPage service={service} />;
}
