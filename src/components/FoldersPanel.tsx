import { ListboxWrapper } from "./Wrapers/ListBoxWrapper";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { open } from "@tauri-apps/plugin-dialog";

const FoldersPanel = () => {
	const openFolder = async () => {
		await open({
			multiple: false,
			directory: true,
			filters: [
				{
					name: "Image",
					extensions: ["png", "jpeg"],
				},
			],
		}).then((res) => console.log(res));
	};
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
