import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/shadcn/ui/alert';
import { Calendar } from '@/shadcn/ui/calendar';
import { useState, } from "react";
import { Separator } from '@/shadcn/ui/separator';
import Status from '@/Components/Status';
import UpdateStatusSelect from '@/Components/UpdateStatusSelect';
import { router } from "@inertiajs/react";
import { toast } from "react-hot-toast";

export default function Order({ auth, order }: PageProps) {
  console.log(order);
  const [shippingDate, setShippingDate] = useState<Date | undefined>(() => {
    let date = new Date(order.shipping_date as string);
    return new Date(date.setDate(date.getDate() + 1));
  });

  const handleUpdate = (data: { status: string, guide_number: string | null }) => {
    if (data.status === "completed" && data.guide_number === "") {
      toast.error("Guide number is required");
      return;
    }

    router.patch(`/orders/${order.uuid}`, {
      status: data.status,
      guide_number: data.guide_number,
      shipping_date: shippingDate
    }, {
      onSuccess: () => {
        toast.success('Order updated');
      },
      onError: () => {
        toast.error('Somthing went wrong');
      },
      // preserveScroll: true,
    });
  }
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Order Details</h2>}
    >
      <Head title="Orders" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="grid grid-cols-12 gap-x-4">
                <div className="col-span-8">
                  <Alert>
                    <AlertTitle className="flex gap-x-3 items-center">
                      <div className="text-lg">
                        Order Number #{order.orderCode}
                      </div>
                      <Status
                        status={order.status}
                      />
                    </AlertTitle>
                    <AlertDescription>
                      <div className="flex flex-col gap-y-5">
                        {/* Total amount */}
                        <div className="mt-7 flex flex-col gap-y-2">
                          <div className="flex gap-x-3 items-center">
                            <h2 className="text-black font-semibold text-base">
                              Total amount:
                            </h2>
                            <p className="text-gray-700 font-normal text-base">
                              ${order.totalAmountUsd}
                              <span className="text-gray-500 text-xs ml-2">
                                (Bs {order.totalAmountVen})
                              </span>
                            </p>
                          </div>
                        </div>
                        <Separator />
                        {/* Customer information */}
                        <div className="flex flex-col gap-y-2">
                          <div className="flex gap-x-3 items-center">
                            <h2 className="text-black font-semibold text-base">
                              Email:
                            </h2>
                            <p className="text-gray-700 font-normal text-base">
                              {order.customerEmail}
                            </p>
                          </div>
                          <div className="flex gap-x-3 items-center">
                            <h2 className="text-black font-semibold text-base">
                              Name:
                            </h2>
                            <p className="text-gray-700 font-normal text-base">
                              {order.customerName}
                            </p>
                          </div>
                          <div className="flex gap-x-3 items-center">
                            <h2 className="text-black font-semibold text-base">
                              Phone Number:
                            </h2>
                            <p className="text-gray-700 font-normal text-base">
                              {order.customerPhoneNumber}
                            </p>
                          </div>
                        </div>
                        <Separator />
                        {/* Dates */}
                        <div className="flex flex-col gap-y-2">
                          <div className="flex gap-x-7 justify-start">
                            <div>
                              <h2 className="text-black font-semibold text-base mb-3">
                                Order Date
                              </h2>
                              <div>
                                <Calendar
                                  mode="single"
                                  disableNavigation={true}
                                  selected={new Date(order.created_at)}
                                  defaultMonth={new Date(order.created_at)}
                                  disabled
                                  className="rounded-md border w-full"
                                />
                              </div>
                            </div>
                            <div>
                              <h2 className="text-black font-semibold text-base mb-3">
                                Shipping Date
                              </h2>
                              <div>
                                <Calendar
                                  mode="single"
                                  disableNavigation={order.status === "completed" ? true : false}
                                  selected={shippingDate}
                                  onSelect={setShippingDate}
                                  disabled={order.status === "completed" ? true : false}
                                  className="rounded-md border"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <UpdateStatusSelect
                              status={order.status}
                              guide_number={order.guideNumber}
                              handleUpdate={handleUpdate}
                            />
                          </div>
                        </div>
                        <Separator />
                        {/* Payment */}
                        <div className="flex flex-col gap-y-2">
                          <div className="flex gap-x-3 items-center">
                            <h2 className="text-black font-semibold text-base">
                              Payment method:
                            </h2>
                            <p className="text-gray-700 font-normal text-base">
                              {order.paymentMethod}
                            </p>
                          </div>
                        </div>
                        <Separator />
                        {/* Shipping */}
                        <div className="flex flex-col gap-y-2">
                          <div className="flex gap-x-3 items-center">
                            <h2 className="text-black font-semibold text-base">
                              Shipping method:
                            </h2>
                            <p className="text-gray-700 font-normal text-base">
                              {order.shippingMethod}
                            </p>
                          </div>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
                <div className="col-span-4">
                  <Alert>
                    <AlertDescription>
                      <div className="mb-5">
                        <h3 className="text-lg font-semibold">
                          Order Details
                        </h3>
                      </div>
                      {/* Product List */}
                      <div className="flex flex-col gap-y-7">
                        {/* Product Item */}
                        <div className="flex gap-x-3">
                          <div className="
                          w-[100px]
                          h-[100px]
                          aspect-square
                          overflow-hidden
                          rounded-md
                          bg-gray-color
                          flex
                          items-center
                        ">
                            <img
                              src="https://www.nomadavzla.com/wp-content/uploads/2023/09/TR2218-Web-01.jpg"
                              alt=""
                              className="object-cotain object-center"
                            />
                          </div>
                          <div className="flex flex-col justify-evenly">
                            <div>
                              <h4 className="text-base font-semibold">
                                Modelo TR455373
                              </h4>
                            </div>
                            <div className="flex gap-x-3 items-center">
                              <p className="text-base font-semibold">
                                $25 <span className="font-regular text-xs text-gray-400">(Price)</span>
                              </p>
                              <span className="text-base text-black">x</span>
                              <p className="text-base font-semibold">
                                2 <span className="font-regular text-xs text-gray-400">(Quantity)</span>
                              </p>
                            </div>
                            <div className="flex gap-x-3">
                              <span className="text-base font-semibold">Total:</span>
                              <span className="text-base font-semibold">$50</span>
                            </div>
                          </div>
                        </div>
                        <hr className="border-gray-100 border-[0.5px]" />
                        {/* Product Item */}
                        <div className="flex gap-x-3">
                          <div className="
                          w-[100px]
                          h-[100px]
                          aspect-square
                          overflow-hidden
                          rounded-md
                          bg-gray-color
                          flex
                          items-center
                        ">
                            <img
                              src="https://www.nomadavzla.com/wp-content/uploads/2023/09/TR2218-Web-01.jpg"
                              alt=""
                              className="object-cotain object-center"
                            />
                          </div>
                          <div className="flex flex-col justify-evenly">
                            <div>
                              <h4 className="text-base font-semibold">
                                Modelo TR455373
                              </h4>
                            </div>
                            <div className="flex gap-x-3 items-center">
                              <p className="text-base font-semibold">
                                $25 <span className="font-regular text-xs text-gray-400">(Price)</span>
                              </p>
                              <span className="text-base text-black">x</span>
                              <p className="text-base font-semibold">
                                2 <span className="font-regular text-xs text-gray-400">(Quantity)</span>
                              </p>
                            </div>
                            <div className="flex gap-x-3">
                              <span className="text-base font-semibold">Total:</span>
                              <span className="text-base font-semibold">$50</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
