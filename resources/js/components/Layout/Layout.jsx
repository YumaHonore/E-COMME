import React from 'react'; 
import { Head, usePage } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ title, auth, children }) => {
  const { props } = usePage(); // <- ici

  return (
    <>
      <Head title={title} />
      <Header auth={auth} />

      {props.flash?.success && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center mx-auto w-full max-w-xl">
          {props.flash.success}
        </div>
      )}

      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;






// import React from 'react';
// import { Head } from '@inertiajs/react';
// import Header from './Header';
// import Footer from './Footer';

// const Layout = ({ title, auth, children, page}) => {
//   return (
//     <>
//       <Head title={title} />
//       <Header auth={auth} />
//       {page.props.flash?.success && (
//         <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
//           {page.props.flash.success}
//         </div>
//       )}

//       <main>{children}</main>
//       <Footer />
//     </>
//   );
// };

// export default Layout;