import { redirect } from 'next/navigation'
import { cookies } from 'next/headers';


export default function Auth(Component) {
    return function ProtectedRoute({ ...props }) {

        const cookieStore = cookies();
        
        
        /* if the user is logged in then we want the user to be redirected to the dashboard otherwise the login page */
        const userIsAuthenticated = cookieStore.get('isLoggedIn')?.value;
        
        console.log(userIsAuthenticated);


        if (!userIsAuthenticated) {
            redirect('/login');
        }

        return <Component {...props} />;
    };
}
