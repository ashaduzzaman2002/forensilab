import { PageHeader } from "@/components/admin/page-header";
import { PlusIcon } from "lucide-react";
import { TestimonialForm } from "../testimonial-form";

export default function AddTestimonialPage() {
  return (
    <>
      <PageHeader title="Add Testimonial" description="Create a new client testimonial." icon={PlusIcon} />
      <TestimonialForm />
    </>
  );
}
