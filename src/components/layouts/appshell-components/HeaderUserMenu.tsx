import { Avatar, Menu } from '@mantine/core';
import { BiSearch } from 'react-icons/bi';
import { MdNotificationsNone } from 'react-icons/md';

const HeaderUserMenu = () => {
	return (
		<Menu shadow='md' width={200}>
			<Menu.Target>
				<BiSearch size={24} />
			</Menu.Target>
			<Menu.Target>
				<MdNotificationsNone size={24} />
			</Menu.Target>
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
