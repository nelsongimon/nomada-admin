import { Button } from "@/shadcn/ui/button";
import { Attribute } from "@/types";
import { Settings } from "lucide-react";
import AttributeForm from "./AttributeForm";
import { useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import { router } from "@inertiajs/react";

interface AttributeHeaderProps {
  attribute: Attribute;
}
export default function AttributeHeader({
  attribute,
}: AttributeHeaderProps) {
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);

  const handleDelete = () => {
    setOpenDeleteConfirmModal(false);
    router.delete(route("attributes.destroy", attribute.id), {
      onSuccess: () => {
        toast.success("Attribute deleted");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
      onFinish: () => setShowFormEdit(false),
      preserveScroll: true,
    })
  }

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
              Are you sure you want to delete this attribute and all its values?
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
      {showFormEdit ? (
        <div>
          <AttributeForm
            attribute={attribute}
            closeForm={() => setShowFormEdit(false)}
            cofirmDelete={() => setOpenDeleteConfirmModal(true)}
          />
        </div>
      ) : (
        <div className="flex gap-x-4 items-center">
          <h4 className="font-medium text-lg text-gray-500">
            #{attribute.order}
          </h4>
          <div className="flex gap-x-2">
            <h4 className="font-medium text-lg">
              Attribute:
            </h4>
            <h4 className="font-medium text-lg text-gray-500">
              {attribute.name}
            </h4>
          </div>
          <div>
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => setShowFormEdit(true)}
            >
              <Settings size={20} className="stroke-[1.5]" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
