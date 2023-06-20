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
									<Input.Wrapper label='Answer of client questions'>
										<Textarea
											size='xl'
											onChange={(e) => setAnswer(e.target.value)}
											value={answer}
											placeholder='Answer of client questions'
										/>
									</Input.Wrapper>
								</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					))}
				</form>
			</DrawerWrapper>
		</div>
	);
};

export default ReplyDrawer;
