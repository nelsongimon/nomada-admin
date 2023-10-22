import { Attribute, AttributeValue } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { FileEdit, PlusCircle, Settings, Trash } from 'lucide-react';
import { Button } from '@/shadcn/ui/button';
import { useState } from "react";
import Modal from "./Modal";
import FormCreateAttributeValue from "./FormCreateAttributeValue";
import FormEditAttributeValue from "./FormEditAttributeValue";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import AttributeForm from "./AttributeForm";
import AttributeHeader from "./AttributeHeader";


interface AttributeItemProps {
  attribute: Attribute;
}

export default function AttributeItem({
  attribute,
}: AttributeItemProps) {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [editValue, setEditValue] = useState<AttributeValue | null>(null);
  const [deleteValue, setDeleteValue] = useState<AttributeValue | null>(null);

  const handleEditValue = (value: AttributeValue) => {
    setEditValue(value);
    setOpenEditModal(true);
  };

  const confirmDeleteValue = (value: AttributeValue) => {
    setDeleteValue(value);
    setOpenConfirmDeleteModal(true);
  };

  const handleDeleteValue = () => {
    router.delete(route('attribute-values.destroy', deleteValue?.id), {
      onSuccess: () => {
        toast.success('Value deleted');
      },
      onError: () => {
        toast.error('Somthing went wrong');
      },
      onFinish: () => setOpenConfirmDeleteModal(false),
      preserveScroll: true,
    })
  }

  return (
    <>
      {/* Modal Create */}
      <Modal
        show={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        maxWidth="2xl"
        closeable={false}
      >
        <FormCreateAttributeValue
          closeModal={() => setOpenCreateModal(false)}
          attributeId={attribute.id}

        />
      </Modal>
      {/* Modal Edit */}
      <Modal
        show={openEditModal}
        onClose={() => setOpenEditModal(false)}
        maxWidth="2xl"
        closeable={false}
      >
        <FormEditAttributeValue
          closeModal={() => setOpenEditModal(false)}
          value={editValue as AttributeValue}
        />
      </Modal>
      {/* Modal Delete */}
      <Modal
        show={openConfirmDeleteModal}
        onClose={() => setOpenConfirmDeleteModal(false)}
        maxWidth="sm"
        closeable={false}
      >
        <div className="p-6">
          <div className="flex flex-col gap-y-7">
            <h2 className="text-xl font-bold text-center text-gray-800">
              Are you sure you want to delete this value?
            </h2>
            <div className="flex justify-between">
              <Button
                variant={'secondary'}
                onClick={() => setOpenConfirmDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant={'destructive'}
                onClick={handleDeleteValue}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex flex-col gap-y-3 py-2 px-4 border border-gray-200 border-dashed rounded-md">
        <div className="p-3 flex flex-col gap-y-3">
          <div className="flex justify-between items-center">
            {/* Attribute Header */}
            <AttributeHeader attribute={attribute} />
            {/* Create Button */}
            <div>
              <Button
                variant={'outline'}
                size={'lg'}
                onClick={() => setOpenCreateModal(true)}
                className="flex items-center gap-x-2"
              >
                Add value <PlusCircle size={20} className="stroke-[1.5]" />
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-white">
                <TableHead>Order</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Value</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attribute.attribute_values.map((value) => (
                <TableRow key={value.id} className="hover:bg-white">
                  <TableCell className="font-medium">{value.order}</TableCell>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.slug}</TableCell>
                  <TableCell>{value.products_count}</TableCell>
                  <TableCell>
                    {value.image ? (
                      <div className="w-[50px] rounded-md overflow-hidden relative">
                        <img
                          src={value.image}
                          alt="Preview"
                          className="
                            object-cover
                            object-center
                            w-full
                            h-full
                          "
                        />
                      </div>
                    ) : (
                      <span>-----</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {value.value ?? "-----"}
                  </TableCell>
                  <TableCell className="flex w-full gap-x-2 justify-end">
                    <Button
                      variant={"secondary"}
                      size={"sm"}
                      onClick={() => handleEditValue(value)}
                      className="flex items-center gap-x-1"
                    >
                      Edit <FileEdit size={15} className="stroke-[1.5]" />
                    </Button>
                    <Button
                      variant={"destructive"}
                      size={"sm"}
                      onClick={() => confirmDeleteValue(value)}
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
    </>
  );
}
