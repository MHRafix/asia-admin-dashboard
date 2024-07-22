import { IAppSettings } from '@/app/api/models/appSettings.model';
import { APP_SETTINGS_QUERY } from '@/app/config/queries/appSettings.query';
import { useQuery } from '@apollo/client';
import { Navbar, NavLink, ScrollArea, Space, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { FaRegChartBar } from 'react-icons/fa';
import { menus } from './menus';
import { UserButton } from './UserButton';

interface Props {
	opened: boolean;
	setOpened: (state: boolean) => void;
}

const AdminMenu: React.FC<Props> = ({ opened, setOpened }) => {
	const { asPath } = useRouter();

	const { data } = useQuery<{
		appSettings: { nodes: IAppSettings[] };
	}>(APP_SETTINGS_QUERY);

	return (
		<Navbar
			hiddenBreakpoint='sm'
			hidden={!opened}
			width={{ sm: 200, lg: 250 }}
			style={{ background: '#212231', zIndex: 100000000 }}
		>
			<Navbar.Section>
				<Space h={10} />
				<div className='flex items-center justify-start pl-3'>
					{data?.appSettings?.nodes[0]?.logo ? (
						<Image
							src={data?.appSettings?.nodes[0]?.logo!}
							alt='Logo'
							width={130}
							height={52}
						/>
					) : (
						<Text
							fz={35}
							ff={'Nunito sans, sans-serif'}
							fw={700}
							color='violet'
						>
							Asia tours
						</Text>
					)}
				</div>
			</Navbar.Section>
			<Space h={20} />
			{/* {opened && (
				<div className='p-3 ml-auto'>
					<ActionIcon size='lg' color='red' onClick={() => setOpened(false)}>
						✖
					</ActionIcon>
				</div>
			)} */}
			<Navbar.Section grow component={ScrollArea}>
				<NavLink
					style={{
						fontFamily: 'Nunito sans, sans-serif',
						borderLeft: asPath === '/' ? '4px solid #5d34d8' : 0,
					}}
					fz={20}
					icon={<FaRegChartBar size={20} />}
					label={
						<Text size='md' weight={500} ff={'Nunito sans, sans-serif'}>
							Dashboard
						</Text>
					}
					component={Link}
					href={'/'}
					active={asPath === '/'}
					defaultOpened={asPath === '/'}
					styles={(theme) => ({
						// theme.colors.brand[9]
						root: {
							fontWeight: asPath === '/' ? 600 : 400,
							fontFamily: 'Nunito sans, sans-serif',
							fontSize: 20,
						},
					})}
				/>
				{menus.map((item) => (
					<NavLink
						style={{
							fontFamily: 'Nunito sans, sans-serif',
							borderLeft:
								asPath.includes(item.href!) && asPath === item.href
									? '4px solid #5d34d8'
									: 0,
						}}
						fz={20}
						key={item.label}
						icon={item.icon}
						label={
							<Text size='md' weight={500} ff={'Nunito sans, sans-serif'}>
								{item.label}
							</Text>
						}
						component={Link}
						href={item.href!}
						disabled={
							item?.href === '/rating_&&_reviews' ||
							item?.href === '/expenses_calculation' ||
							item?.href === '/reception_management/task_review'
						}
						active={asPath.includes(item.href)}
						defaultOpened={asPath.includes(item.href)}
						styles={(theme) => ({
							// theme.colors.brand[9]
							root: {
								fontWeight: asPath.includes(item.href!) ? 600 : 400,
								fontFamily: 'Nunito sans, sans-serif',
								fontSize: 20,
							},
						})}
					>
						{item?.children?.map((i, idx) => (
							<NavLink
								style={{
									fontFamily: 'Nunito sans, sans-serif',
									borderLeft:
										asPath.includes(i.href!) && asPath === i.href
											? '4px solid #5d34d8'
											: 0,
								}}
								active={asPath.includes(i.href)}
								defaultOpened={asPath.includes(i.href)}
								styles={(theme) => ({
									// theme.colors.brand[9]
									root: {
										fontWeight: asPath.includes(i.href!) ? 600 : 400,
										fontFamily: 'Nunito sans, sans-serif',
										fontSize: 20,
									},
								})}
								fz={20}
								key={idx}
								icon={i.icon}
								component={Link}
								href={i.href!}
								label={i.label}
							>
								{i?.children?.map((child, idxI) => (
									<NavLink
										style={{
											fontFamily: 'Nunito sans, sans-serif',
											borderLeft:
												asPath.includes(child.href!) && asPath === child.href
													? '4px solid #5d34d8'
													: 0,
										}}
										active={asPath === child.href}
										styles={(theme) => ({
											// theme.colors.brand[9]
											root: {
												fontWeight: asPath.includes(child.href!) ? 600 : 400,
												fontFamily: 'Nunito sans, sans-serif',
												fontSize: 20,
											},
										})}
										fz={20}
										key={idxI}
										icon={child.icon}
										component={Link}
										href={child.href!}
										label={child.label}
									/>
								))}
							</NavLink>
						))}
					</NavLink>
				))}
			</Navbar.Section>
			<Space h={20} />
			<Navbar.Section>
				<UserButton />
			</Navbar.Section>
		</Navbar>
	);
};

export default AdminMenu;
