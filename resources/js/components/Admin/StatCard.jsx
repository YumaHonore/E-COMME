// resources/js/components/Admin/StatCard.jsx
import React from 'react';
import { 
  LineChart, ShoppingBag, Users, Percent, 
  UserCheck, UserPlus, Crown, Euro, 
  ShoppingCart, Clock, Truck, Ban,
  MessageCircle, CheckCircle, Star
} from 'lucide-react';

const iconComponents = {
  'chart-line': LineChart,
  'shopping-bag': ShoppingBag,
  'users': Users,
  'percentage': Percent,
  'user-check': UserCheck,
  'user-plus': UserPlus,
  'crown': Crown,
  'euro': Euro,
  'shopping-cart': ShoppingCart,
  'clock': Clock,
  'truck': Truck,
  'ban': Ban,
  'comment-alt': MessageCircle,
  'check-circle': CheckCircle,
  'star': Star
};

export default function StatCard({ 
  title, 
  value, 
  icon, 
  color = 'blue', 
  trend 
}) {
  const Icon = iconComponents[icon];
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
          {Icon && <Icon size={20} />}
        </div>
      </div>
      {trend && (
        <p className={`text-sm text-${color}-600 mt-2`}>{trend}</p>
      )}
    </div>
  );
}