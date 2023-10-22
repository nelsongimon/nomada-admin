import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/ui/select";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Select } from "@radix-ui/react-select";
import { XCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormEditUserProps {
  user: User | undefined;
  closeModal: () => void;
}
export default function FormEditUser({
  user,
  closeModal
}: FormEditUserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { data, setData, errors, patch } = useForm({
    name: user?.name ?? "",
    email: user?.email ?? "",
    role: user?.role ?? "",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    patch(route("users.update", user?.id), {
      onStart: () => setIsLoading(true),
      onSuccess: () => {
        closeModal();
        toast.success("User updated");
        setIsLoading(false);
        closeModal();
      },
      onError: () => {
        setIsLoading(false);
        toast.error("Something went wrong");
      },
      preserveScroll: true,
    });
  }
  return (
    <div className="py-7 px-5">
      <div className="mb-4">
        <h3 className="text-center font-semibold text-xl">
          Add new user
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          {/* Name */}
          <div className="col-span-2 flex flex-col gap-y-2">
            <Input
              placeholder="Title"
              value={data.name}
              onChange={(e) => setData("name", e.target.value)}
            />
            {errors.name && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                <XCircle size={20} className="stroke-[1]" />
                {errors.name}
              </div>
            )}
          </div>
          {/* Role */}
          <div className="flex flex-col gap-y-2">
            <Select onValueChange={(value) => setData("role", value)} defaultValue={user?.role}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                <XCircle size={20} className="stroke-[1]" />
                {errors.role}
              </div>
            )}
          </div>
          {/* Email */}
          <div className="col-span-2 flex flex-col gap-y-2">
            <Input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            {errors.email && (
              <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                <XCircle size={20} className="stroke-[1]" />
                {errors.email}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <Button
            variant={"secondary"}
            onClick={closeModal}
            className="flex items-center gap-x-2"
            disabled={isLoading}
            type="button"
          >
            Close modal
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update user
          </Button>
        </div>
      </form>
    </div>
  );
}
