import { getTestimonials } from "@/lib/actions/testimonial";
import { PageHeader } from "@/components/admin/page-header";
import { MessageSquareIcon } from "lucide-react";
import { TestimonialsList } from "./testimonials-list";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <PageHeader title="Testimonials" description="Manage client testimonials and reviews." icon={MessageSquareIcon} />
      <TestimonialsList testimonials={testimonials} />
    </>
  );
}
