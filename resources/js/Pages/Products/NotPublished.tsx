import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Product } from '@/types';
import { Button } from '@/shadcn/ui/button';
import { ArrowLeft, FileEdit, Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import toast from 'react-hot-toast';


export default function Products({ auth, products }: PageProps) {
  console.log(products);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const handleComfirmDeleteProduct = (product: Product) => {
    setOpenDeleteConfirmModal(true);
    setSelectedProduct(product);
  }

  const handleDeleteProduct = () => {
    router.delete(route('products.destroy', selectedProduct?.id), {
      onSuccess: () => {
        toast.success('Product deleted');
        setOpenDeleteConfirmModal(false);
      },
      onError: () => {
        toast.error('Somthing went wrong');
      },
      preserveScroll: true,
    })
  };

  return (
    <>
      {/* Modal Delete */}
      <Modal
        show={openDeleteConfirmModal}
        onClose={() => setOpenDeleteConfirmModal(false)}
        maxWidth="sm"
        closeable={false}
      >
        <div className="p-6">
          <div className="flex flex-col gap-y-7">
            <h2 className="text-xl font-bold text-center text-gray-800">
              Are you sure you want to delete this product?
            </h2>
            <div className="flex justify-between">
              <Button
                variant={'secondary'}
                onClick={() => setOpenDeleteConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant={'destructive'}
                onClick={handleDeleteProduct}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Modal>
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
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">
                    Not published
                  </h2>
                  <div>
                    <Link href={route('products.index')}>
                      <Button
                        variant={'outline'}
                        size={'lg'}
                        className="flex items-center gap-x-2"
                      >
                        <ArrowLeft size={20} className="stroke-[1.5]" />Go back
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-white">
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id} className="hover:bg-white">
                          <TableCell>
                            <div className="w-[60px] h-[60px] overflow-hidden rounded-md">
                              {product.images?.[0] ? (
                                <img
                                  src={`/${product.images[0].image}`}
                                  className="w-full h-full object-cover object-center scale-120"
                                />

                              ) : (
                                <img
                                  src={"/images/placeholder.png"}
                                  className="w-full h-full object-cover object-center scale-150"
                                />
                              )}

                            </div>
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>
                            <span className="font-semibold">
                              {formatCurrency(product.salePrice)}
                            </span>
                          </TableCell>
                          <TableCell>
                            {product.quantity === 0 ? (
                              <span className="text-red-600 font-semibold">
                                Out of Stock ({product.quantity})
                              </span>
                            ) : (
                              <span className="text-green-600 font-semibold">
                                Available ({product.quantity})
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex w-full h-full gap-x-2 justify-end items-center">
                              <Link href={route('products.edit', product.id)}>
                                <Button
                                  variant={"secondary"}
                                  onClick={() => { }}
                                  className="flex items-center gap-x-1"
                                >
                                  Edit <FileEdit size={15} className="stroke-[1.5]" />
                                </Button>
                              </Link>
                              <Button
                                variant={"destructive"}
                                onClick={() => handleComfirmDeleteProduct(product)}
                                className="flex items-center gap-x-1"
                              >
                                Delete <Trash size={15} className="stroke-[1.5]" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
