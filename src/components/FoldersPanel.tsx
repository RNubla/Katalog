import { ListboxWrapper } from "./Wrapers/ListBoxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";
import { basename } from "@tauri-apps/api/path";

const FoldersPanel = () => {
	const [directories, setDirectories] = useState<Record<string, string>[]>([]);
	const openFolder = async () => {
		const folder = await open({
			multiple: false,
			directory: true,
			filters: [
				{
					name: "Image",
					extensions: ["png", "jpeg"],
				},
			],
		});
		if (folder) {
			const baseNameFolder = await basename(folder);
			setDirectories((prevValues) => ({
				...prevValues,
				[folder]: baseNameFolder,
			}));
		}
	};

	console.log(directories);
	return (
		<ListboxWrapper>
			<Listbox variant="faded" aria-label="Listbox menu with icons">
				<ListboxItem
					key="delete"
					className="text-primary"
					color="secondary"
					showDivider
					onClick={openFolder}
					// startContent={
					// 	<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />
					// }
				>
					Add Folder
				</ListboxItem>
				<ListboxItem
					key="new"
					// startContent={<AddNoteIcon className={iconClasses} />}
				>
					New file
				</ListboxItem>
				<ListboxItem
					key="copy"
					// startContent={<CopyDocumentIcon className={iconClasses} />}
				>
					Copy link
				</ListboxItem>
				<ListboxItem
					key="edit"
					// showDivider
					// startContent={<EditDocumentIcon className={iconClasses} />}
				>
					Edit file
				</ListboxItem>
			</Listbox>
		</ListboxWrapper>
	);
};

export default FoldersPanel;
