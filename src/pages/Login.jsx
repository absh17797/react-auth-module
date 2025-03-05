// // src/pages/Login.jsx
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useLoginMutation } from '../features/auth/authApi';
// import { useDispatch } from 'react-redux';
// import { setCredentials } from '../features/auth/authSlice';
// import { toast } from 'react-toastify';


// const loginSchema = yup.object().shape({
//     email: yup.string().email().required('Email is required'),
//     password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
// });

// const Login = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [login] = useLoginMutation();
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: yupResolver(loginSchema),
//     });

//     const onSubmit = async (data) => {
//         try {
//             const result = await login(data).unwrap();
//             console.log(`result -- Login--onSubmit-- ${JSON.stringify(result)}`)
//             console.log(`result -- Login--result.user-- ${result.data.user}`)
//             console.log(`result -- Login--result.token-- ${result.data.token}`)
//             // dispatch(setCredentials({ 
//             //     user: JSON.stringify(result.user), 
//             //     token: JSON.stringify(result.token) 
//             // }));
//             dispatch(setCredentials({
//                 user: result.data.data,
//                 token: result.data.token
//             }));
//             toast.success('Login successful!');
//             navigate('/profile'); // Redirect to profile after login
//         } catch (err) {
//             toast.error(err.data?.message || 'Login failed');
//         }
//     };
//     return (
//         <div>
//             <h1>Login Page</h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <label>Email</label>
//                     <input type="email" {...register('email')} />
//                     {errors.email && <span>{errors.email.message}</span>}
//                 </div>
//                 <div>
//                     <label>Password</label>
//                     <input type="password" {...register('password')} />
//                     {errors.password && <span>{errors.password.message}</span>}
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;




// src/pages/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const result = await login(data).unwrap();
            dispatch(setCredentials({
                user: result.data.data,
                token: result.data.token
            })
            );
            toast.success('Login successful!');
            navigate('/profile'); // Redirect to profile after login
        } catch (err) {
            toast.error(err.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email"
                        {...register('email')}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="password"
                        {...register('password')}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default Login;


