import {
	Button,
	type ButtonOwnProps,
	IconButton,
	IconButtonOwnProps,
	Menu,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface MenuItemsProps extends ButtonOwnProps {
	type: "label" | "icon";
	label?: string;
	id: string;
}

export const MenuItems: React.FC<MenuItemsProps> = ({ label, color, type }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleRenderForLabelOrIcon = () => {
		if (type === "label") {
			return (
				<Button
					color={color}
					onClick={handleClick}
					id="menu-button"
					aria-controls={open ? "menu" : undefined}
					aria-haspopup
					aria-expanded={open ? "true" : undefined}
				>
					{label}
				</Button>
			);
		}
		if (type === "icon") {
			return (
				<IconButton
					color="inherit"
					id="menu-button"
					aria-controls={open ? "menu" : undefined}
					aria-haspopup
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
				>
					<AccountCircleIcon />
				</IconButton>
			);
		}
	};
	return (
		<>
			{handleRenderForLabelOrIcon()}
			<Menu
				id="menu"
				aria-labelledby="menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</>
	);
};
