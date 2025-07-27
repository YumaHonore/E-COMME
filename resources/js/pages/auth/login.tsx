import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import Button from '@/Components/ui/Button';
import InputError from '@/components/input-error';

const Login = ({ auth, status, canResetPassword }) => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(name, type === 'checkbox' ? checked : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => {
        // Optionally reset the password field after submission
      },
    });
  };

  return (
    <Layout title="Connexion" auth={auth}>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-8 py-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Connexion</h2>
                <p className="text-gray-600">Accédez à votre compte LUXE</p>
              </div>

              {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                    required
                  />
                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                    required
                  />
                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      checked={data.remember}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Se souvenir de moi
                    </label>
                  </div>

                  {canResetPassword && (
                    <Link href={route('password.request')} className="text-sm font-medium text-primary hover:text-opacity-80">
                      Mot de passe oublié?
                    </Link>
                  )}
                </div>

                {/* <Button type="submit" variant="primary" className="w-full mb-4 hover:cursor-pointer" disabled={processing}>
                  {processing && <span className="animate-spin">...</span>}
                  Se connecter
                  <span className="animate-spin">...</span>
                </Button> */}

                <Button 
    type="submit" 
    variant="primary" 
    className="w-full mb-4 hover:cursor-pointer flex items-center justify-center" 
    disabled={processing}
>
    {processing ? (
        <>
            <span className="animate-spin" />
            Connexion en cours...
        </>
    ) : (
        "Se connecter"
    )}
</Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Pas encore de compte? </span>
                  <Link href="/register" className="font-medium text-primary hover:text-opacity-80">
                    S'inscrire
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
















// import React, { useState } from 'react';
// import { Head, Link } from '@inertiajs/react';
// import Layout from '@/Components/Layout/Layout';
// import Button from '@/Components/ui/Button';

// const Login = ({ auth }) => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     remember: false,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Gérer la soumission avec Inertia
//   };

//   return (
//     <Layout title="Connexion" auth={auth}>
//       <section className="py-20 bg-secondary">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="px-8 py-10">
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold mb-2">Connexion</h2>
//                 <p className="text-gray-600">Accédez à votre compte LUXE</p>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-6">
//                   <label htmlFor="email" className="block text-sm font-medium mb-2">
//                     Adresse email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary"
//                     required
//                   />
//                 </div>

//                 <div className="mb-6">
//                   <label htmlFor="password" className="block text-sm font-medium mb-2">
//                     Mot de passe
//                   </label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary"
//                     required
//                   />
//                 </div>

//                 <div className="flex items-center justify-between mb-8">
//                   <div className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id="remember"
//                       name="remember"
//                       checked={formData.remember}
//                       onChange={handleChange}
//                       className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
//                     />
//                     <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
//                       Se souvenir de moi
//                     </label>
//                   </div>

//                   <Link href="/forgot-password" className="text-sm font-medium text-primary hover:text-opacity-80">
//                     Mot de passe oublié?
//                   </Link>
//                 </div>

//                 <Button type="submit" variant="primary" className="w-full mb-4">
//                   Se connecter
//                 </Button>

//                 <div className="text-center text-sm">
//                   <span className="text-gray-600">Pas encore de compte? </span>
//                   <Link href="/register" className="font-medium text-primary hover:text-opacity-80">
//                     S'inscrire
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Login;
























// import { Head, useForm } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';
// import { FormEventHandler } from 'react';

// import InputError from '@/components/input-error';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import AuthLayout from '@/layouts/auth-layout';

// type LoginForm = {
//     email: string;
//     password: string;
//     remember: boolean;
// };

// interface LoginProps {
//     status?: string;
//     canResetPassword: boolean;
// }

// export default function Login({ status, canResetPassword }: LoginProps) {
//     const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
//         email: '',
//         password: '',
//         remember: false,
//     });

//     const submit: FormEventHandler = (e) => {
//         e.preventDefault();
//         post(route('login'), {
//             onFinish: () => reset('password'),
//         });
//     };

//     return (
//         <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
//             <Head title="Log in" />

//             <form className="flex flex-col gap-6" onSubmit={submit}>
//                 <div className="grid gap-6">
//                     <div className="grid gap-2">
//                         <Label htmlFor="email">Email address</Label>
//                         <Input
//                             id="email"
//                             type="email"
//                             required
//                             autoFocus
//                             tabIndex={1}
//                             autoComplete="email"
//                             value={data.email}
//                             onChange={(e) => setData('email', e.target.value)}
//                             placeholder="email@example.com"
//                         />
//                         <InputError message={errors.email} />
//                     </div>

//                     <div className="grid gap-2">
//                         <div className="flex items-center">
//                             <Label htmlFor="password">Password</Label>
//                             {canResetPassword && (
//                                 <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
//                                     Forgot password?
//                                 </TextLink>
//                             )}
//                         </div>
//                         <Input
//                             id="password"
//                             type="password"
//                             required
//                             tabIndex={2}
//                             autoComplete="current-password"
//                             value={data.password}
//                             onChange={(e) => setData('password', e.target.value)}
//                             placeholder="Password"
//                         />
//                         <InputError message={errors.password} />
//                     </div>

//                     <div className="flex items-center space-x-3">
//                         <Checkbox
//                             id="remember"
//                             name="remember"
//                             checked={data.remember}
//                             onClick={() => setData('remember', !data.remember)}
//                             tabIndex={3}
//                         />
//                         <Label htmlFor="remember">Remember me</Label>
//                     </div>

//                     <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
//                         {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
//                         Log in
//                     </Button>
//                 </div>

//                 <div className="text-center text-sm text-muted-foreground">
//                     Don't have an account?{' '}
//                     <TextLink href={route('register')} tabIndex={5}>
//                         Sign up
//                     </TextLink>
//                 </div>
//             </form>

//             {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
//         </AuthLayout>
//     );
// }
