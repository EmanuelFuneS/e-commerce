import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@workspace/ui/components/resizable";
const CategoryShowcase = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel minSize={30}>
        <div className="flex h-[400px] items-center justify-center p-6">
          <span>Categories list</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60} minSize={70}>
        <div className="flex h-full items-center justify-center p-6">
          <span>Banners Carousel</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default CategoryShowcase;
