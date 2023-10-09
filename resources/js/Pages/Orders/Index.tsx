import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { DataTable } from './Components/DataTable';
import { columns } from './Components/Columns';


export default function Orders({ auth, orders }: PageProps) {
  console.log(orders);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Orders</h2>}
    >
      <Head title="Orders" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div>
                <h2 className="text-2xl font-bold">
                  All orders
                </h2>
              </div>
              <DataTable
                columns={columns}
                data={orders}
                searchKey="order_code"
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
