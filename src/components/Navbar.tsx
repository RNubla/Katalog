import * as React from "react";
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuItems } from "./MenuItems";

interface NavBarProps {
	children?: React.ReactNode;
}

export const NavBar: React.FC<NavBarProps> = ({ children }) => {
	return (
		<Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
			<AppBar position="static">
				<Container>
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Brand Name
						</Typography>
						<Box
							aria-label="Menus"
							component="ul"
							sx={{ display: { xs: "none", md: "flex" } }}
						>
							<Button color="inherit">Notification</Button>
							<MenuItems label="Hello" type="label" id="test" color="inherit" />
							<Button color="inherit">Theme</Button>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
};
