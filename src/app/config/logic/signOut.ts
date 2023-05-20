import Cookies from 'js-cookie';
import Router from 'next/router';

// signout action function
export const signOut = async () => {
	Cookies.remove('user');
	Router.push('/auth/login');
};
