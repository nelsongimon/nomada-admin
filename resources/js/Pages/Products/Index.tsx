import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { DataTable } from './Components/DataTable';
import { columns } from './Components/Columns';
import { Button } from '@/shadcn/ui/button';
import { PlusCircle } from 'lucide-react';


export default function Products({
  auth,
  products,
  notPublishedProductsCount,
  featuredProductsCount,
  newProductsCount
}: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
    >
      <Head title="Products" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {/* Container */}
            <div className="p-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-x-4 items-end">
                  <h2 className="text-2xl font-bold">
                    All products
                  </h2>
                  <div className="flex gap-x-2">
                    <span className="text-xs text-gray-500 font-semibold">
                      Published ({products.length})
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">
                      Not Published ({notPublishedProductsCount})
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">
                      Featured ({featuredProductsCount})
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">
                      New ({newProductsCount})
                    </span>
                  </div>
                </div>
                <div>
                  <Link href={route('products.create')}>
                    <Button
                      variant={'outline'}
                      size={'lg'}
                      className="flex items-center gap-x-2"
                    >
                      Add new product <PlusCircle size={20} className="stroke-[1.5]" />
                    </Button>
                  </Link>
                </div>

              </div>
              <div className="mt-4">
                <DataTable
                  columns={columns}
                  data={products}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
