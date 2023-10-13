import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { Style, PageProps } from '@/types';
import { Button } from '@/shadcn/ui/button';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Modal from '@/Components/Modal';
import toast from 'react-hot-toast';
import StyleItem from '@/Components/StyleItem';
import FormCreateStyle from '@/Components/FormCreateStyle';
import FormEditStyle from '@/Components/FormEditStyle';

export default function Styles({ auth, styles }: PageProps) {

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [currentStyleEdit, setCurrentStyleEdit] = useState<Style | null>(null);
  const [deleteStyle, setDeleteStyle] = useState<Style | null>(null);

  const handleEdit = (style: Style) => {
    setCurrentStyleEdit(style);
    setOpenEditModal(true);
  }

  const handleDelete = (style: Style) => {
    setDeleteStyle(style);
    setOpenDeleteConfirmModal(true);
  }

  const confirmDeleteSlide = () => {
    router.delete(route('styles.destroy', deleteStyle?.id), {
      onSuccess: () => {
        toast.success('Style deleted');
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
        <FormCreateStyle
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
        <FormEditStyle
          closeModal={() => setOpenEditModal(false)}
          style={currentStyleEdit as Style}
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
              Are you sure you want to delete this style?
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
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Styles</h2>}
      >
        <Head title="Styles" />
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              {/* Container */}
              <div className="p-6">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">
                    All styles
                  </h2>
                  <div>
                    <Button
                      variant={'outline'}
                      size={'lg'}
                      onClick={() => setOpenFormModal(true)}
                      className="flex items-center gap-x-2"
                    >
                      Create style <PlusCircle size={20} className="stroke-[1.5]" />
                    </Button>
                  </div>

                </div>
                <div className="mt-4">
                  {styles.length === 0 ? (
                    <div className="max-w-2xl mx-auto h-[200px] flex flex-col gap-y-5 items-center justify-center">
                      <h5 className="text-xl font-semibold text-gray-400">
                        There are no styles
                      </h5>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-6">
                      {styles.map((style) => (
                        <StyleItem
                          key={style.id}
                          style={style}
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
