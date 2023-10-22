import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps, Tag } from '@/types';
import AttributeForm from '@/Components/AttributeForm';
import AttributeItem from '@/Components/AttributeItem';
import FormTag from '@/Components/FormTag';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { Button } from '@/shadcn/ui/button';
import { FileEdit, Trash } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import toast from 'react-hot-toast';


export default function Attributes({ auth, attributes, tags }: PageProps) {
  const [openConfirmDeleteTagModal, setOpenConfirmDeleteTagModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const confirmDeleteTag = (tag: Tag) => {
    setOpenConfirmDeleteTagModal(true);
    setSelectedTag(tag);
  }
  const handleDeleteTag = () => {
    router.delete(route('tags.destroy', selectedTag?.id), {
      onSuccess: () => {
        toast.success('Tag deleted');
      },
      onError: () => {
        toast.error('Somthing went wrong');
      },
      onFinish: () => {
        setOpenConfirmDeleteTagModal(false);
        setSelectedTag(null);
      },
      preserveScroll: true,
    })
  }

  return (
    <>
      {/* Modal Delete */}
      <Modal
        show={openConfirmDeleteTagModal}
        onClose={() => setOpenConfirmDeleteTagModal(false)}
        maxWidth="sm"
        closeable={false}
      >
        <div className="p-6">
          <div className="flex flex-col gap-y-7">
            <h2 className="text-xl font-bold text-center text-gray-800">
              Are you sure you want to delete this tag?
            </h2>
            <div className="flex justify-between">
              <Button
                variant={'secondary'}
                onClick={() => setOpenConfirmDeleteTagModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant={'destructive'}
                onClick={handleDeleteTag}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Attributes</h2>}
      >
        <Head title="Attributes" />
        <div className="py-12">
          {/* Attributes */}
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              {/* Container */}
              <div className="p-6">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">
                    All attributes
                  </h2>
                  <div>
                    <AttributeForm />
                  </div>
                </div>
                <div className="mt-10">
                  {/* Attribute */}
                  {attributes.length === 0 ? (
                    <div className="max-w-2xl mx-auto h-[200px] flex flex-col gap-y-5 items-center justify-center">
                      <h5 className="text-xl font-semibold text-gray-400">
                        There are no attributes
                      </h5>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-y-10">
                        {attributes.map((attribute) => (
                          <AttributeItem
                            key={attribute.id}
                            attribute={attribute}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Tags */}
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-10">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              {/* Container */}
              <div className="p-6">
                <div className="flex">
                  <h2 className="text-2xl font-bold">
                    All tags
                  </h2>
                </div>
                <div className="mt-10">
                  <div className="grid grid-cols-12 gap-x-14">
                    <div className="col-span-5">
                      <FormTag
                        tag={selectedTag}
                        selectedTag={() => setSelectedTag(null)}
                      />
                    </div>
                    <div className="col-span-7">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-white">
                            <TableHead>Name</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {tags.map((tag) => (
                            <TableRow key={tag.id} className="hover:bg-white">
                              <TableCell>{tag.name}</TableCell>
                              <TableCell className="flex w-full gap-x-2 justify-end">
                                <Button
                                  variant={"secondary"}
                                  size={"sm"}
                                  onClick={() => setSelectedTag(tag)}
                                  className="flex items-center gap-x-1"
                                >
                                  Edit <FileEdit size={15} className="stroke-[1.5]" />
                                </Button>
                                <Button
                                  variant={"destructive"}
                                  size={"sm"}
                                  onClick={() => confirmDeleteTag(tag)}
                                  className="flex items-center gap-x-1"
                                >
                                  Delete <Trash size={15} className="stroke-[1.5]" />
                                </Button>
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
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  );
}
