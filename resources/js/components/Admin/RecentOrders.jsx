import React from 'react';
import { Link } from '@inertiajs/react';
import {
  CheckCircle, Clock, Truck, XCircle
} from 'lucide-react';

// Définition des props par défaut
const defaultProps = {
  orders: [
    { id: 1, number: 'ORD-2023-0015', status: 'paid', time_ago: '12 min ago' },
    { id: 2, number: 'ORD-2023-0014', status: 'processing', time_ago: '32 min ago' },
    { id: 3, number: 'ORD-2023-0013', status: 'shipped', time_ago: '1h ago' },
  ]
};

const statusConfig = {
  paid: {
    text: 'Payé',
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800'
  },
  processing: {
    text: 'En traitement',
    icon: Clock,
    color: 'bg-yellow-100 text-yellow-800'
  },
  shipped: {
    text: 'Expédié',
    icon: Truck,
    color: 'bg-blue-100 text-blue-800'
  },
  cancelled: {
    text: 'Annulé',
    icon: XCircle,
    color: 'bg-red-100 text-red-800'
  }
};

function RecentOrders({ orders = defaultProps.orders }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Commandes récentes</h3>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const status = statusConfig[order.status] || statusConfig.processing;
          const StatusIcon = status.icon;

          return (
            <div
              key={order.id}
              className="flex justify-between items-center pb-4 border-b border-gray-100"
            >
              <div>
                <p className="font-medium">#{order.number}</p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <StatusIcon className="mr-2 h-4 w-4" />
                  <span>{order.time_ago}</span>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                {status.text}
              </span>
            </div>
          );
        })}
      </div>

      <Link
        href="/admin/orders"
        className="block text-center mt-4 text-orange-600 hover:underline"
      >
        Voir toutes les commandes
      </Link>
    </div>
  );
}

export default RecentOrders;




























// // resources/js/components/Admin/RecentOrders.jsx
// import React from 'react';
// import { Link } from '@inertiajs/react';
// import { 
//   CheckCircle, Clock, Truck, XCircle 
// } from 'lucide-react';

// RecentOrders.defaultProps = {
//     orders: [
//       { id: 1, number: 'ORD-2023-0015', status: 'paid', time_ago: '12 min ago' },
//       { id: 2, number: 'ORD-2023-0014', status: 'processing', time_ago: '32 min ago' },
//       { id: 3, number: 'ORD-2023-0013', status: 'shipped', time_ago: '1h ago' },
//     ]
//   };

// const statusConfig = {
//   paid: { 
//     text: 'Payé', 
//     icon: CheckCircle, 
//     color: 'bg-green-100 text-green-800' 
//   },
//   processing: { 
//     text: 'En traitement', 
//     icon: Clock, 
//     color: 'bg-yellow-100 text-yellow-800' 
//   },
//   shipped: { 
//     text: 'Expédié', 
//     icon: Truck, 
//     color: 'bg-blue-100 text-blue-800' 
//   },
//   cancelled: { 
//     text: 'Annulé', 
//     icon: XCircle, 
//     color: 'bg-red-100 text-red-800' 
//   }
// };

// export default function RecentOrders({ orders }) {
//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Commandes récentes</h3>
//       </div>
      
//       <div className="space-y-4">
//         {orders.map((order) => {
//           const status = statusConfig[order.status] || statusConfig.processing;
//           const StatusIcon = status.icon;
          
//           return (
//             <div 
//               key={order.id} 
//               className="flex justify-between items-center pb-4 border-b border-gray-100"
//             >
//               <div>
//                 <p className="font-medium">#{order.number}</p>
//                 <div className="flex items-center mt-1 text-sm text-gray-500">
//                   <StatusIcon className="mr-2 h-4 w-4" />
//                   <span>{order.time_ago}</span>
//                 </div>
//               </div>
              
//               <span className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
//                 {status.text}
//               </span>
//             </div>
//           );
//         })}
//       </div>
      
//       <Link 
//         href="/admin/orders" 
//         className="block text-center mt-4 text-orange-600 hover:underline"
//       >
//         Voir toutes les commandes
//       </Link>
//     </div>
//   );
// }