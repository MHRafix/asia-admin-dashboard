import { IClientQuestion } from '@/app/api/models/appointment.model';
import { Notify } from '@/app/config/alertNotification/Notification';
import EmptyPannel from '@/components/common/EmptyPannel';
import { gql, useMutation } from '@apollo/client';
import { Accordion, Button, Input, Space, Textarea } from '@mantine/core';
import { IconMessage, IconMoodEmpty } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

const ReplyDrawer: React.FC<{
	clientQuestions: IClientQuestion[];
	onClose: () => void;
	_id: string;
	name: string;
	email: string;
}> = ({ clientQuestions, onClose, _id, name, email }) => {
	// form
	const {
		handleSubmit,
		register,
		control,
		setValue,
		formState: { errors },
		watch,
	} = useForm({});

	// form field array
	const { fields } = useFieldArray({
		name: 'qa',
		control,
	});

	// prefill
	useEffect(() => {
		setValue(
			'qa',
			clientQuestions?.map((q) => ({
				question: q?.qTitle,
			}))
		);
	}, [clientQuestions]);

	// reply mutation
	const [sendReply, { loading }] = useMutation(
		Reply_Mutation,
		Notify({
			sucTitle: 'Reply sent via mail to client.',
			action: () => onClose(),
		})
	);
	// submit form
	const onSubmitForm = (payload: any) => {
		sendReply({
			variables: {
				input: {
					_id,
					name,
					email,
					payload: payload?.qa,
				},
			},
		});
	};

	return (
		<div>
			{clientQuestions?.length ? (
				<form onSubmit={handleSubmit(onSubmitForm)} className='mr-4'>
					{fields?.map((_, idx: number) => (
						<Accordion
							variant='separated'
							mb={10}
							key={idx}
							defaultValue={`${idx}`}
						>
							<Accordion.Item value={`${idx}`}>
								<Accordion.Control fw={700}>
									{watch(`qa.${idx}.question`)}
								</Accordion.Control>
								<Accordion.Panel>
									<Input.Wrapper size='md' label='Answer'>
										<Textarea
											size='md'
											{...register(`qa.${idx}.answer`)}
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
						type='submit'
						loading={loading}
					>
						Send
					</Button>
				</form>
			) : (
				<EmptyPannel
					isShow={true}
					title='No Questions from client'
					Icon={<IconMoodEmpty />}
				/>
			)}
		</div>
	);
};

export default ReplyDrawer;

export const Reply_Mutation = gql`
	mutation SendReply($input: ReplyAppointmentInput!) {
		sendAppointmentReply(input: $input)
	}
`;
