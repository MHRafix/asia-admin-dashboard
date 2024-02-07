import { IClientQuestion } from '@/app/api/models/appointment.model';
import { Accordion, Button, Input, Space, Textarea } from '@mantine/core';
import { IconMessage } from '@tabler/icons-react';
import React, { useState } from 'react';

const ReplyDrawer: React.FC<{ clientQuestions: IClientQuestion[] }> = ({
	clientQuestions,
}) => {
	const [answer, setAnswer] = useState('');

	return (
		<div>
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
					leftIcon={<IconMessage size={20} />}
					color='violet'
					fullWidth
					size='md'
				>
					Send
				</Button>
			</form>
		</div>
	);
};

export default ReplyDrawer;
