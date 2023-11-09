import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Product, User } from '@/types';
import { Button } from '@/shadcn/ui/button';
import { FileEdit, MailCheck, MailWarning, PlusCircle, Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { useState } from 'react';
import Modal from '@/Components/Modal';
import toast from 'react-hot-toast';
import RoleBadge from '@/Components/RoleBadge';
import FormCreateUser from '@/Components/FormCreateUser';
import FormEditUser from '@/Components/FormEditUser';


export default function Products({ auth, users }: PageProps) {
  console.log(users);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  }

  const handleComfirmDelete = (user: User) => {
    setOpenDeleteConfirmModal(true);
    setSelectedUser(user);
  }

  const handleDelete = () => {
    router.delete(route('users.destroy', selectedUser?.id), {
      onSuccess: () => {
        toast.success('User deleted');
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
      {/* Modal Create */}
      <Modal
        show={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        maxWidth="2xl"
        closeable={false}
      >
        <FormCreateUser
          closeModal={() => setOpenCreateModal(false)}
        />
      </Modal>
      {/* Modal Edit */}
      <Modal
        show={openEditModal}
        onClose={() => setOpenEditModal(false)}
        maxWidth="2xl"
        closeable={false}
      >
        <FormEditUser
          closeModal={() => setOpenEditModal(false)}
          user={selectedUser}
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
              Are you sure you want to delete this user?
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
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
      >
        <Head title="Users" />
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              {/* Container */}
              <div className="p-6">
                <div className="flex justify-between">
                  <h2 className="text-2xl font-bold">
                    All users
                  </h2>
                  <div>
                    <Button
                      variant={'outline'}
                      size={'lg'}
                      onClick={() => setOpenCreateModal(true)}
                      className="flex items-center gap-x-2"
                    >
                      Create user <PlusCircle size={20} className="stroke-[1.5]" />
                    </Button>
                  </div>
                </div>
                <div className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-white">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-white">
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <RoleBadge role={user.role} />
                          </TableCell>
                          <TableCell>
                            <div className="flex w-full h-full gap-x-2 justify-end items-center">
                              <Button
                                variant={"secondary"}
                                onClick={() => handleEdit(user)}
                                className="flex items-center gap-x-1"
                              >
                                Edit <FileEdit size={15} className="stroke-[1.5]" />
                              </Button>
                              <Button
                                variant={"destructive"}
                                onClick={() => handleComfirmDelete(user)}
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
