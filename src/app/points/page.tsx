import PageMarginContainer from "@/components/ui/pageMarginContainer";
import PointsHeaders from "./__components__/pointsHeaders";
import PointsTable from "./__components__/pointsTable";
import bg from "@/assets/bg-img.png";
import Image from "next/image";
export default function Page() {
  return (
    <>
      <div className="absolute top-0 left-0 object-fill h-full w-screen  -z-10  flex justify-center items-center">
        <Image className="object-cover w-full h-full" src={bg} alt="bg" />
      </div>

      <PageMarginContainer className="text-white ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Reactor Points</h1>
          <p className="text-gray-400 mt-1">Track your Reactor Points</p>
        </div>
        <PointsHeaders />
        <div className="mt-6 bg-neutral-1000 border-neutral-950 p-4 py-2 overflow-x-auto rounded-md">
          <PointsTable />
        </div>
      </PageMarginContainer>
    </>
  );
}
