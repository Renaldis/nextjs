// import pemandangan from "@/assets/pemandangan.jpeg";
// import HeavyComponent from "@/components/heavyComponents";
// import Image from "next/image";
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(
  () => import("@/components/heavyComponents/index"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export default function MePage() {
  return (
    <>
      <h1>Me Page</h1>
      {/* <img src="/pemandangan.jpeg" alt="pemandangan" /> */}
      {/* <img {...pemandangan} alt="" /> */}
      {/* <Image
        src={"/pemandangan.jpeg"}
        alt="pemandangan"
        width={100}
        height={100}
      /> */}
      <HeavyComponent />
    </>
  );
}
