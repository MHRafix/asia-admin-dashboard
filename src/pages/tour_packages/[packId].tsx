import { useGetSinglePackage } from '@/app/api/gql-api-hooks/travelPackage.api';
import PackageDetailsSkeleton from '@/components/common/Skeletons/PackageDetailsSkeleton';
import PackageDetails from '@/components/custom/SinglePackages/PackageDetails';
import ReviewAndRatingForm from '@/components/custom/SinglePackages/ReviewAndRatingForm';
import TravelOutline from '@/components/custom/SinglePackages/TravelOutline';
import TravelTransportItem from '@/components/custom/SinglePackages/TravelTransportItem';
import AdminLayout from '@/components/layouts/AdminLayout';
import { ITransportation } from '@/store/createPackgage.store';
import { Container, Divider, Title } from '@mantine/core';
import { NextPage } from 'next';
const SingleTourPage: NextPage<{ packId: string }> = ({ packId }) => {
	const { singlePackage, loading } = useGetSinglePackage(packId);

	return (
		<AdminLayout>
			<>
				{/* <Container p='sm' size={'xl'}> */}
				<div className='flex items-center'>
					<div className='xs:w-full sm:w-12/12 lg:w-10/12 mx-auto grid gap-5 xs:mt-2 md:mt-5'>
						{(loading || !singlePackage) && <PackageDetailsSkeleton />}
						{singlePackage && (
							<div>
								<PackageDetails
									details={{
										sliderImages: singlePackage?.carouselThumbnails!,
										packageTitle: singlePackage?.packageTitle!,
									}}
								/>
								<Divider my='md' color='#e1e1e1' />
								<div className='px-[10px]'>
									<Title order={3} my={10} ff='Nunito Sans, sans-serif'>
										Transport Outline
									</Title>
									<div>
										{singlePackage?.transportation?.map(
											(transport: ITransportation, idx: number) => (
												<TravelTransportItem
													key={idx}
													serialNumber={idx + 1}
													transportation={transport}
												/>
											)
										)}
									</div>
								</div>

								<div className='px-[10px] mt-10'>
									<Title order={3} my={10} ff='Nunito Sans, sans-serif'>
										Travel Outline & Description
									</Title>
									<div>
										<TravelOutline description={singlePackage?.description!} />
									</div>
								</div>

								<div className='px-[10px] mt-10'>
									<Title order={3} my={10} ff='Nunito Sans, sans-serif'>
										Review and Ratings
									</Title>
									<div>
										<ReviewAndRatingForm />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				{/* </Container> */}
			</>
		</AdminLayout>
	);
};

export default SingleTourPage;

export async function getServerSideProps({
	params,
}: {
	params: { packId: string };
}) {
	return {
		props: { packId: params?.packId },
	};
}
