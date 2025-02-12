import { useRouter } from "next/router";

export default function ProductDetails() {
  const router = useRouter();
  const pathName = router.query.id;
  console.log(router);
  return (
    <>
      <h1>User : {pathName}</h1>
    </>
  );
}
