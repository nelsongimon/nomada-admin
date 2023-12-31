import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Input } from "@/shadcn/ui/input";

const FormSchema = z.object({
  status: z.string(),
  guideNumber: z.string({ required_error: "Guide Number is required" }),
});

interface UpdateStatusSelectProps {
  status: string;
  guideNumber: string | null;
  handleUpdate: (data: { status: string, guideNumber: string | null }) => void;
}
export default function UpdateStatusSelect({
  status,
  guideNumber,
  handleUpdate
}: UpdateStatusSelectProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status,
      guideNumber: guideNumber ?? ""
    }
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    handleUpdate(data);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="guideNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guide Number</FormLabel>
                <Input
                  type="text" {...field}
                  placeholder="Guide Numbe"
                  disabled={status === "completed" ? true : false}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Update Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an available status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update</Button>
        </form>
      </Form>
    </div>
  );
}
