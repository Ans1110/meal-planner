import CategoryCards from "./_components/categoryCards";
import { CategoryFormDialog } from "@/app/(dashboard)/_components/category-form-dialog";

export default function Page() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Categories List</h1>
        <CategoryFormDialog />
      </div>
      <CategoryCards />
    </>
  );
}
