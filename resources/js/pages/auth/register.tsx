import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Components/Layout/Layout';
import Button from '@/components/ui/Button';
import InputError from '@/components/input-error';

const Register = ({ auth }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <Layout title="Inscription" auth={auth}>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-8 py-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Inscription</h2>
                <p className="text-gray-600">Créez votre compte LUXE</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                    required
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>

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

                <div className="mb-6">
                  <label htmlFor="password_confirmation" className="block text-sm font-medium mb-2">
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full mb-4" disabled={processing}>
                  {processing && <span className="animate-spin">...</span>}
                  S'inscrire
                </Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Déjà un compte? </span>
                  <Link href="/login" className="font-medium text-primary hover:text-opacity-80">
                    Se connecter
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

export default Register;

















// import React, { useState } from 'react';
// import { Head, Link } from '@inertiajs/react';
// import Layout from '@/Components/Layout/Layout';
// import Button from '@/components/ui/Button';
// // import Button from '@/Components/UI/Button';

// const Register = ({ auth }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     password_confirmation: '',
//     terms: false,
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
//     <Layout title="Inscription" auth={auth}>
//       <section className="py-20 bg-secondary">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
//             <div className="px-8 py-10">
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold mb-2">Inscription</h2>
//                 <p className="text-gray-600">Créez votre compte LUXE</p>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-6">
//                   <label htmlFor="name" className="block text-sm font-medium mb-2">
//                     Nom complet
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary"
//                     required
//                   />
//                 </div>

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

//                 <div className="mb-6">
//                   <label htmlFor="password_confirmation" className="block text-sm font-medium mb-2">
//                     Confirmer le mot de passe
//                   </label>
//                   <input
//                     type="password"
//                     id="password_confirmation"
//                     name="password_confirmation"
//                     value={formData.password_confirmation}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-primary focus:border-primary"
//                     required
//                   />
//                 </div>

//                 <div className="flex items-center mb-8">
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     name="terms"
//                     checked={formData.terms}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
//                     required
//                   />
//                   <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
//                     J'accepte les{' '}
//                     <Link href="/terms" className="text-primary hover:text-opacity-80">
//                       conditions d'utilisation
//                     </Link>
//                   </label>
//                 </div>

//                 <Button type="submit" variant="primary" className="w-full mb-4">
//                   S'inscrire
//                 </Button>

//                 <div className="text-center text-sm">
//                   <span className="text-gray-600">Déjà un compte? </span>
//                   <Link href="/login" className="font-medium text-primary hover:text-opacity-80">
//                     Se connecter
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

// export default Register;












// import { Head, useForm } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';
// import { FormEventHandler } from 'react';

// import InputError from '@/components/input-error';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import AuthLayout from '@/layouts/auth-layout';

// type RegisterForm = {
//     name: string;
//     email: string;
//     password: string;
//     password_confirmation: string;
// };

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const submit: FormEventHandler = (e) => {
//         e.preventDefault();
//         post(route('register'), {
//             onFinish: () => reset('password', 'password_confirmation'),
//         });
//     };

//     return (
//         <AuthLayout title="Create an account" description="Enter your details below to create your account">
//             <Head title="Register" />
//             <form className="flex flex-col gap-6" onSubmit={submit}>
//                 <div className="grid gap-6">
//                     <div className="grid gap-2">
//                         <Label htmlFor="name">Name</Label>
//                         <Input
//                             id="name"
//                             type="text"
//                             required
//                             autoFocus
//                             tabIndex={1}
//                             autoComplete="name"
//                             value={data.name}
//                             onChange={(e) => setData('name', e.target.value)}
//                             disabled={processing}
//                             placeholder="Full name"
//                         />
//                         <InputError message={errors.name} className="mt-2" />
//                     </div>

//                     <div className="grid gap-2">
//                         <Label htmlFor="email">Email address</Label>
//                         <Input
//                             id="email"
//                             type="email"
//                             required
//                             tabIndex={2}
//                             autoComplete="email"
//                             value={data.email}
//                             onChange={(e) => setData('email', e.target.value)}
//                             disabled={processing}
//                             placeholder="email@example.com"
//                         />
//                         <InputError message={errors.email} />
//                     </div>

//                     <div className="grid gap-2">
//                         <Label htmlFor="password">Password</Label>
//                         <Input
//                             id="password"
//                             type="password"
//                             required
//                             tabIndex={3}
//                             autoComplete="new-password"
//                             value={data.password}
//                             onChange={(e) => setData('password', e.target.value)}
//                             disabled={processing}
//                             placeholder="Password"
//                         />
//                         <InputError message={errors.password} />
//                     </div>

//                     <div className="grid gap-2">
//                         <Label htmlFor="password_confirmation">Confirm password</Label>
//                         <Input
//                             id="password_confirmation"
//                             type="password"
//                             required
//                             tabIndex={4}
//                             autoComplete="new-password"
//                             value={data.password_confirmation}
//                             onChange={(e) => setData('password_confirmation', e.target.value)}
//                             disabled={processing}
//                             placeholder="Confirm password"
//                         />
//                         <InputError message={errors.password_confirmation} />
//                     </div>

//                     <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
//                         {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
//                         Create account
//                     </Button>
//                 </div>

//                 <div className="text-center text-sm text-muted-foreground">
//                     Already have an account?{' '}
//                     <TextLink href={route('login')} tabIndex={6}>
//                         Log in
//                     </TextLink>
//                 </div>
//             </form>
//         </AuthLayout>
//     );
// }
