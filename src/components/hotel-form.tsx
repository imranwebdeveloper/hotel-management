"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/store/reduxApi";
import { toast } from "sonner";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useParams, useRouter } from "next/navigation";
import Spinner from "./ui/spiner";
import Link from "next/link";
import { Property } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Hotel name must be at least 2 characters.",
  }),

  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  costPerNight: z.coerce.number().positive({
    message: "Cost per night must be a positive number.",
  }),
  availableRooms: z.coerce.number().int().positive({
    message: "Available rooms must be a positive integer.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  imageUrl: z
    .string({
      required_error: "Image URL is required.",
      message: "Image URL is required.",
    })
    .min(1, {
      message: "Image URL is required.",
    }),
  rating: z.coerce.number().min(0).max(5).default(0),
});

type FormValues = z.infer<typeof formSchema>;

interface HotelFormProps {
  hotel?: Property;
  type: "CREATE" | "UPDATE";
}

export function HotelForm({ hotel, type }: HotelFormProps) {
  const params = useParams();
  const id = params.id?.toString();
  const router = useRouter();
  const [createHotel, createHotelResult] = api.useCreateHotelMutation();
  const [updateHotel, updateHotelResult] = api.useUpdateHotelMutation();
  const [getHotel, getHotelResult] = api.useLazyGetHotelQuery();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: hotel?.name || "",
      description: hotel?.description || "",
      address: hotel?.address || "",
      costPerNight: hotel?.costPerNight || 0,
      availableRooms: hotel?.availableRooms || 1,
      imageUrl: hotel?.imageUrl || "",
      rating: hotel?.rating || 0,
    },
  });

  async function onSubmit(values: FormValues) {
    if (
      !values.imageUrl.includes("picsum.photos") && // Ensure the URL is from Picsum
      !values.imageUrl.startsWith("/img") // Allow local images starting with "/img"
    ) {
      return form.setError("imageUrl", {
        type: "manual",
        message:
          "Image URL must be from https://picsum.photos or start with '/img'.",
      });
    }

    try {
      let res;
      if (type == "UPDATE") {
        res = await updateHotel({ id: id as string, ...values }).unwrap();
      } else {
        res = await createHotel(values).unwrap();
      }

      if (res.success) {
        toast.success(res.message);
        router.push("/hotels");
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    if (type == "UPDATE") {
      getHotel(id as string);
    }
  }, [id, getHotel, type]);

  useEffect(() => {
    if (getHotelResult?.data) {
      const currentHotel = getHotelResult.data.data;
      form.setValue("name", currentHotel.name);
      form.setValue("description", currentHotel.description);
      form.setValue("address", currentHotel.address);
      form.setValue("costPerNight", currentHotel.costPerNight);
      form.setValue("availableRooms", currentHotel.availableRooms);
      form.setValue("imageUrl", currentHotel.imageUrl);
      form.setValue("rating", currentHotel.rating);
    }
  }, [getHotelResult, form]);
  const isFoundUpdateData =
    type == "UPDATE" && !getHotelResult?.data && getHotelResult.isError;

  return (
    <Card className="max-w-2xl mx-auto">
      {getHotelResult.isLoading ? (
        <Spinner />
      ) : (
        <>
          {isFoundUpdateData ? (
            <p className="text-center text-2xl font-bold">
              Hotel data not found
            </p>
          ) : (
            <>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {id != "new" ? "Update Hotel" : " Create Hotel"}
                </CardTitle>
              </CardHeader>
              <CardContent className=" overflow-y-auto">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                  >
                    <div className="grid grid-cols-1 gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hotel Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Golden Sands Resort"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder=" Only use  https://picsum.photos"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />

                            <Link
                              href={"https://picsum.photos"}
                              target="_blank"
                              className="text-sm underline text-blue-600 "
                            >
                              Please use an image URL from Picsum Photos to
                              ensure compatibility with our system.
                            </Link>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="777 Beach Road" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A luxurious beachfront resort with stunning views..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rating (0-5)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="costPerNight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price per Night ($)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availableRooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Available Rooms</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                step="1"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end space-x-4 mt-4">
                      <Button
                        type="submit"
                        disabled={createHotelResult.isLoading}
                      >
                        {createHotelResult.isLoading ||
                        updateHotelResult.isLoading
                          ? "Saving"
                          : "Save"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </>
          )}
        </>
      )}
    </Card>
  );
}
