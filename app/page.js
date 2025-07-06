import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="mx-[10vw] flex justify-center my-[20vh] ">

    <p className="text-white text-8xl  w-2/3 ">Track expenses. Settle up. Stay stress-free with friends</p>
   <Image src="/split-expenses-app-feature-image (1).webp" width={750} height={70} ></Image>
    </div>
    <Footer/>
    </>
  );
}
