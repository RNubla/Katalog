import { Button } from "@nextui-org/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import FoldersPanel from "../components/FoldersPanel";
export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index({
	defaultLayout = [33, 67],
}: { defaultLayout: number[] | undefined }) {
	const onLayout = (sizes: number[]) => {
		document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
	};

	return (
		// <div className="h-full">Hi</div>
		<PanelGroup
			autoSaveId="persistence"
			className="flex-1"
			direction="horizontal"
			onLayout={onLayout}
		>
			<Panel
				defaultSize={defaultLayout[0]}
				minSize={15}
				maxSize={20}
				className="flex"
			>
				<FoldersPanel />
				{/* <Button onClick={openFolder}>Open folder</Button> */}
			</Panel>
			<PanelResizeHandle className="w-2 bg-blue-200" />
			<Panel defaultSize={defaultLayout[1]} minSize={20}>
				<h3>Main content</h3>
			</Panel>
		</PanelGroup>
	);
}
