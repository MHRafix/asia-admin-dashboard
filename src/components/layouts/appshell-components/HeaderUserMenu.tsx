import { Avatar, Menu } from '@mantine/core';

const HeaderUserMenu = () => {
	return (
		<Menu shadow='md' width={200}>
			<Menu.Target>
				<Avatar color='cyan'>N</Avatar>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Application</Menu.Label>
				<Menu.Item>Settings</Menu.Item>
				<Menu.Item>Logout</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default HeaderUserMenu;
