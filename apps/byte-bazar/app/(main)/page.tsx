import CategoryShowcase from "../../components/category-showcase";
import PreviewGrid from "../../components/preview-grid";

export default function Page() {
  return (
    <div className="min-h-svh">
      <div className="my-5">
        <CategoryShowcase />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        {/* <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button> */}
        <PreviewGrid />
        <PreviewGrid />
        <PreviewGrid />
      </div>
    </div>
  );
}
