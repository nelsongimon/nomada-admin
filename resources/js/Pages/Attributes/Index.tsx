import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AttributeForm from '@/Components/AttributeForm';
import AttributeItem from '@/Components/AttributeItem';


export default function Attributes({ auth, attributes, values }: PageProps) {
  console.log(attributes);
  console.log(values);

  return (
    <>
      <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Attributes</h2>}
      >
        <Head title="Attributes" />
        <div className="py-12">
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
        </div>
      </AuthenticatedLayout>
    </>
  );
}
