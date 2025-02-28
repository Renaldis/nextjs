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
import { useRef, useState } from "react";
import FormContainer from "@/container/FormContainer";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function Home() {
  const popoverRef = useRef<HTMLButtonElement | null>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [valueEdit, setShowValueEdit] = useState<{
    id: number;
    title: string;
    url: string;
  }>({
    id: 0,
    title: "",
    url: "",
  });
  const {
    data: dataLinks,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/links", fetcher);

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/links/delete/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
    } finally {
      mutate();
      popoverRef.current?.click();
    }
  };

  return (
    <>
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

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setShowValueEdit({
                      id: link.id,
                      title: link.title,
                      url: link.url,
                    });
                    setShowEdit(true);
                  }}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </div>

      <Drawer open={showEdit} onOpenChange={setShowEdit}>
        <DrawerContent>
          <div className="container mx-auto p-4">
            <FormContainer
              id={valueEdit.id}
              values={{
                title: valueEdit.title,
                url: valueEdit.url,
              }}
              onFinished={() => {
                setShowEdit(false);
                mutate();
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
