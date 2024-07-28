import { gql } from '@apollo/client';

export const GET_BLOGS_QUERY = gql`
	query Blogs($input: BlogListQueryDto) {
		Blogs(input: $input) {
			nodes {
				_id
				status
				title
				description
				like
				image
				createdAt
				author {
					name
					avatar
				}
			}
		}
	}
`;
export const GET_BLOG_QUERY = gql`
	query Blog($input: CommonMatchInput!) {
		Blog(input: $input) {
			_id
			status
			title
			description
			like
			image
			createdAt
			author {
				name
				avatar
			}
		}
	}
`;

export const CREATE_BLOG = gql`
	mutation CREATE_BLOG($input: CreateBlogInput!) {
		createBlog(input: $input) {
			_id
		}
	}
`;

export const UPDATE_BLOG = gql`
	mutation UPDATE_BLOG($input: UpdateBlogInput!) {
		updateBlog(input: $input)
	}
`;

export const REMOVE_BLOG = gql`
	mutation REMOVE_BLOG($input: CommonMatchInput!) {
		removeBlog(input: $input)
	}
`;
