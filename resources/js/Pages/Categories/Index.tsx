import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Category, PageProps } from '@/types';
import { Button } from '@/shadcn/ui/button';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Modal from '@/Components/Modal';
import toast from 'react-hot-toast';
import FormCreateCategory from '@/Components/FormCreateCategory';
import CategoryItem from '@/Components/CategoryItem';
import FormEditCategory from '@/Components/FormEditCategory';

export default function Categories({ auth, categories }: PageProps) {

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [currentCategoryEdit, setCurrentCategoryEdit] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);

  const handleEdit = (category: Category) => {
    setCurrentCategoryEdit(category);
    setOpenEditModal(true);
  }

  const handleDelete = (category: Category) => {
    setDeleteCategory(category);
    setOpenDeleteConfirmModal(true);
  }

  const confirmDeleteSlide = () => {
    router.delete(route('categories.destroy', deleteCategory?.id), {
      onSuccess: () => {
        toast.success('Category deleted');
      },
      onError: () => {
        toast.error('Somthing went wrong');
      },
      onFinish: () => setOpenDeleteConfirmModal(false),
      preserveScroll: true,
    })
  }
  return (
    <>
      {/* Modal Create */}
      <Modal
        show={openFormModal}
        onClose={() => setOpenFormModal(false)}
        maxWidth="2xl"
        closeable={false}
      >
        <FormCreateCategory
          closeModal={() => setOpenFormModal(false)}
        />
      </Modal>
      {/* Modal Edit */}
      <Modal
        show={openEditModal}
        onClose={() => setOpenEditModal(false)}
        maxWidth="2xl"
        closeable={false}
      >
        <FormEditCategory
          closeModal={() => setOpenEditModal(false)}
          category={currentCategoryEdit as Category}
        />
      </Modal>
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
              Are you sure you want to delete this category?
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
                onClick={confirmDeleteSlide}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Categories</h2>}
      >
        <Head title="Categories" />
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              {/* Container */}
              <div className="p-6">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">
                    All categories
                  </h2>
                  <div>
                    <Button
                      variant={'outline'}
                      size={'lg'}
                      onClick={() => setOpenFormModal(true)}
                      className="flex items-center gap-x-2"
                    >
                      Create category <PlusCircle size={20} className="stroke-[1.5]" />
                    </Button>
                  </div>

                </div>
                <div className="mt-4">
                  {categories.length === 0 ? (
                    <div className="max-w-2xl mx-auto h-[200px] flex flex-col gap-y-5 items-center justify-center">
                      <h5 className="text-xl font-semibold text-gray-400">
                        There are no categories
                      </h5>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-6">
                      {categories.map((category) => (
                        <CategoryItem
                          key={category.id}
                          category={category}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
