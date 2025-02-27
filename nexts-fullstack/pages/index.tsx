import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Home() {
  const { data: dataLinks, error, isLoading } = useSWR("/api/links", fetcher);

  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    console.log(values);
    try {
      const response = await fetch("/api/links/create", {
        method: "POST",
        body: JSON.stringify(values),
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Form Create Link</CardTitle>
          <CardDescription>Submit your link here</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input placeholder="Url ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {isLoading && <p>Loading ...</p>}
      {dataLinks?.data?.map(
        (link: { id: number; title: string; url: string }) => (
          <Card key={link.id}>
            <CardContent className="flex justify-between items-center">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.title}
              >
                {link.title}
              </a>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">Edit</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>
                      This action cannot be undone.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </CardContent>
          </Card>
        )
      )}
      <Card>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
