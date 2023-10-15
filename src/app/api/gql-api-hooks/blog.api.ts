import { Notify } from '@/app/config/alertNotification/Notification';
import { MatchOperator } from '@/app/config/gql';
import {
	GET_BLOGS_QUERY,
	GET_BLOG_QUERY,
	UPDATE_BLOG,
} from '@/app/config/queries/blogs.query';
import { useMutation, useQuery } from '@apollo/client';
import { IBlog } from '../models/blog.model';

export const useGetBlogs = () => {
	const {
		data,
		loading: gettingBlogs,
		refetch: refetchBlogs,
	} = useQuery<{
		Blogs: { nodes: IBlog[] };
	}>(GET_BLOGS_QUERY, {
		variables: {
			page: 1,
			limit: 100,
		},
	});
	return { blogs: data?.Blogs?.nodes, gettingBlogs, refetchBlogs };
};

export const useGetBlog = (id: string) => {
	const {
		data,
		loading: gettingBlog,
		refetch: refetchBlog,
	} = useQuery<{
		Blog: IBlog;
	}>(GET_BLOG_QUERY, {
		variables: {
			input: {
				key: '_id',
				operator: MatchOperator.Eq,
				value: id,
			},
		},
	});
	return { blog: data?.Blog, gettingBlog, refetchBlog };
};

export const useUpdateBlog = (actionFunc: () => void) => {
	const [updateBlog, { loading: updatingBlog }] = useMutation(
		UPDATE_BLOG,
		Notify({
			sucTitle: 'Blog details updated successfully!',
			sucMessage: 'Refetch blog details.',
			errMessage: 'Try again to update blog details.',
			action: actionFunc,
		})
	);
	return { updateBlog, updatingBlog };
};
