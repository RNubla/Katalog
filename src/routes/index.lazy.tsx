import { Button } from "@nextui-org/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { open } from "@tauri-apps/plugin-dialog";
export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index({
	defaultLayout = [33, 67],
}: { defaultLayout: number[] | undefined }) {
	const onLayout = (sizes: number[]) => {
		document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
	};

	const openFolder = async () => {
		await open({
			multiple: true,
			filters: [
				{
					name: "Image",
					extensions: ["png", "jpeg"],
				},
			],
		});
	};

	return (
		// <div className="h-full">Hi</div>
		<PanelGroup
			autoSaveId="persistence"
			className="flex-1"
			direction="horizontal"
			onLayout={onLayout}
		>
			<Panel defaultSize={defaultLayout[0]} minSize={20} className="flex">
				<Button onClick={openFolder}>Open folder</Button>
			</Panel>
			<PanelResizeHandle className="w-2 bg-blue-200" />
			<Panel defaultSize={defaultLayout[1]} minSize={20}>
				<h3>Main content</h3>
			</Panel>
		</PanelGroup>
	);
}
