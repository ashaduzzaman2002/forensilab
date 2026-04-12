import { notFound } from "next/navigation";
import { getTestimonialById } from "@/lib/actions/testimonial";
import { PageHeader } from "@/components/admin/page-header";
import { PencilIcon } from "lucide-react";
import { TestimonialForm } from "../../testimonial-form";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);
  if (!testimonial) notFound();

  return (
    <>
      <PageHeader title="Edit Testimonial" description={`Editing "${testimonial.name}"`} icon={PencilIcon} />
      <TestimonialForm testimonial={testimonial} />
    </>
  );
}
