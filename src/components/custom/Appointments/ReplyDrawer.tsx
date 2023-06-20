import { IClientQuestion } from '@/app/api/models/appointment.model';
import DrawerWrapper from '@/components/common/Drawer/DrawerWrapper';
import { Accordion, Button, Input, Space, Text, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react';
import { BsReply } from 'react-icons/bs';

const ReplyDrawer: React.FC<{ clientQuestions: IClientQuestion[] }> = ({
	clientQuestions,
}) => {
	const [opened, { open, close }] = useDisclosure(false);
	const [answer, setAnswer] = useState('');

	return (
		<div>
			<Button variant='filled' color='orange' size='xs' compact onClick={open}>
				<BsReply size={16} />
			</Button>
			<DrawerWrapper
				close={close}
				opened={opened}
				size='lg'
				title='Reply to client'
			>
				<form className='mr-4'>
					<Space h={20} />
					{clientQuestions?.map((q, idx: number) => (
						<Accordion
							variant='separated'
							mb={10}
							key={idx}
							defaultValue={q.qTitle + idx}
						>
							<Accordion.Item value={q.qTitle + idx}>
								<Accordion.Control>{q?.qTitle}</Accordion.Control>
								<Accordion.Panel>
									<Text fz={14} ff={'Nunito sans, sans-serif'}>
										{q?.qDesc}
									</Text>
									<Space h={20} />
									<Input.Wrapper size='md' label='Answer of client questions'>
										<Textarea
											size='md'
											onChange={(e) => setAnswer(e.target.value)}
											value={answer}
											placeholder='Answer of questions'
										/>
									</Input.Wrapper>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					))}

					<Space h={10} />
					<Button
						leftIcon={<BsReply size={20} />}
						color='violet'
						fullWidth
						size='md'
					>
						Reply
					</Button>
				</form>
			</DrawerWrapper>
		</div>
	);
};

export default ReplyDrawer;
