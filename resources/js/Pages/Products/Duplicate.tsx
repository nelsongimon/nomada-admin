import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { Image, PageProps, Tag } from '@/types';
import { Button } from '@/shadcn/ui/button';
import { CheckCircle2, Save, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/shadcn/ui/input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { cn, formattedPrice, slugify } from '@/lib/utils';
import { Textarea } from '@/shadcn/ui/textarea';
import { Separator } from '@/shadcn/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/shadcn/ui/radio-group';
import { Switch } from '@headlessui/react';
import Tags from '@/Components/Tags';
import ImagesUpload from '@/Components/ImagesUpload';
import SpecificationImage from '@/Components/SpecificationImage';
import { Checkbox } from "@/shadcn/ui/checkbox";
import { ReloadIcon } from '@radix-ui/react-icons';



export default function EditProduct({ auth, categories, styles, tags, attributes, product }: PageProps) {

  const [checkSlug, setCheckSlug] = useState(true);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(product.tags);
  const [specificationImage, setSpecificationImage] = useState<File | string | null>(product.specificationImage);
  const [selectedImages, setSelectedImages] = useState<Image[]>(product.images);
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>(product.attribute_values?.map((value) => value.id));
  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState(product.visibility);
  const [featured, setFeatured] = useState(product.featured);
  const { data, setData, errors, post } = useForm({
    name: product.name ?? "",
    slug: product.slug ?? "",
    model: product.model ?? "",
    description: product.description ?? "",
    quantity: product.quantity ?? 0,
    salePrice: product.salePrice ?? "",
    promotionalPrice: product.promotionalPrice ?? "",
    categoryId: product.category?.id ? String(product.category.id) : "",
    styleId: product.style?.id ? String(product.style.id) : "",
    visibility: product.visibility,
    featured: product.featured,
    specificationImage,
    images: selectedImages.map((image) => image.id),
    tags: selectedTags.map((tag) => tag.id),
    attributes: selectedAttributes,
  });




  const handleSubmit = () => {
    post(route("products.store"), {
      onStart: () => setIsLoading(true),
      onSuccess: () => {
        toast.success("Product created");
        window.location.href = route("products.index");
      },
      onError: (error) => console.log(error),
      onFinish: () => setIsLoading(false),
      preserveScroll: true,
    });
  }

  const handleCheckSlug = () => {
    if (checkSlug) {
      toast.success("Slug unlocked");
      setCheckSlug(false);
      return;
    }
    axios.post("/products/check", {
      slug: data.slug
    }).then((res) => {
      if (res.data.slug) {
        toast.success("Slug is available");
      } else {
        toast.error("Slug not available");
      }
      setCheckSlug(res.data.slug);
    }).
      catch((error) => {
        console.log("Error", error);
      })
  }

  const handleCheckedChange = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedAttributes([...selectedAttributes, id]);
    } else {
      setSelectedAttributes(selectedAttributes.filter((item) => item !== id));
    }
  }

  useEffect(() => {
    if (checkSlug) return;
    setData("slug", slugify(data.name));
  }, [data.name]);

  useEffect(() => {
    setData("visibility", visibility);
  }, [visibility]);

  useEffect(() => {
    setData("specificationImage", specificationImage);
  }, [specificationImage]);

  useEffect(() => {
    setData("images", selectedImages.map((image) => image.id));
  }, [selectedImages]);

  useEffect(() => {
    setData("tags", selectedTags.map((tag) => tag.id));
  }, [selectedTags]);

  useEffect(() => {
    setData("attributes", selectedAttributes);
  }, [selectedAttributes]);

  useEffect(() => {
    setData("featured", featured);
  }, [featured]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Products</h2>}
    >
      <Head title="Products" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            {/* Container */}
            <div className="p-6 pb-10">
              <div className="flex justify-between">
                <h2 className="text-2xl font-bold">
                  Duplicate product
                </h2>
                <div>
                  <Button
                    variant={'outline'}
                    size={'lg'}
                    onClick={handleSubmit}
                    className="flex items-center gap-x-2"
                    disabled={isLoading || !checkSlug}
                  >
                    Save product
                    {isLoading ? (
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save size={20} className="stroke-[1.3]" />
                    )}
                  </Button>
                </div>

              </div>
              <div className="mt-4">
                {/* Content */}
                <div className="grid grid-cols-12 gap-x-12">
                  <div className="col-span-8 flex flex-col gap-y-6">
                    {/* Name */}
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="name" className="text-sm font-semibold">
                        Name
                      </label>
                      <Input
                        id="name"
                        placeholder="Product name"
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
                    {/* Slug */}
                    <div className="flex flex-col gap-y-2">
                      <div className="flex gap-x-4 items-end">
                        <div className="flex flex-col gap-y-2 flex-1">
                          <label htmlFor="slug" className="text-sm font-semibold">
                            Slug
                          </label>
                          <Input
                            id="slug"
                            placeholder="Product slug"
                            value={data.slug}
                            onChange={(e) => setData("slug", e.target.value)}
                            disabled={checkSlug}
                          />

                        </div>
                        <div>
                          <Button
                            variant={"secondary"}
                            onClick={handleCheckSlug}
                            type="button"
                            className={cn(`
                            w-full flex items-center gap-x-2
                          `,
                              checkSlug && "bg-green-500 hover:bg-green-600 text-white"
                            )}
                          >
                            <CheckCircle2 size={20} className="stroke-[1.5]" />
                            {checkSlug ? "Checked" : "Check"}
                          </Button>
                        </div>
                      </div>
                      {errors.slug && (
                        <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                          <XCircle size={20} className="stroke-[1]" />
                          {errors.slug}
                        </div>
                      )}
                    </div>
                    {/* Prices */}
                    <div className="grid grid-cols-2 gap-x-4">
                      {/* Normal Price */}
                      <div className="flex flex-col gap-y-2 col-span-1">
                        <label htmlFor="price" className="text-sm font-semibold">
                          Price
                        </label>
                        <Input
                          id="price"
                          type="text"
                          placeholder="Product price"
                          value={data.salePrice}
                          onChange={(e) => setData("salePrice", formattedPrice(e.target.value))}
                        />
                        {errors.salePrice && (
                          <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                            <XCircle size={20} className="stroke-[1]" />
                            {errors.salePrice}
                          </div>
                        )}
                      </div>
                      {/* Promotional Price */}
                      <div className="flex flex-col gap-y-2 col-span-1">
                        <label htmlFor="promotionalPrice" className="text-sm font-semibold">
                          Promotional Price
                        </label>
                        <Input
                          id="promotionalPrice"
                          type="text"
                          placeholder="Product promotional price"
                          value={data.promotionalPrice}
                          onChange={(e) => setData("promotionalPrice", formattedPrice(e.target.value))}

                        />
                        {errors.promotionalPrice && (
                          <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                            <XCircle size={20} className="stroke-[1]" />
                            {errors.promotionalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Quantity */}
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="quantity" className="text-sm font-semibold">
                        Inventory
                      </label>
                      <Input
                        id="quantity"
                        type="number"
                        min={0}
                        placeholder="Quantity"
                        value={data.quantity}
                        onChange={(e) => setData("quantity", Number(e.target.value))}
                      />
                      {errors.quantity && (
                        <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                          <XCircle size={20} className="stroke-[1]" />
                          {errors.quantity}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="model" className="text-sm font-semibold">
                        Model
                      </label>
                      <Input
                        id="model"
                        placeholder="Product model"
                        value={data.model}
                        onChange={(e) => setData("model", e.target.value)}
                      />
                      {errors.model && (
                        <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                          <XCircle size={20} className="stroke-[1]" />
                          {errors.model}
                        </div>
                      )}
                    </div>
                    {/* Description */}
                    <div className="flex flex-col gap-y-2">
                      <label htmlFor="description" className="text-sm font-semibold">
                        Description
                      </label>
                      <Textarea
                        placeholder="Product description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        rows={5}
                      />
                      {errors.description && (
                        <div className="flex items-center gap-x-1 text-red-500 text-sm font-normal ml-1">
                          <XCircle size={20} className="stroke-[1]" />
                          {errors.description}
                        </div>
                      )}
                    </div>
                    <Separator className="mt-3" />
                    {/* Attributes */}
                    <div className="flex flex-col gap-y-3">
                      <h4 className="font-semibold text-lg">
                        Attributes
                      </h4>
                      <div className="flex gap-y-5 gap-x-10 flex-wrap mb-3">
                        {attributes.map((attribute) => (
                          <div key={attribute.id} className="flex flex-col gap-y-4">
                            <h4 className="font-semibold text-base text-gray-600">
                              {attribute.name}
                            </h4>
                            <div className="flex flex-col gap-y-3">
                              {attribute.attribute_values.map((value) => (
                                <div key={value.id} className="flex gap-x-2 items-center">
                                  <Checkbox id={value.slug} checked={selectedAttributes?.includes(value.id)} onCheckedChange={(checked) => handleCheckedChange(checked as boolean, value.id)} />
                                  <label htmlFor={value.slug} className="text-sm font-semibold  cursor-pointer text-gray-600">
                                    {value.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    {/* Images */}
                    <div className="flex flex-col gap-y-7 my-3">
                      <div className="flex flex-col gap-y-3">
                        <h4 className="font-semibold text-base">
                          Product images
                        </h4>
                        <ImagesUpload
                          setSelectedImages={setSelectedImages}
                          selectedImages={selectedImages}
                        />
                      </div>
                      <div className="flex flex-col gap-y-3">
                        <h4 className="font-semibold text-base">
                          Specification image
                        </h4>
                        <SpecificationImage
                          setSpecificationImage={setSpecificationImage}
                          specificationImage={specificationImage}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Sidebar Form */}
                  <div className="col-span-4 flex flex-col gap-y-7 mt-5">
                    {/* Visibility */}
                    <div className="flex gap-x-3 items-center px-4 py-5 bg-gray-50 rounded-md">
                      <h4 className="font-semibold text-base">Visibility</h4>
                      <Switch
                        checked={visibility}
                        onChange={() => setVisibility(current => !current)}
                        className={`${visibility ? 'bg-green-600' : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span className="sr-only">visibility</span>
                        <span
                          className={`${visibility ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>
                    {/* Featured */}
                    <div className="flex gap-x-3 items-center px-4 py-5 bg-gray-50 rounded-md">
                      <h4 className="font-semibold text-base">Featured</h4>
                      <Switch
                        checked={featured}
                        onChange={() => setFeatured(current => !current)}
                        className={`${featured ? 'bg-green-600' : 'bg-gray-200'
                          } relative inline-flex h-6 w-11 items-center rounded-full`}
                      >
                        <span className="sr-only">featured</span>
                        <span
                          className={`${featured ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                      </Switch>
                    </div>
                    {/* Category */}
                    <div className="flex flex-col gap-y-3 px-4 py-5 bg-gray-50 rounded-md">
                      <h4 className="font-semibold text-base">
                        Category
                      </h4>
                      <Separator />
                      <div>
                        <RadioGroup
                          defaultValue={String(data.categoryId)}
                          onValueChange={(value) => setData("categoryId", value)}
                          className="flex flex-col space-y-1"
                        >
                          {categories.map((category) => (
                            <div key={category.id} className="flex gap-x-2 items-center">
                              <RadioGroupItem id={category.slug} value={String(category.id)} />
                              <label htmlFor={category.slug} className="font-semibold text-sm cursor-pointer">
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                    {/* Style */}
                    <div className="flex flex-col gap-y-3 px-4 py-5 bg-gray-50 rounded-md">
                      <h4 className="font-semibold text-base">
                        Style
                      </h4>
                      <Separator />
                      <div>
                        <RadioGroup
                          defaultValue={String(data.styleId)}
                          onValueChange={(value) => setData("styleId", value)}
                          className="flex flex-col space-y-1"
                        >
                          {styles.map((style) => (
                            <div key={style.id} className="flex gap-x-2 items-center">
                              <RadioGroupItem id={style.slug} value={String(style.id)} />
                              <label htmlFor={style.slug} className="font-semibold text-sm cursor-pointer">
                                {style.name}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="px-4 py-5 bg-gray-50 rounded-md">
                      <Tags
                        tags={tags}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
