import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/lib/client';
import { getServiceBySlugQuery, getFocusedServicesQuery, getServicesPageQuery } from '@/sanity/lib/queries';
import { SanityFocusedService } from '@/sanity/lib/types';
import { ServiceDetail } from '@/components/sections/services/ServiceDetail';
import { ServicesCTA } from '@/components/sections/services/ServicesCTA';

export const revalidate = 60;

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await client.fetch<SanityFocusedService>(getServiceBySlugQuery, { slug });

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: `${service.title} | Adiu`,
    description: service.description || `Learn more about our ${service.title} services.`,
  };
}

export async function generateStaticParams() {
  const services = await client.fetch<SanityFocusedService[]>(getFocusedServicesQuery);
  return services.map((service) => ({
    slug: service.slug?.current,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  
  // Fetch the current service, all services (to find the next one), and page settings for CTA
  const [service, allServices, servicesPageData] = await Promise.all([
    client.fetch<SanityFocusedService>(getServiceBySlugQuery, { slug }),
    client.fetch<SanityFocusedService[]>(getFocusedServicesQuery),
    client.fetch(getServicesPageQuery),
  ]);

  if (!service) {
    notFound();
  }

  // Find next service for navigation
  const currentIndex = allServices.findIndex((s) => s._id === service._id);
  const nextServiceData = allServices[(currentIndex + 1) % allServices.length];
  
  const nextService = nextServiceData ? {
    title: nextServiceData.title,
    slug: nextServiceData.slug.current,
  } : undefined;

  return (
    <>
      <ServiceDetail service={service} nextService={nextService} />
      <ServicesCTA data={servicesPageData} />
    </>
  );
}
