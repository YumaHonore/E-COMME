import React from 'react';
import { Link } from '@inertiajs/react';
import Button from '../Button';
// import Button from './Button';

const LinkButton = ({ href, children, ...props }) => {
  return (
    <Link href={href}>
      <Button as="div" {...props}>
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;







// import React from 'react';
// import { Link } from '@inertiajs/react';
// import Button from './Button';

// const LinkButton = ({ href, children, ...props }) => {
//   return (
//     <Link href={href}>
//       <Button as="div" {...props}>
//         {children}
//       </Button>
//     </Link>
//   );
// };

// export default LinkButton;