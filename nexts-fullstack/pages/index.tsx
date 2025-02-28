import useSWR from "swr";
import {
  Card,
  CardContent,
  CardDescription,
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

import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormContainer from "@/container/FormContainer";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Home() {
  const { data: dataLinks, error, isLoading } = useSWR("/api/links", fetcher);

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Form Create Link</CardTitle>
          <CardDescription>Submit your link here</CardDescription>
        </CardHeader>
        <CardContent>
          <FormContainer />
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
    </div>
  );
}
