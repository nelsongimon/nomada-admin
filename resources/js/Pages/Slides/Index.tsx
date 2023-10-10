import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps, Slide } from '@/types';
import { Button } from '@/shadcn/ui/button';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import FormSlide from '@/Components/FormSlide';
import Modal from '@/Components/Modal';
import SlideItem from '@/Components/SlideItem';
import FormEditSlide from '@/Components/FormEditSlide';
import toast from 'react-hot-toast';

export default function Slides({ auth, slides }: PageProps) {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [currentSlideEdit, setCurrentSlideEdit] = useState<Slide | null>(null);
  const [deleteSlide, setDeleteSlide] = useState<Slide | null>(null);
  console.log(slides);
  const handleEdit = (slide: Slide) => {
    setCurrentSlideEdit(slide);
    setOpenEditModal(true);
  }

  const handleDelete = (slide: Slide) => {
    setDeleteSlide(slide);
    setOpenDeleteConfirmModal(true);
  }

  const confirmDeleteSlide = () => {
    router.delete(route('slides.destroy', deleteSlide?.id), {
      onSuccess: () => {
        toast.success('Slide deleted');
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
        <FormSlide
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
        <FormEditSlide
          closeModal={() => setOpenEditModal(false)}
          slide={currentSlideEdit as Slide}
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
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Are you sure you want to delete this slide?
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
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Slides</h2>}
      >
        <Head title="Slides" />
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              {/* Container */}
              <div className="p-6">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">
                    All slides
                  </h2>
                  <div>
                    <Button
                      variant={'outline'}
                      size={'lg'}
                      onClick={() => setOpenFormModal(true)}
                      className="flex items-center gap-x-2"
                    >
                      Create slide <PlusCircle size={20} className="stroke-[1.5]" />
                    </Button>
                  </div>

                </div>
                <div className="mt-4">
                  {slides.length === 0 ? (
                    <div className="max-w-2xl mx-auto h-[200px] flex flex-col gap-y-5 items-center justify-center">
                      <h5 className="text-xl font-semibold text-gray-400">
                        There are no slides
                      </h5>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-y-6">
                      {slides.map((slide) => (
                        <SlideItem
                          key={slide.id}
                          slide={slide}
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
