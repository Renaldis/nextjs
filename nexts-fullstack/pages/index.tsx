/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import FormContainer from "@/container/FormContainer";
import { useState, useRef } from "react";
import { getToken } from "next-auth/jwt";
import { useSession, signOut } from "next-auth/react";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const session = useSession();
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
  const { data: dataLinks, isLoading, mutate } = useSWR("/api/links", fetcher);

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
        <div className="container">
          <h1 className="text-xl font-bold">{`Hello, ${session.data?.user?.email} 👋`}</h1>
          <p>This is a an area to create your links, so lets put here !!</p>
          <Button variant="link" size="sm" onClick={() => signOut()}>
            Signout
          </Button>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setShowCreate(true)}>Add Link</Button>
        </div>
        {isLoading && <p>Loading ...</p>}
        {dataLinks?.data?.map(
          (link: { id: number; url: string; title: string }) => (
            <Card key={link.id}>
              <CardContent className="flex justify-between">
                <a href={link.url} target="_blank">
                  {link.title}
                </a>
                <div>
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button ref={popoverRef} variant="ghost" size="sm">
                        Delete
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <p>Are you sure for delete this data ?</p>
                      <Button size="sm" onClick={() => handleDelete(link.id)}>
                        Yes
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* drawer create */}
      <Drawer open={showCreate} onOpenChange={setShowCreate}>
        <DrawerContent>
          <div className="container mx-auto p-4">
            <FormContainer
              onFinished={() => {
                setShowCreate(false);
                mutate();
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>

      {/* drawer edit */}
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

export const getServerSideProps = async (context: any) => {
  const token = await getToken({
    req: context.req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
