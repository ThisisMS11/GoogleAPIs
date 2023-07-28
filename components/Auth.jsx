import { redirect } from 'next/navigation'
import { cookies } from 'next/headers';


export default function Auth(Component) {
    return function ProtectedRoute({ ...props }) {

        const cookieStore = cookies();
        
        
        /* if the user is logged in then we want the user to be redirected to the dashboard otherwise the login page */
        const userIsAuthenticated = cookieStore.get('isLoggedIn')?.value ;

        console.log(userIsAuthenticated);

        /* this is wierd but cookie value  is treated as a normal string and not a boolean value */
        if (userIsAuthenticated=='false') {
            console.log('i should redirected him')
            redirect('/login');
        }

        return <Component {...props} />;
    };
}
