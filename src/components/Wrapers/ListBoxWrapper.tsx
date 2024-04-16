import React from "react";
interface ListboxWrapperProps {
	children: React.ReactNode;
}
export const ListboxWrapper = ({ children }: ListboxWrapperProps) => (
	<div className="w-full max-w-full border-small px-1 py-2  border-default-200 dark:border-default-100">
		{children}
	</div>
);
